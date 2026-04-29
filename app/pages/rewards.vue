<script setup lang="ts">
import { DAILY_REWARDS } from '~/constants/gameData'

definePageMeta({
    layout: 'dashboard'
})

const { isSeeded, hasContent } = useUserStore()
</script>

<template>
    <div class="relative z-10 flex flex-col gap-10 max-w-5xl mx-auto">
        <header class="text-center flex flex-col gap-4">
            <div
                class="inline-flex items-center justify-center p-6 bg-yellow-100 rounded-[2.5rem] shadow-inner self-center animate-bounce">
                <UIcon name="i-ph-gift-duotone" class="text-yellow-600 size-16" />
            </div>
            <h1 class="text-4xl md:text-6xl font-black text-toned">
                Daily <span class="text-yellow-500">Bonus!</span>
            </h1>
            <p class="text-xl text-muted font-medium">Come back every day for amazing surprises!</p>
        </header>

        <template v-if="hasContent">
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                <div v-for="reward in DAILY_REWARDS" :key="reward.day"
                    class="flex flex-col items-center gap-3 p-6 rounded-[2rem] border-4 transition-all duration-300" :class="[
                        reward.status === 'claimed' ? 'bg-primary-500 border-primary-600 text-white opacity-60' :
                            reward.status === 'current' ? 'bg-white border-yellow-400 shadow-2xl scale-110 relative z-20' :
                                'bg-white/40 border-white text-toned opacity-80'
                    ]">
                    <span class="font-black text-sm uppercase">Day {{ reward.day }}</span>
                    <UIcon
                        :name="reward.type === 'Coins' ? 'i-ph-coins-duotone' : reward.type === 'XP' ? 'i-ph-lightning-duotone' : 'i-ph-treasure-chest-duotone'"
                        class="size-10" />
                    <div class="flex flex-col items-center leading-none">
                        <span class="text-2xl font-black">{{ reward.amount }}</span>
                        <span class="text-[10px] font-bold uppercase">{{ reward.type }}</span>
                    </div>
                    <UIcon v-if="reward.status === 'claimed'" name="i-ph-check-circle-fill" class="size-6 text-white" />
                </div>
            </div>

            <div class="flex flex-col items-center gap-6 mt-10">
                <UButton label="Claim Day 4 Reward!" size="xl" color="warning"
                    class="font-black px-12 py-6 rounded-[2rem] shadow-2xl shadow-yellow-500/40 hover:scale-105 active:scale-95 transition-all text-xl" />
                <p class="text-muted font-bold">Next reward in: <span class="text-toned">14h 22m 05s</span></p>
            </div>
        </template>
        <AppEmptyState v-else icon="i-ph-gift-duotone" title="No Rewards Yet!" color="amber"
            message="Your reward calendar is empty. Seed the data to start your streak!" />
    </div>
</template>
