import { Concert, outputGetAllConcertsDTO, updateConcertDatabaseDTO } from "../../src/model/Concert"
import { ConcertRepository } from "../../src/model/Repositories/ConcertRepository"
import { concerts } from "./concertsMock"


export class ConcertDatabaseMock implements ConcertRepository {
    async createConcert (newConcert: Concert): Promise<void> {}

    async getAllConcerts (weekDay: string): Promise<outputGetAllConcertsDTO[]> {
        return concerts
    }


    async getConcertById (id: string): Promise<any> {
        const result = concerts.filter(item => item.id === id)
        return result[0]
    }

    async updateConcert (newInfo: updateConcertDatabaseDTO): Promise<void> {}
}