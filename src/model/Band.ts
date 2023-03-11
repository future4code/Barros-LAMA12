export class Band {
    constructor (private id: string, private name: string, private music_genre: string, private responsible: string) {
        this.id = id
        this.name = name
        this.music_genre = music_genre
        this.responsible = responsible       
    }
}