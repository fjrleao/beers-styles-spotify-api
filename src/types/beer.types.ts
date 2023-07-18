import { z } from 'zod'
import {
	beerSchema,
	beerCreateSchema,
	beerUpdateSchema,
} from '../schemas/beer.schemas'

type TBeer = z.infer<typeof beerSchema>
type TBeerCreate = z.infer<typeof beerCreateSchema>
type TBeerUpdate = z.infer<typeof beerUpdateSchema>

type TBeerPlaylist = {
	beerStyle: string
	playlist: {
		name: string
		tracks: {
			artits: string
			link: string
		}[]
	}
}

export { TBeer, TBeerCreate, TBeerUpdate, TBeerPlaylist }
