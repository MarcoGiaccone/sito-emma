import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Photo, Project } from '../../model/model';
import { FormsModule } from '@angular/forms';
import { Supabase } from '../../services/supabase-service/supabase';
import { empty } from 'rxjs';
import { emptyProject } from '../../utils/blank-objects';

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
  editMode: boolean = false;

  constructor(
    private router: Router,
    private supabase: Supabase
  ) {
    const { projectId, editMode }: { projectId: number | null, editMode: boolean } = this.getProjectIdAndModeFromUrl();
    this.project = emptyProject;
    this.projectId = projectId;
    this.editMode = editMode;
  }

  ngOnInit(): void {
    if (this.projectId) {
      this.getProject(this.projectId);
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

  logProgetto(): void {
    console.log(this.project);
  }

  async getProject(projectId: number): Promise<void> {
    try {
      const response = await this.supabase.getProjectById(projectId);
      if (response.status === 200) {
        this.project = response.data[0];
      }
    } catch (error) {
      console.log(error);
    }
  }

}
