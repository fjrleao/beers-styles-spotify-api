import app from '../../../app'
import {
	connectDatabase,
	disconnectDatabase,
} from '../../configs/database/connection'
import request from 'supertest'
import { avgCreateBeer, createBeer } from '../../configs/mocks/beer'

describe('Test beers routes', () => {
	let beerId: string

	beforeAll(async () => {
		await connectDatabase()
	})

	afterAll(async () => {
		await disconnectDatabase()
	})

	describe('Test create a beer', () => {
		it('[Success] POST /beers -> Should be capable to create a beer', async () => {
			const response = await request(app).post('/beers').send(createBeer)

			expect(response.status).toBe(201)
			expect(response.body).toHaveProperty('_id')
			expect(response.body.beerStyle).toBe(createBeer.beerStyle)
			expect(response.body.maxTemperature).toBe(createBeer.maxTemperature)
			expect(response.body.minTemperature).toBe(createBeer.minTemperature)
			expect(response.body.avgTemperature).toBe(avgCreateBeer)
			beerId = String(response.body._id)
		})

		it('[Error] POST /beers -> Should return a error when try to register style already exists', async () => {
			const response = await request(app).post('/beers').send(createBeer)

			expect(response.status).toBe(409)
			expect(response.body).toHaveProperty('message')
			expect(response.body.message).toBe('Already exists')
		})

		it('[Error] POST /beers -> Should return a error when pass a invalid json body', async () => {
			const response = await request(app).post('/beers').send({
				beerStyle: 123,
			})

			expect(response.status).toBe(400)
			expect(response.body).toHaveProperty('message')
			expect(response.body.message).toHaveProperty('beerStyle')
		})
	})

	describe('Test list beers', () => {
		it('[Success] GET /beers => Should be capacle to return all beers', async () => {
			const response = await request(app).get('/beers')

			expect(response.status).toBe(200)
			expect(response.body).toHaveLength(1)
			expect(response.body[0]).toHaveProperty('_id')
			expect(response.body[0].beerStyle).toBe(createBeer.beerStyle)
			expect(response.body[0].maxTemperature).toBe(createBeer.maxTemperature)
			expect(response.body[0].minTemperature).toBe(createBeer.minTemperature)
			expect(response.body[0].avgTemperature).toBe(avgCreateBeer)
		})
	})

	describe('Test update beers', () => {
		it('[Success] PATCH /beers/:id -> Should be capable to update a beer', async () => {
			const response = await request(app).patch(`/beers/${beerId}`).send({
				beerStyle: 'Atualizado',
			})

			expect(response.status).toBe(200)
			expect(response.body).toHaveProperty('_id')
			expect(response.body._id).toBe(beerId)
			expect(response.body.beerStyle).toBe('Atualizado')
			expect(response.body.maxTemperature).toBe(createBeer.maxTemperature)
			expect(response.body.minTemperature).toBe(createBeer.minTemperature)
			expect(response.body.avgTemperature).toBe(avgCreateBeer)
		})

		it('[Error] PATCH /beers/:id -> Should return a error when pass a invalid json body', async () => {
			const response = await request(app).patch(`/beers/${beerId}`).send({
				beerStyle: 123,
			})

			expect(response.status).toBe(400)
			expect(response.body).toHaveProperty('message')
			expect(response.body.message).toHaveProperty('beerStyle')
		})
	})

	describe('Test delete beer', () => {
		it('[Success] DELETE /beers/:id -> Should be capable to delete a beer', async () => {
			const response = await request(app).delete(`/beers/${beerId}`)
			const getResponse = await request(app).get('/beers')

			expect(response.status).toBe(204)
			expect(getResponse.body).toHaveLength(0)
		})
	})
})
