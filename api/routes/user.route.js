// user.route.js
import express from 'express';

const router = express.Router();

// Define a simple route to test
router.get('/', (req, res) => {
  res.json({ message: 'User route is working' });
});

export default router;
