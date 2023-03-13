export class Ticket {
    constructor (
        public readonly id: string,
        public readonly ticket_name: string,
        public readonly price: number, 
        public readonly tickets_available: number,
        public readonly tickets_sold: number,
        public readonly concert_id: string
    ) {
        this.id = id
        this.ticket_name = ticket_name
        this.price = price
        this.tickets_available = tickets_available
        this.tickets_sold = tickets_sold
        this.concert_id = concert_id
    }
}

export interface inputCreateTicketDTO {
    ticketName: string,
    price: number,
    concertId: string,
    ticketsAvailable: number,
    token: string
}