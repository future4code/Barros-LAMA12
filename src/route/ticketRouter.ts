import express from "express"
import { TicketBusiness } from "../business/TicketBusiness"
import { TicketController } from "../controller/TicketController"
import { ConcertDatabase } from "../data/ConcertDatabase"
import { TicketDatabase } from "../data/TicketDatabase"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"


export const ticketRouter = express.Router()

const ticketDatabase = new TicketDatabase()
const ticketBusiness = new TicketBusiness(ticketDatabase, new ConcertDatabase(), new Authenticator(), new IdGenerator())
const ticketController = new TicketController(ticketBusiness)

ticketRouter.post("/create", (req, res) => ticketController.createTicket(req, res))
ticketRouter.post("/purchase", (req, res) => ticketController.purchaseTicket(req, res))
ticketRouter.get("/purchases", (req, res) => ticketController.getAllPurchasesByUserId(req, res))
ticketRouter.get("/", (req, res) => ticketController.getAllTickets(req, res))
ticketRouter.patch("/edit/:ticketId", (req, res) => ticketController.updateTicketPrice(req, res))