import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'
import historyRouter from './routes/historyRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(cors({
  origin: "https://ai-saas-image-generation-platform-9y4r-ie7foi6w0.vercel.app",
  credentials: true
}))
await connectDB()

app.use('/api/user' , userRouter)
app.use('/api/image' , imageRouter)
app.use('/api/history',historyRouter)

app.get('/',(req,res)=> res.send("API Working"))
app.listen(PORT,()=>console.log('Server running on port :'+ PORT ));


