import { ConcertIdNotFound, InvalidWeekDay, MissingConcertId, MissingWeekDay } from "../error/ConcertErrors"
import { CustomError } from "../error/CustomError"
import { DuplicateTicket, InvalidTicketPrice, InvalidTicketsAvailable, InvalidUnits, MissingTicketId, MissingTicketName, MissingTicketPrice, MissingTickets, MissingTicketsAvailable, NoPurchasesFound, NoTicketsFound, TicketIdNotFound, UnitsNotAvailable } from "../error/TicketErrors"
import { MissingToken, Unauthorized } from "../error/UserErrors"
import { ConcertRepository } from "../model/Repositories/ConcertRepository"
import { IAuthenticator } from "../model/IAuthenticator"
import { IIdGenerator } from "../model/IIdGenerator"
import { inputCreateTicketDTO, inputEditTicketPriceDTO, outputGetAllTicketsDTO, Ticket } from "../model/Ticket"
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

            const duplicateTicket = await this.ticketDatabase.getTicketByConcertId(input.concertId)
            if (duplicateTicket) {
                throw new DuplicateTicket()
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
            
            const {id, role} = await this.authorization.getTokenData(input.token)

            if (!input.tickets) {
                throw new MissingTickets()
            }

            for (let i = 0; i < input.tickets.length; i++) {
                const ticketExists = await this.ticketDatabase.getTicketById(input.tickets[i].ticketId)
                
                if (!ticketExists) {
                    throw new TicketIdNotFound()
                }
                if (input.tickets[i].units < 1) {
                    throw new InvalidUnits()
                }
                if (input.tickets[i].units > ticketExists.tickets_available) {
                    throw new UnitsNotAvailable()
                }

                const purchaseId = this.idGenerator.generateId()
                const totalPrice = Number(input.tickets[i].units) * Number(ticketExists.price)
                const newPurchase = new Purchase(purchaseId, id, input.tickets[i].ticketId, input.tickets[i].units, totalPrice)

                await this.ticketDatabase.purchaseTicket(newPurchase)

                const ticketsAvailable = ticketExists.tickets_available - input.tickets[i].units
                const ticketsSold = ticketExists.tickets_sold + input.tickets[i].units

                await this.ticketDatabase.updateTicketInfo(input.tickets[i].ticketId, {tickets_available: ticketsAvailable, tickets_sold: ticketsSold})
            }
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getAllTickets (weekDay: string): Promise<outputGetAllTicketsDTO> {
        try {
            if (!weekDay) {
                throw new MissingWeekDay()
            }
            if (weekDay.toLowerCase() !== "friday" && weekDay.toLowerCase() !== "saturday" && weekDay.toLowerCase() !== "sunday") {
                throw new InvalidWeekDay()
            }

            const result = await this.ticketDatabase.getAllTickets(weekDay)
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


    async updateTicketPrice (input: inputEditTicketPriceDTO): Promise<void> {
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

            await this.ticketDatabase.updateTicketInfo(input.ticketId, {price: input.price})
         
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}