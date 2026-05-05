import { db } from '../../utils/db'

export default defineEventHandler(async () => {
    // await new Promise(resolve => setTimeout(resolve, 500))
    return {
        user: db.getUser(),
        stats: db.getStats(),
        quests: db.getQuests(),
        notifications: db.getNotifications(),
        customAdventures: db.getCustomAdventures(),
        adminStats: db.getAdminStats(),
        adminActions: db.getAdminActions(),
        shopItems: db.getShopItems(),
        isSeeded: db.getIsSeeded()
    }
})
