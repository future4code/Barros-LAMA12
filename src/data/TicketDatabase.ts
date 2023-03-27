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


    async updateTicketInfo (id: string, newInfo: any): Promise<void> {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).update(newInfo).where("id", id)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getAllTickets (weekDay: string): Promise<any> {
        try {
            return await BaseDatabase.connection(this.TABLE_NAME)
            .join("LAMA_CONCERTS", "LAMA_TICKETS.concert_id", "=", "LAMA_CONCERTS.id")
            .join("LAMA_BANDS", "LAMA_CONCERTS.band_id", "=", "LAMA_BANDS.id")
            .select("LAMA_TICKETS.id", "LAMA_TICKETS.ticket_name", "LAMA_TICKETS.price", "LAMA_TICKETS.tickets_available", "LAMA_TICKETS.tickets_sold", "LAMA_CONCERTS.week_day", "LAMA_CONCERTS.start_time", "LAMA_CONCERTS.end_time", "LAMA_BANDS.name as band_name", "LAMA_BANDS.music_genre")
            .where("week_day", weekDay)
            .orderBy("start_time")
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getTicketByConcertId (concertId: string): Promise<any> {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME).select().where("concert_id", concertId)
            return result[0]
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getAllPurchasesByUserId (id: string): Promise<any> {
        try {
            return await BaseDatabase.connection("LAMA_PURCHASES")
            .join(this.TABLE_NAME, "LAMA_PURCHASES.ticket_id", "=", "LAMA_TICKETS.id")
            .select("LAMA_TICKETS.ticket_name", "LAMA_TICKETS.price", "LAMA_PURCHASES.units", "LAMA_PURCHASES.total_price")
            .where("LAMA_PURCHASES.user_id", id)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}