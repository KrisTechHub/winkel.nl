import dotenv from 'dotenv';
dotenv.config(); //to use .env file

export const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;// Store the URL the user is requesting
        return res.redirect(`${process.env.CLIENT_URL}/user/register`);
    }
    next();
};
//************************


//middleware function to return to original page before user log in
export const storeReturnTo = (req, res, next) => { //middleware to use returnTo function
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}
//************************