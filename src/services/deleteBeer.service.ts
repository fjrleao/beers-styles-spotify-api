import { Beer } from '../models/Beer'

const deleteBeerService = async (id: string) => {
	await Beer.deleteOne({ _id: id }).exec()
}

export default deleteBeerService
