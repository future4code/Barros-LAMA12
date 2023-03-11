import { Band } from "./Band"


export interface BandRepository {
    createBand (newBand: Band): Promise<void>
    getBandBy (column: string, value: string): Promise<Band | undefined>
}