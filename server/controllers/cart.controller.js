import Cart from '../models/cart.model.js';

// Add an item to the cart
export const addToCart = async (req, res) => {
  try {
    const { userid, type, price, discount, estimatedTime, image, name, reviews, slotBookedDate, slotBookedTime, technology, time, totalPrice, warranty, address } = req.body;

    // Convert strings to numbers for price, discount, and totalPrice
    const parsedPrice = parseFloat(price) || 0;
    const parsedDiscount = parseFloat(discount) || 0;
    const parsedTotalPrice = parsedPrice - parsedDiscount;

    // Validation
    if (!userid || !type || !price || !address) {
      return res.status(400).json({ error: 'Userid, type, price, and address are required' });
    }

    // Check if the item already exists in the cart
    const existingItem = await Cart.findOne({ userid, type, name, slotBookedDate, slotBookedTime });
    if (existingItem) {
      return res.status(400).json({ error: 'This item is already in the cart for the selected time slot.' });
    }

    // Create a new cart item
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
export const getCartItemsByUserId = async (req, res) => {
  try {
    const { userid } = req.params;
    console.log(`Fetching cart items for user: ${userid}`); // Log user ID

    if (!userid) {
      return res.status(400).json({ error: 'User ID is required to fetch cart items' });
    }

    // Pagination support (optional)
    const { page = 1, limit = 20 } = req.query; // Default to page 1 with 10 items per page
    const cartItems = await Cart.find({ userid })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

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
    // Pagination support (optional)
    const { page = 1, limit = 20 } = req.query; // Default to page 1 with 10 items per page
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
