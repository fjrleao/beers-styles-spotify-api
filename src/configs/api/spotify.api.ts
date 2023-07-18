import axios from 'axios'
import 'dotenv/config'

let tokenDateTime = new Date('2020-01-01')
let accessToken = ''

const verifyTokenIsValid = (
	actualDateTime: Date,
	tokenDateTime: Date
): boolean => {
	const HOURS_IN_MILLISECONDS = 3600000
	if (
		actualDateTime.getTime() - tokenDateTime.getTime() >=
		HOURS_IN_MILLISECONDS
	) {
		return false
	}
	return true
}

const getSpotifyToken = async () => {
	const clientId: string | undefined = process.env.SPOTIFY_API_CLIENT_ID
	const clientSecret: string | undefined = process.env.SPOTIFY_API_CLIENT_SECRET
	const actualDateTime = new Date()

	if (!clientId || !clientSecret) {
		throw new Error(
			`Missing 'SPOTIFY_API_CLIENT_ID' or 'SPOTIFY_API_CLIENT_SECRET' in .env config`
		)
	}

	if (verifyTokenIsValid(actualDateTime, tokenDateTime)) {
		return accessToken
	}

	try {
		const response = await axios.post(
			'https://accounts.spotify.com/api/token',
			{
				grant_type: 'client_credentials',
				client_id: clientId,
				client_secret: clientSecret,
			},
			{
				headers: {
					'content-type': 'application/x-www-form-urlencoded',
				},
			}
		)

		tokenDateTime = new Date()
		accessToken = response.data.access_token
		return response.data.access_token
	} catch (error) {
		console.error(error)
	}
}

const apiSpotifySearchPlaylist = axios.create({
	baseURL: 'https://api.spotify.com/v1/search',
	params: {
		type: 'playlist',
		market: 'BR',
	},
})

export { getSpotifyToken, apiSpotifySearchPlaylist }
