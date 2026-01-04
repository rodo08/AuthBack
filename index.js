import express from 'express';
import 'dotenv/config';
import { connectDB } from './db/connectDB.js';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

const whitelist = [
  'http://localhost:5173',
  'https://stupendous-auth.netlify.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed'));
      }
    },
    credentials: true, //cookies
  })
);

app.use(express.json()); //middleware allows to parse incoming req wuth json payloads and attach them to req.body
app.use(cookieParser()); //allows to parse incoming cookies

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  connectDB();
  console.log('Server started on port:', PORT);
});
