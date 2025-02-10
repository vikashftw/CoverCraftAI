// api/models/user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: "https://..." },
    uid: { type: String, unique: true, sparse: true },
    social: {
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      github: { type: String, default: "" },
      website: { type: String, default: "" },
      leetcode: { type: String, default: "" }
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;