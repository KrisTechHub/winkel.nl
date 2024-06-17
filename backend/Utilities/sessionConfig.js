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
        database: process.env.MYSQL_ADDON_DB
    }),
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true, //cookies that are set through the session, are only accessible over HTTP, they're not accessible through JavaScript.
        // expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24, //24 hours
        secure: false,
    }
}

console.log(sessionConfig.store);

export default sessionConfig;