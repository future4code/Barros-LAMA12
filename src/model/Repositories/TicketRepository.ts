import { Purchase } from "../Purchase"
import { Ticket } from "../Ticket"


export interface TicketRepository {
    createTicket (newTicket: Ticket): Promise<void>
    purchaseTicket (newPurchase: Purchase): Promise<void>
    getTicketById (id: string): Promise<any>
    editTicketUnits (id: string, ticketsAvailable: number, unitsSold: number): Promise<void>
    getAllTickets (weekDay: string): Promise<any>
}