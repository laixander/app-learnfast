// ============================================================
// Static Game Data — all non-reactive, never changes at runtime
// Import from this file instead of declaring inline in pages
// ============================================================

// --- Stat Display Config (dashboard stats bar) ---
export const STAT_DISPLAY_CONFIG = [
    { key: 'xp', label: 'XP Points', icon: 'i-ph-lightning-duotone', color: 'bg-yellow-400', textColor: 'text-yellow-700', blob: 'bg-yellow-100' },
    { key: 'coins', label: 'Magic Coins', icon: 'i-ph-coins-duotone', color: 'bg-orange-400', textColor: 'text-orange-700', blob: 'bg-orange-100' },
    { key: 'badges', label: 'Cool Badges', icon: 'i-ph-medal-duotone', color: 'bg-pink-400', textColor: 'text-pink-700', blob: 'bg-pink-100' },
    { key: 'streak', label: 'Day Streak', icon: 'i-ph-fire-duotone', color: 'bg-red-400', textColor: 'text-red-700', blob: 'bg-red-100' }
] as const

// --- Shop Items ---
export const SHOP_ITEMS = [
    { name: 'Fire Dragon Hat', price: 500, icon: 'i-ph-fire-duotone', color: 'bg-orange-500', description: 'Look hot in this legendary hat!' },
    { name: 'Magic Wand', price: 1200, icon: 'i-ph-magic-wand-duotone', color: 'bg-indigo-500', description: 'Cast spells while you study!' },
    { name: 'Space Helmet', price: 850, icon: 'i-ph-planet-duotone', color: 'bg-blue-500', description: 'Perfect for star explorers.' },
    { name: 'Artist Palette', price: 300, icon: 'i-ph-palette-duotone', color: 'bg-pink-500', description: 'Extra XP for art lessons.' }
]

// --- Daily Login Rewards ---
export const DAILY_REWARDS = [
    { day: 1, amount: '10', type: 'Coins', status: 'claimed' },
    { day: 2, amount: '20', type: 'Coins', status: 'claimed' },
    { day: 3, amount: '50', type: 'XP', status: 'claimed' },
    { day: 4, amount: '30', type: 'Coins', status: 'current' },
    { day: 5, amount: '100', type: 'XP', status: 'upcoming' },
    { day: 6, amount: '50', type: 'Coins', status: 'upcoming' },
    { day: 7, amount: 'MYSTERY', type: 'Chest', status: 'upcoming' }
] as const

// --- Leaderboard ---
export const LEADERBOARD = [
    { rank: 1, name: 'Anika.Dev', xp: '18,240', level: 15, avatar: 'Anika', color: 'text-yellow-500', isMe: false },
    { rank: 2, name: 'Explorer Felix', xp: '15,400', level: 12, avatar: 'Felix', color: 'text-gray-400', isMe: true },
    { rank: 3, name: 'Rocket Sam', xp: '12,100', level: 10, avatar: 'Sam', color: 'text-orange-500', isMe: false },
    { rank: 4, name: 'Pixie Bella', xp: '9,850', level: 9, avatar: 'Bella', color: 'text-primary-400', isMe: false },
    { rank: 5, name: 'Dino Dave', xp: '8,200', level: 8, avatar: 'Dave', color: 'text-primary-400', isMe: false }
]

// --- Friends (mini leaderboard on dashboard) ---
export const FRIENDS = [
    { name: 'Anika.Dev', seed: 'Anika', rank: '#1' },
    { name: 'You', seed: 'Felix', rank: '#2', isMe: true }
]

// --- Profile Stats Config ---
export const PROFILE_STAT_CONFIG = [
    { label: 'Total XP', valueKey: 'totalXp', icon: 'i-ph-lightning-duotone', color: 'text-yellow-500' },
    { label: 'Lessons Done', valueKey: 'lessonsDone', icon: 'i-ph-book-open-duotone', color: 'text-emerald-500' },
    { label: 'Badges', valueKey: 'badges', icon: 'i-ph-medal-duotone', color: 'text-pink-500' },
    { label: 'Friends', valueKey: 'friends', icon: 'i-ph-users-duotone', color: 'text-indigo-500' }
]

