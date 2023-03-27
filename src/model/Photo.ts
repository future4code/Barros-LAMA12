export class Photo {
    constructor (
        public readonly id: string,
        public readonly photo_url: string,
        public readonly week_day: string,
        public readonly created_at: Date,
    ) {
        this.id = id
        this.photo_url = photo_url
        this.week_day = week_day
        this.created_at = created_at
    }
}

export interface inputCreatePhotoDTO {
    photoUrl: string,
    weekDay: string,
    token: string
}

export interface inputDeletePhotoDTO {
    photoId: string,
    token: string
}