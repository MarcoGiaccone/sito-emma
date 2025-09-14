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

  async getProjectById(projectId: number): Promise<any> {
    return this.supabase.from('projects').select('*').eq('id', `${projectId}`);
  }

}
