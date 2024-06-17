import express from 'express';
const router = express.Router();
import catchAsync from '../Utilities/catchAsync.js';
import { index, addProduct, showProduct, deleteProduct, updateProduct } from '../controllers/products.js';
import { storage } from '../cloudinary/index.js'
import multer from 'multer';
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(index)) //products list
    .post( upload.fields([
        { name: 'thumbnail', maxCount: 1},
        { name: 'images', maxCount: 10}
    ]), catchAsync(addProduct)); //add product to database
    
router.route('/:uuid')
    .get(catchAsync(showProduct)) //show product details
    .delete(catchAsync(deleteProduct)) //delete product
    .put(upload.fields([
        { name: 'thumbnail', maxCount: 1},
        { name: 'images', maxCount: 20}
    ]), catchAsync(updateProduct)) //update product

export default router;
