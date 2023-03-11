export enum USER_ROLES {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
}

export class User {
    constructor (private id: string, private name: string, private email: string, private password: string, private role: USER_ROLES) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.role = role        
    }
}