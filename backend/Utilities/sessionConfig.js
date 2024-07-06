import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';

const MySQLStore = MySQLStoreFactory(session);

const sessionConfig = {
    key: 'session_cookie_name',
    name: 'session',
    secret: 'session_cookie_secret',
    store: new MySQLStore({
        host: process.env.MYSQL_ADDON_HOST,
        port: process.env.MYSQL_ADDON_PORT,
        user: process.env.MYSQL_ADDON_USER,
        password: process.env.MYSQL_ADDON_PASSWORD,
        database: process.env.MYSQL_ADDON_DB,

        // host: "localhost",
        // port: 3306,
        // user: "root",
        // password: "password",
        // database: "cookie_user",
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true, //cookies that are set through the session, are only accessible over HTTP, they're not accessible through JavaScript.
        maxAge: 1000 * 60 * 60 * 24, //24 hours
        secure: true,
    }
}


export default sessionConfig;