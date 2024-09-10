import express from 'express';
import { addToCart, getCartItemsByUserId, getAllCartItems, removeFromCart } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/', addToCart); // Route for adding items to cart
router.get('/:userid', getCartItemsByUserId); // Route for getting cart items by user ID
router.get('/', getAllCartItems); // Route for getting all cart items
router.delete('/:id', removeFromCart); // Route for deleting items from cart

export default router;
