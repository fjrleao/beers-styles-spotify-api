import { TBeerCreate } from '../../../types/beer.types'

const createBeer: TBeerCreate = {
	beerStyle: 'Red Ale',
	minTemperature: -5,
	maxTemperature: 5,
}

const avgCreateBeer = 0

export { createBeer, avgCreateBeer }
