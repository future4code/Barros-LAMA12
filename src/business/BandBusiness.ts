import { DuplicateBandName, MissingBandName, MissingMusicGenre, MissingResponsible } from "../error/BandErrors"
import { CustomError } from "../error/CustomError"
import { MissingToken, Unauthorized } from "../error/UserErrors"
import { Band, inputCreateBandDTO } from "../model/Band"
import { BandRepository } from "../model/BandRepository"
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
            if (!input.name) {
                throw new MissingBandName()
            }
            if (!input.musicGenre) {
                throw new MissingMusicGenre()
            }
            if (!input.responsible) {
                throw new MissingResponsible()
            }
            if (!input.token) {
                throw new MissingToken()
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
}