import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const id = query.id as string
    
    // await new Promise(resolve => setTimeout(resolve, 500))

    const categories = db.getCategories()
    const filtered = categories.filter(c => c.id !== id)
    
    db.setCategories(filtered)
    return { success: true }
})
