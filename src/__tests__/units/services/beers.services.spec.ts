import {
	connectDatabase,
	disconnectDatabase,
} from '../../configs/database/connection'
import createBeerService from '../../../services/createBeer.service'
import { avgCreateBeer, createBeer } from '../../configs/mocks/beer'
import { Beer } from '../../../models/Beer'
import listBeerService from '../../../services/listBeer.service'
import deleteBeerService from '../../../services/deleteBeer.service'
import { TBeer } from '../../../types/beer.types'
import updateBeerService from '../../../services/updateBeer.service'

describe('Test beers services', () => {
	beforeAll(async () => {
		await connectDatabase()
	})

	afterAll(async () => {
		await disconnectDatabase()
	})
	describe('Test create beer service', () => {
		it('Should be capable to create a beer and calculate temperature average', async () => {
			const result = await createBeerService(createBeer)
			expect(result).toHaveProperty('_id')
			expect(result.beerStyle).toBe(createBeer.beerStyle)
			expect(result.maxTemperature).toBe(createBeer.maxTemperature)
			expect(result.minTemperature).toBe(createBeer.minTemperature)
			expect(result.avgTemperature).toBe(avgCreateBeer)
		})

		it('Should throw a error when trying to register a duplicated beerStyle', async () => {
			try {
				await createBeerService(createBeer)
			} catch (error: any) {
				expect(error.message).toContain('duplicate key error')
			}
		})
	})

	describe('Test list, delete and update beer service', () => {
		let beer: TBeer

		beforeEach(async () => {
			await Beer.deleteMany()
			const newBeer = new Beer(createBeer)
			newBeer.avgTemperature = avgCreateBeer
			await newBeer.save()
			beer = newBeer
		})

		it('Should be capable to list all beers', async () => {
			const result = await listBeerService()
			expect(result).toHaveLength(1)
			expect(result[0]).toHaveProperty('_id')
			expect(result[0].beerStyle).toBe(createBeer.beerStyle)
			expect(result[0].maxTemperature).toBe(createBeer.maxTemperature)
			expect(result[0].minTemperature).toBe(createBeer.minTemperature)
			expect(result[0].avgTemperature).toBe(avgCreateBeer)
		})

		it('Should be capable to delete a beer', async () => {
			await deleteBeerService(String(beer._id))
			const listBeer = await Beer.find()
			expect(listBeer).toHaveLength(0)
		})

		it('Should be capable to update a beer', async () => {
			const result = await updateBeerService(
				{ beerStyle: 'Atualizado' },
				String(beer._id)
			)
			expect(result?.beerStyle).toBe('Atualizado')
			expect(result?.maxTemperature).toBe(beer.maxTemperature)
			expect(result?.minTemperature).toBe(beer.minTemperature)
			expect(result?.avgTemperature).toBe(beer.avgTemperature)
		})
	})
})
