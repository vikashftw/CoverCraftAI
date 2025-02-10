// api/routes/user.routes.js
import express from 'express';
import { registerUser } from '../controllers/user.controller.js';

const router = express.Router();

// POST /api/user/register for new user registration
router.post('/register', registerUser);

export default router;
