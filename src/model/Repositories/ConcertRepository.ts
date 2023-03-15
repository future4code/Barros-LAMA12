import { Concert, outputGetAllConcertsDTO, updateConcertDatabaseDTO } from "../Concert"


export interface ConcertRepository {
    createConcert (newConcert: Concert): Promise<void>
    getAllConcerts (weekDay: string): Promise<outputGetAllConcertsDTO[]>
    getConcertById (id: string): Promise<any>
    updateConcert (newInfo: updateConcertDatabaseDTO): Promise<void>
}