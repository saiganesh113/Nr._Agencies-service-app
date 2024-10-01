import express from 'express';
import { addToCart, getCartItemsByUserId, getAllCartItems, removeFromCart } from '../controllers/cart.controller.js';

const router = express.Router();

// Route for adding items to cart
router.post('/', addToCart);

// Route for getting cart items by user ID
router.get('/:userid', getCartItemsByUserId);

// Route for getting all cart items
router.get('/', getAllCartItems);

// Route for deleting items from cart by ID
router.delete('/:id', removeFromCart);

export default router;
