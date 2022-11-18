import { Router } from 'express';
import { signInPost, signUpPost } from '../controllers/usersController.js';

const router = Router();

router.post('/sign-up', signUpPost);
router.post('/sign-in', signInPost);

export default router;
