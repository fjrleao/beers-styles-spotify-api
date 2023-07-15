import 'express-async-errors'
import express, { Application, Request, Response } from 'express'
import { AppError, handleError } from './errors'
import mongoose from 'mongoose'

const app: Application = express()
app.use(express.json())

app.use(handleError)
export default app
