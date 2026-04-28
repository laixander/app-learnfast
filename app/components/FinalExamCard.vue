<script setup lang="ts">
import type { Question } from '~/types/lessons'

import { EXAM_THEMES, DEFAULT_EXAM_THEME } from '~/constants/themes'

const props = defineProps<{
    unlocked: boolean
    adventureSlug?: string
    questions: Question[]
}>()

const theme = computed(() => {
    return EXAM_THEMES[props.adventureSlug || ''] || DEFAULT_EXAM_THEME
})

const examLink = computed(() => `/lessons/exam?adventure=${props.adventureSlug}`)
</script>

<template>
    <UCard
        class="group transition-all duration-500 rounded-[2.5rem] border-0 shadow-xl overflow-hidden relative"
        :class="[
            unlocked 
                ? 'bg-gradient-to-br from-orange-50 to-rose-50 hover:ring-4 hover:ring-orange-400/30 cursor-pointer' 
                : 'opacity-60 grayscale-[0.5] pointer-events-none bg-slate-50/80'
        ]"
        :ui="{ body: 'p-8 flex flex-col gap-4 h-full relative z-10 justify-center items-center text-center' }">
        <div 
            :class="[
                unlocked 
                    ? 'bg-gradient-to-br from-orange-400 to-rose-500 group-hover:scale-110 group-hover:rotate-3' 
                    : 'bg-slate-300',
                'p-5 rounded-2xl shadow-lg transition-all duration-500'
            ]">
            <UIcon 
                :name="unlocked ? 'i-ph-trophy-duotone' : 'i-ph-lock-simple-fill'" 
                :class="unlocked ? 'text-white' : 'text-slate-500'"
                class="size-8 flex" />
        </div>
        <div class="flex flex-col gap-1 mt-2">
            <div :class="[unlocked ? 'text-orange-600' : 'text-slate-400', 'text-sm font-black uppercase tracking-widest']">
                Final Exam
            </div>
            <h3 class="text-2xl font-black text-toned leading-tight">{{ theme.title }} {{ theme.emoji }}</h3>
            <p class="text-muted font-medium mt-1">
                {{ unlocked ? theme.unlockedMsg : theme.lockedMsg }}
            </p>
            <p v-if="unlocked" class="text-xs font-bold text-orange-400 mt-1">{{ questions.length }} questions · 70% to pass</p>
            <UBadge v-if="unlocked" color="warning" variant="subtle" class="mt-2 font-black text-xs px-3 py-1 rounded-full self-center">
                <UIcon name="i-ph-medal-duotone" class="mr-1" /> {{ theme.badge }} Badge
            </UBadge>
        </div>
        <UButton 
            :to="unlocked ? examLink : undefined"
            :label="unlocked ? 'Begin Challenge →' : 'Locked'" 
            block 
            :color="unlocked ? 'error' : 'neutral'" 
            :variant="unlocked ? 'solid' : 'subtle'"
            :disabled="!unlocked"
            class="mt-auto font-black rounded-xl py-3" />
    </UCard>
</template>
