import { v4 } from "uuid"
import { IIdGenerator } from "../model/IIdGenerator"


export class IdGenerator implements IIdGenerator {
    generateId (): string {
        return v4()
    }
}