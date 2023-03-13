import { CustomError } from "./CustomError"


export class MissingBandId extends CustomError {
    constructor () {
        super (422, "Provide the band id.")
    }
}

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

export class MissingNameOrId extends CustomError {
    constructor () {
        super (422, "Provide the id or the name of the band.")
    }
}

export class BandIdNotFound extends CustomError {
    constructor () {
        super (404, "Band id not found.")
    }
}

export class BandNameNotFound extends CustomError {
    constructor () {
        super (404, "Band name not found.")
    }
}

export class InvalidBandInfo extends CustomError {
    constructor () {
        super (422, "Provide either the band id or the band name.")
    }
}