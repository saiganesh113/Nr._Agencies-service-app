import express from 'express';
import { processPayment, getPaymentsByUserId, getAllPayments, handleOrderAction } from '../controllers/payment.controller.js'; // Adjust path if necessary

const router = express.Router();

// POST: Process the payment
router.post('/', processPayment);

// GET: Get payments by user ID
router.get('/user/:userid', getPaymentsByUserId);

// GET: Get all payments
router.get('/users', getAllPayments);


router.post('/action', handleOrderAction);

export default router;
