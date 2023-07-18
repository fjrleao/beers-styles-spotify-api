import {
	apiSpotifySearchPlaylist,
	getSpotifyToken,
} from '../configs/api/spotify.api'
import { AppError } from '../errors'
import { Beer } from '../models/Beer'
import axios from 'axios'

const listBeerStylePlaylistService = async (temperature: number) => {
	if (Number.isNaN(temperature)) {
		throw new AppError(
			'Necessary to pass the numerical temperature in the query parameters'
		)
	}

	const dataToReturn = []

	let beers = await Beer.find({
		$or: [{ maxTemperature: temperature }, { minTemperature: temperature }],
	}).sort({ beerStyle: 'asc' })

	if (beers.length === 0) {
		beers = await Beer.find().sort({ beerStyle: 'asc' })
		const avgTemperatures = beers.map((beer) => beer.avgTemperature)

		const mostAproximatedAvgTemperature = avgTemperatures.reduce(
			(prev, curr) => {
				return Math.abs(curr - temperature) < Math.abs(prev - temperature)
					? curr
					: prev
			}
		)

		beers = beers.filter(
			(beer) => beer.avgTemperature === mostAproximatedAvgTemperature
		)
	}

	const accessToken = await getSpotifyToken()

	for (let index = 0; index < beers.length; index++) {
		const playlists = await apiSpotifySearchPlaylist({
			headers: { Authorization: `Bearer ${accessToken}` },
			params: {
				q: beers[index].beerStyle,
			},
		})

		if (
			playlists.data.playlists.items[0].name
				.toLowerCase()
				.includes(beers[index].beerStyle.toLowerCase())
		) {
			const tracks = await axios.get(playlists.data.playlists.items[0].href, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				params: {
					offset: 0,
					limit: 3,
				},
			})

			const processedTracks = tracks.data.tracks.items.map((t: any) => {
				return {
					name: t.track.name,
					artist: t.track.artists[0].name,
					link: t.track.artists[0].href,
				}
			})

			dataToReturn.push({
				beerStyle: beers[index].beerStyle,
				playlist: {
					name: playlists.data.playlists.items[0].name,
					tracks: processedTracks,
				},
			})
		}
	}

	if (dataToReturn.length === 0) {
		throw new AppError('Playlists not found', 404)
	}

	return dataToReturn.length === 1 ? dataToReturn[0] : dataToReturn
}

export default listBeerStylePlaylistService
