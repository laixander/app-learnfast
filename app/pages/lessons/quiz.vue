<script setup lang="ts">
definePageMeta({ layout: 'dashboard' })

const route = useRoute()
const { lessons } = useLessons()
const adventureSlug = computed(() => route.query.adventure as string)
const quizAfterIndex = computed(() => Number(route.query.after))

// Get the 2 lessons this quiz covers
const quizLessons = computed(() => {
    const advLessons = lessons.filter(l => l.adventureSlug === adventureSlug.value)
    const idx = quizAfterIndex.value
    return [advLessons[idx - 1], advLessons[idx]].filter((l): l is NonNullable<typeof l> => !!l)
})

const questions = computed(() => quizLessons.value.flatMap(l => l.quiz))
const adventure = computed(() => {
    const { adventures } = useAdventures()
    return adventures.value.find(a => a.slug === adventureSlug.value)
})

import { QUIZ_THEMES, DEFAULT_QUIZ_THEME } from '~/constants/themes'

const theme = computed(() => QUIZ_THEMES[adventureSlug.value] || DEFAULT_QUIZ_THEME)

const answers = ref<string[]>(new Array(questions.value.length).fill(''))
const submitted = ref(false)
const score = ref(0)

const progress = computed(() => {
    if (submitted.value) return 100
    const answered = answers.value.filter(a => a).length
    return Math.round((answered / questions.value.length) * 100)
})

const submitQuiz = () => {
    let correct = 0
    questions.value.forEach((q, i) => {
        if (answers.value[i] === q.answer) correct++
    })
    score.value = correct
    submitted.value = true
}

const allAnswered = computed(() => answers.value.every(a => a))
</script>

<template>
    <div class="relative min-h-[70vh]">
        <div class="relative z-10 flex flex-col gap-8 max-w-4xl mx-auto">
            <!-- Quiz Header -->
            <header class="flex items-center justify-between bg-white/60 backdrop-blur-md p-6 rounded-3xl border-2 border-white shadow-xl">
                <div class="flex items-center gap-4">
                    <UButton :to="`/lessons?adventure=${adventureSlug}`" icon="i-ph-arrow-left-bold" variant="ghost" color="neutral" class="rounded-2xl" />
                    <div class="flex flex-col">
                        <h1 class="text-2xl font-black text-toned leading-none">{{ theme.title }} {{ theme.emoji }}</h1>
                        <span class="text-sm font-bold text-yellow-600 uppercase tracking-widest mt-1">Knowledge Check</span>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="hidden md:flex flex-col items-end">
                        <span class="text-[10px] font-black text-muted uppercase tracking-tighter">Your Progress</span>
                        <div class="w-32 h-3 bg-yellow-100 rounded-full overflow-hidden p-0.5 shadow-inner">
                            <div class="h-full rounded-full transition-all duration-500 bg-yellow-400" :style="{ width: `${progress}%` }" />
                        </div>
                    </div>
                    <div class="bg-yellow-50 text-yellow-600 px-4 py-2 rounded-2xl font-black shadow-sm">
                        {{ questions.length }} Q's
                    </div>
                </div>
            </header>

            <!-- Quiz Content -->
            <main class="relative flex-1">
                <Transition name="fade-slide" mode="out-in">
                    <!-- Questions -->
                    <div v-if="!submitted" key="quiz"
                        class="bg-white/40 backdrop-blur-xl p-10 md:p-16 rounded-[3.5rem] border-4 border-white shadow-2xl flex flex-col gap-10">
                        <div class="text-center">
                            <h2 class="text-4xl font-black text-toned">Show What You Know! 🧠</h2>
                            <p class="text-xl text-muted font-medium mt-2">Answer all questions to continue your adventure.</p>
                        </div>

                        <div class="flex flex-col gap-10">
                            <div v-for="(q, qIdx) in questions" :key="qIdx" class="flex flex-col gap-6">
                                <h3 class="text-2xl font-black text-toned">{{ qIdx + 1 }}. {{ q.question }}</h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <UButton v-for="opt in q.options" :key="opt" :label="opt"
                                        :variant="answers[qIdx] === opt ? 'solid' : 'subtle'"
                                        :color="answers[qIdx] === opt ? 'warning' : 'neutral'"
                                        class="p-6 rounded-2xl font-bold text-lg text-left justify-start"
                                        @click="answers[qIdx] = opt" />
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center justify-center gap-4 mt-6">
                            <UButton label="Submit Answers ✓" color="warning" size="xl"
                                class="font-black px-12 py-4 rounded-2xl shadow-xl hover:scale-105"
                                :disabled="!allAnswered" @click="submitQuiz" />
                        </div>
                    </div>

                    <!-- Results -->
                    <div v-else key="results"
                        class="bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-400 p-10 md:p-16 rounded-[3.5rem] shadow-2xl text-white flex flex-col items-center text-center gap-8">
                        <div class="size-40 bg-white rounded-full flex items-center justify-center shadow-2xl animate-confetti-pop">
                            <UIcon :name="score === questions.length ? 'i-ph-trophy-duotone' : 'i-ph-star-duotone'" 
                                :class="score === questions.length ? 'text-yellow-500' : 'text-amber-500'" class="size-24" />
                        </div>
                        <h2 class="text-5xl md:text-6xl font-black">
                            {{ score === questions.length ? 'Perfect!' : 'Great Job!' }}
                        </h2>
                        <p class="text-2xl opacity-90 font-medium">You scored {{ score }} out of {{ questions.length }}!</p>

                        <div class="flex gap-4 mt-4">
                            <div class="bg-white/20 backdrop-blur-md px-10 py-6 rounded-3xl border-2 border-white/30 flex flex-col items-center">
                                <span class="text-4xl font-black">{{ score }}/{{ questions.length }}</span>
                                <span class="text-xs font-bold uppercase tracking-widest opacity-70">Correct</span>
                            </div>
                            <div class="bg-white px-10 py-6 rounded-3xl border-2 border-white flex flex-col text-yellow-600">
                                <span class="text-4xl font-black">+{{ score * 50 }}</span>
                                <span class="text-xs font-bold uppercase tracking-widest opacity-70">XP Earned</span>
                            </div>
                        </div>

                        <UButton :to="`/lessons?adventure=${adventureSlug}`" label="Continue Adventure →" variant="solid" color="neutral"
                            class="bg-white text-yellow-600 font-black px-12 py-6 rounded-[2.5rem] text-2xl hover:scale-105 transition-all shadow-2xl mt-6" />
                    </div>
                </Transition>
            </main>
        </div>
    </div>
</template>
