import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './middlewares/globalErrorHandler'
import userRouter from './modules/users/user.routes'

const app: Application = express()

// Global middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Application routes
app.use('/api/v1/users', userRouter)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ baseUrl: 'http://localhost:5000/', health: 'good' })
})

// Global Error handler
app.use(globalErrorHandler)

export default app
