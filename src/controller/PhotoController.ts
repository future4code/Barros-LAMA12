import { Request, Response } from "express"
import { PhotoBusiness } from "../business/PhotoBusiness"
import { inputCreatePhotoDTO, inputDeletePhotoDTO } from "../model/Photo"


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
            const weekDay = req.query.weekDay as string
            const result = await this.photoBusiness.getAllPhotos(weekDay)
            res.status(200).send(result)

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


    async deletePhoto (req: Request, res: Response): Promise<void> {
        try {
            const input: inputDeletePhotoDTO = {
                photoId: req.params.photoId,
                token: req.headers.authorization as string
            }

            await this.photoBusiness.deletePhoto(input)
            res.status(201).send("Photo deleted successfully!")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }
}