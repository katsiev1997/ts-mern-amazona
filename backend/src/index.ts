import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { productRouter } from './routers/productRouter'
import { seedRouter } from './routers/seedRouter'

dotenv.config()

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/tsmernamazona'

mongoose.set('strictQuery', true)
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(() => console.log('error MongoDB connection'))

const app = express()
app.use(
  cors({
    credentials: true,
    origin: ['http://127.0.0.1:5173'],
  })
)
app.use('/api/products', productRouter)
app.use('/api/seed', seedRouter)

const PORT = 5000
app.listen(PORT, () => {
  console.log('Server started at http://localhost:', PORT)
})
