import express from 'express'
const router = express.Router()

import {registerUser, loginUser} from '../controllers/auth.controller.ts'
import {verifyToken} from '../middleware/authMiddleware.ts'
import { isAdmin } from "../middleware/adminMiddleware.ts";




router.post('/register', registerUser)
router.post('/login',  loginUser)








export default router