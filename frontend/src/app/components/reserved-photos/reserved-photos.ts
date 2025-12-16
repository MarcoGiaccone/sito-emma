import { Component, OnInit } from '@angular/core';
import { Photo } from '../../model/model';
import { Supabase } from '../../services/supabase-service/supabase';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MapService } from '../../services/map-service/map-service';
import { GoToProjects } from "../buttons/go-to-projects/go-to-projects";

@Component({
  selector: 'app-reserved-photos',
  imports: [DatePipe, FormsModule, GoToProjects],
  templateUrl: './reserved-photos.html',
  styleUrl: './reserved-photos.css'
})
export class ReservedPhotos implements OnInit{

  photos: Photo[] = [];
  projectId!: number;

  constructor(
    private supabase: Supabase,
    private router: Router,
    private mapService: MapService
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
      this.photos = this.mapService.mapPhoto(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  editPhoto(photo: Photo): void {
    this.router.navigateByUrl(`/reserved/projects/${this.projectId}/photos/${photo.id}`)
  }

  async deletePhoto(photo: Photo): Promise<void> {
    //cancellazione logica dei metadati
    try {
      await this.supabase.deletePhoto(photo.id);
    } catch (error) {
      console.log(error);
    } finally {
      this.getProjectPhotos(this.projectId);
    }
    //cancellazione dell' immagine dallo storage
    await this.supabase.deleteImage(photo.imageUrl);
  }

  addNewPhoto(): void {
    this.router.navigateByUrl(`reserved/projects/${this.projectId}/photos/create`);
  }

  generatePhotoId(): number {
    const id = new Date().getTime();
    return id;
  }
}
