<script setup lang="ts">
import { QUEST_CATEGORIES } from '~/constants/gameData'

definePageMeta({
    layout: 'dashboard'
})

const { quests, stats, hasContent, canClaim, toggleQuest, claimAllRewards } = useUserStore()

// Category filter
const activeCategory = ref<string>('All')
const categories = computed(() => [
    { name: 'All', icon: 'i-ph-squares-four-duotone', color: 'text-primary-500', bg: 'bg-primary-50', ring: 'ring-primary-200' },
    ...QUEST_CATEGORIES
])

const filteredQuests = computed(() => {
    if (activeCategory.value === 'All') return quests.value
    return quests.value.filter(q => q.category === activeCategory.value)
})

// Stats
const completedCount = computed(() => quests.value.filter(q => q.done).length)
const totalQuests = computed(() => quests.value.length)
const claimedCount = computed(() => quests.value.filter(q => q.claimed).length)
const totalRewardsAvailable = computed(() => {
    return quests.value
        .filter(q => q.done && !q.claimed)
        .reduce((sum, q) => sum + q.rewardValue, 0)
})

// Countdown to next reset (midnight)
const timeLeft = ref('')
const updateCountdown = () => {
    const now = new Date()
    const midnight = new Date(now)
    midnight.setHours(24, 0, 0, 0)
    const diff = midnight.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    timeLeft.value = `${hours}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`
}
let timer: ReturnType<typeof setInterval>
onMounted(() => {
    updateCountdown()
    timer = setInterval(updateCountdown, 1000)
})
onUnmounted(() => clearInterval(timer))

// Difficulty display
const difficultyStars = (difficulty: string) => {
    switch (difficulty) {
        case 'easy': return '⭐'
        case 'medium': return '⭐⭐'
        case 'hard': return '⭐⭐⭐'
        default: return '⭐'
    }
}

const difficultyLabel = (difficulty: string) => {
    switch (difficulty) {
        case 'easy': return 'Easy'
        case 'medium': return 'Medium'
        case 'hard': return 'Hard'
        default: return 'Easy'
    }
}

const rewardIcon = (type: string) => {
    switch (type) {
        case 'xp': return 'i-ph-lightning-duotone'
        case 'coins': return 'i-ph-coins-duotone'
        case 'badges': return 'i-ph-medal-duotone'
        default: return 'i-ph-star-duotone'
    }
}

const rewardColor = (type: string) => {
    switch (type) {
        case 'xp': return 'text-yellow-500'
        case 'coins': return 'text-orange-500'
        case 'badges': return 'text-pink-500'
        default: return 'text-primary-500'
    }
}

const categoryConfig = (name: string) => {
    return QUEST_CATEGORIES.find(c => c.name === name) || QUEST_CATEGORIES[0]
}
</script>

