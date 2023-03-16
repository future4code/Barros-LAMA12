import { BandBusiness } from "../../src/business/BandBusiness"
import { CustomError } from "../../src/error/CustomError"
import { AuthenticatorMock } from "../mocks/AuthenticatorMock"
import { BandDatabaseMock } from "../mocks/BandDatabaseMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"


const bandBusiness = new BandBusiness(
    new BandDatabaseMock(),
    new AuthenticatorMock(),
    new IdGeneratorMock()
)


describe("Testing the create band method", () => {
    test("Should not receive the token and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            name: "Banda",
            musicGenre: "Pop",
            responsible: "Responsável",
            token: ""
        }

        try {
            await bandBusiness.createBand(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the token.")
        }
    })

    test("Should not receive an invalid token and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            name: "Banda",
            musicGenre: "Pop",
            responsible: "Responsável",
            token: "invalidToken"
        }

        try {
            await bandBusiness.createBand(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Unauthorized user.")
        }
    })

    test("Should not receive the band name and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            name: "",
            musicGenre: "Pop",
            responsible: "Responsável",
            token: "token"
        }

        try {
            await bandBusiness.createBand(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the band name.")
        }
    })

    test("Should receive a band name already in use and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            name: "Nome da banda 1",
            musicGenre: "Pop",
            responsible: "Responsável",
            token: "token"
        }

        try {
            await bandBusiness.createBand(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(409)
            expect(error.message).toBe("Band name already registered.")
        }
    })

    test("Should receive a valid input and not return a custom error", async () => {
        const input = {
            name: "Nome da banda 4",
            musicGenre: "Pop",
            responsible: "Responsável",
            token: "token"
        }

        const result = await bandBusiness.createBand(input)
        expect(result).not.toBeDefined()
    })
})


describe("Testing the get band info method", () => {
    test("Should receive neither the id nor the name of the band and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            id: "",
            name: ""
        }

        try {
            await bandBusiness.getBandInfo(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the id or the name of the band.")
        }
    })

    test("Should receive both the id and the name of the band and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            id: "bandId",
            name: "Nome da banda 1"
        }

        try {
            await bandBusiness.getBandInfo(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide either the band id or the band name.")
        }
    })

    test("Should receive a band id that does not exist and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            id: "bandId40",
            name: ""
        }

        try {
            await bandBusiness.getBandInfo(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Band id not found.")
        }
    })

    test("Should receive a band name that does not exist and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            id: "",
            name: "Banda 40"
        }

        try {
            await bandBusiness.getBandInfo(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Band name not found.")
        }
    })

    test("Should receive a valid input and NOT return a custom error", async () => {
        const input = {
            id: "",
            name: "Nome da banda 1"
        }

        const result = await bandBusiness.getBandInfo(input)
        expect(result).toEqual({id: "bandId", name: "Nome da banda 1", music_genre: "Pop", responsible: "Responsável 1"})
    })
})