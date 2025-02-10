import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

import userRouter from './routes/user.route.js';
import resumeRouter from './routes/resume.route.js';
import generateRouter from './routes/generate.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.log(err));

  const __dirname = path.resolve();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/resume', resumeRouter);
app.use('/api/generate', generateRouter);
app.use('/api/auth', authRouter);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));