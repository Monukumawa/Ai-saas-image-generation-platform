import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'
import historyRouter from './routes/historyRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()

// 1. Body Parser Middleware
app.use(express.json())

// 2. FAIL-PROOF CORS CONFIGURATION
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-saas-image-generation-platform-9y4r-7kwlrk8ts.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const sanitizedOrigin = origin.trim().replace(/\/$/, "");

    if (allowedOrigins.includes(sanitizedOrigin)) {
      return callback(null, true);
    }

    if (
      sanitizedOrigin.startsWith("https://ai-saas-image-generation-platform") && 
      sanitizedOrigin.endsWith(".vercel.app")
    ) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  // 🔽 UPDATE THIS LINE TO INCLUDE 'token' 🔽
  allowedHeaders: ['Content-Type', 'Authorization', 'token'] 
}));

// 3. Connect Database
await connectDB()

// 4. API Routes
app.use('/api/user' , userRouter)
app.use('/api/image' , imageRouter)
app.use('/api/history', historyRouter)

app.get('/', (req, res) => res.send("API Working"))
app.listen(PORT, () => console.log('Server running on port :' + PORT));