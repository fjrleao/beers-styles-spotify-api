import mongoose from 'mongoose'

const connectDatabase = async () => {
	try {
		const dbUri = 'mongodb://test:1234@localhost:27017'
		const dbName = 'test'
		await mongoose.connect(dbUri, {
			dbName,
			autoCreate: true,
		})
	} catch (error) {
		console.error(error)
	}
}

const disconnectDatabase = async () => {
	try {
		await mongoose.connection.dropCollection('beers')
		await mongoose.connection.close()
	} catch (error) {
		console.error(error)
	}
}

const deleteCollection = () => {}

export { connectDatabase, disconnectDatabase, deleteCollection }
