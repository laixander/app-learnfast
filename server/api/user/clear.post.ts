import { db } from '../../utils/db'

export default defineEventHandler(async () => {
    // await new Promise(resolve => setTimeout(resolve, 1000))
    db.clearAll()
    return { success: true }
})
