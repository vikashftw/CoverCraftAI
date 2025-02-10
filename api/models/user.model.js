// api/models/user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    uid: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple documents without a uid (if needed)
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;