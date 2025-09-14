import { Category, Photo, Project } from "../model/model";

export const blankPhoto: Photo = {
    id: 0,
    projectId: 0,
    title: '',
    description: '',
    imageUrl: '',
    takenAt: new Date(),
    order: 0
};

export const emptyProject: Project = {
    id: 0,
    userId: 0,
    title: '',
    description: '',
    coverImageUrl: '',
    createdAt: new Date(0), // data minima come placeholder
    updatedAt: new Date(0),
    photos: [] as Photo[],
    categories: [] as Category[]
};


