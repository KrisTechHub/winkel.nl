import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

export const db = mysql.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port: process.env.MYSQL_ADDON_PORT
    // host: "localhost",
    // user: "root",
    // password: "password",
    // database: "winkel.nl",
})

