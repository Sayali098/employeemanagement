
import express from 'express';

import { signup,signin} from '../controllers/userController.js';


const router=express();

router.post('/signup',signup);
router.post('/signin',signin);

export default router;