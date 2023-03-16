export class Band {
    constructor (
        public readonly id: string,
        public readonly name: string,
        public readonly music_genre: string,
        public readonly responsible: string
    ) {
        this.id = id
        this.name = name
        this.music_genre = music_genre
        this.responsible = responsible       
    }
}

export interface inputCreateBandDTO {
    name: string,
    musicGenre: string,
    responsible: string,
    token: string
}

export interface inputGetBandInfoDTO {
    id: string,
    name: string
}