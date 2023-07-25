import 'express-async-errors'
import express, { Application, Request, Response } from 'express'
import { handleError } from './errors'
import beerRoutes from './routes/beer.routes'
import path from 'path'

const app: Application = express()
app.use(express.json())

app.use('/beers', beerRoutes)

app.use(handleError)
export default app
