import { z } from 'zod'
import mongoose from 'mongoose'

const beerSchema = z.object({
	_id: z.custom<mongoose.Types.ObjectId>(),
	beerStyle: z.string(),
	minTemperature: z.number(),
	maxTemperature: z.number(),
	avgTemperature: z.number(),
})

const beerCreateSchema = beerSchema.omit({ _id: true, avgTemperature: true })

export { beerSchema, beerCreateSchema }
