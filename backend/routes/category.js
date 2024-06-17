import express from 'express';
const router = express.Router();
import catchAsync from '../Utilities/catchAsync.js';
import { categorizedProducts } from '../controllers/category.js';

router.route('/:category')
    .get(catchAsync(categorizedProducts));

export default router;
