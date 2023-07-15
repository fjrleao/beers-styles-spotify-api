import { Request, Response } from 'express'
import { TBeer, TBeerCreate } from '../types/beer.types'
import createBeer from '../services/createBeer.service'

const createBeerController = async (req: Request, res: Response) => {
	const beerData: TBeerCreate = req.body
	const newBeer: TBeer = await createBeer(beerData)
	return res.status(201).json(newBeer)
}

export { createBeerController }
