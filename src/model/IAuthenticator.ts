import { AuthenticationData } from "./AuthenticationData"


export interface IAuthenticator {
    generateToken ({id, role}: AuthenticationData): string
    getTokenData (token: string): AuthenticationData
}