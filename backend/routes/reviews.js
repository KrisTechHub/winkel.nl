import express from 'express';
const router = express.Router({ mergeParams: true });
import catchAsync from '../Utilities/catchAsync.js';
import { reviews, newReview, deleteReview } from '../controllers/reviews.js';

router.route('/')
    .get(catchAsync(reviews))
    .post(catchAsync(newReview))
    .delete(catchAsync(deleteReview))

export default router;