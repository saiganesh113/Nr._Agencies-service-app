import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan'; // Request logging
import helmet from 'helmet'; // Security middleware

import authRoutes from './routes/auth.route.js';
import profileRoutes from './routes/profile.route.js';
import serviceRoutes from './routes/service.route.js';
import repairRoutes from './routes/repair.route.js';
import installationRoutes from './routes/installation.route.js';
import cartRoutes from './routes/cart.route.js';
import paymentRoutes from './routes/payment.route.js';

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Secure HTTP headers
app.use(bodyParser.json({ limit: '20mb' })); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true })); // Parse URL-encoded data
app.use(morgan('dev')); // Log incoming requests

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/profile', profileRoutes); // Profile routes
app.use('/api/services', serviceRoutes);
app.use('/api/repairs', repairRoutes);
app.use('/api/installations', installationRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/payment', paymentRoutes);

// Notifications route (for example)
app.get('/api/notifications', (req, res) => {
  res.status(200).json([{ id: 1, message: 'Welcome to NR-Agencies' }]);
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Healthy' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB successfully');
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
})
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1); // Exit process if the connection fails
});
