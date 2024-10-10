import twilio from 'twilio';
import User from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromWhatsAppNumber = 'whatsapp:+14155238886'; // Replace with your Twilio WhatsApp Number

// Initialize Twilio client
const client = twilio(accountSid, authToken);

/**
 * Sends a WhatsApp invoice to the user.
 * @param {Object} req - The request object containing invoice details.
 * @param {Object} res - The response object to send back the result.
 */
export const sendWhatsAppInvoice = async (req, res) => {
    try {
        const { userid, amount, address, cart, discount, subtotal } = req.body;

        // Retrieve user details using userid to get phone number
        const user = await User.findOne({ userid });
        if (!user || !user.phone) {
            return res.status(400).json({ success: false, message: 'User phone number not found.' });
        }

        const formatTime = (isoTime) => {
            const date = new Date(isoTime);
            const options = { hour: 'numeric', minute: 'numeric', hour12: true };
            return date.toLocaleString('en-US', options);
        };

        const formatDate = (isoDate) => {
            const date = new Date(isoDate);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };

        const messageBody = `
        *Sree Teq*
        Thank you for choosing our services. A technician will contact you shortly.

        *Invoice Summary*:
        ----------------------------
        Subtotal: ₹${subtotal}
        Discount: ₹${discount}
        Total Amount: ₹${amount}
        Delivery Address: ${address}
        ----------------------------
        *Cart Details*:
        ${cart.map(item => `${item.name}: ₹${item.price}`).join('\n')}
        ----------------------------
        *Slot Booking*:
        ${cart.map(item => `Date: ${formatDate(item.slotBookedDate)}
        Time: ${formatTime(item.slotBookedTime)}`).join('\n')}
        `;

        // Send the WhatsApp message using Twilio
        await client.messages.create({
            from: fromWhatsAppNumber,
            to: `whatsapp:+91${user.phone}`,
            body: messageBody
        });

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Invoice sent successfully via WhatsApp.'
        });
    } catch (error) {
        console.error('Error sending WhatsApp invoice:', error);
        res.status(500).json({ success: false, message: 'Failed to send invoice.', error: error.message });
    }
};
