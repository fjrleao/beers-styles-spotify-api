import { connect } from 'mongoose'
import 'dotenv/config'

const connectDatabase = async () => {
	const uri: string | undefined = process.env.MONGODB_URI
	const name: string | undefined = process.env.MONGODB_NAME

	if (!uri || !name) {
		throw new Error(`Missing 'MONGODB_URI' or 'MONGODB_NAME' in .env config`)
	}

	await connect(uri, {
		dbName: process.env.MONGODB_NAME,
	})
}

export { connectDatabase }
