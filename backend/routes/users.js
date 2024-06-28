import express from 'express';
const router = express.Router({ mergeParams: true });
import catchAsync from '../Utilities/catchAsync.js';
import { userData, viewFavorites, deleteProfile, addFavorite, sellerRegister } from '../controllers/users.js';
import { addToCart, viewCartItems, updateCartItem, deleteCartItem } from '../controllers/cart.js';

router.route('/profile/:uuid')
    .delete(catchAsync(deleteProfile))
    .get(catchAsync(userData))

router.route('/:uuid/favorites')
    .get(catchAsync(viewFavorites))
    .post(catchAsync(addFavorite))

router.route('/:uuid/cart')
    .post(catchAsync(addToCart))
    .get(catchAsync(viewCartItems))
    .put(catchAsync(updateCartItem))
    .delete(catchAsync(deleteCartItem))

router.route('/seller/register')
    .put(catchAsync(sellerRegister))
export default router;