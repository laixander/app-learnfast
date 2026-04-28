import { DEFAULT_QUESTS, DEFAULT_NOTIFICATIONS } from '~/constants/gameData'

// ============================================================
// useUserStore — Global reactive user state via Nuxt useState
// useState keeps values shared across all pages in the session
// ============================================================

export const useUserStore = () => {
    // --- User Profile ---
    const user = useState('user', () => ({
        name: 'Felix',
        level: 12,
        avatar: 'Felix',
        title: 'Master of Space and Math'
    }))

    // --- Core Stats (XP, Coins, Badges, Streak) ---
    const stats = useState('user-stats', () => ({
        xp: 2450,
        coins: 120,
        badges: 12,
        streak: 5,
        // Extended profile stats
        totalXp: '15.4k',
        lessonsDone: 42,
        friends: 8
    }))

    // --- Daily Quests (reactive, toggled per session) ---
    const quests = useState('user-quests', () =>
        DEFAULT_QUESTS.map(q => ({ ...q }))
    )

    // --- Global Notifications ---
    const notifications = useState('user-notifications', () =>
        DEFAULT_NOTIFICATIONS.map(n => ({ ...n, read: false }))
    )

    // --- Seeder state — controls whether data is populated or empty ---
    // Using a cookie so the server knows the seeded state on refresh (prevents hydration mismatch)
    const seededCookie = useCookie('learnfast-seeded', { default: () => 'false', watch: true })
    const isSeeded = useState('seeded', () => seededCookie.value === 'true')

    // --- Active Adventure context ---
    const activeAdventureSlug = useState('active-adventure-slug', () => '')

    // --- Progress Tracking ---
    const completedLessonsCookie = useCookie<string[]>('learnfast-completed-lessons', { default: () => [], watch: true })
    const completedLessons = useState<string[]>('completed-lessons', () => completedLessonsCookie.value || [])

    // Sync state to cookie
    watch(isSeeded, (newVal) => {
        seededCookie.value = newVal.toString()
    })
    watch(completedLessons, (newVal) => {
        completedLessonsCookie.value = newVal
    }, { deep: true })

    // --- Computed Helpers ---
    const canClaim = computed(() =>
        quests.value.some(q => q.done && !q.claimed)
    )

    // --- Actions ---
    const toggleQuest = (index: number) => {
        const quest = quests.value[index]
        if (!quest || quest.claimed) return
        quest.done = !quest.done
    }

    const markNoteRead = (id: number) => {
        const note = notifications.value.find(n => n.id === id)
        if (note) note.read = true
    }

    const toggleNoteRead = (id: number) => {
        const note = notifications.value.find(n => n.id === id)
        if (note) note.read = !note.read
    }

    const deleteNote = (id: number) => {
        notifications.value = notifications.value.filter(n => n.id !== id)
    }

    const clearAllNotes = () => {
        notifications.value = []
    }

    const claimAllRewards = () => {
        const toast = useToast()
        let xpGained = 0
        let coinsGained = 0
        let badgesGained = 0

        quests.value.forEach(q => {
            if (q.done && !q.claimed) {
                if (q.rewardType === 'xp') xpGained += q.rewardValue
                if (q.rewardType === 'coins') coinsGained += q.rewardValue
                if (q.rewardType === 'badges') badgesGained += q.rewardValue
                q.claimed = true
            }
        })

        if (xpGained > 0 || coinsGained > 0 || badgesGained > 0) {
            stats.value.xp += xpGained
            stats.value.coins += coinsGained
            stats.value.badges += badgesGained

            toast.add({
                title: 'Rewards Claimed!',
                description: `You earned ${xpGained > 0 ? xpGained + ' XP ' : ''}${coinsGained > 0 ? coinsGained + ' Coins ' : ''}${badgesGained > 0 ? badgesGained + ' Badge' : ''}!`,
                icon: 'i-ph-gift-duotone',
                color: 'primary'
            })
        }
    }

    const markLessonCompleted = (slug: string) => {
        if (!completedLessons.value.includes(slug)) {
            completedLessons.value.push(slug)
        }
    }

    const seedData = () => {
        const toast = useToast()
        isSeeded.value = true
        // Reset quests and notifications to default seeded state
        quests.value = DEFAULT_QUESTS.map(q => ({ ...q }))
        notifications.value = DEFAULT_NOTIFICATIONS.map(n => ({ ...n, read: false }))
        // Optionally pre-seed some completed lessons for demo
        completedLessons.value = ['intro-to-planets', 'moon-mission']
        toast.add({
            title: '✅ Data Seeded!',
            description: 'All app data has been populated successfully.',
            icon: 'i-ph-database-duotone',
            color: 'success'
        })
    }

    const clearData = () => {
        const toast = useToast()
        isSeeded.value = false
        // Clear reactive session data
        quests.value = []
        notifications.value = []
        completedLessons.value = []
        toast.add({
            title: '🗑️ Data Cleared!',
            description: 'All app data has been removed. Empty states are now visible.',
            icon: 'i-ph-trash-duotone',
            color: 'error'
        })
    }

    return {
        user,
        stats,
        quests,
        notifications,
        isSeeded,
        canClaim,
        toggleQuest,
        markNoteRead,
        toggleNoteRead,
        deleteNote,
        clearAllNotes,
        activeAdventureSlug,
        completedLessons,
        markLessonCompleted,
        claimAllRewards,
        seedData,
        clearData
    }
}
