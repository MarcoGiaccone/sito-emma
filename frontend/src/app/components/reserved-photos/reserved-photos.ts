import { Component, OnInit } from '@angular/core';
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
  projectId!: number;

  constructor(
    private supabase: Supabase,
    private router: Router
  ) { }  

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
    this.router.navigateByUrl(`reserved/projects/7/photos/create`);
  }

  generatePhotoId(): number {
    const id = new Date().getTime();
    return id;
  }
}
