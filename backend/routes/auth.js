import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js'

const router = express.Router();


router.post("/register", async (req, res) => {
    try {
        const uuid = uuidv4();
        const { firstname, lastname, email, gender, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        //Check if email already exists
        db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
            if (err) {
                return res.status(500).send({ message: "Server error, unable to verify if email exist in database." })
            };
            if (results.length > 0) {
                return res.status(400).send({ message: "Email is already taken. Please use a different one."});
            };
            
            //Insert new user into the database
            const q = "INSERT INTO users (uuid, firstname, lastname, email, gender, password) VALUES (?, ?, ?, ?, ?, ?)";
            db.query(q, [uuid, firstname, lastname, email, gender, hashedPassword], (err, data) => {
                if (err) {
                    return res.status(500).send("Server error, unable to register user.");
                }
                req.logIn({ uuid, firstname, lastname, email, gender }, (err) => {
                    if (err) return res.json(500).send({ message: "Unable to login" })
                    res.status(201).json({ message: "Congratulations! Account has been registered successfully! Enjoy Shopping!", user: {uuid, firstname, lastname, email, gender} });
                });             
            });
        });
    } catch (error) {
        res.status(500).send('Registration server error.')
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({message: info.message});

        req.logIn(user, (err) => {
            if (err) return next(err);
            req.session.user_id = user.uuid //store user id into the session
            return res.json({ message: `Welcome back, ${user.firstname}! Shop more, save more!`, user })
        });
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect(process.env.CLIENT_URL);
    });
});

router.get('/checkAuth', (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({ isAuthenticated: true, user: req.user});
    } else {
        return res.json({ isAuthenticated: false })
    }
});

export default router;