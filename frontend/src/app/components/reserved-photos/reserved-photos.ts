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
  imageToAdd!: string;
  @Input() projectId!: number | null;

  isPhotoModalOpen: boolean = false;

  constructor(
    private supabase: Supabase
  ) {
    this.photoToAdd = blankPhoto;
  }  

  ngOnInit(): void {
      console.log('hello dalla lista delle foto');
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
    this.isPhotoModalOpen = true;
  }

}
