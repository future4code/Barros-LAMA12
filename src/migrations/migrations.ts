import { connection } from "./connection"


const createTables = () => connection.raw(`
    CREATE TABLE IF NOT EXISTS LAMA_USERS (
        id CHAR(36) NOT NULL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        role ENUM("ADMIN", "NORMAL") DEFAULT "NORMAL"
    );

    CREATE TABLE IF NOT EXISTS LAMA_BANDS (
        id CHAR(36) NOT NULL PRIMARY KEY,
        name VARCHAR(80) UNIQUE NOT NULL,
        music_genre VARCHAR(40) NOT NULL,
        responsible VARCHAR(100) UNIQUE NOT NULL 
    );

    CREATE TABLE IF NOT EXISTS LAMA_CONCERTS (
        id CHAR(36) NOT NULL PRIMARY KEY,
        week_day VARCHAR(30) NOT NULL,
        start_time TIME(0) NOT NULL,
        end_time TIME(0) NOT NULL,
        band_id CHAR(36) NOT NULL,
        FOREIGN KEY(band_id) REFERENCES LAMA_BANDS(id)
    );
`).then(() => {
    console.log('Tabelas criadas.')
    connection.destroy()
}).catch(error => console.log(error.sqlMessage || error.message))

createTables()