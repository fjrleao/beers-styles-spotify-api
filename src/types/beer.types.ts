import { z } from 'zod'
import { beerSchema, beerCreateSchema } from '../schemas/beer.schemas'

type TBeer = z.infer<typeof beerSchema>
type TBeerCreate = z.infer<typeof beerCreateSchema>

export { TBeer, TBeerCreate }
