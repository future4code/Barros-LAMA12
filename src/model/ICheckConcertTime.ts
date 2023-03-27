export interface ICheckConcertTime {
    startTimeFormat (startTime: string): void
    endTimeFormat (endTime: string): void
    concertDuration (startTime: string, endTime: string): void
    duplicateConcert (weekDay: string, startTime: string, endTime: string, id: string): Promise<void>
}