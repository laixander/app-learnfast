import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // await new Promise(resolve => setTimeout(resolve, 800))

    const suggestions = db.getSuggestions()
    
    if (body.id) {
        const index = suggestions.findIndex(s => s.id === body.id)
        if (index !== -1) {
            suggestions[index] = { ...suggestions[index], ...body }
        }
    } else {
        const newSuggestion = {
            ...body,
            id: Date.now().toString()
        }
        suggestions.push(newSuggestion)
    }

    db.setSuggestions(suggestions)
    return { success: true, suggestions }
})
