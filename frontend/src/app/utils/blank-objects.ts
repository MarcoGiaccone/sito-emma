import { Photo } from "../model/model";

export const blankPhoto: Photo = {
    id: 0,
    projectId: 0,
    title: '',
    description: '',
    imageUrl: '',
    takenAt: new Date(),
    order: 0
}
