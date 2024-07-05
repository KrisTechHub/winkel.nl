import dotenv from 'dotenv';
dotenv.config(); //to use .env fileimport express from 'express';
import session from 'express-session';
import cors from 'cors';
import ExpressError from './Utilities/ExpressError.js';
import passportConfig from './passport.js';
import sessionConfig from './Utilities/sessionConfig.js';
import corsOptions from './Utilities/corsOptions.js';

//ROUTES
import productRoutes from './routes/products.js';
import categoryRoutes from './routes/category.js'
import reviewRoutes from './routes/reviews.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import passport from 'passport';


const app = express();

//MIDDLEWARES
app.use(cors(corsOptions)); // Apply CORS middleware before anything else
app.use(express.json()); //parse req.body to json
app.use(express.urlencoded({ extended: true })); //parse the req.body
app.use(session(sessionConfig)) // Session middleware
app.use(passport.initialize()); // Initialize Passport
app.use(passport.session()); // Use Passport's session middleware

app.use('/auth', authRoutes); //authorization router
app.use('/products', productRoutes); //product router
app.use('/products/:product_id/reviews', reviewRoutes); //review router
app.use('/category', categoryRoutes ); //category router
app.use('/users', userRoutes); //user router


// // HANDLING ERROR
// app.all('*', (req, res, next) => {
//     next(new ExpressError('Page not found', 404))
// }) //app.all - for every single request, this will run. this will only run if no error matches from the other pre-defined errors

// app.use((err, req, res, next) => { //404 route
//     res.status(404).send(err)
//     // res.send('Something went wrong!', err)
// })

app.listen(8000, () => {
    console.log('Serving on port 8000');
});