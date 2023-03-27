import { Concert, outputGetAllConcertsDTO, updateConcertDatabaseDTO } from "../../src/model/Concert"
import { ConcertRepository } from "../../src/model/Repositories/ConcertRepository"
import { concerts } from "./concertsMock"


export class ConcertDatabaseMock implements ConcertRepository {
    async createConcert (newConcert: Concert): Promise<void> {}

    async searchConcerts (weekDay: string, column: string, value: string): Promise<any> {
        if (column === "start_time") {
            const result = concerts.filter(item => item.week_day === weekDay && item.start_time === value)
            return result[0]
        } else if (column === "end_time") {
            const result = concerts.filter(item => item.week_day === weekDay && item.end_time === value)
            return result[0]
        }
    }

    async getAllConcerts (weekDay: string): Promise<outputGetAllConcertsDTO[]> {
        if (weekDay === "") {
            return concerts
        } else {
            return concerts.filter(item => item.week_day === weekDay)
        }
    }

    async getConcertById (id: string): Promise<any> {
        const result = concerts.filter(item => item.id === id)
        return result[0]
    }

    async updateConcert (newInfo: updateConcertDatabaseDTO): Promise<void> {}
}