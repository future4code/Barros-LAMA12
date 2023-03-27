import { CustomError } from "./CustomError"

export class MissingTickets extends CustomError {
    constructor () {
        super (422, "Provide the list of tickets that will be bought icluding the thicket id and the units of each one of them.")
    }
}

export class MissingTicketId extends CustomError {
    constructor () {
        super (422, "Provide the id of the ticket.")
    }
}

export class TicketIdNotFound extends CustomError {
    constructor () {
        super (404, "Ticket id not found.")
    }
}

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

export class InvalidUnits extends CustomError {
    constructor () {
        super (422, "The number of tickets must be higher than zero.")
    }
}

export class UnitsNotAvailable extends CustomError {
    constructor () {
        super (422, "The number of units exceeds the number of tickets available.")
    }
}

export class NoTicketsFound extends CustomError {
    constructor () {
        super (404, "No tickets were found for the provided week day.")
    }
}

export class NoPurchasesFound extends CustomError {
    constructor () {
        super (404, "No purchases were found for the provided user id.")
    }
}

export class DuplicateTicket extends CustomError {
    constructor () {
        super (409, "There is already a registered ticket for this concert.")
    }
}