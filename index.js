import 'dotenv/config';
import express from 'express';
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
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

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);

const keepAlive = () => {
  const url = process.env.RENDER_EXTERNAL_URL;
  if (!url) return;

  const FOURTEEN_MINUTES = 14 * 60 * 1000;

  setInterval(async () => {
    try {
      await fetch(`${url}/health`);
      console.log(`[keep-alive] ping sent to ${url}/health`);
    } catch (err) {
      console.error('[keep-alive] ping failed:', err.message);
    }
  }, FOURTEEN_MINUTES);
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server started on port:', PORT);
    keepAlive();
  });
});
