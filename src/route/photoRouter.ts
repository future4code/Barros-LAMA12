import express from "express"
import { PhotoBusiness } from "../business/PhotoBusiness"
import { PhotoController } from "../controller/PhotoController"
import { PhotoDatabase } from "../data/PhotoDatabase"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

export const photoRouter = express.Router()

const photoDatabase = new PhotoDatabase()
const photoBusiness = new PhotoBusiness(photoDatabase, new Authenticator(), new IdGenerator())
const photoController = new PhotoController(photoBusiness)

photoRouter.post("/create", (req, res) => photoController.createPhoto(req, res))
photoRouter.get("/", (req, res) => photoController.getAllPhotos(req, res))
photoRouter.delete("/:photoId", (req, res) => photoController.deletePhoto(req, res))