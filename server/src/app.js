import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import IndexRouter from './routes/index.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

// health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.use('/api', IndexRouter);

export default app;