// controllers/email.controller.js
import nodemailer from 'nodemailer';
import Email from '../models/email.model.js';

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send email function
export const sendEmail = async (req, res) => {
  const { recipient, subject, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipient,
    subject: subject,
    text: message
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Save email details to database if needed
    const email = new Email({ recipient, subject, message });
    await email.save();

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send email', error });
  }
};
