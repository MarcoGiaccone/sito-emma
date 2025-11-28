import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../../model/model';
import { Supabase } from '../../services/supabase-service/supabase';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { blankPhoto } from '../../utils/blank-objects';

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
  coverImageChanged: boolean = false;
  previewUrlFromProject!: string;
  previewImageFromFiles!: any;
  @Input() projectId!: number | null;

  isPhotoModalOpen: boolean = false;

  constructor(
    private supabase: Supabase
  ) {
    this.photoToAdd = blankPhoto;
  }  

  ngOnInit(): void {
    // assegna alla foto l' id del progetto presa in input
    if (this.projectId) {
      this.photoToAdd.projectId = this.projectId
    }
  }

  async getProjectPhotos(projectId: number): Promise<void> {
    try {
      this.photos = await this.supabase.getPhotosByProjectId(projectId);
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
