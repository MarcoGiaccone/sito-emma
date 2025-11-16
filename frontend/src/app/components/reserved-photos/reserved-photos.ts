import { Component, OnInit } from '@angular/core';
import { Photo } from '../../model/model';
import { Supabase } from '../../services/supabase-service/supabase';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reserved-photos',
  imports: [DatePipe],
  templateUrl: './reserved-photos.html',
  styleUrl: './reserved-photos.css'
})
export class ReservedPhotos implements OnInit{

  photos!: Photo[];

  constructor(
    private supabase: Supabase
  ) {

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
    
  }

}
