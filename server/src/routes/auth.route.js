import {Router} from 'express';
import validate from "../middlewares/zod.middleware.js";
import passport from "../services/passport.service.js"
import { validateUserSchema } from '../validators/zod.validate.js';
import { handleGetMe, handleGoogleAuth, handleLogin, handleLogout, handleRefresh, handleRegister } from '../controllers/auth.controller.js';
import { checkAuth } from '../middlewares/auth.middleware.js';

const AuthRouter = Router();

AuthRouter.post('/register', validate(validateUserSchema), handleRegister);
AuthRouter.post('/login', validate(validateUserSchema), handleLogin);
AuthRouter.post('/logout', checkAuth, handleLogout);

AuthRouter.get('/refresh', handleRefresh);
AuthRouter.get('/getMe', checkAuth, handleGetMe);

AuthRouter.get('/google', passport.authenticate('google', { scope: ['profile email'], session: false }));
AuthRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login',  session: false }), handleGoogleAuth)

export default AuthRouter;