import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // Ensure you're using ES module import

const protectRoute = async (req, res, next) => {
  let token;

  // Check if the Authorization header contains a Bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by the userid in the decoded token
      req.user = await User.findOne({ userid: decoded.userid });

      // If user is not found, send unauthorized response
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({ message: 'Unauthorized, token invalid' });
    }
  }

  // If no token is provided in the request
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }
};

export { protectRoute }; // Exporting protectRoute as a named export
