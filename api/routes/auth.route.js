// api/routes/auth.route.js
import express from 'express';
import { registerUser } from '../controllers/user.controller.js';

const router = express.Router();

// POST /api/auth/google to register OAuth users
router.post('/google', registerUser);

export default router;