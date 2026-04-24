<script setup lang="ts">
definePageMeta({
    layout: 'dashboard'
})

const route = useRoute()
const { lessons } = useLessons()

const lesson = computed(() => {
    return lessons.find(l => l.slug === route.params.slug)
})

if (!lesson.value) {
    throw createError({ statusCode: 404, statusMessage: 'Lesson not found' })
}

const currentStepIndex = ref(0)
const isQuizMode = ref(false)
const isFinished = ref(false)
const quizAnswers = ref<string[]>([])
const score = ref(0)

const currentStep = computed(() => lesson.value?.steps[currentStepIndex.value])

const nextStep = () => {
    if (lesson.value && currentStepIndex.value < lesson.value.steps.length - 1) {
        currentStepIndex.value++
    } else {
        isQuizMode.value = true
    }
}

const prevStep = () => {
    if (currentStepIndex.value > 0) {
        currentStepIndex.value--
    }
}

const submitQuiz = () => {
    if (!lesson.value) return

    let correctCount = 0
    lesson.value.quiz.forEach((q, idx) => {
        if (quizAnswers.value[idx] === q.answer) {
            correctCount++
        }
    })

    score.value = correctCount
    isFinished.value = true
}

const progress = computed(() => {
    if (!lesson.value) return 0
    if (isFinished.value) return 100
    if (isQuizMode.value) return 90
    return (currentStepIndex.value / lesson.value.steps.length) * 100
})
</script>

