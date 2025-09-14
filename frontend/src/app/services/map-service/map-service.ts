import { Injectable } from '@angular/core';
import { Category, Photo, Project } from '../../model/model';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  mapProject(apiData: any): Project[] {
    const mappedProjects: Project[] = apiData.map((project: any) => {
      return {
        id: project.id,
        userId: project.user_id, // il tuo modello vuole string
        title: project.title,
        description: project.description,
        coverImageUrl: project.cover_image_url,
        createdAt: new Date(project.created_at),
        updatedAt: new Date(project.updated_at),
        photos: [], // da popolare se ci sono relazioni
        categories: [], // opzionale
      };
    })
    return mappedProjects;
  }

  mapPhoto(apiData: any): Photo {
    return {
      id: apiData.id,
      projectId: apiData.project_id,
      title: apiData.title,
      description: apiData.description,
      imageUrl: apiData.image_url,
      takenAt: apiData.taken_at ? new Date(apiData.taken_at) : undefined,
      order: apiData.order,
    };
  }

  mapCategory(apiData: any): Category {
    return {
      id: apiData.id,
      name: apiData.name,
      description: apiData.description,
    };
  }


  
}
