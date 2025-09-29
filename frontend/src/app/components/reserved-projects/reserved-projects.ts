import { Component, OnInit } from '@angular/core';
import { Project } from '../../model/model';
import { Supabase } from '../../services/supabase-service/supabase';
import { MapService } from '../../services/map-service/map-service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-reserved-projects',
  imports: [DatePipe],
  templateUrl: './reserved-projects.html',
  styleUrl: './reserved-projects.css'
})
export class ReservedProjects implements OnInit {

  projects!: Project[];

  constructor(
    private supabase: Supabase,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  async getProjects(): Promise<void> {
    try {
      const response = await this.supabase.getProjects();
      if (response.status === 200) {
        this.projects = this.mapService.mapProject(response.data);
        console.log(this.projects);
      }
    } catch (error) {
      console.log(error);
    }
  }

  editProject(): void {
    console.log('editing a project');
  }

  deleteProject(): void {
    console.log('delting a project');
  }
}
