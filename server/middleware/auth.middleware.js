import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Technician from '../models/technician.model.js'; // Assuming you have a Technician model

const protectRoute = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Determine if the user or technician is being authenticated
      if (req.baseUrl.includes('/user')) {
        req.user = await User.findOne({ userid: decoded.id });

        if (!req.user) {
          return res.status(401).json({ message: 'User not found' });
        }
      } else if (req.baseUrl.includes('/technician')) {
        req.user = await Technician.findOne({ techid: decoded.id }); // Update as needed

        if (!req.user) {
          return res.status(401).json({ message: 'Technician not found' });
        }
      }

      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({ message: 'Unauthorized, token invalid' });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }
};

export { protectRoute };
