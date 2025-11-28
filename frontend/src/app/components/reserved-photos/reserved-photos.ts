import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from '../../model/model';
import { Supabase } from '../../services/supabase-service/supabase';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { blankPhoto } from '../../utils/blank-objects';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserved-photos',
  imports: [DatePipe, FormsModule],
  templateUrl: './reserved-photos.html',
  styleUrl: './reserved-photos.css'
})
export class ReservedPhotos implements OnInit{

  photos: Photo[] = [];
  photoToAdd!: Photo;
  imageToAdd!: Blob;
  projectId!: number;
  coverImageChanged: boolean = false;
  previewUrlFromProject!: string;
  previewImageFromFiles!: any;

  isPhotoModalOpen: boolean = false;

  constructor(
    private supabase: Supabase,
    private router: Router
  ) {
    this.photoToAdd = blankPhoto;
  }  

  ngOnInit(): void {
    this.projectId = this.getProjectIdFromUrl();
    this.getProjectPhotos(this.projectId);
  }

  getProjectIdFromUrl(): number {
    //estrae l' id del progetto a partire dall' url
    const urlSegments: string[] = this.router.url.split('/');
    const lastUrlSegment: string | number = urlSegments[urlSegments.length - 2];
    let projectId: number | null;
    projectId = parseInt(lastUrlSegment);
    return projectId
  }

  async getProjectPhotos(projectId: number): Promise<void> {
    try {
      const response = await this.supabase.getPhotosByProjectId(projectId);
      this.photos = response.data;
    } catch (error) {
      console.log(error);
    }
  }

  editPhoto(photo: Photo): void {

  }

  deletePhoto(): void {

  }

  addNewPhoto(): void {
    this.photoToAdd = structuredClone(blankPhoto);
    this.isPhotoModalOpen = true;
  }

  closeAddPhotoForm(): void {
    this.isPhotoModalOpen = false;
  }

  onImageChange(event: any): void {
    this.imageToAdd = event.target.files[0];
    this.coverImageChanged = true;
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImageFromFiles = reader.result;
    };
    reader.readAsDataURL(this.imageToAdd);
  }

  addPhotoToList(): void {
    //viene generato l' id della foto da aggiungere alla lista
    this.photoToAdd.id = this.generatePhotoId();
    this.photos.push(this.photoToAdd);
    this.isPhotoModalOpen = false;
  }

  generatePhotoId(): number {
    const id = new Date().getTime();
    return id;
  }

  logFoto(): void {
    console.log(this.photoToAdd);
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
}
