import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../../environments/environment';
import { Photo, Project } from '../../model/model';

@Injectable({
  providedIn: 'root'
})
export class Supabase {

  supabase!: SupabaseClient;

  constructor() {
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

  async getProjectById(projectId: number): Promise<any> {
    return this.supabase.from('projects').select('*').eq('id', `${projectId}`);
  }

  async getPhotosByProjectId(projectId: number): Promise<any> {
    return this.supabase.from('photos').select('*').eq('project_id', `${projectId}`)
  }

  async createNewProject(project: Project): Promise<any> {
    return this.supabase
      .from('projects')
      .insert([
        {
          id: 999999,
          title: project.title,
          description: project.description,
          user_id: 10,
          cover_image_url: 'https://picsum.photos/500/701',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          place: 'Butty'
        }
      ])
      .select();
  }

  async deleteProject(projectId: number): Promise<any> {
    return this.supabase  
      .from('projects')
      .delete()
      .eq('id', 'someValue')
  }
}
