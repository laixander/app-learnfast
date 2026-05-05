export interface AdminStat {
    label: string
    value: string
    icon: string
    color: string
    trend: string
}

export interface AdminAction {
    user: string
    action: string
    time: string
    icon: string
    color: string
}

export const ADMIN_STATS: AdminStat[] = [
    { label: 'Total Explorers', value: '1,284', icon: 'i-ph-users-duotone', color: 'primary', trend: '+12% from last month' },
    { label: 'Active Adventures', value: '42', icon: 'i-ph-mountains-duotone', color: 'success', trend: '+3 new this week' },
    { label: 'Magic Coins', value: '150.2k', icon: 'i-ph-atom-duotone', color: 'warning', trend: 'Economy stable' },
    { label: 'AI Missions', value: '312', icon: 'i-ph-test-tube-duotone', color: 'info', trend: 'High engagement' }
]

export const ADMIN_ACTIONS = [
    { user: 'Leo', action: 'completed "Mars Mission"', time: '2 mins ago', icon: 'i-ph-check-circle-duotone', color: 'success' },
    { user: 'Sarah', action: 'bought "Gold Dragon" title', time: '15 mins ago', icon: 'i-ph-shopping-cart-duotone', color: 'warning' },
    { user: 'Admin', action: 'updated Shop prices', time: '1 hour ago', icon: 'i-ph-gear-duotone', color: 'primary' },
    { user: 'Max', action: 'reached Level 20', time: '3 hours ago', icon: 'i-ph-trend-up-duotone', color: 'info' }
]

export const EMPTY_ADMIN_STATS = [
    { label: 'Total Explorers', value: '0', icon: 'i-ph-users-duotone', color: 'primary', trend: 'No data' },
    { label: 'Active Adventures', value: '0', icon: 'i-ph-mountains-duotone', color: 'success', trend: 'No data' },
    { label: 'Magic Coins', value: '0', icon: 'i-ph-atom-duotone', color: 'warning', trend: 'No data' },
    { label: 'AI Missions', value: '0', icon: 'i-ph-test-tube-duotone', color: 'info', trend: 'No data' }
]

export interface AdminUser {
    id: number
    name: string
    role: string
    status: string
    avatar: string
    level?: number
    coins?: number
    plan?: string
}

export interface AdminShopItem {
    id: number
    name: string
    price: number
    category: string
    status: string
    icon: string
    color: string
    description: string
}

export interface AdminLog {
    timestamp: string
    level: string
    message: string
    type: string
}

export const MOCK_USERS: AdminUser[] = [
    { id: 1, name: 'Felix', role: 'ADMIN', status: 'Active', avatar: 'Felix' },
    { id: 2, name: 'Luna', level: 8, coins: 1200, role: 'USER', status: 'Active', avatar: 'Luna', plan: 'Free' },
    { id: 3, name: 'Atlas', role: 'MODERATOR', status: 'Active', avatar: 'Atlas' },
    { id: 4, name: 'Nova', level: 3, coins: 450, role: 'USER', status: 'Inactive', avatar: 'Nova', plan: 'Free' },
    { id: 5, name: 'Orion', level: 22, coins: 12400, role: 'USER', status: 'Active', avatar: 'Orion', plan: 'Pro' },
    { id: 6, name: 'Professor P.', role: 'ADMIN', status: 'Active', avatar: 'Professor' },
    { id: 7, name: 'Sky Walker', level: 5, coins: 200, role: 'USER', status: 'Active', avatar: 'Sky', plan: 'Free' },
    { id: 8, name: 'Stella', level: 12, coins: 3400, role: 'USER', status: 'Active', avatar: 'Stella', plan: 'Pro' },
    { id: 9, name: 'Comet', level: 2, coins: 150, role: 'USER', status: 'Active', avatar: 'Comet', plan: 'Free' },
    { id: 10, name: 'Astro', level: 15, coins: 6700, role: 'USER', status: 'Active', avatar: 'Astro', plan: 'Pro' },
    { id: 11, name: 'Nebula', level: 7, coins: 890, role: 'USER', status: 'Inactive', avatar: 'Nebula', plan: 'Free' },
    { id: 12, name: 'Cosmo', level: 19, coins: 9200, role: 'USER', status: 'Active', avatar: 'Cosmo', plan: 'Pro' },
    { id: 13, name: 'Lyra', level: 4, coins: 320, role: 'USER', status: 'Active', avatar: 'Lyra', plan: 'Free' },
    { id: 14, name: 'Draco', level: 11, coins: 2100, role: 'USER', status: 'Suspended', avatar: 'Draco', plan: 'Free' },
    { id: 15, name: 'Vega', level: 25, coins: 15000, role: 'USER', status: 'Active', avatar: 'Vega', plan: 'Pro' },
    { id: 16, name: 'Sirius', level: 9, coins: 1450, role: 'USER', status: 'Active', avatar: 'Sirius', plan: 'Free' },
    { id: 17, name: 'Apollo', level: 6, coins: 600, role: 'USER', status: 'Active', avatar: 'Apollo', plan: 'Free' },
    { id: 18, name: 'Artemis', level: 14, coins: 4500, role: 'USER', status: 'Active', avatar: 'Artemis', plan: 'Pro' },
    { id: 19, name: 'Leo', level: 8, coins: 1100, role: 'USER', status: 'Inactive', avatar: 'Leo', plan: 'Free' },
    { id: 20, name: 'Gemini', level: 21, coins: 11200, role: 'USER', status: 'Active', avatar: 'Gemini', plan: 'Pro' },
    { id: 21, name: 'Aries', level: 3, coins: 250, role: 'USER', status: 'Active', avatar: 'Aries', plan: 'Free' },
    { id: 22, name: 'Taurus', level: 17, coins: 7800, role: 'USER', status: 'Active', avatar: 'Taurus', plan: 'Pro' },
    { id: 23, name: 'Zenith', level: 10, coins: 1900, role: 'USER', status: 'Active', avatar: 'Zenith', plan: 'Free' },
    { id: 24, name: 'Aurora', level: 13, coins: 3600, role: 'USER', status: 'Active', avatar: 'Aurora', plan: 'Pro' }
]

