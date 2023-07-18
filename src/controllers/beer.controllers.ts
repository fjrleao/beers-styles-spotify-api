import { Request, Response } from 'express'
import { TBeer, TBeerCreate, TBeerUpdate } from '../types/beer.types'
import listBeerService from '../services/listBeer.service'
import updateBeerService from '../services/updateBeer.service'
import deleteBeerService from '../services/deleteBeer.service'
import createBeerService from '../services/createBeer.service'
import listBeerStylePlaylistService from '../services/listBeerStylePlaylist.service'

const createBeerController = async (req: Request, res: Response) => {
	const beerData: TBeerCreate = req.body
	const newBeer: TBeer = await createBeerService(beerData)
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

const deleteBeerController = async (req: Request, res: Response) => {
	const id: string = req.params.id
	await deleteBeerService(id)
	return res.status(204).send()
}

const listBeerStylePlaylistController = async (req: Request, res: Response) => {
	const temperature: number = Number(req.query.temperature)
	const stylesPlaylist = await listBeerStylePlaylistService(temperature)
	return res.json(stylesPlaylist)
}

export {
	createBeerController,
	listBeerController,
	updateBeerController,
	deleteBeerController,
	listBeerStylePlaylistController,
}
