import express from 'express';
import morgan from 'morgan';
import httpPino from 'pino-http';
import passport from './services/passport.service.js';
import CookieParser from 'cookie-parser';
import cors from 'cors';
import AuthRouter from './routes/auth.route.js';
import errorMiddleware from './errors/error.middleware.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}))
app.use(passport.initialize());
app.use(httpPino());
app.use(CookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))


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

app.use('/api/auth', AuthRouter);

app.use(errorMiddleware);

export default app;
