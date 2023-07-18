import { Beer } from '../models/Beer'
import { TBeerUpdate } from '../types/beer.types'

const updateBeerService = async (beerData: TBeerUpdate, id: string) => {
	const beer = await Beer.findById(id)
	const maxTemperature = beerData.maxTemperature || beer?.maxTemperature
	const minTemperature = beerData.minTemperature || beer?.minTemperature
	const avgTemperature = (minTemperature! + maxTemperature!) / 2

	const updatedBeer = await Beer.findByIdAndUpdate(
		id,
		{ $set: { ...beerData, avgTemperature } },
		{ returnDocument: 'after' }
	).exec()

	return updatedBeer
}

export default updateBeerService
