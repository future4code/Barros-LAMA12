import { CustomError } from "../error/CustomError"
import { Concert, outputGetAllConcertsDTO, updateConcertDatabaseDTO } from "../model/Concert"
import { ConcertRepository } from "../model/Repositories/ConcertRepository"
import { BaseDatabase } from "./BaseDatabase"


export class ConcertDatabase extends BaseDatabase implements ConcertRepository {
    private TABLE_NAME = "LAMA_CONCERTS"
    
    async createConcert (newConcert: Concert): Promise<void> {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).insert(newConcert)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async searchConcerts (weekDay: string, column: string, value: string): Promise<any> {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME)
            .select()
            .where("week_day", weekDay)
            .andWhere(column, value)

            return result[0]
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getAllConcerts (weekDay: string): Promise<outputGetAllConcertsDTO[]> {
        try {
            if (weekDay) {
                return await BaseDatabase.connection(this.TABLE_NAME)
                .join("LAMA_BANDS", "LAMA_CONCERTS.band_id", "=", "LAMA_BANDS.id")
                .select("LAMA_CONCERTS.id", "LAMA_CONCERTS.week_day", "LAMA_CONCERTS.start_time", "LAMA_CONCERTS.end_time", "LAMA_BANDS.name", "LAMA_BANDS.music_genre")
                .where("week_day", weekDay).orderBy("start_time")
            } else {
                return await BaseDatabase.connection(this.TABLE_NAME)
                .join("LAMA_BANDS", "LAMA_CONCERTS.band_id", "=", "LAMA_BANDS.id")
                .select("LAMA_CONCERTS.id", "LAMA_CONCERTS.week_day", "LAMA_CONCERTS.start_time", "LAMA_CONCERTS.end_time", "LAMA_BANDS.name", "LAMA_BANDS.music_genre")
                .orderBy("start_time")
            }
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getConcertById (id: string): Promise<any> {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME).select().where("id", id)
            return result[0]
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async updateConcert (newInfo: updateConcertDatabaseDTO): Promise<void> {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
            .update({week_day: newInfo.weekDay, start_time: newInfo.startTime, end_time: newInfo.endTime})
            .where("id", newInfo.id)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}