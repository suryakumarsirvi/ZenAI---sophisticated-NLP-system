import express from 'express';
import morgan from 'morgan';
import httpPino from 'pino-http';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(httpPino());

// Home route hai
app.get('/', (req, res)=>{ 
  res.log.info("Home route called");
  res.send("Hello World!")
})

// health check karlo
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
  res.send("Server is running")
});

export default app;
