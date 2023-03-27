import { Purchase } from "../../src/model/Purchase"
import { TicketRepository } from "../../src/model/Repositories/TicketRepository"
import { Ticket } from "../../src/model/Ticket"
import { purchases } from "./purchases"
import { tickets } from "./ticketsMock"


export class TicketDatabaseMock implements TicketRepository {
    async createTicket (newTicket: Ticket): Promise<void> {}
    async purchaseTicket (newPurchase: Purchase): Promise<void> {}

    async getTicketById (id: string): Promise<any> {
        const result = tickets.filter(item => item.id === id)
        return result[0]
    }

    async updateTicketInfo (id: string, newInfo: any): Promise<void> {}

    async getAllTickets (weekDay: string): Promise<any> {
        return tickets.filter(item => item.week_day === weekDay)
    }

    async getTicketByConcertId (concertId: string): Promise<any> {
        const result = tickets.filter(item => item.concert_id === concertId)
        return result[0]
    }

    async getAllPurchasesByUserId (id: string): Promise<any> {
        return purchases.filter(item => item.user_id === id)
    }
}