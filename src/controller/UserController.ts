import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { inputSignUpDTO, loginInputDTO } from "../model/User"


export class UserController {
    constructor (private userBusiness: UserBusiness) {}

    async signup (req: Request, res: Response): Promise<void> {
        try {
            const input: inputSignUpDTO = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                role: req.body.role
            }

            const token = await this.userBusiness.signup(input)

            res.status(201).send({message: "User created successfully", token})

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


    async login (req: Request, res: Response): Promise<void> {
        try {
            const input: loginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const token = await this.userBusiness.login(input)
            res.status(200).send({ token })

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

}