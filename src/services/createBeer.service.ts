import { Beer } from '../models/Beer'
import { TBeer, TBeerCreate } from '../types/beer.types'

const createBeer = async (beerData: TBeerCreate): Promise<TBeer> => {
	const beer = new Beer(beerData)
	await beer.save()
	return beer
}

export default createBeer
