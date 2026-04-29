<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const route = useRoute()
const { lessons } = useLessons()
const adventureSlug = computed(() => route.query.adventure as string)

const advLessons = computed(() => lessons.filter(l => l.adventureSlug === adventureSlug.value))
const questions = computed(() => advLessons.value.flatMap(l => l.quiz))
const adventure = computed(() => {
    const { adventures } = useAdventures()
    return adventures.value.find(a => a.slug === adventureSlug.value)
})

import { EXAM_THEMES, DEFAULT_EXAM_THEME } from '~/constants/themes'

const theme = computed(() => EXAM_THEMES[adventureSlug.value] || DEFAULT_EXAM_THEME)

const answers = ref<string[]>(new Array(questions.value.length).fill(''))
const submitted = ref(false)
const score = ref(0)

const progress = computed(() => {
    if (submitted.value) return 100
    const answered = answers.value.filter(a => a).length
    return Math.round((answered / questions.value.length) * 100)
})

const submitExam = () => {
    let correct = 0
    questions.value.forEach((q, i) => {
        if (answers.value[i] === q.answer) correct++
    })
    score.value = correct
    submitted.value = true
}

const allAnswered = computed(() => answers.value.every(a => a))
const passPercentage = computed(() => Math.round((score.value / questions.value.length) * 100))
const passed = computed(() => passPercentage.value >= 70)
</script>

<template>
    <div class="relative min-h-[70vh]">
        <div class="relative z-10 flex flex-col gap-8 max-w-4xl mx-auto">
            <!-- Exam Header -->
            <header class="flex items-center justify-between bg-white/60 backdrop-blur-md p-6 rounded-3xl border-2 border-white shadow-xl">
                <div class="flex items-center gap-4">
                    <UButton :to="`/lessons?adventure=${adventureSlug}`" icon="i-ph-arrow-left-bold" variant="ghost" color="neutral" class="rounded-2xl" />
                    <div class="flex flex-col">
                        <h1 class="text-2xl font-black text-toned leading-none">{{ theme.title }} {{ theme.emoji }}</h1>
                        <span class="text-sm font-bold text-orange-600 uppercase tracking-widest mt-1">Final Exam</span>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="hidden md:flex flex-col items-end">
                        <span class="text-[10px] font-black text-muted uppercase tracking-tighter">Your Progress</span>
                        <div class="w-32 h-3 bg-orange-100 rounded-full overflow-hidden p-0.5 shadow-inner">
                            <div class="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-orange-400 to-rose-500" :style="{ width: `${progress}%` }" />
                        </div>
                    </div>
                    <div class="bg-orange-50 text-orange-600 px-4 py-2 rounded-2xl font-black shadow-sm">
                        {{ questions.length }} Q's
                    </div>
                </div>
            </header>

            <!-- Exam Content -->
            <main class="relative flex-1">
                <Transition name="fade-slide" mode="out-in">
                    <!-- Questions -->
                    <div v-if="!submitted" key="exam"
                        class="bg-white/40 backdrop-blur-xl p-10 md:p-16 rounded-[3.5rem] border-4 border-white shadow-2xl flex flex-col gap-10">
                        <div class="text-center">
                            <h2 class="text-4xl font-black text-toned">Mastery Challenge 🏆</h2>
                            <p class="text-xl text-muted font-medium mt-2">{{ questions.length }} questions · 70% to pass and earn your badge!</p>
                        </div>

                        <div class="flex flex-col gap-10">
                            <div v-for="(q, qIdx) in questions" :key="qIdx" class="flex flex-col gap-6">
                                <h3 class="text-2xl font-black text-toned">{{ qIdx + 1 }}. {{ q.question }}</h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <UButton v-for="opt in q.options" :key="opt" :label="opt"
                                        :variant="answers[qIdx] === opt ? 'solid' : 'subtle'"
                                        :color="answers[qIdx] === opt ? 'error' : 'neutral'"
                                        class="p-6 rounded-2xl font-bold text-lg text-left justify-start"
                                        @click="answers[qIdx] = opt" />
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center justify-center gap-4 mt-6">
                            <UButton label="Submit Final Exam ✓" color="error" size="xl"
                                class="font-black px-12 py-4 rounded-2xl shadow-xl hover:scale-105"
                                :disabled="!allAnswered" @click="submitExam" />
                        </div>
                    </div>

                    <!-- Results -->
                    <div v-else key="results"
                        class="p-10 md:p-16 rounded-[3.5rem] shadow-2xl text-white flex flex-col items-center text-center gap-8"
                        :class="passed ? 'bg-gradient-to-br from-orange-400 via-rose-500 to-purple-500' : 'bg-gradient-to-br from-slate-400 to-slate-600'">
                        <div class="size-40 bg-white rounded-full flex items-center justify-center shadow-2xl animate-confetti-pop">
                            <UIcon :name="passed ? 'i-ph-trophy-duotone' : 'i-ph-arrow-counter-clockwise-duotone'"
                                :class="passed ? 'text-orange-500' : 'text-slate-400'" class="size-24" />
                        </div>
                        <h2 class="text-5xl md:text-6xl font-black">
                            {{ passed ? 'You Passed!' : 'Try Again!' }}
                        </h2>
                        <p class="text-2xl opacity-90 font-medium">
                            {{ passed ? `Congratulations! You earned the ${theme.badge} badge!` : 'You need 70% to pass. Review your lessons and try again!' }}
                        </p>

                        <div class="flex gap-4 mt-4">
                            <div class="bg-white/20 backdrop-blur-md px-10 py-6 rounded-3xl border-2 border-white/30 flex flex-col items-center">
                                <span class="text-4xl font-black">{{ score }}/{{ questions.length }}</span>
                                <span class="text-xs font-bold uppercase tracking-widest opacity-70">Correct</span>
                            </div>
                            <div class="bg-white/20 backdrop-blur-md px-10 py-6 rounded-3xl border-2 border-white/30 flex flex-col items-center">
                                <span class="text-4xl font-black">{{ passPercentage }}%</span>
                                <span class="text-xs font-bold uppercase tracking-widest opacity-70">Score</span>
                            </div>
                            <div v-if="passed" class="bg-white px-10 py-6 rounded-3xl border-2 border-white flex flex-col text-orange-600">
                                <span class="text-4xl font-black">+{{ score * 100 }}</span>
                                <span class="text-xs font-bold uppercase tracking-widest opacity-70">XP Earned</span>
                            </div>
                        </div>

                        <UBadge v-if="passed" color="warning" variant="subtle" class="font-black text-lg px-6 py-3 rounded-full mt-2">
                            <UIcon name="i-ph-medal-duotone" class="mr-2" /> {{ theme.badge }} Badge Earned!
                        </UBadge>

                        <UButton :to="`/lessons?adventure=${adventureSlug}`" :label="passed ? 'View Adventure →' : 'Back to Lessons'" variant="solid" color="neutral"
                            class="bg-white text-orange-600 font-black px-12 py-6 rounded-[2.5rem] text-2xl hover:scale-105 transition-all shadow-2xl mt-4" />
                    </div>
                </Transition>
            </main>
        </div>
    </div>
</template>
