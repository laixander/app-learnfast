import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // await new Promise(resolve => setTimeout(resolve, 800))

    const categories = db.getCategories()
    
    if (body.id) {
        // Update
        const index = categories.findIndex(c => c.id === body.id)
        if (index !== -1) {
            categories[index] = { ...categories[index], ...body }
        }
    } else {
        // Create
        const newCategory = {
            ...body,
            id: Date.now().toString()
        }
        categories.push(newCategory)
    }

    db.setCategories(categories)
    return { success: true, categories }
})
