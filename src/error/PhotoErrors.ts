import { CustomError } from "./CustomError"


export class MissingPhotoUrl extends CustomError {
    constructor () {
        super (422, "Provide the photo url.")
    }
}