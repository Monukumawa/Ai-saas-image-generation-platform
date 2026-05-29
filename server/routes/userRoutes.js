import {registerUser,loginUser, paymentRazorpay, verifyRazorpay} from '../controllers/userController.js'
import express from 'express'
import userAuth from '../middlewares/auth.js'
import { userCredits } from '../controllers/userController.js'
import { userHistory } from '../controllers/historyController.js'
const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/credits',userAuth,userCredits)
userRouter.post('/pay-razor',userAuth,paymentRazorpay)
userRouter.post('/verify-razor',verifyRazorpay)
userRouter.post('/history', userAuth, userHistory);
export default userRouter

//localhost:4000/api/user/register
//localhost:4000/api/user/login
