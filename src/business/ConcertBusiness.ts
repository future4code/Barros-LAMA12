import { BandIdNotFound, MissingBandId } from "../error/BandErrors"
import { ConcertIdNotFound, InvalidWeekDay, MissingConcertId, MissingEndTime, MissingStartTime, MissingWeekDay, NoConcertsRegistered } from "../error/ConcertErrors"
import { CustomError } from "../error/CustomError"
import { MissingToken, Unauthorized } from "../error/UserErrors"
import { BandRepository } from "../model/Repositories/BandRepository"
import { Concert, inputCreateConcertDTO, inputUpdateConcertDTO, outputGetAllConcertsDTO, updateConcertDatabaseDTO } from "../model/Concert"
import { ConcertRepository } from "../model/Repositories/ConcertRepository"
import { IAuthenticator } from "../model/IAuthenticator"
import { IIdGenerator } from "../model/IIdGenerator"
import { USER_ROLES } from "../model/User"
import { ICheckConcertTime } from "../model/ICheckConcertTime"


export class ConcertBusiness {
    constructor (
        private concertDatabase: ConcertRepository,
        private bandDatabase: BandRepository,
        private authorization: IAuthenticator,
        private idGenerator: IIdGenerator,
        private checkConcertTime: ICheckConcertTime
    ) {}

    async createConcert (input: inputCreateConcertDTO): Promise<void> {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            if (!input.bandId) {
                throw new MissingBandId()
            }
            if (!input.weekDay) {
                throw new MissingWeekDay()
            }
            if (!input.startTime) {
                throw new MissingStartTime()
            }
            if (!input.endTime) {
                throw new MissingEndTime()
            }
            if (input.weekDay.toLowerCase() !== "friday" && input.weekDay.toLowerCase() !== "saturday" && input.weekDay.toLowerCase() !== "sunday") {
                throw new InvalidWeekDay()
            }

            const {id, role} = await this.authorization.getTokenData(input.token)
            if (role.toUpperCase() !== USER_ROLES.ADMIN) {
                throw new Unauthorized()
            }

            const bandIdExists = await this.bandDatabase.getBandBy("id", input.bandId)
            if (!bandIdExists) {
                throw new BandIdNotFound()
            }

            await this.checkConcertTime.startTimeFormat(input.startTime)
            await this.checkConcertTime.endTimeFormat(input.endTime)
            await this.checkConcertTime.concertDuration(input.startTime, input.endTime)
            await this.checkConcertTime.duplicateConcert(input.weekDay, input.startTime, input.endTime, "id")

            const concertId = this.idGenerator.generateId()
            const newConcert = new Concert(concertId, input.weekDay, input.startTime, input.endTime, input.bandId)
            await this.concertDatabase.createConcert(newConcert)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getAllConcerts (weekDay: string): Promise<outputGetAllConcertsDTO[]> {
        try {
            if (weekDay && weekDay.toLowerCase() !== "friday" && weekDay.toLowerCase() !== "saturday" && weekDay.toLowerCase() !== "sunday") {
                throw new InvalidWeekDay()
            }

            const result = await this.concertDatabase.getAllConcerts(weekDay)
            if (result.length === 0) {
                throw new NoConcertsRegistered()
            }

            return result

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async updateConcert (input: inputUpdateConcertDTO): Promise<void> {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            if (input.id === ":id") {
                throw new MissingConcertId()
            }
            if (input.weekDay && input.weekDay.toLowerCase() !== "friday" && input.weekDay.toLowerCase() !== "saturday" && input.weekDay.toLowerCase() !== "sunday") {
                throw new InvalidWeekDay()
            }
            
            const {id, role} = await this.authorization.getTokenData(input.token)
            if (role.toUpperCase() !== USER_ROLES.ADMIN) {
                throw new Unauthorized()
            }

            const getConcert = await this.concertDatabase.getConcertById(input.id)
            if (!getConcert) {
                throw new ConcertIdNotFound()
            }

            if (!input.weekDay) {
                input.weekDay = getConcert.week_day
            }
            if (!input.startTime) {
                input.startTime = getConcert.start_time
            }
            if (!input.endTime) {
                input.endTime = getConcert.end_time
            }

            await this.checkConcertTime.startTimeFormat(input.startTime)
            await this.checkConcertTime.endTimeFormat(input.endTime)
            await this.checkConcertTime.concertDuration(input.startTime, input.endTime)
            await this.checkConcertTime.duplicateConcert(input.weekDay, input.startTime, input.endTime, input.id)
            
            const newInfo: updateConcertDatabaseDTO = {
                id: input.id,
                weekDay: input.weekDay,
                startTime: input.startTime,
                endTime: input.endTime
            }

            await this.concertDatabase.updateConcert(newInfo)
            
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}