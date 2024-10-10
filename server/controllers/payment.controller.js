import Payment from '../models/payment.model.js'; // Adjust path if necessary

// POST: Process Payment
export const processPayment = async (req, res) => {
  try {
    const { userid, amount, address, cart } = req.body; // Remove transactionId from frontend

    if (!userid || !amount || !address || !cart || cart.length === 0) {
      return res.status(400).json({ message: 'Missing required fields or cart is empty.' });
    }

    // Generate transactionId based on current date and time
    const now = new Date();
    const transactionId = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;

    const paymentStatus = 'success';  // Update dynamically if needed

    const payment = new Payment({
      userid,
      transactionId,  // Store the generated transaction ID
      amount,
      cart,
      address,
      paymentStatus,
    });

    await payment.save();  // Save the payment to the database

    return res.status(201).json({
      status: paymentStatus,
      amount,
      transactionId,
      userid,
      address,
      cart,
      message: 'Payment processed and saved successfully.',
    });

  } catch (error) {
    console.error('Error processing payment:', error.message);
    console.error('Stack Trace:', error.stack);  // Print full stack trace
    return res.status(500).json({ message: 'Error processing payment. Please try again.' });
  }
};



// GET: Get Payment by User ID
export const getPaymentsByUserId = async (req, res) => {
    try {
      const { userid } = req.params;
      if (!userid) {
        return res.status(400).json({ message: 'User ID is required.' });
      }
  
      const payments = await Payment.find({ userid });
      if (payments.length === 0) {
        return res.status(404).json({ message: `No payments found for user ID: ${userid}` });
      }
  
      return res.status(200).json({
        status: 'success',
        data: payments,
      });
    } catch (error) {
      console.error('Error retrieving payments:', error.message);
      return res.status(500).json({ message: 'Error retrieving payments. Please try again.' });
    }
  };
    
  
// GET: Get All Payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();

    if (payments.length === 0) {
      return res.status(404).json({ message: 'No payments found.' });
    }

    return res.status(200).json({
      status: 'success',
      data: payments,
    });

  } catch (error) {
    console.error('Error retrieving all payments:', error.message);
    return res.status(500).json({ message: 'Error retrieving all payments. Please try again.' });
  }
};

export const completeOrder = async (req, res) => {
  try {
    const { transactionId } = req.params;

    // Find the order by transactionId and update its status
    const order = await Payment.findOneAndUpdate(
      { transactionId },
      { paymentStatus: 'success' },
      { new: true } // Return the updated document
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order marked as completed', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to complete order', error });
  }
};

// Cancel Order
export const cancelOrder = async (req, res) => {
  try {
    const { transactionId } = req.params;

    // Find the order by transactionId and update its status
    const order = await Payment.findOneAndUpdate(
      { transactionId },
      { paymentStatus: 'cancelled' },
      { new: true } // Return the updated document
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order cancelled', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel order', error });
  }
};
  