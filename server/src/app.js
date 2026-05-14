import express from 'express';
import morgan from 'morgan';
import passport from './services/passport.service.js';
import CookieParser from 'cookie-parser';
import cors from 'cors';
import errorMiddleware from './errors/error.middleware.js';
import IndexRoute from './routes/index.route.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}))
app.use(passport.initialize());
app.use(CookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))


// Home route hai
app.get('/', (req, res)=>{ 
  res.end("Hello World!");
});

// health check karlo
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
  res.end("Server is running")
});

app.use('/api', IndexRoute);

app.use(errorMiddleware);

export default app;
