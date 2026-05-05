import type { Category } from '~/composables/useCategories'
import type { Suggestion } from '~/composables/useSuggestions'
import type { UserProfile, Quest, Notification, Stats } from '~/composables/useUserStore'
import type { AdminStat, AdminAction, AdminShopItem } from '~/constants/adminData'
import type { Adventure } from '~/types/adventures'

// --- Default Data ---
const DEFAULT_CATEGORIES: Category[] = [
    { id: '1', name: 'Science', icon: 'i-ph-flask-duotone', color: 'primary', keywords: ['space', 'planet', 'ocean', 'sea', 'fish', 'animal', 'nature', 'bug', 'cook', 'pizza', 'food', 'science'] },
    { id: '2', name: 'Math', icon: 'i-ph-calculator-duotone', color: 'success', keywords: ['math', 'number', 'algebra', 'calculus', 'geometry', 'counting'] },
    { id: '3', name: 'History', icon: 'i-ph-hourglass-duotone', color: 'warning', keywords: ['history', 'ancient', 'war', 'past', 'dino', 'fossil'] },
    { id: '4', name: 'Art', icon: 'i-ph-palette-duotone', color: 'error', keywords: ['art', 'paint', 'music', 'color', 'drawing', 'sketch'] },
    { id: '5', name: 'Computer', icon: 'i-ph-cpu-duotone', color: 'info', keywords: ['code', 'computer', 'robot', 'ai', 'tech', 'software', 'coding'] },
    { id: '6', name: 'English', icon: 'i-ph-book-open-duotone', color: 'secondary', keywords: ['english', 'story', 'book', 'write', 'grammar', 'reading'] },
    { id: '7', name: 'Geography', icon: 'i-ph-globe-hemisphere-west-duotone', color: 'teal', keywords: ['geography', 'earth', 'map', 'country', 'city', 'continent'] },
    { id: '8', name: 'Music', icon: 'i-ph-music-notes-duotone', color: 'fuchsia', keywords: ['music', 'song', 'instrument', 'melody', 'rhythm', 'band'] }
]

const DEFAULT_SUGGESTIONS: Suggestion[] = [
    { id: '1', label: 'Space Adventure', value: 'Tell me a story about a brave astronaut visiting Mars.', icon: 'i-ph-rocket-duotone', color: 'primary' },
    { id: '2', label: 'Math Wizard', value: 'Help me solve a tricky math puzzle with magic.', icon: 'i-ph-magic-wand-duotone', color: 'success' },
    { id: '3', label: 'Dino World', value: 'Take me back in time to meet a friendly T-Rex.', icon: 'i-ph-bug-duotone', color: 'warning' },
    { id: '4', label: 'Robot Buddy', value: 'Help me build a friendly robot that can talk and dance.', icon: 'i-ph-robot-duotone', color: 'info' },
    { id: '5', label: 'Ocean Quest', value: 'Dive deep into the blue ocean to meet a giant friendly whale.', icon: 'i-ph-waves-duotone', color: 'teal' }
]

// --- Server-side state (Mock Database) ---
let categories: Category[] = [...DEFAULT_CATEGORIES]
let suggestions: Suggestion[] = [...DEFAULT_SUGGESTIONS]
let user: UserProfile = { name: 'Explorer', level: 1, avatar: 'Felix', title: 'New Explorer', role: 'USER' }
let stats: Stats = { xp: 0, coins: 0, badges: 0, streak: 0, totalXp: '0', lessonsDone: 0, friends: 0 }
let quests: Quest[] = []
let notifications: Notification[] = []
let customAdventures: Adventure[] = []
let adminStats: AdminStat[] = []
let adminActions: AdminAction[] = []
let shopItems: AdminShopItem[] = []
let isSeeded = false

