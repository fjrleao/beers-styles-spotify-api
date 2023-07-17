import { AppError } from '../errors'
import { Beer } from '../models/Beer'

const listBeerStylePlaylistService = async (temperature: number) => {
	if (Number.isNaN(temperature)) {
		throw new AppError(
			'Necessary to pass the numerical temperature in the query parameters'
		)
	}

	let beers = await Beer.find({
		$or: [{ maxTemperature: temperature }, { minTemperature: temperature }],
	}).sort({ beerStyle: 'asc' })

	if (beers.length === 0) {
		beers = await Beer.find().sort({ beerStyle: 'asc' })
		const avgTemperatures = beers.map((beer) => beer.avgTemperature)

		const mostAproximatedAvgTemperature = avgTemperatures.reduce(
			(prev, curr) => {
				return Math.abs(curr - temperature) < Math.abs(prev - temperature)
					? curr
					: prev
			}
		)

		beers = beers.filter(
			(beer) => beer.avgTemperature === mostAproximatedAvgTemperature
		)
	}

	return beers
}

export default listBeerStylePlaylistService
