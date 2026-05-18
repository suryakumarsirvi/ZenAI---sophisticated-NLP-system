import express from 'express';
import morgan from 'morgan';
import IndexRouter from './routes/index.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
  res.send("Server is running")
});

app.use('/api', IndexRouter);

export default app;