import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';

const AuthRouter = Router();

AuthRouter.post('/regiser', register);
AuthRouter.post('/login', login);

export default AuthRouter;