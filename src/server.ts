import app from './app'
import 'dotenv/config'
import { connectDatabase } from './configs/database/connection'

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
	await connectDatabase()
	console.log('Connected to database')
	console.log(`Server running in port ${PORT}`)
})
