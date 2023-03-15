import { Photo } from "../../src/model/Photo"
import { PhotoRepository } from "../../src/model/Repositories/PhotoRepository"
import { photos } from "./photosMock"


export class PhotoDatabaseMock implements PhotoRepository {
    async createPhoto (newPhoto: Photo): Promise<void> {}
    
    async getAllPhotos (weekDay: string): Promise<any> {
        return photos.filter(item => item.week_day === weekDay)
    }


    async getPhotoById (id: string): Promise<any> {
        const result = photos.filter(item => item.id === id)
        return result[0]
    }

    async deletePhoto (id: string): Promise<void> {}
}