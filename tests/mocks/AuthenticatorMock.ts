import { Unauthorized } from "../../src/error/UserErrors"
import { IAuthenticator } from "../../src/model/IAuthenticator"
import { USER_ROLES } from "../../src/model/User"


export class AuthenticatorMock implements IAuthenticator {
    public generateToken = jest.fn(() => {
        return "token"
    })

    public getTokenData = jest.fn((token: string) => {
        if (token !== "token") {
            throw new Unauthorized()
        }
        
        return {id: "id", role: USER_ROLES.ADMIN}
    })
}