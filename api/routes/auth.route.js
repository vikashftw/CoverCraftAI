// api/routes/auth.route.js
import express from 'express';
import { registerUser, getCurrentUser, updateSocial } from '../controllers/user.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// POST /api/auth/google : OAuth registration/sign-in endpoint
router.post('/google', registerUser);

// GET /api/auth/me : Returns the current user's data (protected)
router.get('/me', authenticateToken, getCurrentUser);

// Route to update a social link
router.patch('/social', authenticateToken, updateSocial);

export default router;