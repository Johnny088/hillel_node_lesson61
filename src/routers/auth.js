import { celebrate } from 'celebrate';
import { Router } from 'express';
import { sighInSchema, signUpSchema } from '../validation/auth.js';
import { signIn, signUp } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/sign-up', celebrate(signUpSchema), signUp);

authRouter.post('sign-in', celebrate(sighInSchema), signIn);

export default authRouter;
