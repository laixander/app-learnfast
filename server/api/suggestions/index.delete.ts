import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const id = query.id as string
    
    // await new Promise(resolve => setTimeout(resolve, 500))

    const suggestions = db.getSuggestions()
    const filtered = suggestions.filter(s => s.id !== id)
    
    db.setSuggestions(filtered)
    return { success: true }
})
