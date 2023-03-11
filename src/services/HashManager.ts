import * as bcrypt from "bcryptjs"
import dotenv from "dotenv"
import { IHashManager } from "../model/IHashManager"

dotenv.config()

export class HashManager implements IHashManager {
    generateHash = async (plaintext: string): Promise<string> => {
        const cost: number = Number(process.env.BCRYPT_COST)
        const salt: string = await bcrypt.genSalt(cost)
        const hash: string = await bcrypt.hash(plaintext, salt)

        return hash
    }

    compareHash = async (plaintex: string, hashtext: string): Promise<boolean> => {
        const result = await bcrypt.compare(plaintex, hashtext)
        return result
    }
}