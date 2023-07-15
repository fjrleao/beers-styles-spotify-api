import 'express-async-errors'
import express, { Application, Request, Response } from 'express'
import { AppError, handleError } from './errors'

const app: Application = express()
app.use(express.json())

app.get('/test', (req: Request, res: Response) => {
	throw new AppError('testando erro')
})

app.use(handleError)
export default app
