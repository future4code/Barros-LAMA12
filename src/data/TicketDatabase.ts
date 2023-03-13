import { CustomError } from "../error/CustomError"
import { Ticket } from "../model/Ticket"
import { TicketRepository } from "../model/Repositories/TicketRepository"
import { BaseDatabase } from "./BaseDatabase"
import { Purchase } from "../model/Purchase"


export class TicketDatabase extends BaseDatabase implements TicketRepository {
    private TABLE_NAME = "LAMA_TICKETS"
    
    async createTicket (newTicket: Ticket): Promise<void> {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).insert(newTicket)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async purchaseTicket (newPurchase: Purchase): Promise<void> {
        try {
            await BaseDatabase.connection("LAMA_PURCHASES").insert(newPurchase)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getTicketById (id: string): Promise<any> {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME).select().where("id", id)
            return result[0]
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async editTicketUnits (id: string, ticketsAvailable: number, unitsSold: number): Promise<void> {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
            .update({tickets_available: ticketsAvailable, tickets_sold: unitsSold})
            .where("id", id)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}