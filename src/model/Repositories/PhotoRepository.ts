import { Photo } from "../Photo"


export interface PhotoRepository {
    createPhoto (newPhoto: Photo): Promise<void>
    getAllPhotos (weekDay: string): Promise<any>
}