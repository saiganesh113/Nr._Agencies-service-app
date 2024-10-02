import express from 'express';
import {
  addToCart,
  getCartItemsByUserId,
  getAllCartItems,
  removeFromCart,
  addCartItem,
  getCartItems,
  updateCartItem,
  deleteCartItem
} from '../controllers/cart.controller.js';

const router = express.Router();

// Route for adding items to the main cart
router.post('/', addToCart);

// Route for getting cart items by user ID
router.get('/:userid', getCartItemsByUserId);

// Route for getting all cart items
router.get('/', getAllCartItems);

// Route for deleting items from the main cart by ID
router.delete('/:id', removeFromCart);

// Route for adding a cart item (protected)
router.post('/items', addCartItem);

// Route for getting cart items (protected)
router.get('/items', getCartItems);

// Route for updating a cart item (protected)
router.put('/items/:id', updateCartItem);

// Route for deleting a cart item (protected)
router.delete('/items/:id', deleteCartItem);

export default router;
