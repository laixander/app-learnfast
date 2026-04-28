<script setup lang="ts">
import type { Question } from '~/types/lessons'

import { QUIZ_THEMES, DEFAULT_QUIZ_THEME } from '~/constants/themes'

const props = defineProps<{
    unlocked: boolean
    lessonIndex: number
    adventureSlug?: string
    questions: Question[]
}>()

const theme = computed(() => {
    return QUIZ_THEMES[props.adventureSlug || ''] || DEFAULT_QUIZ_THEME
})

const quizLink = computed(() => `/lessons/quiz?adventure=${props.adventureSlug}&after=${props.lessonIndex}`)
</script>

<template>
    <UCard class="group transition-all duration-500 rounded-[2.5rem] border-0 shadow-xl overflow-hidden relative"
        :class="[
            unlocked
                ? 'bg-yellow-50/80 backdrop-blur-sm hover:ring-4 hover:ring-yellow-400/30 cursor-pointer'
                : 'opacity-60 grayscale-[0.5] pointer-events-none bg-slate-50/80'
        ]" :ui="{ body: 'p-8 flex flex-col gap-4 h-full relative z-10 justify-center items-center text-center' }">
        <div :class="[
            unlocked
                ? 'bg-yellow-400 group-hover:scale-110 group-hover:-rotate-3'
                : 'bg-slate-300',
            'p-5 rounded-2xl shadow-lg transition-all duration-500'
        ]">
            <UIcon :name="unlocked ? 'i-ph-question-bold' : 'i-ph-lock-simple-fill'"
                :class="unlocked ? 'text-yellow-900' : 'text-slate-500'" class="size-8 flex" />
        </div>
        <div class="flex flex-col gap-1 mt-2">
            <div
                :class="[unlocked ? 'text-yellow-600' : 'text-slate-400', 'text-sm font-black uppercase tracking-widest']">
                Knowledge Check
            </div>
            <h3 class="text-2xl font-black text-toned leading-tight">{{ theme.title }} {{ theme.emoji }}</h3>
            <p class="text-muted font-medium mt-1">
                {{ unlocked ? theme.unlockedMsg : theme.lockedMsg }}
            </p>
        </div>
        <UButton :to="unlocked ? quizLink : undefined" :label="unlocked ? 'Take Quiz →' : 'Locked'" block
            :color="unlocked ? 'warning' : 'neutral'" :variant="unlocked ? 'solid' : 'subtle'" :disabled="!unlocked"
            class="mt-auto font-black rounded-xl py-3" />
    </UCard>
</template>
