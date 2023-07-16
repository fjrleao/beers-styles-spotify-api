import { z } from 'zod'
import {
	beerSchema,
	beerCreateSchema,
	beerUpdateSchema,
} from '../schemas/beer.schemas'

type TBeer = z.infer<typeof beerSchema>
type TBeerCreate = z.infer<typeof beerCreateSchema>
type TBeerUpdate = z.infer<typeof beerUpdateSchema>

export { TBeer, TBeerCreate, TBeerUpdate }
