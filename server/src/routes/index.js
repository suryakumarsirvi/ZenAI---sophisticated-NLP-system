import {Router} from 'express';
import AuthRouter from '../routes/auth.route.js';

const IndexRouter =  Router();

IndexRouter.use('/v1/auth', AuthRouter);

export default IndexRouter;