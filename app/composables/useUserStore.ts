import { DEFAULT_QUESTS, DEFAULT_NOTIFICATIONS } from '~/constants/gameData'
import type { Adventure } from '~/types/adventures'

export interface Quest {
    id: number
    task: string
    reward: string
    category: 'Learning' | 'Social' | 'Creative'
    difficulty: 'easy' | 'medium' | 'hard'
    done: boolean
    claimed: boolean
    rewardValue: number
    rewardType: 'xp' | 'coins' | 'badges'
}

export interface Notification {
    id: number
    title: string
    message: string
    fullMessage?: string
    time: string
    icon: string
    color: string
    bg: string
    read: boolean
}

export type UserRole = 'USER' | 'ADMIN' | 'MODERATOR'

export interface UserProfile {
    name: string
    level: number
    avatar: string
    title: string
    role: UserRole
}

// ============================================================
// useUserStore — Global reactive user state via Nuxt useState
// useState keeps values shared across all pages in the session
// ============================================================

export const useUserStore = () => {
    // --- Persistent State via Cookies ---
    const userCookie = useCookie<UserProfile>('learnfast-user', {
        default: () => ({
            name: 'Explorer',
            level: 1,
            avatar: 'Felix',
            title: 'New Explorer',
            role: 'USER'
        }),
        watch: true
    })
    const statsCookie = useCookie('learnfast-stats', {
        default: () => ({
            xp: 0,
            coins: 0,
            badges: 0,
            streak: 0,
            totalXp: '0',
            lessonsDone: 0,
            friends: 0
        }),
        watch: true
    })
    const questsCookie = useCookie<Quest[]>('learnfast-quests', { default: () => [], watch: true })
    const notificationsCookie = useCookie<Notification[]>('learnfast-notifications', { default: () => [], watch: true })
    const seededCookie = useCookie('learnfast-seeded', { default: () => 'false', watch: true })
    const customAdventuresCookie = useCookie<Adventure[]>('learnfast-custom-adventures', { default: () => [], watch: true })
    const completedLessonsCookie = useCookie<string[]>('learnfast-completed-lessons', { default: () => [], watch: true })

    // --- Reactive State (useState) initialized from Cookies ---
    const user = useState('user', () => userCookie.value)
    const stats = useState('user-stats', () => statsCookie.value)
    const quests = useState<Quest[]>('user-quests', () => questsCookie.value || [])
    const notifications = useState<Notification[]>('user-notifications', () => notificationsCookie.value || [])
    const isSeeded = useState('seeded', () => seededCookie.value === 'true')
    const customAdventures = useState<Adventure[]>('custom-adventures', () => customAdventuresCookie.value || [])
    const completedLessons = useState<string[]>('completed-lessons', () => completedLessonsCookie.value || [])
    const activeAdventureSlug = useState('active-adventure-slug', () => '')

    // --- Sync State back to Cookies ---
    watch(user, (newVal) => { userCookie.value = newVal }, { deep: true })
    watch(stats, (newVal) => { statsCookie.value = newVal }, { deep: true })
    watch(quests, (newVal) => { questsCookie.value = newVal }, { deep: true })
    watch(notifications, (newVal) => { notificationsCookie.value = newVal }, { deep: true })
    watch(isSeeded, (newVal) => { seededCookie.value = newVal.toString() })
    watch(customAdventures, (newVal) => { customAdventuresCookie.value = newVal }, { deep: true })
    watch(completedLessons, (newVal) => { completedLessonsCookie.value = newVal }, { deep: true })

    // --- Computed Helpers ---
    const canClaim = computed(() =>
        quests.value.some(q => q.done && !q.claimed)
    )

    const hasContent = computed(() => isSeeded.value || customAdventures.value.length > 0)

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

    const addCustomAdventure = (adventure: Adventure) => {
        // Prevent duplicates by slug
        if (!customAdventures.value.some(a => a.slug === adventure.slug)) {
            customAdventures.value.unshift(adventure)
        }
    }

    const seedData = () => {
        const toast = useToast()
        const suggestionsStore = useSuggestions()
        const categoriesStore = useCategories()
        console.log('useUserStore: Triggering seedData')
        
        isSeeded.value = true
        suggestionsStore.seedDefaults()
        categoriesStore.seedDefaults()

        // Populate with Mock Data
        user.value = {
            name: 'Felix',
            level: 12,
            avatar: 'Felix',
            title: 'Master of Space and Math',
            role: 'ADMIN'
        }

        stats.value = {
            xp: 2450,
            coins: 120,
            badges: 12,
            streak: 5,
            totalXp: '15.4k',
            lessonsDone: 42,
            friends: 8
        }

        quests.value = DEFAULT_QUESTS.map(q => ({ ...q }))
        notifications.value = DEFAULT_NOTIFICATIONS.map(n => ({ ...n, read: false }))
        completedLessons.value = ['intro-to-planets', 'moon-mission']

        toast.add({
            title: 'Data Seeded!',
            description: 'Mock data, magic prompts, and categories have been populated.',
            icon: 'i-ph-database-duotone',
            color: 'success'
        })
    }

    const clearData = () => {
        const toast = useToast()
        const { clearAll: clearPrompts } = useSuggestions()
        const { clearAll: clearCategories } = useCategories()
        
        isSeeded.value = false
        clearPrompts()
        clearCategories()

        // Reset to Fresh State
        user.value = {
            name: 'Explorer',
            level: 1,
            avatar: 'Felix',
            title: 'New Explorer',
            role: 'USER'
        }

        stats.value = {
            xp: 0,
            coins: 0,
            badges: 0,
            streak: 0,
            totalXp: '0',
            lessonsDone: 0,
            friends: 0
        }

        quests.value = []
        notifications.value = []
        completedLessons.value = []
        customAdventures.value = []

        toast.add({
            title: 'Data Cleared!',
            description: 'All app data and prompts have been reset.',
            icon: 'i-ph-trash-duotone',
            color: 'error'
        })
    }

    const updateUser = (data: Partial<typeof user.value>) => {
        user.value = { ...user.value, ...data }
    }

    const updateUserRole = (role: UserRole) => {
        user.value.role = role
    }

    return {
        user,
        stats,
        quests,
        notifications,
        isSeeded,
        hasContent,
        canClaim,
        toggleQuest,
        markNoteRead,
        toggleNoteRead,
        deleteNote,
        clearAllNotes,
        activeAdventureSlug,
        completedLessons,
        customAdventures,
        markLessonCompleted,
        addCustomAdventure,
        claimAllRewards,
        seedData,
        clearData,
        updateUser,
        updateUserRole
    }
}
