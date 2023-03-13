import { Photo } from "../Photo"


export interface PhotoRepository {
    createPhoto (newPhoto: Photo): Promise<void>
}