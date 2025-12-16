import { Component, OnInit } from '@angular/core';
import { Project } from '../../model/model';
import { Supabase } from '../../services/supabase-service/supabase';
import { MapService } from '../../services/map-service/map-service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reserved-projects',
  imports: [DatePipe],
  templateUrl: './reserved-projects.html',
  styleUrl: './reserved-projects.css'
})
export class ReservedProjects implements OnInit {

  projects!: Project[];
  deleteProjectMessage!: string;

  constructor(
    private supabase: Supabase,
    private mapService: MapService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  async getProjects(): Promise<void> {
    try {
      const response = await this.supabase.getProjects();
      if (response.status === 200) {
        this.projects = this.mapService.mapProject(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  editProject(project: Project): void {
    this.router.navigateByUrl(`/reserved/projects/${project.id}`);
  }

  createNewProject(): void {
    this.router.navigateByUrl('/reserved/projects/create');
  }

  managePhotos(project: Project): void {
    this.router.navigateByUrl(`/reserved/projects/${project.id}/photos`);
  }

  async deleteProject(project: Project): Promise<void> {
    //delete the project
    try {
      const response = await this.supabase.deleteProject(project.id);
      if (response.status === 200){
        this.deleteProjectMessage = 'Eliminazione avvenuta con successo!'
      } else {
        this.deleteProjectMessage = 'Eliminazione non riuscita :('
      }
      //cancella le immagini dal progetto
      await this.supabase.deleteProjectImages(project.id);      
      // cancella la cover del progetto
      await this.supabase.deleteImage(project.coverImageUrl);
      //cancella le foto del progetto
      await this.supabase.deleteProjectPhotos(project.id);   
    } catch (error) {
      console.log(error);
    } finally {
      this.getProjects();
    } 
  }
}
