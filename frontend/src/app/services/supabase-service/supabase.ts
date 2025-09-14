import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../../environments/environment';
import { Photo, Project } from '../../model/model';

@Injectable({
  providedIn: 'root'
})
export class Supabase {

  supabase!: SupabaseClient;

  constructor(

  ) {
    const supabaseUrl = environment.supabaseUrl;
    const supabaseKey = environment.supabaseKey;
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  get client(): SupabaseClient {
    return this.supabase;
  }

  async getProjects(): Promise<any> {
    return this.supabase.from('projects').select('*');
  }

  async createPhoto(photo: Photo): Promise<any> {
    console.log("creating a photo", photo);
    const { data, error } = await this.supabase.from('photos')
      .insert([
      {
        id: Math.ceil(Math.random() * 100000 + 1),
        project_id: 1,
        title: photo.title,
        description: photo.description,
        image_url: photo.imageUrl,
        taken_at: photo.takenAt,
        order: photo.order,
        created_at: new Date(),
        updated_at: new Date()
      }
      ])
      .select()

      if (error) {
        console.log('Error creating photo: ', error);
        throw error;
      }

    return data;
  }

  async createProject(project: Project): Promise<any> {
    const { data, error } = await this.supabase.from('projects')
      .insert([
        {
          id: project.id ?? Math.ceil(Math.random() * 100000 + 1), // opzionale se vuoi auto-generate
          user_id: project.userId,
          title: project.title,
          description: project.description ?? null,
          cover_image_url: project.coverImageUrl,
          created_at: new Date(),
          updated_at: new Date()
        }
      ])
      .select();

    if (error) {
      console.error('Error creating project:', error);
      throw error;
    }

    return data;
  }

}
