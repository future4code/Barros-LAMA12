import { UserRepository } from "../../src/model/Repositories/UserRepository"
import { User } from "../../src/model/User"
import { users } from "./usersMock"


export class UserDatabaseMock implements UserRepository {
    async signup (newUser: User): Promise<void> {}

    async getUserBy (column: string, value: string): Promise<User | undefined> {
        const result = users.filter(item => item.id === value || item.email === value)
        return result[0]
    }
}