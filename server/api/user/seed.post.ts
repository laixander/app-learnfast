import { db } from '../../utils/db'

export default defineEventHandler(async () => {
    // await new Promise(resolve => setTimeout(resolve, 1500))
    db.resetAll()
    return { success: true }
})
