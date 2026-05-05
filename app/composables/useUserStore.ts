import { getCurrentInstance, onMounted, computed, watch } from 'vue'
import { DEFAULT_QUESTS, DEFAULT_NOTIFICATIONS } from '~/constants/gameData'
import { ADMIN_STATS, ADMIN_ACTIONS, MOCK_SHOP_ITEMS, type AdminStat, type AdminAction, type AdminShopItem } from '~/constants/adminData'
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

export interface Stats {
    xp: number
    coins: number
    badges: number
    streak: number
    totalXp: string
    lessonsDone: number
    friends: number
}

// ============================================================
// useUserStore — Global reactive user state via Nuxt useState
// useState keeps values shared across all pages in the session
// ============================================================

export const useUserStore = () => {
    const instance = getCurrentInstance()
    const toast = instance ? useToast() : { add: () => console.warn('Toast called outside of setup') }
    const suggestionsStore = useSuggestions()
    const categoriesStore = useCategories()

    // --- Reactive State (useState) ---
    const user = useState<UserProfile>('user', () => ({ name: 'Explorer', level: 1, avatar: 'Felix', title: 'New Explorer', role: 'USER' }))
    const stats = useState<Stats>('user-stats', () => ({ xp: 0, coins: 0, badges: 0, streak: 0, totalXp: '0', lessonsDone: 0, friends: 0 }))
    const quests = useState<Quest[]>('user-quests', () => [])
    const notifications = useState<Notification[]>('user-notifications', () => [])
    const isSeeded = useState('seeded', () => false)
    const customAdventures = useState<Adventure[]>('custom-adventures', () => [])
    const completedLessons = useState<string[]>('completed-lessons', () => [])
    const adminStats = useState<AdminStat[]>('admin-stats', () => [])
    const adminActions = useState<AdminAction[]>('admin-actions', () => [])
    const shopItems = useState<AdminShopItem[]>('shop-items', () => [])
    const activeAdventureSlug = useState('active-adventure-slug', () => '')
    const isSyncing = useState('user-store-syncing', () => false)

    interface UserStoreData {
        user: UserProfile
        stats: Stats
        quests: Quest[]
        notifications: Notification[]
        customAdventures: Adventure[]
        adminStats: AdminStat[]
        adminActions: AdminAction[]
        shopItems: AdminShopItem[]
        isSeeded: boolean
    }

    // Initial fetch using useAsyncData for SSR support
    const { data: initialData, refresh } = useAsyncData('user-store-initial', () => $fetch<UserStoreData>('/api/user'))
    
    // Watch for initial data
    watch(initialData, (newData) => {
        if (newData) {
            user.value = newData.user
            stats.value = newData.stats
            quests.value = newData.quests
            notifications.value = newData.notifications
            customAdventures.value = newData.customAdventures
            adminStats.value = newData.adminStats
            adminActions.value = newData.adminActions
            shopItems.value = newData.shopItems
            isSeeded.value = newData.isSeeded
        }
    }, { immediate: true })

    const fetchUserStore = async () => {
        await refresh()
        if (initialData.value) {
            user.value = initialData.value.user
            stats.value = initialData.value.stats
            quests.value = initialData.value.quests
            notifications.value = initialData.value.notifications
            customAdventures.value = initialData.value.customAdventures
            adminStats.value = initialData.value.adminStats
            adminActions.value = initialData.value.adminActions
            shopItems.value = initialData.value.shopItems
            isSeeded.value = initialData.value.isSeeded
        }
    }

    // Helper for syncing changes
    const syncWithServer = async (payload: any) => {
        await $fetch('/api/user/sync', { method: 'POST', body: payload })
    }

    // --- Computed Helpers ---
    const canClaim = computed(() =>
        quests.value.some(q => q.done && !q.claimed)
    )

    const hasContent = computed(() => isSeeded.value || customAdventures.value.length > 0 || shopItems.value.length > 0)

    // --- Actions ---
    const toggleQuest = async (index: number) => {
        const quest = quests.value[index]
        if (!quest || quest.claimed) return
        quest.done = !quest.done
        await $fetch('/api/user/quests/toggle', {
            method: 'POST',
            body: { id: quest.id, done: quest.done }
        })
    }

    const markNoteRead = async (id: number) => {
        const note = notifications.value.find(n => n.id === id)
        if (note) {
            note.read = true
            await syncWithServer({ notifications: notifications.value })
        }
    }

    const toggleNoteRead = async (id: number) => {
        const note = notifications.value.find(n => n.id === id)
        if (note) {
            note.read = !note.read
            await syncWithServer({ notifications: notifications.value })
        }
    }

    const deleteNote = async (id: number) => {
        notifications.value = notifications.value.filter(n => n.id !== id)
        await syncWithServer({ notifications: notifications.value })
    }

    const clearAllNotes = async () => {
        notifications.value = []
        await syncWithServer({ notifications: [] })
    }

    const claimAllRewards = async () => {
        isSyncing.value = true
        try {
            const data = await $fetch<any>('/api/user/quests/claim', { method: 'POST' })
            if (data.success) {
                stats.value = data.stats
                quests.value = data.quests
                
                const { xp, coins, badges } = data.rewards
                if (xp > 0 || coins > 0 || badges > 0) {
                    toast.add({
                        title: 'Rewards Claimed!',
                        description: `You earned ${xp > 0 ? xp + ' XP ' : ''}${coins > 0 ? coins + ' Coins ' : ''}${badges > 0 ? badges + ' Badge' : ''}!`,
                        icon: 'i-ph-gift-duotone',
                        color: 'primary'
                    })
                }
            }
        } finally {
            isSyncing.value = false
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

    const seedData = async () => {
        isSyncing.value = true
        try {
            await $fetch('/api/user/seed', { method: 'POST' })
            await Promise.all([
                fetchUserStore(),
                suggestionsStore.fetchSuggestions(),
                categoriesStore.fetchCategories()
            ])

            toast.add({
                title: 'Data Seeded!',
                description: 'Mock data, magic prompts, and categories have been populated.',
                icon: 'i-ph-database-duotone',
                color: 'success'
            })
        } finally {
            isSyncing.value = false
        }
    }

    const clearData = async () => {
        isSyncing.value = true
        try {
            await $fetch('/api/user/clear', { method: 'POST' })
            await Promise.all([
                fetchUserStore(),
                suggestionsStore.fetchSuggestions(),
                categoriesStore.fetchCategories()
            ])

            toast.add({
                title: 'Data Cleared!',
                description: 'All app data and prompts have been reset.',
                icon: 'i-ph-trash-duotone',
                color: 'error'
            })
        } finally {
            isSyncing.value = false
        }
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
        adminStats,
        adminActions,
        shopItems,
        hasContent,
        isSyncing,
        canClaim,
        fetchUserStore,
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
