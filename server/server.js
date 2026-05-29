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

// --- UPDATE CORS CONFIGURATION HERE ---
const allowedOrigins = [
  "http://localhost:5173", // Standard Vite port
  "https://ai-saas-image-generation-platform-9y4r-7kwlrk8ts.vercel.app" //Your live Vercel frontend
]

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, postman, or server-to-server)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}))
// --------------------------------------

await connectDB()

app.use('/api/user' , userRouter)
app.use('/api/image' , imageRouter)
app.use('/api/history', historyRouter)

app.get('/', (req, res) => res.send("API Working"))
app.listen(PORT, () => console.log('Server running on port :' + PORT));
