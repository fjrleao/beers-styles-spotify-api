import { Request, Response } from 'express'
import { TBeer, TBeerCreate } from '../types/beer.types'
import createBeer from '../services/createBeer.service'
import listBeerService from '../services/listBeer.service'

const createBeerController = async (req: Request, res: Response) => {
	const beerData: TBeerCreate = req.body
	const newBeer: TBeer = await createBeer(beerData)
	return res.status(201).json(newBeer)
}

const listBeerController = async (req: Request, res: Response) => {
	const beers = await listBeerService()
	return res.json(beers)
}

export { createBeerController, listBeerController }
