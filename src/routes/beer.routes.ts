import { Router } from 'express'
import { createBeerController } from '../controllers/beer.controllers'
import ensureReqBodyIsValidMiddleware from '../middlewares/ensureReqBodyIsValid.middleware'
import { beerSchema } from '../schemas/beer.schemas'

const beerRoutes: Router = Router()

beerRoutes.post(
	'',
	ensureReqBodyIsValidMiddleware(beerSchema),
	createBeerController
)

export default beerRoutes