// --- Getters & Setters ---
export const db = {
    getCategories: () => categories,
    setCategories: (val: Category[]) => { categories = val },
    
    getSuggestions: () => suggestions,
    setSuggestions: (val: Suggestion[]) => { suggestions = val },

    getUser: () => user,
    setUser: (val: UserProfile) => { user = val },

    getStats: () => stats,
    setStats: (val: Stats) => { stats = val },

    getQuests: () => quests,
    setQuests: (val: Quest[]) => { quests = val },

    getNotifications: () => notifications,
    setNotifications: (val: Notification[]) => { notifications = val },

    getCustomAdventures: () => customAdventures,
    setCustomAdventures: (val: Adventure[]) => { customAdventures = val },

    getAdminStats: () => adminStats,
    setAdminStats: (val: AdminStat[]) => { adminStats = val },

    getAdminActions: () => adminActions,
    setAdminActions: (val: AdminAction[]) => { adminActions = val },

    getShopItems: () => shopItems,
    setShopItems: (val: AdminShopItem[]) => { shopItems = val },

    getIsSeeded: () => isSeeded,
    setIsSeeded: (val: boolean) => { isSeeded = val },

    resetAll: () => {
        categories = [...DEFAULT_CATEGORIES]
        suggestions = [...DEFAULT_SUGGESTIONS]
        user = { 
            name: 'Felix', 
            level: 12, 
            avatar: 'Felix', 
            title: 'Master of Space and Math', 
            role: 'ADMIN' 
        }
        stats = {
            xp: 2450,
            coins: 120,
            badges: 12,
            streak: 5,
            totalXp: '15.4k',
            lessonsDone: 42,
            friends: 8
        }
        quests = [
            { id: 1, task: 'Complete 1 Math Lesson', reward: '50 XP', category: 'Learning', difficulty: 'easy', done: true, claimed: false, rewardValue: 50, rewardType: 'xp' },
            { id: 2, task: 'Finish a Space Explorer chapter', reward: '75 XP', category: 'Learning', difficulty: 'medium', done: false, claimed: false, rewardValue: 75, rewardType: 'xp' },
            { id: 3, task: 'Visit the Leaderboard', reward: '20 Coins', category: 'Social', difficulty: 'easy', done: false, claimed: false, rewardValue: 20, rewardType: 'coins' },
            { id: 4, task: 'Check a friend\'s profile', reward: '30 Coins', category: 'Social', difficulty: 'medium', done: false, claimed: false, rewardValue: 30, rewardType: 'coins' },
            { id: 5, task: 'Create a custom Adventure', reward: '1 Badge', category: 'Creative', difficulty: 'hard', done: false, claimed: false, rewardValue: 1, rewardType: 'badges' },
            { id: 6, task: 'Draw a dinosaur in Art Studio', reward: '40 Coins', category: 'Creative', difficulty: 'medium', done: false, claimed: false, rewardValue: 40, rewardType: 'coins' }
        ]
        notifications = [
            { id: 1, title: 'Quest Complete!', message: 'You earned 50 XP for completing a Math lesson.', time: '2 mins ago', icon: 'i-ph-check-circle-duotone', color: 'text-emerald-500', bg: 'bg-emerald-50', fullMessage: 'Great job, Explorer! You finished the "Addition Fun" lesson and earned a bonus 50 XP. Keep it up to reach the next level!', read: false },
            { id: 2, title: 'New Badge!', message: 'Congratulations! You unlocked the "Early Bird" badge.', time: '1 hour ago', icon: 'i-ph-medal-duotone', color: 'text-pink-500', bg: 'bg-pink-50', fullMessage: 'Wow! You are truly an early explorer. By logging in before 8 AM, you have earned the "Early Bird" badge. It has been added to your profile trophy case.', read: false },
            { id: 3, title: 'Friend Request', message: 'Anika.Dev sent you a friend request.', time: '3 hours ago', icon: 'i-ph-user-plus-duotone', color: 'text-indigo-500', bg: 'bg-indigo-50', fullMessage: 'Anika.Dev wants to be your friend! Friends can see each other on the leaderboard and compare their weekly streaks.', read: false },
            { id: 4, title: 'Daily Streak!', message: 'Keep it up! You are on a 5-day streak.', time: 'Yesterday', icon: 'i-ph-fire-duotone', color: 'text-orange-500', bg: 'bg-orange-50', fullMessage: 'You are on fire! That is 5 days in a row of learning something new. Reach 7 days to earn a Mystery Chest reward!', read: false }
        ]
        customAdventures = []
        adminStats = [
            { label: 'Total Explorers', value: '1,284', icon: 'i-ph-users-duotone', color: 'primary', trend: '+12% from last month' },
            { label: 'Active Adventures', value: '42', icon: 'i-ph-mountains-duotone', color: 'success', trend: '+3 new this week' },
            { label: 'Magic Coins', value: '150.2k', icon: 'i-ph-atom-duotone', color: 'warning', trend: 'Economy stable' },
            { label: 'AI Missions', value: '312', icon: 'i-ph-test-tube-duotone', color: 'info', trend: 'High engagement' }
        ]
        adminActions = [
            { user: 'Leo', action: 'completed "Mars Mission"', time: '2 mins ago', icon: 'i-ph-check-circle-duotone', color: 'success' },
            { user: 'Sarah', action: 'bought "Gold Dragon" title', time: '15 mins ago', icon: 'i-ph-shopping-cart-duotone', color: 'warning' },
            { user: 'Admin', action: 'updated Shop prices', time: '1 hour ago', icon: 'i-ph-gear-duotone', color: 'primary' },
            { user: 'Max', action: 'reached Level 20', time: '3 hours ago', icon: 'i-ph-trend-up-duotone', color: 'info' }
        ]
        shopItems = [
            { id: 1, name: 'Space Explorer Avatar', price: 500, category: 'Avatar', status: 'Available', icon: 'i-ph-user-circle-duotone', color: 'bg-blue-500', description: 'Perfect for star explorers.' },
            { id: 2, name: 'Golden Streak Freeze', price: 1000, category: 'Consumable', status: 'Available', icon: 'i-ph-snowflake-duotone', color: 'bg-orange-500', description: 'Save your streak if you miss a day!' },
            { id: 3, name: 'Master of Math Title', price: 2500, category: 'Title', status: 'Hidden', icon: 'i-ph-identification-card-duotone', color: 'bg-indigo-500', description: 'Show everyone your math skills.' },
            { id: 4, name: 'Magic Wand', price: 1200, category: 'Consumable', status: 'Available', icon: 'i-ph-magic-wand-duotone', color: 'bg-pink-500', description: 'Cast spells while you study!' },
            { id: 5, name: 'Emerald Shield', price: 800, category: 'Consumable', status: 'Available', icon: 'i-ph-shield-duotone', color: 'bg-emerald-500', description: 'Protects you from losing points on one wrong answer.' },
            { id: 6, name: 'King\'s Crown', price: 3000, category: 'Avatar', status: 'Available', icon: 'i-ph-crown-duotone', color: 'bg-yellow-500', description: 'Rule the leaderboard with this majestic crown.' },
            { id: 7, name: 'Speed Potion', price: 1500, category: 'Consumable', status: 'Available', icon: 'i-ph-flask-duotone', color: 'bg-purple-500', description: 'Double XP for your next 3 lessons!' },
            { id: 8, name: 'Legendary Explorer', price: 5000, category: 'Title', status: 'Available', icon: 'i-ph-medal-duotone', color: 'bg-teal-500', description: 'A title reserved only for the best.' }
        ]
        isSeeded = true
    },
    clearAll: () => {
        categories = []
        suggestions = []
        user = { name: 'Explorer', level: 1, avatar: 'Felix', title: 'New Explorer', role: 'USER' }
        stats = { xp: 0, coins: 0, badges: 0, streak: 0, totalXp: '0', lessonsDone: 0, friends: 0 }
        quests = []
        notifications = []
        customAdventures = []
        adminStats = []
        adminActions = []
        shopItems = []
        isSeeded = false
    }
}

