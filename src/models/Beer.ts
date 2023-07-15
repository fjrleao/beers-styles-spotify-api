import { model, Schema } from 'mongoose'

const schema = new Schema({
	beerStyle: { type: String, required: true },
	minTemperature: { type: Number, required: true },
	maxTemperature: { type: Number, required: true },
	avgTemperature: { type: Number, required: true },
})

const Beer = model('Beer', schema)

export { Beer }
