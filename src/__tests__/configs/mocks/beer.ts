import { TBeerCreate } from '../../../types/beer.types'

const createBeer: TBeerCreate = {
	beerStyle: 'Red Ale',
	minTemperature: -5,
	maxTemperature: 5,
}

const createBeer2: TBeerCreate = {
	beerStyle: 'Ipa',
	minTemperature: -4,
	maxTemperature: 4,
}

const createBeerNameStyleDontExists = {
	beerStyle: 'play nao existe',
	minTemperature: -3,
	maxTemperature: 3,
}

const avgCreateBeer = 0

export { createBeer, avgCreateBeer, createBeer2, createBeerNameStyleDontExists }
