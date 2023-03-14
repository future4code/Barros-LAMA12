import { Purchase } from "../Purchase"
import { Ticket } from "../Ticket"


export interface TicketRepository {
    createTicket (newTicket: Ticket): Promise<void>
    purchaseTicket (newPurchase: Purchase): Promise<void>
    getTicketById (id: string): Promise<any>
    editTicketInfo (id: string, newInfo: any): Promise<void>
    getAllTickets (weekDay: string): Promise<any>
    getAllPurchasesByUserId (id: string): Promise<any>
}