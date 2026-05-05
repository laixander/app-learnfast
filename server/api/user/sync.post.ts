import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // await new Promise(resolve => setTimeout(resolve, 800))

    if (body.user) db.setUser(body.user)
    if (body.stats) db.setStats(body.stats)
    if (body.quests) db.setQuests(body.quests)
    if (body.notifications) db.setNotifications(body.notifications)
    if (body.customAdventures) db.setCustomAdventures(body.customAdventures)
    if (body.adminStats) db.setAdminStats(body.adminStats)
    if (body.adminActions) db.setAdminActions(body.adminActions)
    if (body.shopItems) db.setShopItems(body.shopItems)
    if (body.isSeeded !== undefined) db.setIsSeeded(body.isSeeded)

    return { success: true }
})
