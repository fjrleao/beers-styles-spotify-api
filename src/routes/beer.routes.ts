import { Router } from 'express'
import { createBeerController } from '../controllers/beer.controllers'

const beerRoutes: Router = Router()

beerRoutes.post('', createBeerController)

export default beerRoutes
