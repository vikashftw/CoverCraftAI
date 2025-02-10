// /api/routes/resume.route.js
import express from 'express';

const router = express.Router();

// A sample endpoint to test the resume route
router.get('/', (req, res) => {
  res.json({ message: 'Resume route is working' });
});

export default router;
