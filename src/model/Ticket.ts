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

export interface outputGetAllTicketsDTO {
    id: string,
    ticket_name: string,
    price: number,
    tickets_available: number,
    tickets_sold: number,
    week_day: string,
    start_time: string,
    end_time: string,
    band_name: string,
    music_genre: string
}

export interface inputEditTicketPriceDTO {
    ticketId: string,
    price: number,
    token: string
}