import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

class AppError extends Error {
	statusCode: number

	constructor(message: string, statusCode: number = 400) {
		super(message)
		this.message = message
		this.statusCode = statusCode
	}
}

const handleError = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			message: err.message,
		})
	}

	if (err instanceof ZodError) {
		return res.status(400).json({
			message: err.flatten().fieldErrors,
		})
	}

	if (err.message.includes('E11000 duplicate key error collection')) {
		return res.status(409).json({
			message: 'Already exists',
		})
	}

	console.log(err)

	return res.status(500).json({
		message: 'Internal server error',
	})
}

export { AppError, handleError }
