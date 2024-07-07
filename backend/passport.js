import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
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

//GOOGLE SIGN IN
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.CLIENT_URL}/auth/google/callback`,
}, 
function(accessToken, refreshToken, profile, done) {
    // console.log('profile from passport config',profile);
    db.query('SELECT * FROM users WHERE uuid = ?', [profile.id], (err, res) => {
        if (err) return done(err);
        if (res.length > 0) {
            return done(null, res[0]);
        } else {
            let newUser = {
                uuid: profile.id,
                firstname: profile.name.givenName,
                lastname: profile.name.familyName,
                email: profile.emails[0].value,
                isSeller: 0,
                gender: 'Female',
            }
            // Insert new user
            const insertUserQuery = 'INSERT INTO users (uuid, firstname, lastname, email, gender, password, isSeller) VALUES (?, ?, ?, ?, ?, ?, ?)';
            db.query(insertUserQuery, [newUser.uuid,  newUser.firstname,  newUser.lastname, newUser.email, newUser.gender, null, newUser.isSeller], (err) => {
                if (err) return done(err);
                return done(null, newUser);
            });
        }
    });
}));


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.CLIENT_URL}/auth/facebook/callback`,
}, function (accessToken, refreshToken, profile, done) {
    db.query('SELECT * FROM users WHERE uuid = ?', [profile.id], (err, res) => {
        if (err) return done(err);
        if (res.length > 0) {
            return done(null, res[0]);
        } else {
            return done(null, profile);
        }
    })
}
));

//TWITTER SIGN IN
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_SECRET,
    callbackURL: `${process.env.CLIENT_URL}/auth/twitter/callback`,
    includeEmail: true
}, 
function(accessToken, refreshToken, profile, done) {
    // console.log('profile from passport config',profile);
    db.query('SELECT * FROM users WHERE uuid = ?', [profile.id], (err, res) => {
        if (err) return done(err);
        if (res.length > 0) {
            return done(null, res[0]);
        } else {
            console.log(profile);
            let newUser = {
                uuid: profile.id,
                firstname: profile.displayName,
                lastname: '',
                email: profile.emails ? profile.emails[0].value : null, // Handle missing email
                isSeller: 0,
                gender: 'Female',
            };
            const insertUserQuery = 'INSERT INTO users (uuid, firstname, lastname, email, gender, password, isSeller) VALUES (?, ?, ?, ?, ?, ?, ?)';
            db.query(insertUserQuery, [newUser.uuid, newUser.firstname, newUser.lastname, newUser.email, newUser.gender, null, newUser.isSeller], (err) => {
                if (err) {
                    console.error('Error inserting user:', err);
                    return done(err);
                }
                console.log('Successfully entered Twitter info into database');
                return done(null, newUser);
            });
        }
    });
}));

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