import { Photo } from "../Photo"


export interface PhotoRepository {
    createPhoto (newPhoto: Photo): Promise<void>
    getAllPhotos (weekDay: string): Promise<any>
    getPhotoById (id: string): Promise<any>
    deletePhoto (id: string): Promise<void>
}