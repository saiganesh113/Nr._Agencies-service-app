export const addToCart = async (req, res) => {
  try {
    const { userid, type, price, discount, estimatedTime, image, name, reviews, slotBookedDate, slotBookedTime, technology, time, totalPrice, warranty, address } = req.body;

    // Parse price, discount, and total price as numbers
    const parsedPrice = parseFloat(price) || 0;
    const parsedDiscount = parseFloat(discount) || 0;
    const parsedTotalPrice = parsedPrice - parsedDiscount;

    // Basic validation
    if (!userid || !type || !price || !address) {
      return res.status(400).json({ error: 'Userid, type, price, and address are required' });
    }

    // Check if the item already exists in the cart for the user
    const existingItem = await Cart.findOne({ userid, type, name, slotBookedDate, slotBookedTime });
    if (existingItem) {
      return res.status(400).json({ error: 'This item is already in the cart for the selected time slot.' });
    }

    // Create and save the new cart item
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

// Get cart items by user ID
export const getCartItemsByUserId = async (req, res) => {
  try {
    const { userid } = req.params;
    const cartItems = await Cart.find({ userid });

    if (!cartItems.length) {
      return res.status(404).json({ message: 'No items found in cart for this user.' });
    }

    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Failed to retrieve cart items' });
  }
};

// Get all cart items
export const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching all cart items:', error);
    res.status(500).json({ error: 'Failed to retrieve cart items' });
  }
};

// Remove cart item by ID
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Cart.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};
