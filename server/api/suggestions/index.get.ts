import { db } from '../../utils/db'

export default defineEventHandler(async () => {
    // await new Promise(resolve => setTimeout(resolve, 600))
    return db.getSuggestions()
})
