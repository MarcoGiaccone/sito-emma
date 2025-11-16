import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Storage {

  supabase!: SupabaseClient;

  constructor() {
    const supabaseUrl: string = environment.supabaseUrl;
    const supabaseKey = environment.supabaseKey;
    this.supabase = createClient(supabaseUrl, supabaseKey);

    console.log(this.supabase);
  }



  // async uploadImage(file: File): Promise<string> {
  //   const filePath = `${Date.now()}_${file.name}`;

  //   const { data, error } = await this.supabase.storage
  //     .from('project-covers')     // <-- nome del bucket
  //     .upload(filePath, file);

  //   if (error) throw error;

  //   return filePath; // poi servirà per ottenere la URL
  // }

  
}
