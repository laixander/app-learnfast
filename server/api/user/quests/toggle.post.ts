import { db } from '../../../utils/db'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // await new Promise(resolve => setTimeout(resolve, 300))

    const quests = db.getQuests()
    const index = quests.findIndex(q => q.id === body.id)
    
    if (index !== -1) {
        const quest = quests[index]
        if (quest) {
            quest.done = body.done
            db.setQuests(quests)
        }
    }

    return { success: true }
})
