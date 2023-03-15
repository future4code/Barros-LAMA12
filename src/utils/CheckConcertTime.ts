import { DuplicateConcert, InvalidConcertDuration, InvalidConcertTime, InvalidEndTime, InvalidStartTime } from "../error/ConcertErrors"
import { CustomError } from "../error/CustomError"
import { ICheckConcertTime } from "../model/ICheckConcertTime"
import { ConcertRepository } from "../model/Repositories/ConcertRepository"


export class CheckConcertTime implements ICheckConcertTime {
    constructor (private concertDatabase: ConcertRepository) {}

    public startTimeFormat (startTime: string): void {
        try {
            const startTimeArray = startTime.split(":")
        
            if (startTimeArray.length < 3) {
                throw new InvalidStartTime()
            }
            if (Number(startTimeArray[0]) < 8 || Number(startTimeArray[0]) > 22) {
                throw new InvalidStartTime()
            }
            if (startTimeArray[1] !== "00" || startTimeArray[2] !== "00") {
                throw new InvalidStartTime()
            }
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    public endTimeFormat (endTime: string): void {
        try {
            const endTimeArray = endTime.split(":")

            if (endTimeArray.length < 3) {
                throw new InvalidEndTime()
            }
            if (Number(endTimeArray[0]) < 9 || Number(endTimeArray[0]) > 23) {
                throw new InvalidEndTime()
            }
            if (endTimeArray[1] !== "00" || endTimeArray[2] !== "00") {
                throw new InvalidEndTime()
            }
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    public concertDuration (startTime: string, endTime: string): void {
        try {
            const startTimeArray = startTime.split(":")
            const endTimeArray = endTime.split(":")
    
            if (Number(endTimeArray[0]) < Number(startTimeArray[0])) {
                throw new InvalidConcertTime()
            }
            if (Number(endTimeArray[0]) === Number(startTimeArray[0])) {
                throw new InvalidConcertDuration()
            }
            if (Number(endTimeArray[0]) - Number(startTimeArray[0]) > 2) {
                throw new InvalidConcertDuration()
            }
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    public async duplicateConcert (weekDay: string, startTime: string, endTime: string, id: string): Promise<void> {
        try {
            const startTimeArray = startTime.split(":")
            const endTimeArray = endTime.split(":")
    
            let invalidStartTime = await this.concertDatabase.searchConcerts(weekDay, "start_time", startTime)
            if (invalidStartTime && invalidStartTime.id !== id) {
                throw new DuplicateConcert()
            }
    
            let editEndTime = Number(startTimeArray[0]) + 1
            invalidStartTime = await this.concertDatabase.searchConcerts(weekDay, "end_time", `${editEndTime}:00:00`)
            if (invalidStartTime && invalidStartTime.id !== id) {
                throw new DuplicateConcert()
            }
    
            let invalidEndTime = await this.concertDatabase.searchConcerts(weekDay, "end_time", endTime)
            if (invalidEndTime && invalidEndTime.id !== id) {
                throw new DuplicateConcert()
            }
    
            let editStartTime = Number(startTimeArray[0]) + 1
            editEndTime = Number(endTimeArray[0]) + 1
            invalidStartTime = await this.concertDatabase.searchConcerts(weekDay, "start_time", `${editStartTime}:00:00`)
            invalidEndTime = await this.concertDatabase.searchConcerts(weekDay, "end_time", `${editEndTime}:00:00`)
            if (invalidStartTime && invalidEndTime && invalidStartTime.id !== id && invalidEndTime.id !== id) {
                throw new DuplicateConcert()
            }
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}