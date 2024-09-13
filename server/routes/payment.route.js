import express from 'express';
import { processPayment, getPaymentsByUserId, getAllPayments, completeOrder, cancelOrder } from '../controllers/payment.controller.js'; // Adjust path if necessary

const router = express.Router();

// POST: Process the payment
router.post('/', processPayment);

// GET: Get payments by user ID
router.get('/user/:userid', getPaymentsByUserId);

// GET: Get all payments
router.get('/users', getAllPayments);


// Complete order by transactionId
router.post('/complete/:transactionId', completeOrder);

// Cancel order by transactionId
router.post('/cancel/:transactionId', cancelOrder);

export default router;
