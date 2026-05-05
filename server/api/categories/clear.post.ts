import { db } from '../../utils/db'

export default defineEventHandler(async () => {
    // await new Promise(resolve => setTimeout(resolve, 800))
    db.setCategories([])
    return { success: true, categories: [] }
})
