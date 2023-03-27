import { PhotoBusiness } from "../../src/business/PhotoBusiness"
import { CustomError } from "../../src/error/CustomError"
import { AuthenticatorMock } from "../mocks/AuthenticatorMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { PhotoDatabaseMock } from "../mocks/PhotoDatabaseMock"


const photoBusiness = new PhotoBusiness(
    new PhotoDatabaseMock(),
    new AuthenticatorMock(),
    new IdGeneratorMock()
)

describe("Testing the create photo method", () => {
    test("Should not receive the photo url and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            photoUrl: "",
            weekDay: "friday",
            token: "token"
        }

        try {
            await photoBusiness.createPhoto(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the photo url.")
        }
    })

    test("Should receive an invalid week day and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            photoUrl: "www.photo.com.br",
            weekDay: "fridays",
            token: "token"
        }

        try {
            await photoBusiness.createPhoto(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The week day can only be friday, saturday or sunday.")
        }
    })

    test("Should receive a valid input and NOT return a custom error", async () => {
        const input = {
            photoUrl: "www.photo.com.br",
            weekDay: "friday",
            token: "token"
        }

        const result = await photoBusiness.createPhoto(input)
        expect(result).not.toBeDefined()
    })
})


describe("Testing the get all photos method", () => {    
    test("Should not receive the week day and return a custom error", async () => {
        expect.assertions(3)

        const weekDay = ""

        try {
            await photoBusiness.getAllPhotos(weekDay)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the week day.")
        }
    })
    
    test("Should receive an invalid week day and return a custom error", async () => {
        expect.assertions(3)

        const weekDay = "thursday"

        try {
            await photoBusiness.getAllPhotos(weekDay)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The week day can only be friday, saturday or sunday.")
        }
    })

    test("Should receive a valid input and NOT return a custom error", async () => {
        const weekDay = "friday"

        const result = await photoBusiness.getAllPhotos(weekDay)
        expect(result).toEqual([
            {
                id: "photoId1",
                photo_url: "www.photo1.com.br",
                week_day: "friday",
                created_at: "2023-03-15"
            },
            {
                id: "photoId2",
                photo_url: "www.photo2.com.br",
                week_day: "friday",
                created_at: "2023-03-15"
            }
        ])
    })
})


describe("Testing the delete photo method", () => {
    test("Should not receive the token and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            photoId: "photoId2",
            token: ""
        }

        try {
            await photoBusiness.deletePhoto(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the token.")
        }
    })

    test("Should receive an invalid token and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            photoId: "photoId2",
            token: "invalidToken"
        }

        try {
            await photoBusiness.deletePhoto(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Unauthorized user.")
        }
    })

    test("Should not receive the photo id and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            photoId: ":photoId",
            token: "token"
        }

        try {
            await photoBusiness.deletePhoto(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the photo id.")
        }
    })

    test("Should receive an invalid photo id and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            photoId: "photoId33",
            token: "token"
        }

        try {
            await photoBusiness.deletePhoto(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Photo id not found.")
        }
    })

    test("Should receive a valid photo id and NOT return a custom error", async () => {
        const input = {
            photoId: "photoId2",
            token: "token"
        }

        const result = await photoBusiness.deletePhoto(input)
        expect(result).not.toBeDefined()
    })
})