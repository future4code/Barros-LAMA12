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

    CREATE TABLE IF NOT EXISTS LAMA_TICKETS (
        id CHAR(36) NOT NULL PRIMARY KEY,
        ticket_name VARCHAR(40) NOT NULL,
        price DECIMAL(5,2) NOT NULL, 
        tickets_available INT NOT NULL,
        tickets_sold INT DEFAULT 0,
        concert_id CHAR(36) NOT NULL,
        FOREIGN KEY(concert_id) REFERENCES LAMA_CONCERTS(id)
    );

    CREATE TABLE IF NOT EXISTS LAMA_PURCHASES (
        id CHAR(36) NOT NULL PRIMARY KEY,
        user_id CHAR(36) NOT NULL,
        ticket_id CHAR(36) NOT NULL,
        units INT NOT NULL,
        total_price DECIMAL(5,2) NOT NULL,
        FOREIGN KEY(user_id) REFERENCES LAMA_USERS(id),
        FOREIGN KEY(ticket_id) REFERENCES LAMA_TICKETS(id)
    );

    CREATE TABLE IF NOT EXISTS LAMA_PHOTOS (
        id CHAR(36) NOT NULL PRIMARY KEY,
        photo_url VARCHAR(255) NOT NULL,
        week_day VARCHAR(30) NOT NULL,
        created_at DATE NOT NULL
    );
`).then(() => {
    console.log('Tabelas criadas.')
    connection.destroy()
}).catch(error => console.log(error.sqlMessage || error.message))

createTables()