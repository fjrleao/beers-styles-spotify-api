import { Beer } from '../models/Beer'
import { TBeer, TBeerCreate } from '../types/beer.types'

const createBeer = async (beerData: TBeerCreate): Promise<TBeer> => {
	const avgTemperature = (beerData.minTemperature + beerData.maxTemperature) / 2
	const beer = new Beer({ ...beerData, avgTemperature: avgTemperature })
	await beer.save()
	return beer
}

export default createBeer
