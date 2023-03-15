import { IIdGenerator } from "../../src/model/IIdGenerator"


export class IdGeneratorMock implements IIdGenerator {
    public generateId = jest.fn(() => {
        return "id"
    })
}