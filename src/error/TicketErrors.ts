import { CustomError } from "./CustomError"

export class MissingTicketName extends CustomError {
    constructor () {
        super (422, "Provide the name of the ticket.")
    }
}

export class MissingTicketPrice extends CustomError {
    constructor () {
        super (422, "Provide the price of the ticket.")
    }
}

export class InvalidTicketPrice extends CustomError {
    constructor () {
        super (422, "The price of the ticket must be higher than zero.")
    }
}

export class MissingTicketsAvailable extends CustomError {
    constructor () {
        super (422, "Provide the number of tickets available for purchase.")
    }
}

export class InvalidTicketsAvailable extends CustomError {
    constructor () {
        super (422, "The number of tickets available for purchase must be higher than zero.")
    }
}