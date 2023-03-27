import { User } from "../User"


export interface UserRepository {
    signup (newUser: User): Promise<void>
    getUserBy (column: string, value: string): Promise<User | undefined>
}