export const MOCK_SHOP_ITEMS: AdminShopItem[] = [
    { id: 1, name: 'Space Explorer Avatar', price: 500, category: 'Avatar', status: 'Available', icon: 'i-ph-user-circle-duotone', color: 'bg-blue-500', description: 'Perfect for star explorers.' },
    { id: 2, name: 'Golden Streak Freeze', price: 1000, category: 'Consumable', status: 'Available', icon: 'i-ph-snowflake-duotone', color: 'bg-orange-500', description: 'Save your streak if you miss a day!' },
    { id: 3, name: 'Master of Math Title', price: 2500, category: 'Title', status: 'Hidden', icon: 'i-ph-identification-card-duotone', color: 'bg-indigo-500', description: 'Show everyone your math skills.' },
    { id: 4, name: 'Magic Wand', price: 1200, category: 'Consumable', status: 'Available', icon: 'i-ph-magic-wand-duotone', color: 'bg-pink-500', description: 'Cast spells while you study!' },
    { id: 5, name: 'Emerald Shield', price: 800, category: 'Consumable', status: 'Available', icon: 'i-ph-shield-duotone', color: 'bg-emerald-500', description: 'Protects you from losing points on one wrong answer.' },
    { id: 6, name: 'King\'s Crown', price: 3000, category: 'Avatar', status: 'Available', icon: 'i-ph-crown-duotone', color: 'bg-yellow-500', description: 'Rule the leaderboard with this majestic crown.' },
    { id: 7, name: 'Speed Potion', price: 1500, category: 'Consumable', status: 'Available', icon: 'i-ph-flask-duotone', color: 'bg-purple-500', description: 'Double XP for your next 3 lessons!' },
    { id: 8, name: 'Legendary Explorer', price: 5000, category: 'Title', status: 'Available', icon: 'i-ph-medal-duotone', color: 'bg-teal-500', description: 'A title reserved only for the best.' }
]

export const MOCK_LOGS: AdminLog[] = [
    { timestamp: '2026-05-04 10:15:02', level: 'INFO', message: 'User "Felix" logged in successfully.', type: 'auth' },
    { timestamp: '2026-05-04 10:16:45', level: 'WARN', message: 'AI Token limit reaching 80% for session_id_9f4f.', type: 'system' },
    { timestamp: '2026-05-04 10:18:12', level: 'ERROR', message: 'Failed to load asset: /img/missing-avatar.png', type: 'error' },
    { timestamp: '2026-05-04 10:20:30', level: 'INFO', message: 'Admin updated shop pricing for "Streak Freeze".', type: 'admin' },
    { timestamp: '2026-05-04 10:22:15', level: 'INFO', message: 'New user "Luna" registered.', type: 'auth' }
]
