import { Concert, outputGetAllConcertsDTO } from "./Concert"


export interface ConcertRepository {
    createConcert (newConcert: Concert): Promise<void>
    searchConcerts (weekDay: string, column: string, value: string): Promise<any>
    getAllConcerts (weekDay: string): Promise<outputGetAllConcertsDTO[]>
    getConcertById (id: string): Promise<any>
}