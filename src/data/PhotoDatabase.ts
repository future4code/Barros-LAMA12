import { CustomError } from "../error/CustomError"
import { Photo } from "../model/Photo"
import { PhotoRepository } from "../model/Repositories/PhotoRepository"
import { BaseDatabase } from "./BaseDatabase"


export class PhotoDatabase extends BaseDatabase implements PhotoRepository {
    private TABLE_NAME = "LAMA_PHOTOS"
    
    async createPhoto (newPhoto: Photo): Promise<void> {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).insert(newPhoto)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }    
}