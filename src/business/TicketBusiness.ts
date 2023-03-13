import { ConcertIdNotFound, MissingConcertId } from "../error/ConcertErrors";
import { CustomError } from "../error/CustomError";
import { InvalidTicketPrice, InvalidTicketsAvailable, MissingTicketName, MissingTicketPrice, MissingTicketsAvailable } from "../error/TicketErrors";
import { MissingToken, Unauthorized } from "../error/UserErrors";
import { ConcertRepository } from "../model/ConcertRepository";
import { IAuthenticator } from "../model/IAuthenticator";
import { IIdGenerator } from "../model/IIdGenerator";
import { inputCreateTicketDTO, Ticket } from "../model/Ticket"
import { TicketRepository } from "../model/TicketRepository";
import { USER_ROLES } from "../model/User";


export class TicketBusiness {
    constructor (
        private ticketDatabase: TicketRepository,
        private concertDatabase: ConcertRepository,
        private authorization: IAuthenticator,
        private idGenerator: IIdGenerator
    ) {}

    async createTicket (input: inputCreateTicketDTO): Promise<void> {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            if (!input.ticketName) {
                throw new MissingTicketName()
            }
            if (!input.ticketsAvailable) {
                throw new MissingTicketsAvailable()
            }
            if (input.ticketsAvailable <= 0) {
                throw new InvalidTicketsAvailable()
            }
            if (!input.price) {
                throw new MissingTicketPrice()
            }
            if (input.price < 1) {
                throw new InvalidTicketPrice()
            }
            if (!input.concertId) {
                throw new MissingConcertId()
            }

            const {id, role} = await this.authorization.getTokenData(input.token)
            if (role.toUpperCase() !== USER_ROLES.ADMIN) {
                throw new Unauthorized()
            }

            const concertIdExists = await this.concertDatabase.getConcertById(input.concertId)
            if (!concertIdExists) {
                throw new ConcertIdNotFound()
            }

            const ticketId = this.idGenerator.generateId()
            const newTicket = new Ticket(ticketId, input.ticketName, input.price, input.ticketsAvailable, 0, input.concertId)
            
            await this.ticketDatabase.createTicket(newTicket)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}