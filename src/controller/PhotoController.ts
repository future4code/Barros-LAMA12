import { Request, Response } from "express"
import { PhotoBusiness } from "../business/PhotoBusiness"
import { inputCreatePhotoDTO, inputGetAllPhotosDTO } from "../model/Photo"


export class PhotoController {
    constructor (private photoBusiness: PhotoBusiness) {}

    async createPhoto (req: Request, res: Response): Promise<void> {
        try {
            const input: inputCreatePhotoDTO = {
                photoUrl: req.body.photoUrl,
                weekDay: req.body.weekDay,
                token: req.headers.authorization as string
            }

            await this.photoBusiness.createPhoto(input)
            res.status(201).send("Photo posted successfully!")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }
    
    
    async getAllPhotos (req: Request, res: Response): Promise<void> {
        try {
            const input: inputGetAllPhotosDTO = {
                weekDay: req.query.weekDay as string,
                token: req.headers.authorization as string
            }

            const result = await this.photoBusiness.getAllPhotos(input)
            res.status(200).send(result)

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }
}