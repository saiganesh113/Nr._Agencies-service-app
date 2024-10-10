// src/routes/whatsapp.routes.js

import express from 'express';
import { sendWhatsAppInvoice } from '../controllers/twilio.controller.js';

const router = express.Router();

router.post('/sendWhatsAppInvoice', sendWhatsAppInvoice);

export default router;
