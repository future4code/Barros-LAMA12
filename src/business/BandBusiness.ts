import { BandIdNotFound, BandNameNotFound, DuplicateBandName, InvalidBandInfo, MissingBandName, MissingMusicGenre, MissingNameOrId, MissingResponsible } from "../error/BandErrors"
import { CustomError } from "../error/CustomError"
import { MissingToken, Unauthorized } from "../error/UserErrors"
import { Band, inputCreateBandDTO, inputGetBandInfoDTO } from "../model/Band"
import { BandRepository } from "../model/Repositories/BandRepository"
import { IAuthenticator } from "../model/IAuthenticator"
import { IIdGenerator } from "../model/IIdGenerator"
import { USER_ROLES } from "../model/User"


export class BandBusiness {
    constructor (
        private bandDatabase: BandRepository,
        private authorization: IAuthenticator,
        private idGenerator: IIdGenerator
    ) {}

    async createBand (input: inputCreateBandDTO): Promise<void> {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            if (!input.name) {
                throw new MissingBandName()
            }
            if (!input.musicGenre) {
                throw new MissingMusicGenre()
            }
            if (!input.responsible) {
                throw new MissingResponsible()
            }

            const duplicateName = await this.bandDatabase.getBandBy("name", input.name)
            if (duplicateName) {
                throw new DuplicateBandName()
            }

            const {id, role} = this.authorization.getTokenData(input.token)
            if (role.toUpperCase() !== USER_ROLES.ADMIN) {
                throw new Unauthorized()
            }

            const bandId = this.idGenerator.generateId()
            const newBand = new Band(bandId, input.name, input.musicGenre, input.responsible)
            
            await this.bandDatabase.createBand(newBand)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getBandInfo (input: inputGetBandInfoDTO): Promise<Band> {
        try {
            if (!input.id && !input.name) {
                throw new MissingNameOrId()
            }

            if (input.id && input.name) {
                throw new InvalidBandInfo()
            }
        
            let result
            if (input.id) {
                const idExists = await this.bandDatabase.getBandBy("id", input.id)
                if (!idExists) {
                    throw new BandIdNotFound()
                }
                result = idExists
            }

            if (input.name) {
                input.name = input.name.replace("_", " ")
                
                const nameExists = await this.bandDatabase.getBandBy("name", input.name)
                if (!nameExists) {
                    throw new BandNameNotFound()
                }
                
                result = nameExists
            }

            return result

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getAllBands (): Promise<Band[]> {
        try {
            const result = await this.bandDatabase.getAllBands()
            return result
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}