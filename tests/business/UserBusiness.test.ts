import { UserBusiness } from "../../src/business/UserBusiness";
import { CustomError } from "../../src/error/CustomError";
import { USER_ROLES } from "../../src/model/User";
import { AuthenticatorMock } from "../mocks/AuthenticatorMock";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";


const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new AuthenticatorMock()
)

describe("Testing the signup method", () => {
    test("Should receive an input with no name and return a custom error", async () => {
        expect.assertions(3)
        try {
            const input = {
                name: "",
                email: "teste@teste.com",
                password: "12345678",
                role: USER_ROLES.ADMIN
            }

            await userBusiness.signup(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the user name.")
        }
    })

    test("Should receive an input with an invalid email and return a custom error", async () => {
        expect.assertions(3)
        try {
            const input = {
                name: "Fernanda Monteiro",
                email: "teste",
                password: "12345678",
                role: USER_ROLES.ADMIN
            }

            await userBusiness.signup(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Invalid email address.")
        }
    })

    test("Should receive an input with an invalid password and return a custom error", async () => {
        expect.assertions(3)
        try {
            const input = {
                name: "Fernanda Monteiro",
                email: "teste@teste.com",
                password: "123",
                role: USER_ROLES.ADMIN
            }

            await userBusiness.signup(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The password must have at least 8 characters.")
        }
    })

    test("Should receive an email already registered and return a custom error", async () => {
        expect.assertions(3)
        try {
            const input = {
                name: "Fernanda Monteiro",
                email: "teste1@email1.com",
                password: "12345678",
                role: USER_ROLES.ADMIN
            }

            await userBusiness.signup(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(409)
            expect(error.message).toBe("Email already in use.")
        }
    })

    test("Should receive a valid input and return a token", async () => {
        const input = {
            name: "Fernanda Monteiro",
            email: "fernanda.monteiro@gmail.com",
            password: "12345678",
            role: USER_ROLES.ADMIN
        }

        const result = await userBusiness.signup(input)
        expect(result).toBe("token")
    })
})


describe("Testing the login method", () => {
    test("Should receive an input with no password and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            email: "mariliapereira@gmail.com",
            password: ""
        }

        try {
            await userBusiness.login(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the password.")
        }
    })

    test("Should receive an email not registered and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            email: "mariliapereira@gmail",
            password: "12345678"
        }

        try {
            await userBusiness.login(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Email address not found.")
        }
    })

    test("Should receive an incorrect password and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            email: "teste1@email1.com",
            password: "12345678910"
        }

        try {
            await userBusiness.login(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Incorrect password.")
        }
    })

    test("Should receive a valid input and return a token", async () => {
        
        const input = {
            email: "teste1@email1.com",
            password: "12345678"
        }

        const result = await userBusiness.login(input)
        expect(result).toBe("token")
    })
})