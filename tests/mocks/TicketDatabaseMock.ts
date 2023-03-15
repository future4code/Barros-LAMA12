import { Purchase } from "../../src/model/Purchase"
import { TicketRepository } from "../../src/model/Repositories/TicketRepository"
import { Ticket } from "../../src/model/Ticket"
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
        return tickets
    }

    async getAllPurchasesByUserId (id: string): Promise<any> {
        return 
    }
}