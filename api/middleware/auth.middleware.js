// api/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  // Expect the token in the Authorization header: "Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access token missing' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid access token' });
    // Attach the user ID from the token to the request
    req.userId = decoded.id;
    next();
  });
};
