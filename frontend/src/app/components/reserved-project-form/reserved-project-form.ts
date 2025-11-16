import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Photo, Project } from '../../model/model';
import { FormsModule } from '@angular/forms';
import { Supabase } from '../../services/supabase-service/supabase';

@Component({
  selector: 'app-reserved-project-form',
  imports: [FormsModule],
  templateUrl: './reserved-project-form.html',
  styleUrl: './reserved-project-form.css'
})
export class ReservedProjectForm implements OnInit {

  project!: Project;
  photos!: Photo[];

  constructor(
    private router: Router,
    private supabase: Supabase
  ) {
    const stateFromNavigation = this.router.getCurrentNavigation();
    if (stateFromNavigation?.extras?.state?.['project']) {
      this.project = stateFromNavigation?.extras?.state?.['project'];
    }
  }


  ngOnInit(): void {
      this.getProjectPhotos(this.project.id);
      console.log(this.photos);
  }

  logProgetto(): void {
    console.log(this.project);
  }

  async getProjectPhotos(projectId: number): Promise<void> {
    try {
      this.photos = await this.supabase.getPhotosByProjectId(projectId);
    } catch (error) {
      console.log(error);
    }
  }

}
