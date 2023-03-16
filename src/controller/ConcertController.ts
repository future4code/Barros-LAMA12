import { ConcertBusiness } from "../business/ConcertBusiness"
import { Request, Response } from "express"
import { inputCreateConcertDTO, inputUpdateConcertDTO } from "../model/Concert"


export class ConcertController {
    constructor (private concertBusiness: ConcertBusiness) {}

    async createConcert (req: Request, res: Response): Promise<void> {
        try {
            const input: inputCreateConcertDTO = {
                weekDay: req.body.weekDay,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                bandId: req.body.bandId,
                token: req.headers.authorization as string
            }

            await this.concertBusiness.createConcert(input)
            res.status(201).send("Concert created successfully!")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


    async getAllConcerts (req: Request, res: Response): Promise<void> {
        try {
            const weekDay = req.query.weekDay as string

            const result = await this.concertBusiness.getAllConcerts(weekDay)
            res.status(200).send(result)

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


    async updateConcert (req: Request, res: Response): Promise<void> {
        try {
            const input: inputUpdateConcertDTO = {
                id: req.params.id,
                weekDay: req.body.weekDay,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                token: req.headers.authorization as string
            }

            await this.concertBusiness.updateConcert(input)
            res.status(201).send("Concert information updated successfully!")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }
}