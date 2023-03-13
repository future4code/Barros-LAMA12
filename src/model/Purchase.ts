export class Purchase {
    constructor (
        public readonly id: string,
        public readonly user_id: string,
        public readonly ticket_id: string,
        public readonly units: number,
        public readonly total_price: number
    ) {
        this.id = id
        this.user_id = user_id
        this.ticket_id = ticket_id
        this.units = units
        this.total_price = total_price
    }
}

export interface inputPurchaseTicketDTO {
    ticketId: string,
    units: number,
    token: string
}