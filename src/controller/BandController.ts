import { BandBusiness } from "../business/BandBusiness"
import { Request, Response } from "express"
import { inputCreateBandDTO, inputGetBandInfoDTO } from "../model/Band"


export class BandController {
    constructor (private bandBusiness: BandBusiness) {}

    async createBand (req: Request, res: Response): Promise<void> {
        try {
            const input: inputCreateBandDTO = {
                name: req.body.name,
                musicGenre: req.body.musicGenre,
                responsible: req.body.responsible,
                token: req.headers.authorization as string
            }

            await this.bandBusiness.createBand(input)

            res.status(201).send("Band created successfully!")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


    async getBandInfo (req: Request, res: Response): Promise<void> {
        try {
            const input: inputGetBandInfoDTO = {
                id: req.query.id as string,
                name: req.query.name as string
            }

            const result = await this.bandBusiness.getBandInfo(input)
            res.status(200).send(result)

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


    async getAllBands (req: Request, res: Response): Promise<void> {
        try {
            const result = await this.bandBusiness.getAllBands()
            res.status(200).send(result)
        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }
}