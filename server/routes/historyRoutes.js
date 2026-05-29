import express from 'express'
import { userHistory } from '../controllers/historyController.js'

const historyRouter = express.Router()

historyRouter.post('/user-history',userHistory)

export default historyRouter