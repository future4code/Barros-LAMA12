import { CustomError } from "../error/CustomError"
import { Band } from "../model/Band"
import { BandRepository } from "../model/Repositories/BandRepository"
import { BaseDatabase } from "./BaseDatabase"


export class BandDatabase extends BaseDatabase implements BandRepository {
    private TABLE_NAME = "LAMA_BANDS"
    
    async createBand (newBand: Band): Promise<void> {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).insert(newBand)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getBandBy (column: string, value: string): Promise<any> {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME).select().where(column, value)
            return result[0]
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getAllBands (): Promise<Band[]> {
        try {
            return await BaseDatabase.connection(this.TABLE_NAME).select()
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}