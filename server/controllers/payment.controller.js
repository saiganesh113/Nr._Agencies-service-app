import Payment from '../models/payment.model.js'; // Adjust path if necessary

// POST: Process Payment
export const processPayment = async (req, res) => {
  try {
    const { userid, amount, address, cart } = req.body;

    if (!userid || !amount || !address || !cart || cart.length === 0) {
      return res.status(400).json({ message: 'Missing required fields or cart is empty.' });
    }

    const paymentStatus = 'success';  // Simulate payment status
    const transactionId = `txn_${new Date().getTime()}`; // Mock transaction ID

    const payment = new Payment({
      userid,            // Ensure correct userid is used
      transactionId,
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

export const handleOrderAction = async (req, res) => {
    try {
      const { transactionId, action } = req.body;
      const validActions = ['complete', 'cancel'];
  
      if (!validActions.includes(action)) {
        return res.status(400).json({ error: 'Invalid action' });
      }
  
      const updatedOrder = await OrderModel.findOneAndUpdate(
        { transactionId },
        { status: action },
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: 'Failed to handle order action' });
    }
  };
  