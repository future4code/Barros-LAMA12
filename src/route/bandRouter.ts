import express from "express"
import { BandBusiness } from "../business/BandBusiness"
import { BandController } from "../controller/BandController"
import { BandDatabase } from "../data/BandDatabase"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"


export const bandRouter = express.Router()

const bandDatabase = new BandDatabase()
const bandBusiness = new BandBusiness(bandDatabase, new Authenticator(), new IdGenerator())
const bandController = new BandController(bandBusiness)

bandRouter.post("/create", (req, res) => bandController.createBand(req, res))
bandRouter.get("/info", (req, res) => bandController.getBandInfo(req, res))
bandRouter.get("/", (req, res) => bandController.getAllBands(req, res))