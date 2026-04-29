<script setup lang="ts">
import { LEADERBOARD } from '~/constants/gameData'

definePageMeta({
    layout: 'dashboard'
})

const { isSeeded, hasContent } = useUserStore()
</script>

<template>
    <div class="relative z-10 flex flex-col gap-10 max-w-4xl mx-auto">
        <header class="text-center flex flex-col gap-4">
            <div
                class="inline-flex items-center justify-center p-6 bg-indigo-100 rounded-[2.5rem] shadow-inner self-center">
                <UIcon name="i-ph-trophy-duotone" class="text-indigo-600 size-16" />
            </div>
            <h1 class="text-4xl md:text-6xl font-black text-toned">
                Global <span class="text-indigo-600">Leaderboard</span>
            </h1>
            <p class="text-xl text-muted font-medium">Are you the top explorer this week?</p>
        </header>

        <template v-if="hasContent">
            <!-- Top 3 Podium -->
            <div class="flex flex-col md:flex-row items-end justify-center gap-6 mt-10 mb-6">
                <!-- 2nd Place -->
                <div class="flex flex-col items-center gap-4 order-2 md:order-1">
                    <UAvatar src="https://api.dicebear.com/9.x/thumbs/svg?seed=Felix" size="xl"
                        class="ring-4 ring-gray-300 size-24" />
                    <div
                        class="bg-gray-100 p-8 rounded-t-3xl w-32 flex flex-col items-center shadow-lg border-2 border-white">
                        <span class="text-4xl font-black text-gray-400">2</span>
                        <span class="text-xs font-bold uppercase">Felix</span>
                    </div>
                </div>
                <!-- 1st Place -->
                <div class="flex flex-col items-center gap-4 order-1 md:order-2 scale-110 z-10">
                    <UIcon name="i-ph-crown-duotone" class="text-yellow-400 size-12 animate-bounce" />
                    <UAvatar src="https://api.dicebear.com/9.x/thumbs/svg?seed=Anika" size="xl"
                        class="ring-4 ring-yellow-400 size-32" />
                    <div
                        class="bg-yellow-100 p-12 rounded-t-[2.5rem] w-40 flex flex-col items-center shadow-2xl border-2 border-white">
                        <span class="text-6xl font-black text-yellow-600">1</span>
                        <span class="text-sm font-bold uppercase">Anika</span>
                    </div>
                </div>
                <!-- 3rd Place -->
                <div class="flex flex-col items-center gap-4 order-3">
                    <UAvatar src="https://api.dicebear.com/9.x/thumbs/svg?seed=Sam" size="xl"
                        class="ring-4 ring-orange-400 size-20" />
                    <div
                        class="bg-orange-100 p-6 rounded-t-2xl w-28 flex flex-col items-center shadow-md border-2 border-white">
                        <span class="text-3xl font-black text-orange-600">3</span>
                        <span class="text-xs font-bold uppercase">Sam</span>
                    </div>
                </div>
            </div>

            <!-- List -->
            <div class="bg-white/60 backdrop-blur-md rounded-[3rem] border-2 border-white shadow-2xl overflow-hidden">
                <div v-for="leader in LEADERBOARD" :key="leader.rank" class="flex items-center gap-6 p-6 transition-colors"
                    :class="[leader.isMe ? 'bg-primary-50' : 'hover:bg-white/40', { 'border-b-2 border-white': leader.rank < LEADERBOARD.length }]">
                    <div class="w-12 text-center text-2xl font-black" :class="leader.color">#{{ leader.rank }}</div>
                    <UAvatar :src="`https://api.dicebear.com/9.x/thumbs/svg?seed=${leader.avatar}`" size="md"
                        class="ring-2 ring-white shadow-sm" />
                    <div class="flex-1">
                        <div class="text-xl font-black text-toned flex items-center gap-2">
                            {{ leader.name }}
                            <UBadge v-if="leader.isMe" size="sm" color="primary" variant="subtle">YOU</UBadge>
                        </div>
                        <div class="text-sm font-bold text-muted uppercase">Level {{ leader.level }}</div>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-black text-primary-600">{{ leader.xp }}</div>
                        <div class="text-[10px] font-bold text-muted uppercase tracking-tighter">XP Points</div>
                    </div>
                </div>
            </div>
        </template>
        <AppEmptyState v-else icon="i-ph-trophy-duotone" title="Leaderboard is Empty!" color="indigo"
            message="No explorers ranked yet. Seed the data to see who's on top!" />
    </div>
</template>