// --- Profile Recent Badges ---
export const PROFILE_BADGES = [
    { name: 'Fast Learner', icon: 'i-ph-rocket-launch-duotone', color: 'bg-indigo-500' },
    { name: 'Math Genius', icon: 'i-ph-calculator-duotone', color: 'bg-emerald-500' },
    { name: 'Book Worm', icon: 'i-ph-book-duotone', color: 'bg-rose-500' }
]

// --- Quest Categories ---
export const QUEST_CATEGORIES = [
    { name: 'Learning', icon: 'i-ph-book-open-duotone', color: 'text-emerald-500', bg: 'bg-emerald-50', ring: 'ring-emerald-200' },
    { name: 'Social', icon: 'i-ph-users-duotone', color: 'text-blue-500', bg: 'bg-blue-50', ring: 'ring-blue-200' },
    { name: 'Creative', icon: 'i-ph-paint-brush-duotone', color: 'text-pink-500', bg: 'bg-pink-50', ring: 'ring-pink-200' }
] as const

// --- Daily Quests Config (initial/default state) ---
export const DEFAULT_QUESTS = [
    // Learning
    { id: 1, task: 'Complete 1 Math Lesson', reward: '50 XP', category: 'Learning' as const, difficulty: 'easy' as const, done: true, claimed: false, rewardValue: 50, rewardType: 'xp' as const },
    { id: 2, task: 'Finish a Space Explorer chapter', reward: '75 XP', category: 'Learning' as const, difficulty: 'medium' as const, done: false, claimed: false, rewardValue: 75, rewardType: 'xp' as const },
    // Social
    { id: 3, task: 'Visit the Leaderboard', reward: '20 Coins', category: 'Social' as const, difficulty: 'easy' as const, done: false, claimed: false, rewardValue: 20, rewardType: 'coins' as const },
    { id: 4, task: 'Check a friend\'s profile', reward: '30 Coins', category: 'Social' as const, difficulty: 'medium' as const, done: false, claimed: false, rewardValue: 30, rewardType: 'coins' as const },
    // Creative
    { id: 5, task: 'Create a custom Adventure', reward: '1 Badge', category: 'Creative' as const, difficulty: 'hard' as const, done: false, claimed: false, rewardValue: 1, rewardType: 'badges' as const },
    { id: 6, task: 'Draw a dinosaur in Art Studio', reward: '40 Coins', category: 'Creative' as const, difficulty: 'medium' as const, done: false, claimed: false, rewardValue: 40, rewardType: 'coins' as const }
]

// --- Notifications Config ---
export const DEFAULT_NOTIFICATIONS = [
    { id: 1, title: 'Quest Complete!', message: 'You earned 50 XP for completing a Math lesson.', time: '2 mins ago', icon: 'i-ph-check-circle-duotone', color: 'text-emerald-500', bg: 'bg-emerald-50', fullMessage: 'Great job, Explorer! You finished the "Addition Fun" lesson and earned a bonus 50 XP. Keep it up to reach the next level!' },
    { id: 2, title: 'New Badge!', message: 'Congratulations! You unlocked the "Early Bird" badge.', time: '1 hour ago', icon: 'i-ph-medal-duotone', color: 'text-pink-500', bg: 'bg-pink-50', fullMessage: 'Wow! You are truly an early explorer. By logging in before 8 AM, you have earned the "Early Bird" badge. It has been added to your profile trophy case.' },
    { id: 3, title: 'Friend Request', message: 'Anika.Dev sent you a friend request.', time: '3 hours ago', icon: 'i-ph-user-plus-duotone', color: 'text-indigo-500', bg: 'bg-indigo-50', fullMessage: 'Anika.Dev wants to be your friend! Friends can see each other on the leaderboard and compare their weekly streaks.' },
    { id: 4, title: 'Daily Streak!', message: 'Keep it up! You are on a 5-day streak.', time: 'Yesterday', icon: 'i-ph-fire-duotone', color: 'text-orange-500', bg: 'bg-orange-50', fullMessage: 'You are on fire! That is 5 days in a row of learning something new. Reach 7 days to earn a Mystery Chest reward!' }
]

