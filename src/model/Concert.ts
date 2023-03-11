export class Concert {
    constructor (private id: string, private week_day: string, private start_time: string, private end_time: string, private band_id: string) {
        this.id = id
        this.week_day = week_day
        this.start_time = start_time
        this.end_time = end_time
        this.band_id = band_id       
    }
}