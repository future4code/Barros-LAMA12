import { Concert } from "./Concert"


export interface ConcertRepository {
    createConcert (newConcert: Concert): Promise<void>
    searchConcerts (weekDay: string, column: string, value: string): Promise<any>
}