import { Component, OnInit } from '@angular/core';
import { blankPhoto } from '../../utils/blank-objects';
import { Photo } from '../../model/model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Supabase } from '../../services/supabase-service/supabase';
import { MapService } from '../../services/map-service/map-service';
import { GoToPhotos } from "../buttons/go-to-photos/go-to-photos";

@Component({
  selector: 'app-reserved-photo-form',
  imports: [FormsModule, GoToPhotos],
  templateUrl: './reserved-photo-form.html',
  styleUrl: './reserved-photo-form.css',
})
export class ReservedPhotoForm implements OnInit {

  photo: Photo = structuredClone(blankPhoto);
  imageToAdd!: File;
  projectId!: number;
  photoId!: number | null;
  editMode: boolean = false;
  photoImageChanged: boolean = false;
  previewUrlFromPhoto!: string;
  previewImageFromFiles!: any;

  constructor(
    private router: Router,
    private supabase: Supabase,
    private mapService: MapService
  ) {
    this.photo = structuredClone(blankPhoto);
    this.photo.projectId = this.getProjectIdFromUrl();
    const { photoId , editMode } = this.getPhotoIdAndModeFromUrl();
    this.photoId = photoId;
    this.editMode = editMode;
  }

  ngOnInit(): void {
    if (this.photoId) {
      this.getPhoto(this.photoId);
    } else {
      this.getNewId();
    }
  }

  getPhotoIdAndModeFromUrl(): {
    photoId: number | null,
    editMode: boolean
  } {
    const urlSegments: string[] = this.router.url.split('/');
    const lastUrlSegment: string = urlSegments[urlSegments.length - 1];
    let photoId: number | null;
    let editMode: boolean = false;

    if (lastUrlSegment === 'create') {
      photoId = null;
    } else {
      editMode = true;
      photoId = parseInt(lastUrlSegment);
    }

    return { photoId, editMode }
  }

  getProjectIdFromUrl(): number {
    //estrae l' id del progetto a partire dall' url
    const urlSegments: string[] = this.router.url.split('/');
    const projectUrlSegment: string | number = urlSegments[urlSegments.length - 3];
    let projectId: number | null;
    projectId = parseInt(projectUrlSegment);
    return projectId
  }

  async getNewId(): Promise<void> {
    const newId: number = await this.supabase.getNewPhotoId();
    if (newId !== 0) {
      this.photo.id = newId;
    }
  }

  async getPhoto(projectId: number): Promise<void> {
    try {
      const response = await this.supabase.getPhotoById(projectId);
      if (response.status === 200) {
        console.log(response.data[0]);
        this.photo = this.mapService.mapPhoto(response.data)[0];
        if (this.photo.takenAt) {   //formatta la data in modo compatibile con il date picker del browser
          this.photo.takenAt = new Date(this.photo.takenAt).toISOString().split('T')[0];
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.previewUrlFromPhoto = this.supabase.getImagePublicUrl(this.photo.imageUrl)
    }
  }

  onImageChange(event: any): void {
    this.imageToAdd = event.target.files[0];
    this.photoImageChanged = true;
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImageFromFiles = reader.result;
    };
    reader.readAsDataURL(this.imageToAdd);
  }

  isFormComplete(photoToAdd: any): boolean {
    const requiredFields: string[] = ['title', 'takenAt', 'order'];
    let isFormComplete: boolean = true;
    requiredFields.forEach(field => {
      if (!photoToAdd[`${field}`]) {
        isFormComplete = false;
      }
    });

    return isFormComplete;
  }

  async uploadPhotoImage(): Promise<void> {
    let imageUrl!: string;
    if (this.imageToAdd) {
      try {
        imageUrl = await this.supabase.createImage(this.imageToAdd);
        if (imageUrl) this.photo.imageUrl = imageUrl;
      } catch (error) {
        console.log(error);
      }
    }
  }

  async createNewPhoto(): Promise<void> {
    await this.supabase.createNewPhoto(this.photo, this.photo.projectId);
  }

  async deletePhotoImage(): Promise<void> {
    await this.supabase.deleteImage(this.photo.imageUrl);
  }

  async editPhoto(): Promise<void> {
    try {
      const response = await this.supabase.editPhoto(this.photo);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async submit(): Promise<void> {
    try {
      if (!this.editMode) {
        await this.uploadPhotoImage();
        await this.createNewPhoto();
      } else {
        console.log('qui');
        if (this.photoImageChanged) {
          await this.deletePhotoImage();
          await this.uploadPhotoImage();
        }
        await this.editPhoto();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.router.navigateByUrl(`/reserved/projects/${this.photo.projectId}/photos`);
    }
  }
}
