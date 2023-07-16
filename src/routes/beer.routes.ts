import { Router } from 'express'
import {
	createBeerController,
	listBeerController,
} from '../controllers/beer.controllers'
import ensureReqBodyIsValidMiddleware from '../middlewares/ensureReqBodyIsValid.middleware'
import { beerCreateSchema, beerSchema } from '../schemas/beer.schemas'

const beerRoutes: Router = Router()

beerRoutes.post(
	'',
	ensureReqBodyIsValidMiddleware(beerCreateSchema),
	createBeerController
)
beerRoutes.get('', listBeerController)

export default beerRoutes
