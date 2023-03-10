import { ConcertIdNotFound, InvalidWeekDay, MissingConcertId, MissingWeekDay } from "../error/ConcertErrors"
import { CustomError } from "../error/CustomError"
import { InvalidTicketPrice, InvalidTicketsAvailable, InvalidUnits, MissingTicketId, MissingTicketName, MissingTicketPrice, MissingTicketsAvailable, MissingUnits, NoPurchasesFound, NoTicketsFound, TicketIdNotFound } from "../error/TicketErrors";
import { MissingToken, Unauthorized } from "../error/UserErrors"
import { ConcertRepository } from "../model/Repositories/ConcertRepository"
import { IAuthenticator } from "../model/IAuthenticator"
import { IIdGenerator } from "../model/IIdGenerator"
import { inputCreateTicketDTO, inputEditTicketPriceDTO, inputGetAllTicketsDTO, outputGetAllTicketsDTO, Ticket } from "../model/Ticket"
import { TicketRepository } from "../model/Repositories/TicketRepository"
import { USER_ROLES } from "../model/User"
import { inputPurchaseTicketDTO, outputGetAllPurchasesDTO, Purchase } from "../model/Purchase"


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


    async purchaseTicket (input: inputPurchaseTicketDTO): Promise<void> {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            if (!input.ticketId) {
                throw new MissingTicketId()
            }
            if (!input.units) {
                throw new MissingUnits()
            }
            if (input.units < 1) {
                throw new InvalidUnits()
            }

            const {id, role} = await this.authorization.getTokenData(input.token)

            const ticketIdExists = await this.ticketDatabase.getTicketById(input.ticketId)
            if (!ticketIdExists) {
                throw new TicketIdNotFound()
            }
            
            const purchaseId = this.idGenerator.generateId()
            const totalPrice = ticketIdExists.price * input.units
            const newPurchase = new Purchase(purchaseId, id, input.ticketId, input.units, totalPrice)

            await this.ticketDatabase.purchaseTicket(newPurchase)

            const ticketsAvailable = ticketIdExists.tickets_available - input.units
            const ticketsSold = ticketIdExists.tickets_sold + input.units

            await this.ticketDatabase.editTicketInfo(input.ticketId, {tickets_available: ticketsAvailable, tickets_sold: ticketsSold})

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getAllTickets (input: inputGetAllTicketsDTO): Promise<outputGetAllTicketsDTO> {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            if (!input.weekDay) {
                throw new MissingWeekDay()
            }
            if (input.weekDay.toLowerCase() !== "friday" && input.weekDay.toLowerCase() !== "saturday" && input.weekDay.toLowerCase() !== "sunday") {
                throw new InvalidWeekDay()
            }

            await this.authorization.getTokenData(input.token)

            const result = await this.ticketDatabase.getAllTickets(input.weekDay)
            if (result.length === 0) {
                throw new NoTicketsFound()
            }

            return result

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }



    async getAllPurchasesByUserId (token: string): Promise<outputGetAllPurchasesDTO[]> {
        try {
            if (!token) {
                throw new MissingToken()
            }
            
            const {id, role} = await this.authorization.getTokenData(token)

            const result = await this.ticketDatabase.getAllPurchasesByUserId(id)
            if (result.length === 0) {
                throw new NoPurchasesFound()
            }

            return result

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async editTicketPrice (input: inputEditTicketPriceDTO): Promise<void> {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            if (!input.ticketId) {
                throw new MissingTicketId()
            }
            if (!input.price) {
                throw new MissingTicketPrice()
            }
            if (input.price < 1) {
                throw new InvalidTicketPrice()
            }
            
            const {id, role} = await this.authorization.getTokenData(input.token)
            if (role.toUpperCase() !== USER_ROLES.ADMIN) {
                throw new Unauthorized()
            }

            const idExists = await this.ticketDatabase.getTicketById(input.ticketId)
            if (!idExists) {
                throw new TicketIdNotFound()
            }

            await this.ticketDatabase.editTicketInfo(input.ticketId, {price: input.price})
         
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}