import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';

const MySQLStore = MySQLStoreFactory(session);

const sessionConfig = {
    key: 'session_cookie_name',
    name: 'session',
    secret: 'session_cookie_secret',
    store: new MySQLStore({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "cookie_user"
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

export default sessionConfig;