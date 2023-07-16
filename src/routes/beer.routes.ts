import { Router } from 'express'
import {
	createBeerController,
	listBeerController,
	updateBeerController,
} from '../controllers/beer.controllers'
import ensureReqBodyIsValidMiddleware from '../middlewares/ensureReqBodyIsValid.middleware'
import {
	beerCreateSchema,
	beerSchema,
	beerUpdateSchema,
} from '../schemas/beer.schemas'

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

export default beerRoutes
