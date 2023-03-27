import { CustomError } from "./CustomError"


export class Unauthorized extends CustomError {
    constructor () {
        super (401, "Unauthorized user.")
    }
}

export class UserNotFound extends CustomError {
    constructor () {
        super (404, "User id not found.")
    }
}

export class MissingToken extends CustomError {
    constructor () {
        super (422, "Provide the token.")
    }
}

export class MissingUserName extends CustomError {
    constructor () {
        super (422, "Provide the user name.")
    }
}

export class MissingEmail extends CustomError {
    constructor () {
        super (422, "Provide the email address.")
    }
}

export class InvalidEmail extends CustomError {
    constructor () {
        super (422, "Invalid email address.")
    }
}

export class EmailNotFound extends CustomError {
    constructor () {
        super (404, "Email address not found.")
    }
}

export class DuplicateEmail extends CustomError {
    constructor () {
        super (409, "Email already in use.")
    }
}

export class MissingPassword extends CustomError {
    constructor () {
        super (422, "Provide the password.")
    }
}

export class InvalidPassword extends CustomError {
    constructor () {
        super (422, "The password must have at least 8 characters.")
    }
}

export class IncorrectPassword extends CustomError {
    constructor () {
        super (422, "Incorrect password.")
    }
}

export class MissingUserRole extends CustomError {
    constructor () {
        super (422, "Provide the user role.")
    }
}