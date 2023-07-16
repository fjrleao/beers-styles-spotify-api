import { Request, Response } from 'express'
import { TBeer, TBeerCreate, TBeerUpdate } from '../types/beer.types'
import createBeer from '../services/createBeer.service'
import listBeerService from '../services/listBeer.service'
import updateBeerService from '../services/updateBeer.service'

const createBeerController = async (req: Request, res: Response) => {
	const beerData: TBeerCreate = req.body
	const newBeer: TBeer = await createBeer(beerData)
	return res.status(201).json(newBeer)
}

const listBeerController = async (req: Request, res: Response) => {
	const beers = await listBeerService()
	return res.json(beers)
}

const updateBeerController = async (req: Request, res: Response) => {
	const beerData: TBeerUpdate = req.body
	const id: string = req.params.id
	const updatedBeer = await updateBeerService(beerData, id)
	return res.json(updatedBeer)
}

export { createBeerController, listBeerController, updateBeerController }
