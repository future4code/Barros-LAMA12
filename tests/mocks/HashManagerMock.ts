import { IHashManager } from "../../src/model/IHashManager"


export class HashManagerMock implements IHashManager {
    public generateHash = jest.fn(async (plaintext: string) => {
        return "hash"
    }) 

    public compareHash = jest.fn(async (plaintext: string, hashText: string) => {
        return plaintext === hashText
    })
}