import { Beer } from '../models/Beer'
import { TBeerUpdate } from '../types/beer.types'

const updateBeerService = async (beerData: TBeerUpdate, id: string) => {
	const beer = await Beer.findByIdAndUpdate(
		id,
		{ $set: beerData },
		{ returnDocument: 'after' }
	).exec()
	return beer
}

export default updateBeerService
