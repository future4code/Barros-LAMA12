import { Request, Response } from "express"
import { TicketBusiness } from "../business/TicketBusiness"
import { inputPurchaseTicketDTO } from "../model/Purchase"
import { inputCreateTicketDTO, inputEditTicketPriceDTO, inputGetAllTicketsDTO } from "../model/Ticket"


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


    async purchaseTicket (req: Request, res: Response): Promise<void> {
        try {
            const input: inputPurchaseTicketDTO = {
                ticketId: req.body.ticketId,
                units: Number(req.body.units),
                token: req.headers.authorization as string
            }

            await this.ticketBusiness.purchaseTicket(input)
            res.status(201).send("Purchase created successfully!")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


    async getAllTickets (req: Request, res: Response): Promise<void> {
        try {
            const input: inputGetAllTicketsDTO = {
                weekDay: req.query.weekDay as string,
                token: req.headers.authorization as string
            }

            const result = await this.ticketBusiness.getAllTickets(input)
            res.status(200).send(result)

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


    async getAllPurchasesByUserId (req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization as string

            const result = await this.ticketBusiness.getAllPurchasesByUserId(token)
            res.status(200).send(result)

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


    async editTicketPrice (req: Request, res: Response): Promise<void> {
        try {
            const input: inputEditTicketPriceDTO = {
                ticketId: req.params.ticketId,
                price: req.body.price,
                token: req.headers.authorization as string
            }

            const result = await this.ticketBusiness.editTicketPrice(input)
            res.status(201).send("Ticket info updated successfully!")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }
}