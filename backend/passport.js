import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { db } from './db.js';


//LOCAL SIGNUP
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: false
}, (email, password, done) => {
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [email], (err, results) => {
        if (err) return done(err);
        if (results.length === 0) return done(null, false, { message: "Incorrect credentials entered. Please try again."});

        const user = results[0]; //from databse
        bcrypt.compare(password, user.password, (err, isValidPassword) => {
            if (err) return done(err)
            if (!isValidPassword) return done(null, false, { message: "Incorrect credentials entered. Please try again."});
            return done(null, user); //return user if valid credentials
        });
    });
    }
));

//determines which data of the user object should be stored in the session
passport.serializeUser((user, done) => {
    done(null, user)
});

// called on every request by a logged-in user. It uses the id stored in the session to fetch the complete user object from the database.
passport.deserializeUser((uuid, done) => {
    const q = "SELECT * FROM users WHERE uuid = ?";
    db.query(q, [uuid], (err, results) => {
        if (err) return done(err);
        done(null, results[0]);
    })
});

export default passport;

// User Login:

// The user logs in using their email and password.
// LocalStrategy verifies the credentials and returns the user object.
// serializeUser is called, storing the user ID in the session.
// Subsequent Requests:

// For each subsequent request made by the authenticated user, Passport retrieves the user ID from the session.
// deserializeUser uses the user ID to fetch the full user object from the database.
// The user object is then attached to the request object, allowing the application to access the user's information.
// By using serializeUser and deserializeUser, Passport.js effectively manages user sessions, ensuring that the application can identify and authenticate users across multiple requests.