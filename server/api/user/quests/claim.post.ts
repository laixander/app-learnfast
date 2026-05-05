import { db } from '../../../utils/db'

export default defineEventHandler(async () => {
    // await new Promise(resolve => setTimeout(resolve, 1000))

    const quests = db.getQuests()
    const stats = db.getStats()
    
    let xpGained = 0
    let coinsGained = 0
    let badgesGained = 0

    quests.forEach(q => {
        if (q.done && !q.claimed) {
            if (q.rewardType === 'xp') xpGained += q.rewardValue
            if (q.rewardType === 'coins') coinsGained += q.rewardValue
            if (q.rewardType === 'badges') badgesGained += q.rewardValue
            q.claimed = true
        }
    })

    if (xpGained > 0 || coinsGained > 0 || badgesGained > 0) {
        stats.xp += xpGained
        stats.coins += coinsGained
        stats.badges += badgesGained
        db.setStats(stats)
        db.setQuests(quests)
    }

    return { 
        success: true, 
        stats: db.getStats(), 
        quests: db.getQuests(),
        rewards: { xp: xpGained, coins: coinsGained, badges: badgesGained }
    }
})
