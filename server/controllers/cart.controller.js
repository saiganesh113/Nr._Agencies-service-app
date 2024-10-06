import Cart from '../models/cart.model.js';
import CartItem from '../models/CartItem.model.js';

// Add an item to the cart
export const addToCart = async (req, res) => {
  try {
      const { userid, type, price, discount, estimatedTime, image, name, reviews, slotBookedDate, slotBookedTime, technology, time, totalPrice, warranty, address, coordinates } = req.body;

      // Validation for required fields
      if (!userid || !type || !price || !address || !coordinates) {
          return res.status(400).json({ error: 'Userid, type, price, address, and coordinates are required.' });
      }

      // Convert strings to numbers for price and discount
      const parsedPrice = parseFloat(price) || 0;
      const parsedDiscount = parseFloat(discount) || 0;
      const parsedTotalPrice = parsedPrice - parsedDiscount;

      // Check if the item already exists in the cart
      const existingItem = await Cart.findOne({ userid, type, name, slotBookedDate, slotBookedTime });
      if (existingItem) {
          return res.status(400).json({ error: 'This item is already in the cart for the selected time slot.' });
      }

      // Create new cart item
      const newItem = new Cart({
          userid,
          type,
          price: parsedPrice,
          discount: parsedDiscount,
          estimatedTime,
          image,
          name,
          reviews,
          slotBookedDate,
          slotBookedTime,
          technology,
          time,
          totalPrice: parsedTotalPrice,
          warranty,
          address,
          pinnedPosition: coordinates // Coordinates from client
      });

      await newItem.save();
      res.status(201).json(newItem);
  } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ error: 'Failed to add item to cart.' });
  }
};

// Get all cart items for a specific user by user ID
export const getCartItemsByUserId = async (req, res) => {
  try {
    const { userid } = req.params;
    console.log(`Fetching cart items for user: ${userid}`);

    if (!userid) {
      return res.status(400).json({ error: 'User ID is required to fetch cart items' });
    }

    // Pagination support (optional)
    const { page = 1, limit = 20 } = req.query;
    const cartItems = await Cart.find({ userid })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    console.log('Fetched cart items:', cartItems);
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items by user ID:', error);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
};

// Get all cart items
export const getAllCartItems = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const cartItems = await Cart.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

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

// Add a CartItem
export const addCartItem = async (req, res) => {
  try {
      const { userId, cartItems } = req.body; // Expecting cartItems array in the request body

      // Check if cartItems is provided
      if (!cartItems || !Array.isArray(cartItems)) {
          return res.status(400).json({ error: 'cartItems must be an array' });
      }

      const savedItems = [];

      for (const item of cartItems) {
          const { name, price, technology, warranty, issues, estimatedTime, quantity } = item;

          // Calculate total price based on issues and price
          const totalPrice = (price * quantity) + (issues.length * 99); // Assuming 99 is the price per issue

          // Create a new CartItem object
          const cartItem = new CartItem({
              name,
              price,
              technology,
              warranty,
              issues,
              estimatedTime,
              quantity,
              userId,
              totalPrice
          });

          // Save the CartItem to the database
          const savedItem = await cartItem.save();
          savedItems.push(savedItem);
      }

      res.status(201).json({ message: 'Items added to cart', savedItems });
  } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'Failed to add items to cart' });
  }
};

// Get all CartItems for a specific user
export const getCartItems = async (req, res) => {
  try {
      const userId = req.user._id; // Assuming you have user authentication middleware that attaches req.user

      // Find all cart items for the logged-in user
      const items = await CartItem.find({ userId });
      res.status(200).json(items);
  } catch (error) {
      console.error('Error retrieving cart items:', error);
      res.status(500).json({ message: 'Failed to retrieve cart items' });
  }
};

// Update a CartItem
export const updateCartItem = async (req, res) => {
  try {
      const cartItemId = req.params.id;
      const updates = req.body;

      // Find and update the CartItem by its ID
      const updatedItem = await CartItem.findByIdAndUpdate(cartItemId, updates, { new: true });
      res.status(200).json({ message: 'Cart item updated', updatedItem });
  } catch (error) {
      console.error('Error updating cart item:', error);
      res.status(500).json({ message: 'Failed to update cart item' });
  }
};

// Delete a CartItem
export const deleteCartItem = async (req, res) => {
  try {
      const cartItemId = req.params.id;

      // Find and delete the CartItem by its ID
      await CartItem.findByIdAndDelete(cartItemId);
      res.status(204).send();
  } catch (error) {
      console.error('Error deleting cart item:', error);
      res.status(500).json({ message: 'Failed to delete cart item' });
  }
};
