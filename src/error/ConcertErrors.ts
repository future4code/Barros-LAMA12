import { CustomError } from "./CustomError"


export class MissingConcertId extends CustomError {
    constructor () {
        super (422, "Provide the concert id.")
    }
}

export class ConcertIdNotFound extends CustomError {
    constructor () {
        super (404, "Concert id not found.")
    }
}

export class MissingWeekDay extends CustomError {
    constructor () {
        super (422, "Provide the week day.")
    }
}

export class InvalidWeekDay extends CustomError {
    constructor () {
        super (422, "The week day can only be friday, saturday or sunday.")
    }
}

export class MissingStartTime extends CustomError {
    constructor () {
        super (422, "Provide the start time.")
    }
}

export class InvalidStartTime extends CustomError {
    constructor () {
        super (422, "The start time format must be hh:00:00 and cannot be earlier than 8am and later than 10pm.")
    }
}

export class MissingEndTime extends CustomError {
    constructor () {
        super (422, "Provide the end time.")
    }
}

export class InvalidEndTime extends CustomError {
    constructor () {
        super (422, "The end time format must be hh:00:00 and cannot be earlier than 9am and later than 11pm.")
    }
}

export class InvalidConcertTime extends CustomError {
    constructor () {
        super (422, "The end time cannot be earlier the start time.")
    }
}

export class InvalidConcertDuration extends CustomError {
    constructor () {
        super (422, "The duration of the concert cannot be less than 1 hour or higher than 2 hours.")
    }
}

export class DuplicateConcert extends CustomError {
    constructor () {
        super (409, "There is a concert already registered in this period of time.")
    }
}

export class NoConcertsRegistered extends CustomError {
    constructor () {
        super (422, "There are no concerts registered on this day yet.")
    }
}