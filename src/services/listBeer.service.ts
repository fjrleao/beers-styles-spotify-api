import { Beer } from '../models/Beer'

const listBeerService = async () => {
	const beers = await Beer.find().exec()
	return beers
}

export default listBeerService
