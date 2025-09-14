import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supabase } from '../../services/supabase-service/supabase';

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.html',
  styleUrl: './project.css'
})
export class Project implements OnInit{

  projectId!: number;
  project!: Project;
  constructor(
    private router: Router,
    private supabase: Supabase
  ) {}

  ngOnInit(): void {
    this.getProjectIdFromUrl();
    this.getProject();
  }
  
  getProjectIdFromUrl(): void {
    const urlSegments = this.router.url.split('/');
    const lastUrlSegment = urlSegments[urlSegments.length - 1];
    this.projectId = parseInt(lastUrlSegment);
  }
  
  async getProject(): Promise<void> {
    try {
      const response = await this.supabase.getProjectById(this.projectId);
      this.project = response.data;      
    } catch (error) {
      console.log(error);
    }
  }
}
