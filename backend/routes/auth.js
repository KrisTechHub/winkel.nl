import express from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db.js'
import { ensureHttps } from '../Utilities/middleware.js';

const router = express.Router();

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        succcess: false, 
        message: 'Authentication failed'
    });
})

router.post("/register", async (req, res) => {
    try {
        const uuid = uuidv4();
        const { firstname, lastname, email, gender, password, isSeller } = req.body;
        const isSellerBool = Boolean(isSeller);  // Ensure isSeller is boolean
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
            const q = "INSERT INTO users (uuid, firstname, lastname, email, gender, password, isSeller) VALUES (?, ?, ?, ?, ?, ?, ?)";
            db.query(q, [uuid, firstname, lastname, email, gender, hashedPassword, isSellerBool], (err, data) => {
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
        // console.log('user from /login',user);
        req.logIn(user, (err) => {
            console.log(user);
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

// router.get("/login/success", (req, res) => {
//     console.log("Req.user to /login/success:", req.user); // Log request details
//     console.log("Req to /login/success:", req); // Log request details

//     try {
//         if (req.user) {
//             console.log('user from /login/success',req.user);
//             return res.status(200).json({
//                 success: true,
//                 message: "Authentication successful",
//                 user: req.user,
//             });
//         } else {
//             console.log('error from /login/success');
//             return res.status(401).json({
//                 success: false,
//                 message: "Authentication failed",
//             });
//         }
//     } catch (err) {
//         console.error("Error in /login/success route:", err);
//         return res.status(500).json({
//             success: false,
//             message: "Server error, unable to process login success request",
//         });
//     }
// });



// Google OAuth route
router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get("/google/callback", ensureHttps, passport.authenticate('google', {
    failureRedirect: "/login/failed"
}), function (req, res) {
    const user = req.user;
    req.logIn(user, (err) => {
        if (err) {
            return res.status(500).json({ message: "Unable to log in" });
        }
        req.session.user_id = user.uuid;
        // return res.json({ message: `Welcome to Winkel.nl, ${user.firstname}! Shop more, save more!`, user})
        res.redirect(`${process.env.CLIENT_URL}/auth/success?user=${encodeURIComponent(JSON.stringify(user))}`);
    });
});

// Facebook Auth route
router.get("/facebook", passport.authenticate('facebook', {scope: ['profile', 'email'] }));

// Facebook Auth callback route
router.get("/facebook/callback", ensureHttps, passport.authenticate('facebook', {
    failureRedirect: '/login/failed',
}, function (req, res) {
    const user = req.user;
    console.log('user from facebook route',user);
    req.logIn(user, (err) => {
        if (err) {
            console.error( '/facebook error',err); // Log the error
            return res.status(500).json({ message: "Unable to log in" });
        }
        req.session.user_id = user.uuid;
        // return res.json({ message: `Welcome to Winkel.nl, ${user.firstname}! Shop more, save more!`, user})
        res.redirect(`${process.env.CLIENT_URL}/auth/success?user=${encodeURIComponent(JSON.stringify(user))}`);
    });
}))

// twitter Auth route
router.get("/twitter", passport.authenticate('twitter', {scope: ['profile', 'email'] }));

// twitter Auth callback route
router.get("/twitter/callback", ensureHttps, passport.authenticate('twitter', {
    failureRedirect: '/login/failed',
}), function (req, res) {
    const user = req.user;
    console.log('user from twitter route',user);
    req.logIn(user, (err) => {
        if (err) {
            console.error( '/twitter error',err); // Log the error
            return res.status(500).json({ message: "Unable to log in" });
        }
        req.session.user_id = user.uuid;
        // return res.json({ message: `Welcome to Winkel.nl, ${user.firstname}! Shop more, save more!`, user})
        res.redirect(`${process.env.CLIENT_URL}/auth/success?user=${encodeURIComponent(JSON.stringify(user))}`);
    });
});

export default router;