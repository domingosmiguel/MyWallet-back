import { Router } from 'express';
import { signInPost, signUpPost } from '../controllers/usersController.js';
import loginValidationMiddleware from '../middleware/loginValidationMiddleware.js';
import registerValidationMiddleware from '../middleware/registerValidationMiddleware.js';

const router = Router();

router.post('/sign-up', registerValidationMiddleware, signUpPost);
router.post('/sign-in', loginValidationMiddleware, signInPost);

export default router;
