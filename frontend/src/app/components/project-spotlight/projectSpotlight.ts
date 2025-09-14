import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supabase } from '../../services/supabase-service/supabase';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import { Project } from '../../model/model';

@Component({
  selector: 'app-project',
  imports: [Navbar, Footer],
  templateUrl: './projectSpotlight.html',
  styleUrl: './projectSpotlight.css'
})
export class ProjectSpotlight implements OnInit{

  projectId!: number;
  project!: Project;
  constructor(
    private router: Router,
    private supabase: Supabase
  ) {}

  ngOnInit(): void {
    this.getProjectIdFromUrl();
    this.getProject();
    console.log(this.project);
  }
  
  getProjectIdFromUrl(): void {
    const urlSegments = this.router.url.split('/');
    const lastUrlSegment = urlSegments[urlSegments.length - 1];
    this.projectId = parseInt(lastUrlSegment);
  }
  
  async getProject(): Promise<void> {
    try {
      const response = await this.supabase.getProjectById(this.projectId);
      console.log(response);
      this.project = response.data[0];      
    } catch (error) {
      console.log(error);
    }
  }
}
