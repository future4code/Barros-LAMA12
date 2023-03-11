import { CustomError } from "./CustomError"


export class MissingBandName extends CustomError {
    constructor () {
        super (422, "Provide the band name.")
    }
}

export class DuplicateBandName extends CustomError {
    constructor () {
        super (409, "Band name already registered.")
    }
}

export class MissingMusicGenre extends CustomError {
    constructor () {
        super (422, "Provide the music genre.")
    }
}

export class MissingResponsible extends CustomError {
    constructor () {
        super (422, "Provide the name of the responsible for the band.")
    }
}