<template>
    <div class="relative z-10 flex flex-col gap-10">
        <!-- Hero Header -->
        <header class="text-center flex flex-col gap-4 items-center">
            <div
                class="inline-flex items-center justify-center p-6 bg-yellow-100 rounded-[2.5rem] shadow-inner self-center">
                <UIcon name="i-ph-scroll-duotone" class="text-yellow-600 size-16 flex animate-bounce" />
            </div>
            <h1 class="text-4xl md:text-6xl font-black text-toned">
                Daily <span class="text-yellow-500">Quests</span>
            </h1>
            <p class="text-xl text-muted font-medium max-w-xl">Complete your quests to earn XP, coins, and badges.
                New quests every day!</p>
            <div
                class="flex items-center gap-2 bg-white/60 backdrop-blur-md px-6 py-3 rounded-full border-2 border-white shadow-lg">
                <UIcon name="i-ph-clock-countdown-duotone" class="text-primary-500 size-5" />
                <span class="text-sm font-bold text-muted">Resets in</span>
                <span class="font-black text-primary-600">{{ timeLeft }}</span>
            </div>
        </header>

        <template v-if="hasContent && quests.length">
            <!-- Stats Summary -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                    class="group bg-white/60 backdrop-blur-xl p-6 rounded-[2.5rem] border-2 border-white shadow-xl flex items-center gap-5 hover:-translate-y-1 transition-all duration-300">
                    <div
                        class="bg-emerald-100 p-4 rounded-2xl shadow-inner group-hover:rotate-12 transition-transform duration-500">
                        <UIcon name="i-ph-check-circle-duotone" class="text-emerald-500 size-8 flex" />
                    </div>
                    <div class="flex flex-col">
                        <span class="text-3xl font-black text-toned leading-none">{{ completedCount }}/{{
                            totalQuests }}</span>
                        <span class="text-sm font-bold text-muted uppercase tracking-widest mt-1">Quests Done</span>
                    </div>
                </div>

                <div
                    class="group bg-white/60 backdrop-blur-xl p-6 rounded-[2.5rem] border-2 border-white shadow-xl flex items-center gap-5 hover:-translate-y-1 transition-all duration-300">
                    <div
                        class="bg-yellow-100 p-4 rounded-2xl shadow-inner group-hover:rotate-12 transition-transform duration-500">
                        <UIcon name="i-ph-gift-duotone" class="text-yellow-500 size-8 flex" />
                    </div>
                    <div class="flex flex-col">
                        <span class="text-3xl font-black text-toned leading-none">{{ totalRewardsAvailable > 0 ?
                            totalRewardsAvailable : '—' }}</span>
                        <span class="text-sm font-bold text-muted uppercase tracking-widest mt-1">Unclaimed
                            Rewards</span>
                    </div>
                </div>

                <div
                    class="group bg-white/60 backdrop-blur-xl p-6 rounded-[2.5rem] border-2 border-white shadow-xl flex items-center gap-5 hover:-translate-y-1 transition-all duration-300">
                    <div
                        class="bg-red-100 p-4 rounded-2xl shadow-inner group-hover:rotate-12 transition-transform duration-500">
                        <UIcon name="i-ph-fire-duotone" class="text-red-500 size-8 flex" />
                    </div>
                    <div class="flex flex-col">
                        <span class="text-3xl font-black text-toned leading-none">{{ stats.streak }} Days</span>
                        <span class="text-sm font-bold text-muted uppercase tracking-widest mt-1">Current Streak</span>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <!-- Main Quest Board -->
                <div class="lg:col-span-2 flex flex-col gap-6">
                    <!-- Category Tabs -->
                    <div class="flex flex-wrap gap-3">
                        <button v-for="cat in categories" :key="cat.name" @click="activeCategory = cat.name"
                            class="flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm transition-all duration-300 ring-2"
                            :class="activeCategory === cat.name
                                ? `${cat.bg} ${cat.ring} shadow-lg scale-105`
                                : 'bg-white/40 ring-white hover:bg-white/60 hover:shadow-md'">
                            <UIcon :name="cat.icon" :class="cat.color" class="size-5" />
                            {{ cat.name }}
                        </button>
                    </div>

                    <!-- Quest Cards -->
                    <TransitionGroup name="quest-list" tag="div" class="flex flex-col gap-4">
                        <div v-for="quest in filteredQuests" :key="quest.id"
                            class="group flex items-center gap-5 p-6 rounded-[2rem] transition-all duration-300 cursor-pointer select-none"
                            :class="[
                                quest.claimed
                                    ? 'bg-white/30 opacity-50'
                                    : quest.done
                                        ? 'bg-white/80 backdrop-blur-xl border-2 border-primary-200 shadow-lg shadow-primary-500/10'
                                        : 'bg-white/60 backdrop-blur-xl border-2 border-white shadow-xl hover:shadow-2xl hover:-translate-y-0.5 hover:border-primary-100'
                            ]" @click="toggleQuest(quests.findIndex(q => q.id === quest.id))">

                            <!-- Checkbox -->
                            <div class="size-12 rounded-2xl flex items-center justify-center transition-all duration-300 shrink-0"
                                :class="quest.done
                                    ? 'bg-primary-500 text-white scale-110 shadow-lg shadow-primary-500/30'
                                    : 'border-3 border-primary-200 text-transparent hover:border-primary-400'">
                                <UIcon name="i-ph-check-bold" v-if="quest.done" class="size-6" />
                            </div>

                            <!-- Quest Info -->
                            <div class="flex-1 flex flex-col gap-2 min-w-0">
                                <div class="flex items-center gap-2 flex-wrap">
                                    <UBadge
                                        :color="quest.category === 'Learning' ? 'success' : quest.category === 'Social' ? 'info' : 'error'"
                                        variant="subtle"
                                        class="font-bold text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-lg">
                                        <UIcon :name="categoryConfig(quest.category).icon" class="mr-1 size-3" />
                                        {{ quest.category }}
                                    </UBadge>
                                    <span class="text-xs" :title="difficultyLabel(quest.difficulty)">{{
                                        difficultyStars(quest.difficulty) }}</span>
                                </div>
                                <div class="font-black text-lg text-toned leading-tight"
                                    :class="{ 'line-through opacity-50': quest.claimed }">
                                    {{ quest.task }}
                                </div>
                            </div>

                            <!-- Reward -->
                            <div class="flex items-center gap-2 shrink-0 px-4 py-2 rounded-2xl"
                                :class="quest.claimed ? 'bg-neutral-100' : 'bg-white/80 shadow-sm border border-white'">
                                <UIcon :name="rewardIcon(quest.rewardType)"
                                    :class="quest.claimed ? 'text-neutral-400' : rewardColor(quest.rewardType)"
                                    class="size-5" />
                                <span class="font-black text-sm"
                                    :class="quest.claimed ? 'text-neutral-400' : 'text-toned'">
                                    {{ quest.reward }}
                                </span>
                            </div>

                            <!-- Claimed indicator -->
                            <UIcon v-if="quest.claimed" name="i-ph-seal-check-duotone"
                                class="text-primary-400 size-6 shrink-0" />
                        </div>
                    </TransitionGroup>

                    <!-- Empty filter state -->
                    <div v-if="filteredQuests.length === 0"
                        class="bg-white/40 backdrop-blur-xl p-12 rounded-[3rem] border-4 border-white shadow-xl flex flex-col items-center gap-4 text-center">
                        <UIcon name="i-ph-magnifying-glass-duotone" class="text-muted size-16" />
                        <h3 class="text-2xl font-black text-toned">No quests in this category</h3>
                        <p class="text-muted font-medium">Try selecting a different category above!</p>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="flex flex-col gap-8">
                    <!-- Claim Rewards Card -->
                    <div
                        class="bg-white/60 backdrop-blur-xl p-8 rounded-[3rem] border-4 border-white shadow-xl flex flex-col gap-6">
                        <h3 class="text-2xl font-black text-toned flex items-center gap-3">
                            <UIcon name="i-ph-treasure-chest-duotone" class="text-yellow-500" />
                            Rewards
                        </h3>

                        <div class="flex flex-col gap-3">
                            <div class="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
                                <div class="flex items-center gap-2">
                                    <UIcon name="i-ph-lightning-duotone" class="text-yellow-500 size-5" />
                                    <span class="font-bold text-sm text-toned">XP Available</span>
                                </div>
                                <span class="font-black text-yellow-600">{{
                                    quests.filter(q => q.done && !q.claimed && q.rewardType === 'xp').reduce((s, q) =>
                                        s + q.rewardValue, 0)}}</span>
                            </div>
                            <div class="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                                <div class="flex items-center gap-2">
                                    <UIcon name="i-ph-coins-duotone" class="text-orange-500 size-5" />
                                    <span class="font-bold text-sm text-toned">Coins Available</span>
                                </div>
                                <span class="font-black text-orange-600">
                                    {{quests.filter(q => q.done && !q.claimed && q.rewardType === 'coins').reduce((s,
                                        q) => s + q.rewardValue, 0)}}
                                </span>
                            </div>
                            <div class="flex items-center justify-between p-3 bg-pink-50 rounded-xl">
                                <div class="flex items-center gap-2">
                                    <UIcon name="i-ph-medal-duotone" class="text-pink-500 size-5" />
                                    <span class="font-bold text-sm text-toned">Badges Available</span>
                                </div>
                                <span class="font-black text-pink-600">
                                    {{quests.filter(q => q.done && !q.claimed && q.rewardType === 'badges').reduce((s,
                                        q) => s + q.rewardValue, 0)}}
                                </span>
                            </div>
                        </div>

                        <UButton :label="canClaim ? 'Claim All Rewards! 🎁' : 'No Rewards to Claim'" block size="xl"
                            :variant="canClaim ? 'solid' : 'subtle'" :color="canClaim ? 'primary' : 'neutral'"
                            class="font-black rounded-2xl py-4 transition-all"
                            :class="{ 'animate-pulse shadow-xl shadow-primary-500/20': canClaim }" :disabled="!canClaim"
                            @click="claimAllRewards" />
                    </div>

                    <!-- Streak Connection -->
                    <div
                        class="bg-linear-to-br from-orange-400 via-rose-500 to-pink-500 p-8 rounded-[3rem] shadow-xl text-white relative overflow-hidden group">
                        <UIcon name="i-ph-fire-duotone"
                            class="absolute -bottom-8 -right-8 size-48 text-white/10 group-hover:rotate-12 transition-transform duration-700" />

                        <div class="relative z-10 flex flex-col gap-4">
                            <h3 class="text-2xl font-black flex items-center gap-3">
                                <UIcon name="i-ph-fire-duotone" class="text-yellow-300" />
                                Streak Bonus
                            </h3>
                            <div class="flex items-end gap-2">
                                <span class="text-6xl font-black leading-none">{{ stats.streak }}</span>
                                <span class="text-xl font-bold opacity-60 mb-1.5">days</span>
                            </div>
                            <p class="text-sm font-medium opacity-80 leading-relaxed">
                                Complete all {{ totalQuests }} quests today to keep your streak alive! Every day counts
                                towards the Mystery Chest.
                            </p>
                            <div class="flex gap-2 mt-2">
                                <div v-for="i in 7" :key="i"
                                    class="size-8 rounded-full flex items-center justify-center text-xs font-black transition-all"
                                    :class="i <= stats.streak
                                        ? 'bg-white text-orange-500 shadow-lg'
                                        : 'bg-white/20 text-white/40'">
                                    {{ i }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Bonus Quest Teaser -->
                    <div
                        class="bg-white/40 backdrop-blur-xl p-8 rounded-[3rem] border-4 border-dashed border-primary-200 shadow-lg flex flex-col items-center text-center gap-4 opacity-60">
                        <div class="bg-primary-100 p-4 rounded-2xl">
                            <UIcon name="i-ph-lock-duotone" class="text-primary-400 size-8 flex" />
                        </div>
                        <h4 class="text-xl font-black text-toned">Bonus Quest</h4>
                        <p class="text-sm text-muted font-medium">Complete all 6 daily quests to unlock a special bonus
                            quest tomorrow!</p>
                    </div>
                </div>
            </div>
        </template>

        <!-- Empty State -->
        <AppEmptyState v-else icon="i-ph-scroll-duotone" title="No Quests Today!" color="amber"
            message="Your quest log is empty. Seed the data to get your daily missions!" />
    </div>
</template>

<style scoped>
.quest-list-enter-active,
.quest-list-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.quest-list-enter-from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
}

.quest-list-leave-to {
    opacity: 0;
    transform: translateX(-20px) scale(0.95);
}

.quest-list-move {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
