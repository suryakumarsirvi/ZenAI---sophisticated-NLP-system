import {Router} from 'express';
import AuthRouter from './auth.route.js';

const IndexRoute = Router();

IndexRoute.use('/v1/auth', AuthRouter);

export default IndexRoute;