import {
	connectDatabase,
	disconnectDatabase,
} from '../../configs/database/connection'
import {
	avgCreateBeer,
	createBeer,
	createBeer2,
	createBeerNameStyleDontExists,
} from '../../configs/mocks/beer'
import { Beer } from '../../../models/Beer'
import { TBeer, TBeerPlaylist } from '../../../types/beer.types'
import createBeerService from '../../../services/createBeer.service'
import listBeerService from '../../../services/listBeer.service'
import deleteBeerService from '../../../services/deleteBeer.service'
import updateBeerService from '../../../services/updateBeer.service'
import listBeerStylePlaylistService from '../../../services/listBeerStylePlaylist.service'

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
				{ beerStyle: 'Atualizado', maxTemperature: 6 },
				String(beer._id)
			)
			const avg = (beer.minTemperature + 6) / 2
			expect(result?.beerStyle).toBe('Atualizado')
			expect(result?.maxTemperature).toBe(6)
			expect(result?.minTemperature).toBe(beer.minTemperature)
			expect(result?.avgTemperature).toBe(avg)
		})
	})

	describe('Test list beers and playlists', () => {
		let beer1: TBeer
		let beer2: TBeer

		beforeEach(async () => {
			await Beer.deleteMany()
			const newBeer = new Beer(createBeer)
			newBeer.avgTemperature = avgCreateBeer
			await newBeer.save()
			const newBeer2 = new Beer(createBeer2)
			newBeer2.avgTemperature = avgCreateBeer
			await newBeer2.save()
			beer1 = newBeer
			beer2 = newBeer2
		})

		it('Should be capable to list beers and playlists filtering by temperature ', async () => {
			const result1 = (await listBeerStylePlaylistService(5)) as TBeerPlaylist
			const result2 = (await listBeerStylePlaylistService(
				1
			)) as Array<TBeerPlaylist>

			expect(result1).toHaveProperty('beerStyle')
			expect(result1.beerStyle).toBe(beer1.beerStyle)
			expect(result1.playlist.name).toContain(result1.beerStyle)
			expect(result1.playlist.tracks[0]).toHaveProperty('name')
			expect(result1.playlist.tracks[0]).toHaveProperty('artist')
			expect(result1.playlist.tracks[0]).toHaveProperty('link')
			expect(result2).toHaveLength(2)
			expect(result2[0].beerStyle).toBe(beer2.beerStyle)
			expect(result2[1].beerStyle).toBe(beer1.beerStyle)
		})

		it('Should throw a error when don`t find a playlist with beerStyle name', async () => {
			const newBeer = new Beer(createBeerNameStyleDontExists)
			newBeer.avgTemperature = avgCreateBeer
			await newBeer.save()
			try {
				await listBeerStylePlaylistService(-3)
			} catch (error: any) {
				expect(error.message).toContain('Playlists not found')
			}
		})
	})
})
