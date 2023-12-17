import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import userRouter from './modules/users/user.routes'

const app: Application = express()

// Global middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Application routes
app.use('/api/v1/users', userRouter)

app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({ baseUrl: 'http://localhost:5000/', health: 'good' })
})

export default app
