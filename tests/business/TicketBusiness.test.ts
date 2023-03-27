import { TicketBusiness } from "../../src/business/TicketBusiness"
import { CustomError } from "../../src/error/CustomError"
import { AuthenticatorMock } from "../mocks/AuthenticatorMock"
import { ConcertDatabaseMock } from "../mocks/ConcertDatabaseMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TicketDatabaseMock } from "../mocks/TicketDatabaseMock"

const ticketBusiness = new TicketBusiness(
    new TicketDatabaseMock(),
    new ConcertDatabaseMock(),
    new AuthenticatorMock(),
    new IdGeneratorMock()
)

describe("Testing the create ticket method", () => {
    test("Should not receive the token and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            ticketName: "Ticket name",
            price: 250,
            concertId: "concertId3",
            ticketsAvailable: 20000,
            token: ""
        }
        
        try {
            await ticketBusiness.createTicket(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the token.")
        }
    })

    test("Should receive an invalid token and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            ticketName: "Ticket name",
            price: 250,
            concertId: "concertId3",
            ticketsAvailable: 20000,
            token: "invalidToken"
        }
        
        try {
            await ticketBusiness.createTicket(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Unauthorized user.")
        }
    })

    test("Should not receive the ticket name and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            ticketName: "",
            price: 250,
            concertId: "concertId3",
            ticketsAvailable: 20000,
            token: "token"
        }
        
        try {
            await ticketBusiness.createTicket(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the name of the ticket.")
        }
    })

    test("Should receive an invalid concertId and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            ticketName: "Nome do ticket",
            price: 250,
            concertId: "concertId25",
            ticketsAvailable: 20000,
            token: "token"
        }
        
        try {
            await ticketBusiness.createTicket(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Concert id not found.")
        }
    })

    test("Should receive a concertId that already has a ticket registered and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            ticketName: "Nome do ticket",
            price: 250,
            concertId: "concertId2",
            ticketsAvailable: 20000,
            token: "token"
        }
        
        try {
            await ticketBusiness.createTicket(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(409)
            expect(error.message).toBe("There is already a registered ticket for this concert.")
        }
    })

    test("Should receive a negative price and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            ticketName: "Nome do ticket",
            price: -250,
            concertId: "concertId2",
            ticketsAvailable: 20000,
            token: "token"
        }
        
        try {
            await ticketBusiness.createTicket(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The price of the ticket must be higher than zero.")
        }
    })

    test("Should receive a negative number of available tickets and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            ticketName: "Nome do ticket",
            price: 250,
            concertId: "concertId2",
            ticketsAvailable: -20000,
            token: "token"
        }
        
        try {
            await ticketBusiness.createTicket(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The number of tickets available for purchase must be higher than zero.")
        }
    })

    test("Should receive a valid input and NOT return a custom error", async () => {
        const input = {
            ticketName: "Nome do ticket",
            price: 250,
            concertId: "concertId3",
            ticketsAvailable: 20000,
            token: "token"
        }
        
        const result = await ticketBusiness.createTicket(input)
        expect(result).not.toBeDefined()
    })
})


describe("Testing the purchase ticket method", () => {
    test("Should not receive a ticketId and return a custom error", async () => {
        expect.assertions(3)
        
        const tickets = [
            {ticketId: "", units: 2},
            {ticketId: "ticketId1", units: 1}
        ]
        const input = {
            tickets,
            token: "token"   
        }

        try {
            await ticketBusiness.purchaseTicket(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Ticket id not found.")
        }
    })

    test("Should receive an invalid ticketId and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            tickets: [
                {ticketId: "ticketId35", units: 2}
            ],
            token: "token"   
        }

        try {
            await ticketBusiness.purchaseTicket(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Ticket id not found.")
        }
    })

    test("Should receive a negative number of units and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            tickets: [
                {ticketId: "ticketId2", units: -2}
            ],
            token: "token"   
        }

        try {
            await ticketBusiness.purchaseTicket(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The number of tickets must be higher than zero.")
        }
    })

    test("Should receive a valid input and NOT return a custom error", async () => {
        const input = {
            tickets: [
                {ticketId: "ticketId1", units: 2},
                {ticketId: "ticketId2", units: 3}
            ],
            token: "token"   
        }

        const result = await ticketBusiness.purchaseTicket(input)
        expect(result).not.toBeDefined()
    })
})


describe("Testing the get all tickets method", () => {
    test("Should not receive the week day and return a custom error", async () => {
        expect.assertions(3)
        
        const weekDay = ""

        try {
            await ticketBusiness.getAllTickets(weekDay)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the week day.")
        }
    })

    test("Should receive an invalid week day and return a custom error", async () => {
        expect.assertions(3)
        
        const weekDay = "fridays"

        try {
            await ticketBusiness.getAllTickets(weekDay)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The week day can only be friday, saturday or sunday.")
        }
    })

    test("Should receive a valid input and NOT return a custom error", async () => {
        const weekDay = "friday"

        const result = await ticketBusiness.getAllTickets(weekDay)
        expect(result).toEqual([
            {
                id: "ticketId1",
                ticket_name: "Nome do ticket 1",
                price: 200,
                tickets_available: 20000,
                tickets_sold: 0,
                week_day: "friday",
                concert_id: "concertId2"
            },
            {
                id: "ticketId2",
                ticket_name: "Nome do ticket 2",
                price: 150,
                tickets_available: 20000,
                tickets_sold: 0,
                week_day: "friday",
                concert_id: "concertId1"
            }
        ])  
    })
})


describe("Testing the getAllPurchasesByUserId method", () => {
    test("Should not receive the token and return a custom error", async () => {
        expect.assertions(3)
        
        const token = ""

        try {
            await ticketBusiness.getAllPurchasesByUserId(token)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the token.")
        }
    })

    test("Should receive an invalid token and return a custom error", async () => {
        expect.assertions(3)
        
        const token = "invalidToken"

        try {
            await ticketBusiness.getAllPurchasesByUserId(token)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Unauthorized user.")
        }
    })

    test("Should receive a valid token and NOT return a custom error", async () => {
        const token = "token"
        const result = await ticketBusiness.getAllPurchasesByUserId(token)
        expect(result).toEqual([
            {
                id: "purchaseId1",
                user_id: "id",
                ticket_id: "ticketId1",
                units: 2,
                total_price: 400
            },
            {
                id: "purchaseId2",
                user_id: "id",
                ticket_id: "ticketId2",
                units: 1,
                total_price: 150
            }
        ])
    })
})


describe("Testing the update ticket price method", () => {
    test("Should receive an invalid token and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            ticketId: "ticketId2",
            price: 100,
            token: "invalidToken"
        }

        try {
            await ticketBusiness.updateTicketPrice(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Unauthorized user.")
        }
    })

    test("Should receive an invalid ticket id and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            ticketId: "ticketId25",
            price: 100,
            token: "token"
        }

        try {
            await ticketBusiness.updateTicketPrice(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Ticket id not found.")
        }
    })

    test("Should receive a negative ticket price and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            ticketId: "ticketId2",
            price: -100,
            token: "token"
        }

        try {
            await ticketBusiness.updateTicketPrice(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The price of the ticket must be higher than zero.")
        }
    })

    test("Should receive a valid input and NOT return a custom error", async () => {        
        const input = {
            ticketId: "ticketId2",
            price: 100,
            token: "token"
        }

        const result = await ticketBusiness.updateTicketPrice(input)
        expect(result).not.toBeDefined()
    })
})