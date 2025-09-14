import { Component, OnInit } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import { Supabase } from '../../services/supabase-service/supabase';
import { blankPhoto } from '../../utils/blank-objects';
import { Photo } from '../../model/model';

@Component({
  selector: 'app-projects-home',
  imports: [Navbar, Footer],
  templateUrl: './projects-home.html',
  styleUrl: './projects-home.css'
})
export class ProjectsHome implements OnInit {

  projects!: any;

  constructor(
    private supabase: Supabase
  ) {}

  ngOnInit(): void {
      
    console.log(this.supabase.client);
    this.getProjects();

  }

  async getProjects(): Promise<void> {
    this.projects = await this.supabase.getProjects();
    console.log(this.projects);
  }

  createPhoto(): void {
    const photoToPost: Photo = blankPhoto;
    photoToPost.imageUrl = 'URL IMMAGINE';
    photoToPost.title = 'TITOLO IMMAGINE';
    this.supabase.createPhoto(photoToPost);
  }
}
