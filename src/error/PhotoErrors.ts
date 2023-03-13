import { CustomError } from "./CustomError"


export class MissingPhotoUrl extends CustomError {
    constructor () {
        super (422, "Provide the photo url.")
    }
}

export class PhotosNotFound extends CustomError {
    constructor () {
        super (404, "No photos were found for the provided week day.")
    }
}