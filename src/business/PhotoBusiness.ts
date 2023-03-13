import { InvalidWeekDay, MissingWeekDay } from "../error/ConcertErrors"
import { CustomError } from "../error/CustomError"
import { MissingPhotoUrl } from "../error/PhotoErrors"
import { MissingToken, Unauthorized } from "../error/UserErrors"
import { IAuthenticator } from "../model/IAuthenticator"
import { IIdGenerator } from "../model/IIdGenerator"
import { inputCreatePhotoDTO, Photo } from "../model/Photo"
import { PhotoRepository } from "../model/Repositories/PhotoRepository"
import { USER_ROLES } from "../model/User"

export class PhotoBusiness {
    constructor (
        private photoDatabase: PhotoRepository,
        private authorization: IAuthenticator,
        private idGenerator: IIdGenerator
    ) {}

    async createPhoto (input: inputCreatePhotoDTO): Promise<void> {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            if (!input.photoUrl) {
                throw new MissingPhotoUrl()
            }
            if (!input.weekDay) {
                throw new MissingWeekDay()
            }
            if (input.weekDay.toLowerCase() !== "friday" && input.weekDay.toLowerCase() !== "saturday" && input.weekDay.toLowerCase() !== "sunday") {
                throw new InvalidWeekDay()
            }

            const {id, role} = await this.authorization.getTokenData(input.token)
            if (role.toUpperCase() !== USER_ROLES.ADMIN) {
                throw new Unauthorized()
            }
        
            const photoId = this.idGenerator.generateId()
            const newPhoto = new Photo(photoId, input.photoUrl, input.weekDay, new Date())
            
            await this.photoDatabase.createPhoto(newPhoto)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}