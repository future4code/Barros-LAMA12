import { CustomError } from "../error/CustomError"
import { User } from "../model/User"
import { UserRepository } from "../model/Repositories/UserRepository"
import { BaseDatabase } from "./BaseDatabase"


export class UserDatabase extends BaseDatabase implements UserRepository {
    private TABLE_NAME = "LAMA_USERS"
    
    async signup (newUser: User): Promise<void> {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).insert(newUser)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    async getUserBy (column: string, value: string): Promise<User | undefined> {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME).select().where(column, value)
            return result[0]
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}