import { Router } from 'express'
import {
	createBeerController,
	deleteBeerController,
	listBeerController,
	listBeerStylePlaylistController,
	updateBeerController,
} from '../controllers/beer.controllers'
import ensureReqBodyIsValidMiddleware from '../middlewares/ensureReqBodyIsValid.middleware'
import { beerCreateSchema, beerUpdateSchema } from '../schemas/beer.schemas'

const beerRoutes: Router = Router()

beerRoutes.post(
	'',
	ensureReqBodyIsValidMiddleware(beerCreateSchema),
	createBeerController
)
beerRoutes.get('', listBeerController)
beerRoutes.patch(
	'/:id',
	ensureReqBodyIsValidMiddleware(beerUpdateSchema),
	updateBeerController
)
beerRoutes.delete('/:id', deleteBeerController)
beerRoutes.get('/playlist', listBeerStylePlaylistController)

export default beerRoutes
