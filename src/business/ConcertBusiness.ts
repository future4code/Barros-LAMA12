import { BandIdNotFound, MissingBandId } from "../error/BandErrors"
import { ConcertIdNotFound, DuplicateConcert, InvalidConcertDuration, InvalidConcertTime, InvalidEndTime, InvalidStartTime, InvalidWeekDay, MissingConcertId, MissingEndTime, MissingStartTime, MissingWeekDay, NoConcertsRegistered } from "../error/ConcertErrors"
import { CustomError } from "../error/CustomError"
import { MissingToken, Unauthorized } from "../error/UserErrors"
import { BandRepository } from "../model/Repositories/BandRepository"
import { Concert, inputCreateConcertDTO, inputGetAllConcertsDTO, inputUpdateConcertDTO, outputGetAllConcertsDTO, updateConcertDatabaseDTO } from "../model/Concert"
import { ConcertRepository } from "../model/Repositories/ConcertRepository"
import { IAuthenticator } from "../model/IAuthenticator"
import { IIdGenerator } from "../model/IIdGenerator"
import { USER_ROLES } from "../model/User"


export class ConcertBusiness {
    constructor (
        private concertDatabase: ConcertRepository,
        private bandDatabase: BandRepository,
        private authorization: IAuthenticator,
        private idGenerator: IIdGenerator
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

            const startTimeArray = input.startTime.split(":")
            if (startTimeArray.length < 3) {
                throw new InvalidStartTime()
            }
            if (Number(startTimeArray[0]) < 8 || Number(startTimeArray[0]) > 22) {
                throw new InvalidStartTime()
            }
            if (startTimeArray[1] !== "00" || startTimeArray[2] !== "00") {
                throw new InvalidStartTime()
            }

            const endTimeArray = input.endTime.split(":")
            if (endTimeArray.length < 3) {
                throw new InvalidEndTime()
            }
            if (Number(endTimeArray[0]) < 9 || Number(startTimeArray[0]) > 23) {
                throw new InvalidEndTime()
            }
            if (endTimeArray[1] !== "00" || endTimeArray[2] !== "00") {
                throw new InvalidEndTime()
            }

            if (Number(endTimeArray[0]) < Number(startTimeArray[0])) {
                throw new InvalidConcertTime()
            }

            if (Number(endTimeArray[0]) === Number(startTimeArray[0])) {
                throw new InvalidConcertDuration()
            }

            let invalidStartTime = await this.concertDatabase.searchConcerts(input.weekDay, "start_time", input.startTime)
            if (invalidStartTime) {
                throw new DuplicateConcert()
            }

            let editEndTime = Number(startTimeArray[0]) + 1
            invalidStartTime = await this.concertDatabase.searchConcerts(input.weekDay, "end_time", `${editEndTime}:00:00`)
            if (invalidStartTime) {
                throw new DuplicateConcert()
            }

            editEndTime = Number(endTimeArray[0]) + 1
            invalidStartTime = await this.concertDatabase.searchConcerts(input.weekDay, "end_time", `${editEndTime}:00:00`)
            if (invalidStartTime) {
                throw new DuplicateConcert()
            }

            const concertId = this.idGenerator.generateId()
            const newConcert = new Concert(concertId, input.weekDay, input.startTime, input.endTime, input.bandId)
            await this.concertDatabase.createConcert(newConcert)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getAllConcerts (input: inputGetAllConcertsDTO): Promise<outputGetAllConcertsDTO[]> {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            if (!input.weekDay) {
                throw new MissingWeekDay()
            }
            if (input.weekDay.toLowerCase() !== "friday" && input.weekDay.toLowerCase() !== "saturday" && input.weekDay.toLowerCase() !== "sunday") {
                throw new InvalidWeekDay()
            }
           
            await this.authorization.getTokenData(input.token)

            const result = await this.concertDatabase.getAllConcerts(input.weekDay)
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

            const startTimeArray = input.startTime.split(":")
            if (startTimeArray.length < 3) {
                throw new InvalidStartTime()
            }
            if (Number(startTimeArray[0]) < 8 || Number(startTimeArray[0]) > 22) {
                throw new InvalidStartTime()
            }
            if (startTimeArray[1] !== "00" || startTimeArray[2] !== "00") {
                throw new InvalidStartTime()
            }

            const endTimeArray = input.endTime.split(":")
            if (endTimeArray.length < 3) {
                throw new InvalidEndTime()
            }
            if (Number(endTimeArray[0]) < 9 || Number(startTimeArray[0]) > 23) {
                throw new InvalidEndTime()
            }
            if (endTimeArray[1] !== "00" || endTimeArray[2] !== "00") {
                throw new InvalidEndTime()
            }

            if (Number(endTimeArray[0]) < Number(startTimeArray[0])) {
                throw new InvalidConcertTime()
            }

            if (Number(endTimeArray[0]) === Number(startTimeArray[0])) {
                throw new InvalidConcertDuration()
            }

            let invalidStartTime = await this.concertDatabase.searchConcerts(input.weekDay, "start_time", input.startTime)
            if (invalidStartTime && invalidStartTime.id !== input.id) {
                throw new DuplicateConcert()
            }

            let editEndTime = Number(startTimeArray[0]) + 1
            invalidStartTime = await this.concertDatabase.searchConcerts(input.weekDay, "end_time", `${editEndTime}:00:00`)
            if (invalidStartTime && invalidStartTime.id !== input.id) {
                throw new DuplicateConcert()
            }

            editEndTime = Number(endTimeArray[0]) + 1
            invalidStartTime = await this.concertDatabase.searchConcerts(input.weekDay, "end_time", `${editEndTime}:00:00`)
            if (invalidStartTime && invalidStartTime.id !== input.id) {
                throw new DuplicateConcert()
            }

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