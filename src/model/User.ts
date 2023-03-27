export enum USER_ROLES {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
}

export class User {
    constructor (
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: USER_ROLES
    ) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.role = role        
    }
}

export interface inputSignUpDTO {
    email: string,
    password: string,
    name: string,
    role: string
}

export interface loginInputDTO {
    email: string,
    password: string
}

export interface outputGetAccountInfoDTO {
    id: string,
    name: string,
    email: string,
    role: USER_ROLES
}