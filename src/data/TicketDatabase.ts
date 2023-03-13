import { CustomError } from "../error/CustomError"
import { Ticket } from "../model/Ticket"
import { TicketRepository } from "../model/TicketRepository"
import { BaseDatabase } from "./BaseDatabase"


export class TicketDatabase extends BaseDatabase implements TicketRepository {
    private TABLE_NAME = "LAMA_TICKETS"
    
    async createTicket (newTicket: Ticket): Promise<void> {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).insert(newTicket)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}