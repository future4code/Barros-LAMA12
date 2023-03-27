import { Band } from "../../src/model/Band"
import { BandRepository } from "../../src/model/Repositories/BandRepository"
import { bands } from "./bandsMock"


export class BandDatabaseMock implements BandRepository {
    async createBand (newBand: Band): Promise<void> {}

    async getBandBy (column: string, value: string): Promise<any> {
        const result = bands.filter(item => item.id === value || item.name === value)
        return result[0]
    }

    async getAllBands (): Promise<Band[]> {
        return bands
    }
}