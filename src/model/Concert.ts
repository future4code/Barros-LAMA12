export class Concert {
    constructor (
        public readonly id: string,
        public readonly week_day: string,
        public readonly start_time: string,
        public readonly end_time: string,
        public readonly band_id: string
    ) {
        this.id = id
        this.week_day = week_day
        this.start_time = start_time
        this.end_time = end_time
        this.band_id = band_id       
    }
}

export interface inputCreateConcertDTO {
    weekDay: string,
    startTime: string,
    endTime: string,
    bandId: string,
    token: string
}

export interface outputGetAllConcertsDTO {
    id: string,
    week_day: string,
    start_time: string,
    end_time: string,
    name: string,
    music_genre: string
}

export interface inputUpdateConcertDTO {
    id: string,
    weekDay: string,
    startTime: string,
    endTime: string,
    token: string
}

export interface updateConcertDatabaseDTO {
    id: string,
    weekDay: string,
    startTime: string,
    endTime: string
}