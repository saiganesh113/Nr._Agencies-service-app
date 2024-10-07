// routes/email.routes.js
import express from 'express';

import {sendEmail} from '../controllers/email.controller.js';

const router = express.Router();
// Send email route
router.post('/send', sendEmail);

export default router;
