import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Photo, Project } from '../../model/model';
import { FormsModule } from '@angular/forms';
import { Supabase } from '../../services/supabase-service/supabase';
import { emptyProject } from '../../utils/blank-objects';
import { ReservedPhotos } from "../reserved-photos/reserved-photos";
import { MapService } from '../../services/map-service/map-service';

@Component({
  selector: 'app-reserved-project-form',
  imports: [FormsModule],
  templateUrl: './reserved-project-form.html',
  styleUrl: './reserved-project-form.css'
})
export class ReservedProjectForm implements OnInit {

  project!: Project;
  projectId!: number | null;
  photos!: Photo[];
  imageToAdd!: File;
  coverImageChanged: boolean = false;
  previewUrlFromProject!: string;
  previewImageFromFiles!: any;
  editMode: boolean = false;
  messageOnSubmit!: string;

  constructor(
    private router: Router,
    private supabase: Supabase,
    private mapService: MapService
  ) {
    const { projectId, editMode } = this.getProjectIdAndModeFromUrl();
    this.project = structuredClone(emptyProject);
    this.projectId = projectId;
    this.editMode = editMode;
  }

  ngOnInit(): void {
    if (this.projectId) {
      this.getProject(this.projectId);  
    } else {
      this.getNewId();
    }
  }

  getProjectIdAndModeFromUrl(): { projectId: number | null, editMode: boolean } {
    const urlSegments = this.router.url.split('/');
    const lastUrlSegment: string | number = urlSegments[urlSegments.length - 1];
    let projectId: number | null;
    let editMode: boolean = false;

    if (lastUrlSegment === 'create') {
      projectId = null;
    } else {
      projectId = parseInt(lastUrlSegment);
      editMode = true;
    }

    return { projectId, editMode };
  }

  async getProject(projectId: number): Promise<void> {
    try {
      const response = await this.supabase.getProjectById(projectId);
      if (response.status === 200) {
        console.log(response.data[0]);
        this.project = this.mapService.mapProject(response.data)[0];
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.previewUrlFromProject = this.supabase.getImagePublicUrl(this.project.coverImageUrl); 
    }
  }

  async getNewId(): Promise<void> {
    const newId = await this.supabase.getNewProjectId();
    if (newId !== 0) {
      this.project.id = newId;
    }
  }

  async editProject(): Promise<void> {
    try {
      const response = await this.supabase.editProject(this.project);
      if (response.status === 201) {
        this.messageOnSubmit = 'Modifica avvenuta con successo';
      } else {
        this.messageOnSubmit = 'Modifica del progetto non riuscita :(';
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.router.navigateByUrl('/reserved/projects');
    }
  }

  async createNewProject(): Promise<void> {
    try {
      const response = await this.supabase.createNewProject(this.project);
      console.log(response);
      if (response.status === 201) {
        this.messageOnSubmit = 'Creazione progetto andata a buon fine';
      } else {
        this.messageOnSubmit = 'Creazione progetto non riuscita :(';
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.router.navigateByUrl('/reserved/projects');
    }
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

  async uploadCoverImage(): Promise<void> {
    let imageUrl!: string;
    if (this.imageToAdd) {
      try {
        imageUrl = await this.supabase.createImage(this.imageToAdd);
        if (imageUrl) this.project.coverImageUrl = imageUrl;
      } catch (error) {
        console.log(error);
      }
    }
  }

  async deleteCoverImage(imageFilepath: string): Promise<void> {
    try {
      await this.supabase.deleteImage(imageFilepath);
    } catch (error) {
      console.log(error);
    }
  }

  async submit(): Promise<void> {
    if (!this.editMode) {
      //se sono in modalità creazione:
      //chiamata al bucket per l' upload
      await this.uploadCoverImage();
      //chiamata per creare il progetto
      await this.createNewProject();
    } else {
      //se sono in modalità editing
      if (this.coverImageChanged) {
        //se l' immagine selezionata è cambiata
        //chiamata al bucket per eliminare la copertina vecchia
        await this.deleteCoverImage(this.project.coverImageUrl);
        //chiamata ul bucket per caricare quella nuova 
        await this.uploadCoverImage();
      } 
      //chiamata di update per il progetto 
      await this.editProject();
    }    
  }

  receivePhotoList(list: Photo[]): void {
    console.log('received the list', list);
  }
}
