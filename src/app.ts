import 'express-async-errors'
import express, { Application, Request, Response } from 'express'
import { AppError, handleError } from './errors'
import mongoose from 'mongoose'
import beerRoutes from './routes/beer.routes'

const app: Application = express()
app.use(express.json())

app.use('/beers', beerRoutes)

app.use(handleError)
export default app
