import { Component, OnInit } from '@angular/core';
import { blankPhoto } from '../../utils/blank-objects';
import { Photo } from '../../model/model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserved-photo-form',
  imports: [FormsModule],
  templateUrl: './reserved-photo-form.html',
  styleUrl: './reserved-photo-form.css',
})
export class ReservedPhotoForm implements OnInit {

  photoToAdd: Photo = structuredClone(blankPhoto);
  imageToAdd!: Blob;
  projectId!: number;
  photoId!: number | null;
  editMode: boolean = false;
  coverImageChanged: boolean = false;
  previewUrlFromProject!: string;
  previewImageFromFiles!: any;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
      this.projectId = this.getProjectIdFromUrl();
      console.log(this.projectId);
      const { photoId , editMode } = this.getPhotoIdAndModeFromUrl();
      this.photoId = photoId;
      this.editMode = editMode;

      console.log(this.photoId, this.editMode);
  }

  getProjectIdFromUrl(): number {
    //estrae l' id del progetto a partire dall' url
    const urlSegments: string[] = this.router.url.split('/');
    const projectUrlSegment: string | number = urlSegments[urlSegments.length - 3];
    let projectId: number | null;
    projectId = parseInt(projectUrlSegment);
    return projectId
  }

  getPhotoIdAndModeFromUrl(): {
    photoId: number | null,
    editMode: boolean
  } {
    const urlSegments: string[] = this.router.url.split('/');
    const lastUrlSegment: string = urlSegments[urlSegments.length - 1];
    let photoId: number | null;
    let editMode: boolean = false;

    if (lastUrlSegment === 'create') {
      photoId = null;
    } else {
      this.editMode = true;
      photoId = parseInt(lastUrlSegment);
    }

    return { photoId, editMode }
  }

  onImageChange(event: any): void {
    this.imageToAdd = event.target.files[0];
    this.coverImageChanged = true;
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImageFromFiles = reader.result;
    };
    reader.readAsDataURL(this.imageToAdd);
  }

  isFormComplete(photoToAdd: any): boolean {
    const requiredFields: string[] = ['title', 'takenAt', 'order'];
    let isFormComplete: boolean = true;
    requiredFields.forEach(field => {
      if (!photoToAdd[`${field}`]) {
        isFormComplete = false;
      }
    });

    return isFormComplete;
  }

  async submit(): Promise<void> {
    console.log('submitting data content');
  }
}
