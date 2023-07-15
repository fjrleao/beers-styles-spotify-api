import { connect } from 'mongoose'
import 'dotenv/config'

const connectDatabase = async () => {
	const uri: string | undefined = process.env.MONGO_DB_URI

	if (!uri) {
		throw new Error(`Missing 'MONGO_DB_URI' in .env config`)
	}

	await connect(uri)
}

export { connectDatabase }
