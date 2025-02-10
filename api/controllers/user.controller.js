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
    // Note: The 'social' field in the model has default values.
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

// Update all social links (protected endpoint)
// Expected request body: { socials: { linkedin: "https://...", twitter: "", github: "", website: "", leetcode: "" } }
export const updateSocial = async (req, res, next) => {
  try {
    const { socials } = req.body;
    if (!socials || typeof socials !== 'object') {
      return res.status(400).json({ error: 'Socials object is required' });
    }
    
    // Find the user by the ID set by the authentication middleware (req.userId)
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Update each provided social field
    Object.keys(socials).forEach((platform) => {
      if (user.social && Object.prototype.hasOwnProperty.call(user.social, platform)) {
        user.social[platform] = socials[platform];
      }
    });
    
    await user.save();
    return res.status(200).json({ message: 'Social links updated successfully', social: user.social });
  } catch (error) {
    next(error);
  }
};