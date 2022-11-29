import { Router } from 'express';
import {
  googleLoginPost,
  signInPost,
  signUpPost,
} from '../controllers/usersController.js';
import loginValidationMiddleware from '../middleware/loginValidationMiddleware.js';
import registerValidationMiddleware from '../middleware/registerValidationMiddleware.js';

const router = Router();

router.post('/sign-up', registerValidationMiddleware, signUpPost);
router.post('/sign-in', loginValidationMiddleware, signInPost);
router.post('/google-login', googleLoginPost);

export default router;
