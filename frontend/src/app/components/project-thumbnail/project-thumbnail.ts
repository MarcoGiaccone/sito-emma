import { Component, Input } from '@angular/core';
import { Project } from '../../model/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-thumbnail',
  imports: [],
  templateUrl: './project-thumbnail.html',
  styleUrl: './project-thumbnail.css'
})
export class ProjectThumbnail {

  @Input() project!: Project;

  constructor(
    private router: Router
  ) {}

  goToProject(): void {
    console.log('navigating to projects', this.project.id);
    this.router.navigateByUrl(`/projects/${this.project.id}`)
  }

}
