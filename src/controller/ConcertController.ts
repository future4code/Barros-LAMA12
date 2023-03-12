import { ConcertBusiness } from "../business/ConcertBusiness"
import { Request, Response } from "express"
import { inputCreateConcertDTO } from "../model/Concert"


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
}