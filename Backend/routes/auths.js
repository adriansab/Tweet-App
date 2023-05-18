import express from 'express';    
import { signUp } from '../controllers/auth.js';
import { signIn } from '../controllers/auth.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);

export default router;










