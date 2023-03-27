export interface IHashManager {
    generateHash (plaintext: string): Promise<string>
    compareHash (plaintex: string, hashtext: string): Promise<boolean>
}