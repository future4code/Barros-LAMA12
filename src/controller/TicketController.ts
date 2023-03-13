import { Request, Response } from "express"
import { TicketBusiness } from "../business/TicketBusiness"
import { inputCreateTicketDTO } from "../model/Ticket"


export class TicketController {
    constructor (private ticketBusiness: TicketBusiness) {}

    async createTicket (req: Request, res: Response): Promise<void> {
        try {
            const input: inputCreateTicketDTO = {
                ticketName: req.body.ticketName,
                price: Number(req.body.price),
                concertId: req.body.concertId,
                ticketsAvailable: Number(req.body.ticketsAvailable),
                token: req.headers.authorization as string
            }

            await this.ticketBusiness.createTicket(input)
            res.status(201).send("Ticket created successfully!")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }
}