import express from "express"
import { ConcertBusiness } from "../business/ConcertBusiness"
import { ConcertController } from "../controller/ConcertController"
import { BandDatabase } from "../data/BandDatabase"
import { ConcertDatabase } from "../data/ConcertDatabase"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"
import { CheckConcertTime } from "../utils/CheckConcertTime"


export const concertRouter = express.Router()

const concertDatabase = new ConcertDatabase()
const bandDatabase = new BandDatabase()
const concertBusiness = new ConcertBusiness(concertDatabase, bandDatabase, new Authenticator(), new IdGenerator(), new CheckConcertTime(concertDatabase))
const concertController = new ConcertController(concertBusiness)

concertRouter.post("/create", (req, res) => concertController.createConcert(req, res))
concertRouter.put("/:id", (req, res) => concertController.updateConcert(req, res))
concertRouter.get("/", (req, res) => concertController.getAllConcerts(req, res))
