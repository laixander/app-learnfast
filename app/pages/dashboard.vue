<script setup lang="ts">
import { STAT_DISPLAY_CONFIG, FRIENDS } from '~/constants/gameData'

definePageMeta({
    layout: 'dashboard'
})

const { user, stats, quests, isSeeded, canClaim, toggleQuest, claimAllRewards } = useUserStore()
const { adventures: allAdventures } = useAdventures()
const adventures = computed(() => allAdventures.slice(0, 4))

const statsDisplay = computed(() =>
    STAT_DISPLAY_CONFIG.map(config => ({
        ...config,
        value: stats.value[config.key].toLocaleString()
    }))
)
</script>

<template>
    <div class="relative z-10 flex flex-col gap-10">
        <!-- Welcome Header (always visible) -->
        <header
            class="flex flex-col md:flex-row items-center justify-between gap-6 bg-white/40 backdrop-blur-xl p-8 rounded-[3rem] border-4 border-white/50 shadow-2xl shadow-primary-500/10 transition-all hover:border-primary-300">
            <div class="flex items-center gap-6">
                <div class="relative group">
                    <div
                        class="absolute -inset-2 bg-linear-to-r from-primary-400 to-pink-400 rounded-full blur-md opacity-50 group-hover:opacity-100 transition duration-500 animate-pulse" />
                    <NuxtLink to="/profile">
                        <UAvatar :src="`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.avatar}`" alt="User" size="xl"
                            class="relative ring-4 ring-white size-24 md:size-32 transition-transform hover:scale-110 cursor-pointer" />
                    </NuxtLink>
                    <div
                        class="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 font-black px-4 py-1 rounded-full text-lg shadow-lg border-2 border-white transform rotate-6">
                        LVL {{ user.level }}
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <h1 class="text-4xl md:text-6xl font-black tracking-tight text-toned">
                        Hi, <span class="text-primary-600 drop-shadow-[0_4px_0_theme(colors.primary.800/0.2)]">Explorer
                            {{ user.name }}!</span>
                    </h1>
                    <p class="text-xl md:text-2xl text-muted font-medium">Ready for your next big adventure today?</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <UButton to="/rewards" label="Daily Bonus!" icon="i-ph-gift-duotone" size="xl"
                    class="font-black px-8 py-4 rounded-2xl shadow-xl shadow-primary-500/20 hover:scale-105 active:scale-95 transition-all" />
            </div>
        </header>

        <!-- Stats Bar -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <template v-if="isSeeded">
                <div v-for="stat in statsDisplay" :key="stat.label"
                    class="group relative bg-white/60 backdrop-blur-lg p-6 rounded-[2.5rem] border-2 border-white flex flex-col items-center gap-3 transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-primary-200 overflow-hidden duration-500">
                    <div
                        :class="[stat.blob, 'absolute -top-10 -right-10 size-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700']" />
                    <div
                        :class="[stat.color, 'p-4 rounded-2xl shadow-inner group-hover:rotate-12 transition-transform duration-500 relative z-10']">
                        <UIcon :name="stat.icon" :class="[stat.textColor, 'size-8 md:size-10 flex']" />
                    </div>
                    <div class="text-center relative z-10">
                        <div class="text-3xl md:text-4xl font-black text-toned leading-none">{{ stat.value }}</div>
                        <div class="text-sm font-bold text-muted uppercase tracking-widest mt-1">{{ stat.label }}</div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="col-span-2 lg:col-span-4">
                    <AppEmptyState icon="i-ph-lightning-duotone" title="No Stats Yet!" color="violet"
                        message="Seed the data to see your XP, coins, badges and streak." />
                </div>
            </template>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <!-- Adventures Grid -->
            <div class="lg:col-span-2 flex flex-col gap-6">
                <div class="flex items-center justify-between px-4">
                    <h2 class="text-3xl font-black text-toned flex items-center gap-3">
                        <UIcon name="i-ph-map-trifold-duotone" class="text-primary-500" />
                        My Adventures
                    </h2>
                    <UButton to="/adventures" label="View All" variant="link" color="primary"
                        class="font-bold text-lg" />
                </div>

                <template v-if="isSeeded">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <UCard v-for="adv in adventures" :key="adv.title"
                            class="group hover:ring-4 hover:ring-primary-500/30 transition-all duration-500 rounded-[2.5rem] border-0 shadow-xl overflow-hidden relative cursor-pointer"
                            :ui="{ body: 'p-8 flex flex-col gap-6 relative z-10' }">
                            <NuxtLink :to="`/adventures/${adv.slug}`" class="absolute inset-0 z-20" />
                            <div
                                :class="[adv.blob, 'absolute inset-0 transition-transform duration-700 group-hover:scale-150 pointer-events-none']" />

                            <div class="flex items-start justify-between">
                                <div
                                    :class="[adv.color, 'p-5 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500']">
                                    <UIcon :name="adv.icon" class="text-white size-10 flex" />
                                </div>
                                <div class="bg-white/80 px-4 py-1 rounded-full font-black text-primary-600 shadow-sm">
                                    {{ adv.progress }}%
                                </div>
                            </div>

                            <div class="flex flex-col gap-2">
                                <h3 class="text-2xl font-black text-toned leading-tight">{{ adv.title }}</h3>
                                <p class="text-muted font-medium leading-snug">{{ adv.description }}</p>
                            </div>

                            <div class="flex flex-col gap-2">
                                <div class="h-4 bg-primary-100 rounded-full overflow-hidden p-1 shadow-inner">
                                    <div class="h-full rounded-full transition-all duration-1000" :class="adv.color"
                                        :style="{ width: `${adv.progress}%` }" />
                                </div>
                                <UButton :to="`/adventures/${adv.slug}`" label="Continue →" size="lg" block
                                    class="mt-2 font-black rounded-xl hover:translate-x-1 transition-transform"
                                    :color="adv.color === 'bg-indigo-500' ? 'primary' : 'neutral'" />
                            </div>
                        </UCard>
                    </div>
                </template>
                <AppEmptyState v-else icon="i-ph-mountains-duotone" title="No Adventures!" color="indigo"
                    message="Your adventure map is empty. Seed the data to begin exploring!" />
            </div>

            <!-- Daily Quests -->
            <div class="flex flex-col gap-6">
                <div class="px-4">
                    <h2 class="text-3xl font-black text-toned flex items-center gap-3">
                        <UIcon name="i-ph-scroll-duotone" class="text-yellow-500" />
                        Daily Quests
                    </h2>
                </div>

                <template v-if="isSeeded && quests.length">
                    <div
                        class="bg-white/60 backdrop-blur-xl p-8 rounded-[3rem] border-4 border-white/50 shadow-2xl flex flex-col gap-6">
                        <div v-for="(quest, index) in quests" :key="index"
                            class="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 cursor-pointer select-none"
                            :class="[
                                quest.claimed ? 'bg-primary-50/50 opacity-40' :
                                    quest.done ? 'bg-primary-50 border-2 border-primary-200' : 'bg-white border-2 border-transparent hover:shadow-lg hover:-translate-x-1'
                            ]" @click="toggleQuest(index)">
                            <div class="size-8 rounded-full flex items-center justify-center transition-all duration-300"
                                :class="quest.done ? 'bg-primary-500 text-white scale-110 shadow-lg' : 'border-2 border-primary-200 text-transparent'">
                                <UIcon name="i-ph-check-bold" v-if="quest.done" class="size-5" />
                            </div>
                            <div class="flex-1">
                                <div class="font-black text-lg" :class="{ 'line-through opacity-50': quest.done }">{{
                                    quest.task }}</div>
                                <div class="text-sm font-bold" :class="quest.claimed ? 'text-muted' : 'text-primary-600'">
                                    {{ quest.claimed ? 'Reward Claimed!' : quest.reward }}
                                </div>
                            </div>
                            <UIcon v-if="quest.claimed" name="i-ph-lock-open-duotone" class="text-primary-400" />
                        </div>

                        <UButton :label="canClaim ? 'Claim All Rewards!' : 'No Rewards to Claim'" block size="xl"
                            :variant="canClaim ? 'solid' : 'subtle'" :color="canClaim ? 'primary' : 'neutral'"
                            class="font-black rounded-2xl py-4 mt-2 transition-all"
                            :class="{ 'animate-pulse shadow-xl shadow-primary-500/20': canClaim }" :disabled="!canClaim"
                            @click="claimAllRewards" />
                    </div>
                </template>
                <AppEmptyState v-else icon="i-ph-scroll-duotone" title="No Quests Today!" color="amber"
                    message="Your quest log is empty. Seed the data to get your daily missions!" />

                <!-- Mini Friends -->
                <div
                    class="bg-linear-to-br from-primary-600 to-indigo-700 p-8 rounded-[3rem] shadow-xl text-white relative overflow-hidden group">
                    <UIcon name="i-ph-users-three-duotone"
                        class="absolute -bottom-10 -right-10 size-40 text-white/10 group-hover:rotate-12 transition-transform duration-700" />
                    <h3 class="text-2xl font-black mb-4 flex items-center gap-2">
                        <UIcon name="i-ph-users-duotone" />
                        Friends
                    </h3>
                    <template v-if="isSeeded">
                        <div class="flex flex-col gap-4 relative z-10">
                            <div v-for="friend in FRIENDS" :key="friend.seed"
                                class="flex items-center gap-3 p-3 rounded-2xl"
                                :class="friend.isMe ? 'bg-white/20 ring-2 ring-yellow-400' : 'bg-white/10'">
                                <UAvatar :src="`https://api.dicebear.com/9.x/thumbs/svg?seed=${friend.seed}`" size="sm" />
                                <div class="flex-1 font-bold">{{ friend.name }}</div>
                                <div class="font-black">{{ friend.rank }}</div>
                            </div>
                        </div>
                        <UButton to="/leaderboard" label="See Leaderboard" variant="ghost" color="neutral" block
                            class="mt-6 text-white hover:bg-white/10 font-bold" />
                    </template>
                    <div v-else class="relative z-10 py-6 flex flex-col items-center text-center gap-3">
                        <UIcon name="i-ph-users-three-duotone" class="size-12 opacity-50" />
                        <p class="font-bold opacity-80">No friends yet!</p>
                        <p class="text-sm opacity-60">Seed data to find your squad.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes float {
    0% {
        transform: translateY(0px) rotate(0deg);
    }

    50% {
        transform: translateY(-10px) rotate(2deg);
    }

    100% {
        transform: translateY(0px) rotate(0deg);
    }
}

.animate-float {
    animation: float 4s ease-in-out infinite;
}
</style>