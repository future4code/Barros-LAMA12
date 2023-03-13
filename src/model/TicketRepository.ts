import { Ticket } from "./Ticket"


export interface TicketRepository {
    createTicket (newTicket: Ticket): Promise<void>
}