<template>
    <BgDecorations />
    <div v-if="lesson" class="relative min-h-[70vh]">

        <div class="relative z-10 flex flex-col gap-8 max-w-4xl mx-auto">
            <!-- Lesson Header -->
            <header
                class="flex items-center justify-between bg-white/60 backdrop-blur-md p-6 rounded-3xl border-2 border-white shadow-xl">
                <div class="flex items-center gap-4">
                    <UButton to="/lessons" icon="i-ph-arrow-left-bold" variant="ghost" color="neutral"
                        class="rounded-2xl" />
                    <div class="flex flex-col">
                        <h1 class="text-2xl font-black text-toned leading-none">{{ lesson.title }}</h1>
                        <span class="text-sm font-bold text-primary-600 uppercase tracking-widest mt-1">{{
                            lesson.category }}</span>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="hidden md:flex flex-col items-end">
                        <span class="text-[10px] font-black text-muted uppercase tracking-tighter">Your Progress</span>
                        <div class="w-32 h-3 bg-primary-100 rounded-full overflow-hidden p-0.5 shadow-inner">
                            <div class="h-full rounded-full transition-all duration-500 bg-primary-500"
                                :style="{ width: `${progress}%` }" />
                        </div>
                    </div>
                    <div class="bg-primary-50 text-primary-600 px-4 py-2 rounded-2xl font-black shadow-sm">
                        {{ lesson.xp }} XP
                    </div>
                </div>
            </header>

            <!-- Lesson Content -->
            <main class="relative flex-1">
                <Transition name="fade-slide" mode="out-in">
                    <!-- Step Mode -->
                    <div v-if="!isQuizMode && !isFinished" :key="`step-${currentStepIndex}`"
                        class="bg-white/40 backdrop-blur-xl p-10 md:p-16 rounded-[3.5rem] border-4 border-white shadow-2xl flex flex-col items-center text-center gap-10">
                        <div :class="[lesson.color, 'p-10 rounded-[3rem] shadow-2xl animate-bounce-slow']">
                            <UIcon :name="currentStep?.icon" :class="[currentStep?.color, 'size-24 md:size-32 flex']" />
                        </div>
                        <div class="flex flex-col gap-4">
                            <h2 class="text-4xl md:text-5xl font-black text-toned">{{ currentStep?.title }}</h2>
                            <p class="text-2xl text-muted font-medium leading-relaxed max-w-2xl">
                                {{ currentStep?.content }}
                            </p>
                        </div>
                        <div class="flex items-center gap-4 mt-6">
                            <UButton v-if="currentStepIndex > 0" label="Previous" variant="subtle" color="neutral"
                                size="xl" class="font-black px-10 rounded-2xl" @click="prevStep" />
                            <UButton :label="currentStepIndex === lesson.steps.length - 1 ? 'Start Quiz!' : 'Next Step'"
                                color="primary" size="xl"
                                class="font-black px-12 py-4 rounded-2xl shadow-xl hover:scale-105" @click="nextStep" />
                        </div>
                    </div>

                    <!-- Quiz Mode -->
                    <div v-else-if="isQuizMode && !isFinished" key="quiz"
                        class="bg-white/40 backdrop-blur-xl p-10 md:p-16 rounded-[3.5rem] border-4 border-white shadow-2xl flex flex-col gap-10">
                        <div class="text-center">
                            <h2 class="text-4xl font-black text-toned">Quiz Time! 🧠</h2>
                            <p class="text-xl text-muted font-medium mt-2">Show us what you learned, Explorer!</p>
                        </div>

                        <div class="flex flex-col gap-10">
                            <div v-for="(q, qIdx) in lesson.quiz" :key="qIdx" class="flex flex-col gap-6">
                                <h3 class="text-2xl font-black text-toned">{{ qIdx + 1 }}. {{ q.question }}</h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <UButton v-for="opt in q.options" :key="opt" :label="opt"
                                        :variant="quizAnswers[qIdx] === opt ? 'solid' : 'subtle'"
                                        :color="quizAnswers[qIdx] === opt ? 'primary' : 'neutral'"
                                        class="p-6 rounded-2xl font-bold text-lg text-left justify-start"
                                        @click="quizAnswers[qIdx] = opt" />
                                </div>
                            </div>
                        </div>

                        <UButton label="Submit My Answers!" block size="xl" color="primary"
                            class="font-black py-6 rounded-[2rem] shadow-2xl mt-4"
                            :disabled="quizAnswers.length < lesson.quiz.length" @click="submitQuiz" />
                    </div>

                    <!-- Finished Mode -->
                    <div v-else-if="isFinished" key="finished"
                        class="bg-linear-to-br from-primary-600 to-indigo-700 p-16 rounded-[4rem] shadow-2xl text-white text-center flex flex-col items-center gap-8 relative overflow-hidden">
                        <div
                            class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                        <div class="relative z-10 flex flex-col items-center gap-6">
                            <div
                                class="size-40 bg-white rounded-full flex items-center justify-center shadow-2xl animate-confetti-pop">
                                <UIcon name="i-ph-crown-duotone" class="text-yellow-500 size-24" />
                            </div>
                            <h2 class="text-5xl md:text-6xl font-black">Amazing Job!</h2>
                            <p class="text-2xl opacity-90 font-medium">You completed the <span
                                    class="underline underline-offset-8">{{
                                        lesson.title }}</span> lesson!</p>

                            <div class="flex gap-4 mt-4">
                                <div
                                    class="bg-white/20 backdrop-blur-md px-10 py-6 rounded-3xl border-2 border-white/30 flex flex-col">
                                    <span class="text-4xl font-black">{{ score }}/{{ lesson.quiz.length }}</span>
                                    <span class="text-xs font-bold uppercase tracking-widest opacity-70">Correct</span>
                                </div>
                                <div
                                    class="bg-yellow-400 text-yellow-900 px-10 py-6 rounded-3xl border-2 border-white flex flex-col">
                                    <span class="text-4xl font-black">+{{ lesson.xp }}</span>
                                    <span class="text-xs font-bold uppercase tracking-widest opacity-70">XP
                                        Earned</span>
                                </div>
                            </div>

                            <UButton to="/lessons" label="Keep Learning!" variant="solid" color="neutral"
                                class="bg-white text-primary-600 font-black px-12 py-6 rounded-[2.5rem] text-2xl hover:scale-105 transition-all shadow-2xl mt-6" />
                        </div>
                    </div>
                </Transition>
            </main>
        </div>
    </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

@keyframes bounce-slow {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }
}

.animate-bounce-slow {
    animation: bounce-slow 4s ease-in-out infinite;
}

@keyframes confetti-pop {
    0% {
        transform: scale(0.5);
        opacity: 0;
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.animate-confetti-pop {
    animation: confetti-pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
</style>
