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
    return this.supabase.from('projects').select('*', { count: 'exact' }).eq('deleted', false);
  }

  async getNewId(): Promise<number> {
    let newId: number = 0;
    try {
      const response = await this.supabase.from('projects').select('*', { count: 'exact' })
      if (response.status === 200 && response.count) {
        newId = response.count + 1;
      } 
    } catch (error) {
      console.log(error);
    }

    return newId;
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
          id: project.id,
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
      .update({ deleted: true })
      .eq('id', `${projectId}`)
      .select()
      
  }
}
