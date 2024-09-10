import Cart from '../models/cart.model.js';

// Add an item to the cart
export const addToCart = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the incoming request body

    const { userid, type, price, discount, estimatedTime, image, name, reviews, slotBookedDate, slotBookedTime, technology, time, totalPrice, warranty, address } = req.body;

    // Basic validation
    if (!userid || !type || !price || !address) {
      return res.status(400).json({ error: 'Userid, type, price, and address are required' });
    }

    // Create the new cart item
    const newItem = new Cart({
      userid,
      type,
      price,
      discount,
      estimatedTime,
      image,
      name,
      reviews,
      slotBookedDate,
      slotBookedTime,
      technology,
      time,
      totalPrice,
      warranty,
      address
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

// Get all cart items for a specific user by user ID
// src/controllers/cart.controller.js
export const getCartItemsByUserId = async (req, res) => {
  try {
    const { userid } = req.params;
    console.log(`Fetching cart items for user: ${userid}`); // Log user ID

    if (!userid) {
      return res.status(400).json({ error: 'User ID is required to fetch cart items' });
    }

    const cartItems = await Cart.find({ userid });
    console.log('Fetched cart items:', cartItems); // Log fetched items

    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items by user ID:', error);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
};

// Get all cart items
export const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find(); // Fetch all cart items
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching all cart items:', error);
    res.status(500).json({ error: 'Failed to fetch all cart items' });
  }
};

// Remove an item from the cart by ID
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the item exists before attempting to delete
    const deletedItem = await Cart.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({ message: 'Item removed successfully', deletedItem });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};
