import { USER_ROLES } from "../../src/model/User"

export const users = [
    {
        id: "id",
        name: "Nome teste 1",
        email: "teste1@email1.com",
        password: "12345678",
        role: USER_ROLES.ADMIN
    },
    {
        id: "id2",
        name: "Nome teste 2",
        email: "teste2@email2.com",
        password: "12345678",
        role: USER_ROLES.NORMAL
    },
    {
        id: "id3",
        name: "Nome teste 3",
        email: "teste3@email3.com",
        password: "12345678",
        role: USER_ROLES.NORMAL
    }
]