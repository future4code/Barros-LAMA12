import { CustomError } from "../error/CustomError"
import { Concert } from "../model/Concert"
import { ConcertRepository } from "../model/ConcertRepository"
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
}