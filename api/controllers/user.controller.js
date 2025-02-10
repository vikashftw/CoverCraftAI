// api/controllers/user.controller.js
import User from '../models/user.model.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, photo, uid } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json(existingUser);
    }
    
    // Create a new user using OAuth data (no password handling)
    const newUser = new User({
      username: name,   // using Firebase displayName as username
      email,
      avatar: photo,    // using Firebase photoURL as avatar
      uid,            // store the Firebase UID for reference
    });
    
    const savedUser = await newUser.save();
    
    // Omit the password field (if it exists) from the response
    const { password, ...userData } = savedUser._doc;
    res.status(201).json(userData);
  } catch (error) {
    next(error);
  }
};
