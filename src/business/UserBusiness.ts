import { CustomError } from "../error/CustomError"
import { DuplicateEmail, EmailNotFound, IncorrectPassword, InvalidEmail, InvalidPassword, MissingEmail, MissingPassword, MissingToken, MissingUserName, MissingUserRole, UserNotFound } from "../error/UserErrors"
import { IAuthenticator } from "../model/IAuthenticator"
import { IHashManager } from "../model/IHashManager"
import { IIdGenerator } from "../model/IIdGenerator"
import { inputSignUpDTO, loginInputDTO, outputGetAccountInfoDTO, User, USER_ROLES } from "../model/User"
import { UserRepository } from "../model/Repositories/UserRepository"


export class UserBusiness {
    constructor (
        private userDatabase : UserRepository,
        private idGenerator: IIdGenerator,
        private hashManager: IHashManager,
        private authenticator: IAuthenticator
    ) {}

    async signup (input: inputSignUpDTO): Promise<string> {
        try {
            if (!input.name) {
                throw new MissingUserName()
            }
            if (!input.email) {
                throw new MissingEmail()
            }
            if (!input.password) {
                throw new MissingPassword()
            }
            if (!input.role) {
                throw new MissingUserRole()
            }
            if (input.password.length < 8) {
                throw new InvalidPassword()
            }
            if (!input.email.includes("@")) {
                throw new InvalidEmail()
            }

            const isEmailDuplicate = await this.userDatabase.getUserBy("email", input.email)
            if (isEmailDuplicate) {
                throw new DuplicateEmail()
            }
    
            let role
            input.role.toUpperCase() === USER_ROLES.ADMIN ? role = USER_ROLES.ADMIN : role = USER_ROLES.NORMAL
            
            const id = this.idGenerator.generateId()
            const hashPassword = await this.hashManager.generateHash(input.password)

            const newUser = new User(id, input.name, input.email, hashPassword, role)
            await this.userDatabase.signup(newUser)
            
            return this.authenticator.generateToken({id, role})

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async login (input: loginInputDTO): Promise<string> {
        try {
            if (!input.email) {
                throw new MissingEmail()
            }
            if (!input.password) {
                throw new MissingPassword()
            }
            if (!input.email.includes("@")) {
                throw new InvalidEmail()
            }

            const emailExists = await this.userDatabase.getUserBy("email", input.email)
            if (!emailExists) {
                throw new EmailNotFound()
            }

            const compareHash = await this.hashManager.compareHash(input.password, emailExists.password)
            if (!compareHash) {
                throw new IncorrectPassword()
            }

            const token = this.authenticator.generateToken({ id: emailExists.id, role: emailExists.role})
            return token

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }


    async getAccountInfo (token: string): Promise<outputGetAccountInfoDTO> {
        try {
            if (!token) {
                throw new MissingToken()
            }
            
            const {id, role} = await this.authenticator.getTokenData(token)            

            const result = await this.userDatabase.getUserBy("id", id)
            if (!result) {
                throw new UserNotFound()
            }

            const user = {
                id: result.id,
                name: result.name,
                email: result.email,
                role: result.role
            }

            return user

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}