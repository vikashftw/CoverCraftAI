// api/controllers/user.controller.js
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Register user (for OAuth sign-in via Google)
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, photo, uid } = req.body;
    
    // Check if user already exists (by email)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Generate a JWT token for the existing user
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      const { password, ...userData } = existingUser._doc;
      return res.status(200).json({ token, ...userData });
    }
    
    // Create a new user using the OAuth data
    const newUser = new User({
      username: name, // Using Firebase displayName as username
      email,
      avatar: photo,  // Using Firebase photoURL as avatar
      uid,          // Firebase UID for reference
    });
    
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const { password, ...userData } = savedUser._doc;
    res.status(201).json({ token, ...userData });
  } catch (error) {
    next(error);
  }
};

// Get current user (protected endpoint)
export const getCurrentUser = async (req, res, next) => {
  try {
    // `req.userId` is set by the JWT authentication middleware
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const { password, ...userData } = user._doc;
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};
