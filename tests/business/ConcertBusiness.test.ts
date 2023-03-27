import { ConcertBusiness } from "../../src/business/ConcertBusiness"
import { CustomError } from "../../src/error/CustomError"
import { CheckConcertTime } from "../../src/utils/CheckConcertTime"
import { AuthenticatorMock } from "../mocks/AuthenticatorMock"
import { BandDatabaseMock } from "../mocks/BandDatabaseMock"
import { ConcertDatabaseMock } from "../mocks/ConcertDatabaseMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"

const concertBusiness = new ConcertBusiness(
    new ConcertDatabaseMock(),
    new BandDatabaseMock(),
    new AuthenticatorMock(),
    new IdGeneratorMock(),
    new CheckConcertTime(new ConcertDatabaseMock())
)

describe("Testing the create concert method", () => {
    test("Should not receive the week day and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            weekDay: "",
            startTime: "08:00:00",
            endTime: "09:00:00",
            bandId: "bandId",
            token: "token"
        }
        
        try {
            await concertBusiness.createConcert(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the week day.")
        }
    })

    test("Should receive an invalid weekday and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            weekDay: "thursday",
            startTime: "08:00:00",
            endTime: "09:00:00",
            bandId: "bandId",
            token: "token"
        }
        
        try {
            await concertBusiness.createConcert(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The week day can only be friday, saturday or sunday.")
        }
    })

    test("Should receive an invalid startTime and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            weekDay: "friday",
            startTime: "07:00:00",
            endTime: "09:00:00",
            bandId: "bandId",
            token: "token"
        }
        
        try {
            await concertBusiness.createConcert(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The start time format must be hh:00:00 and cannot be earlier than 8am and later than 10pm.")
        }
    })

    test("Should receive an invalid endTime and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            weekDay: "friday",
            startTime: "22:00:00",
            endTime: "24:00:00",
            bandId: "bandId",
            token: "token"
        }
        
        try {
            await concertBusiness.createConcert(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The end time format must be hh:00:00 and cannot be earlier than 9am and later than 11pm.")
        }
    })

    test("Should receive the same startTime and endTime and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            weekDay: "friday",
            startTime: "21:00:00",
            endTime: "21:00:00",
            bandId: "bandId",
            token: "token"
        }
        
        try {
            await concertBusiness.createConcert(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The duration of the concert cannot be less than 1 hour or higher than 2 hours.")
        }
    })

    test("Should exceed 2 hours of concert duration and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            weekDay: "friday",
            startTime: "12:00:00",
            endTime: "15:00:00",
            bandId: "bandId",
            token: "token"
        }
        
        try {
            await concertBusiness.createConcert(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The duration of the concert cannot be less than 1 hour or higher than 2 hours.")
        }
    })

    test("Should receive the startTime in the wrong format and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            weekDay: "friday",
            startTime: "12:30:00",
            endTime: "13:00:00",
            bandId: "bandId",
            token: "token"
        }
        
        try {
            await concertBusiness.createConcert(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The start time format must be hh:00:00 and cannot be earlier than 8am and later than 10pm.")
        }
    })

    test("Should receive a band id that is not registered in the db and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            weekDay: "friday",
            startTime: "12:00:00",
            endTime: "13:00:00",
            bandId: "bandId40",
            token: "token"
        }
        
        try {
            await concertBusiness.createConcert(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Band id not found.")
        }
    })

    test("Should receive a startTime that is already registered in the db and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            weekDay: "friday",
            startTime: "08:00:00",
            endTime: "09:00:00",
            bandId: "bandId",
            token: "token"
        }
        
        try {
            await concertBusiness.createConcert(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(409)
            expect(error.message).toBe("There is a concert already registered in this period of time.")
        }
    })

    test("Should receive a concert time that is already registered in the db and return a custom error", async () => {
        expect.assertions(3)

        const input = {
            weekDay: "friday",
            startTime: "10:00:00",
            endTime: "11:00:00",
            bandId: "bandId",
            token: "token"
        }
        
        try {
            await concertBusiness.createConcert(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(409)
            expect(error.message).toBe("There is a concert already registered in this period of time.")
        }
    })

    test("Should receive a valid input and NOT return a custom error", async () => {
        const input = {
            weekDay: "sunday",
            startTime: "16:00:00",
            endTime: "18:00:00",
            bandId: "bandId",
            token: "token"
        }
        
        const result = await concertBusiness.createConcert(input)
        expect(result).not.toBeDefined()
    })
})


describe("Testing the get all concerts method", () => {
    test("Should receive an invalid weekday and resturn a custom error", async () => {
        expect.assertions(3)
        
        const weekDay = "fridays"

        try {
            await concertBusiness.getAllConcerts(weekDay)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The week day can only be friday, saturday or sunday.")
        }
    })

    test("Should receive a valid input and return the registered concerts", async () => {
        const weekDay = "friday"

        const result = await concertBusiness.getAllConcerts(weekDay)
        expect(result).toEqual([{
            id: "concertId1",
            week_day: "friday",
            start_time: "08:00:00",
            end_time: "09:00:00",
            name: "Nome da banda 1",
            music_genre: "Pop"
        },
        {
            id: "concertId2",
            week_day: "friday",
            start_time: "09:00:00",
            end_time: "11:00:00",
            name: "Nome da banda 2",
            music_genre: "Rock"
        }])
    })
})


describe("Testing the update concert method", () => {
    test("Should not receive the concert id and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            id: ":id",
            weekDay: "friday",
            startTime: "08:00:00",
            endTime: "09:00:00",
            token: "token"
        }

        try {
            await concertBusiness.updateConcert(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the concert id.")
        }
    })

    test("Should receive an invalid concert id and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            id: "4645464564",
            weekDay: "friday",
            startTime: "08:00:00",
            endTime: "09:00:00",
            token: "token"
        }

        try {
            await concertBusiness.updateConcert(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Concert id not found.")
        }
    })

    test("Should receive an invalid start time format and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            id: "concertId2",
            weekDay: "friday",
            startTime: "08:30:00",
            endTime: "09:00:00",
            token: "token"
        }

        try {
            await concertBusiness.updateConcert(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The start time format must be hh:00:00 and cannot be earlier than 8am and later than 10pm.")
        }
    })

    test("Should receive an invalid weekday and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            id: "concertId2",
            weekDay: "fridays",
            startTime: "08:00:00",
            endTime: "09:00:00",
            token: "token"
        }

        try {
            await concertBusiness.updateConcert(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The week day can only be friday, saturday or sunday.")
        }
    })

    test("Should receive an invalid concert duration and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            id: "concertId2",
            weekDay: "friday",
            startTime: "09:00:00",
            endTime: "09:00:00",
            token: "token"
        }

        try {
            await concertBusiness.updateConcert(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The duration of the concert cannot be less than 1 hour or higher than 2 hours.")
        }
    })

    test("Should receive a concert time already registered in the db and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            id: "concertId2",
            weekDay: "saturday",
            startTime: "12:00:00",
            endTime: "13:00:00",
            token: "token"
        }

        try {
            await concertBusiness.updateConcert(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(409)
            expect(error.message).toBe("There is a concert already registered in this period of time.")
        }
    })

    test("Should receive a valid input and NOT return a custom error", async () => {
        const input = {
            id: "concertId2",
            weekDay: "friday",
            startTime: "12:00:00",
            endTime: "13:00:00",
            token: "token"
        }

        const result = await concertBusiness.updateConcert(input)
        expect(result).not.toBeDefined()
    })
})