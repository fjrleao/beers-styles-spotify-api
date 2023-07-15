import 'express-async-errors'
import express, { Application, Request, Response } from 'express'

const app: Application = express()
app.use(express.json())

app.get('/test', (req: Request, res: Response) => {
	console.log(req.path)
	return res.json({ hello: 'world' })
})

export default app
