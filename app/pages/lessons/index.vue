<script setup lang="ts">
definePageMeta({
    layout: 'dashboard'
})

const route = useRoute()
const { lessons: allLessons, getAdventureProgress } = useLessons()
const { adventures } = useAdventures()
const { activeAdventureSlug, isSeeded } = useUserStore()

// Redirect to adventures page if no adventure context is provided
if (!route.query.adventure) {
    navigateTo('/adventures', { replace: true })
}

const activeAdventure = computed(() => {
    const querySlug = route.query.adventure
    const slug = Array.isArray(querySlug) ? querySlug[0] : querySlug
    return adventures.value.find(a => a.slug === slug) || adventures.value[0]
})

watch(() => route.query.adventure, (newVal) => {
    if (newVal) {
        const slug = Array.isArray(newVal) ? newVal[0] : newVal
        if (slug) activeAdventureSlug.value = slug
    }
}, { immediate: true })

const lessons = computed(() => {
    const adventure = activeAdventure.value
    if (!adventure) return allLessons
    return allLessons.filter(l => l.adventureSlug === adventure.slug)
})


const bannerClass = computed(() => {
    const color = activeAdventure.value?.color
    if (!color) return 'bg-linear-to-br from-primary-600 to-indigo-700'

    const baseColor = color.replace('bg-', '').replace('-500', '')
    return `bg-linear-to-br from-${baseColor}-500 to-${baseColor}-700`
})

const bannerProgress = computed(() => {
    if (!activeAdventure.value) return 0
    return getAdventureProgress(activeAdventure.value.slug)
})

// Check if a knowledge quiz after a given lesson index is unlocked
// Quiz after index 1 (lessons 0 & 1) is unlocked when both lessons are completed
const isQuizUnlocked = (lessonIndex: number) => {
    const prevLesson = lessons.value[lessonIndex - 1]
    const currentLesson = lessons.value[lessonIndex]
    return prevLesson?.status === 'completed' && currentLesson?.status === 'completed'
}

// Final exam is unlocked when all lessons are completed
const isFinalExamUnlocked = computed(() => {
    return lessons.value.length > 0 && lessons.value.every(l => l.status === 'completed')
})

// Get quiz questions for the 2 lessons preceding a quiz checkpoint
const getQuizQuestions = (lessonIndex: number) => {
    const l1 = lessons.value[lessonIndex - 1]
    const l2 = lessons.value[lessonIndex]
    const questions: { question: string; options: string[]; answer: string }[] = []
    if (l1) questions.push(...l1.quiz)
    if (l2) questions.push(...l2.quiz)
    return questions
}

// Get ALL quiz questions for the final exam
const allQuizQuestions = computed(() => {
    return lessons.value.flatMap(l => l.quiz)
})

</script>

<template>
    <div class="relative z-10 flex flex-col gap-8">
        <header class="flex flex-col gap-2">
            <h1 class="text-4xl md:text-6xl font-black text-toned">
                My <span class="text-primary-600">Lessons</span>
            </h1>
            <p class="text-xl text-muted font-medium">Pick up where you left off, Explorer!</p>
        </header>

        <!-- Adventure Banner -->
        <div v-if="activeAdventure"
            :class="[bannerClass, 'p-8 md:p-12 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden group']">
            <UIcon :name="activeAdventure.icon"
                class="absolute -bottom-10 -right-10 size-64 text-white/10 group-hover:rotate-12 transition-transform duration-700" />

            <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div :class="[activeAdventure.color, 'p-6 rounded-[2rem] shadow-2xl ring-4 ring-white/20']">
                    <UIcon :name="activeAdventure.icon" class="text-white size-16 md:size-20 flex" />
                </div>
                <div class="flex flex-col gap-2 text-center md:text-left flex-1">
                    <div class="flex items-center justify-center md:justify-start gap-3">
                        <UBadge color="neutral" variant="solid"
                            class="bg-white/20 backdrop-blur-md text-white border-white/20 font-black text-xs uppercase tracking-widest px-4 py-1 rounded-full">
                            Current Adventure
                        </UBadge>
                    </div>
                    <h2 class="text-4xl md:text-6xl font-black tracking-tight leading-none">{{ activeAdventure.title }}
                    </h2>
                    <p class="text-lg md:text-xl opacity-90 font-medium max-w-2xl line-clamp-2">
                        {{ activeAdventure.longDescription }}
                    </p>
                </div>
                <div class="flex flex-col items-center md:items-end gap-3 min-w-[200px]">
                    <div class="flex items-end gap-2">
                        <span class="text-5xl font-black leading-none">{{ bannerProgress }}</span>
                        <span class="text-xl font-bold opacity-60 mb-1">%</span>
                    </div>
                    <div class="w-full h-4 bg-white/20 rounded-full overflow-hidden p-1 shadow-inner">
                        <div class="h-full bg-white rounded-full transition-all duration-1000 shadow-sm"
                            :style="{ width: `${bannerProgress}%` }" />
                    </div>
                    <p class="text-sm font-bold uppercase tracking-widest opacity-60">Adventure Progress</p>
                </div>
            </div>
        </div>

        <template v-if="lessons.length > 0">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <!-- Adventure Hub Link Card -->
                <UCard v-if="activeAdventure"
                    class="group hover:ring-4 hover:ring-primary-500/30 transition-all duration-500 rounded-[2.5rem] border-0 shadow-xl overflow-hidden relative cursor-pointer bg-primary-50/50 backdrop-blur-sm"
                    :ui="{ body: 'p-8 flex flex-col gap-4 h-full relative z-10 justify-center items-center text-center' }">
                    <NuxtLink :to="`/adventures/${activeAdventure.slug}`" class="absolute inset-0 z-0" />
                    <div
                        :class="[activeAdventure.color, 'p-6 rounded-[2rem] shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500']">
                        <UIcon :name="activeAdventure.icon" class="text-white size-10 flex" />
                    </div>
                    <div class="flex flex-col gap-1 mt-2 pointer-events-none">
                        <div class="text-sm font-bold text-primary-600 uppercase tracking-widest">Overview</div>
                        <h3 class="text-3xl font-black text-toned leading-tight">Adventure Hub</h3>
                        <p class="text-muted font-medium mt-1">View your timeline, milestones, and overall progress.</p>
                    </div>
                    <UButton :to="`/adventures/${activeAdventure.slug}`" label="Go to Hub →" block color="primary" variant="subtle"
                        class="mt-auto font-black rounded-xl py-3 relative z-10 hover:bg-primary-100 transition-colors" />
                </UCard>

                <!-- Timeline-ordered lessons with quiz cards -->
                <template v-for="(lesson, index) in lessons" :key="lesson.slug">
                    <LessonCard :lesson="lesson" />

                    <!-- Knowledge Quiz after every 2 lessons -->
                    <QuizCard 
                        v-if="(index + 1) % 2 === 0 && index < lessons.length - 1"
                        :unlocked="isQuizUnlocked(index)" 
                        :lesson-index="index"
                        :adventure-slug="activeAdventure?.slug"
                        :questions="getQuizQuestions(index)" />
                </template>

                <!-- Final Exam Card -->
                <FinalExamCard 
                    v-if="lessons.length > 0" 
                    :unlocked="isFinalExamUnlocked"
                    :adventure-slug="activeAdventure?.slug"
                    :questions="allQuizQuestions" />
            </div>
        </template>
        <AppEmptyState v-else icon="i-ph-book-open-duotone" title="No Lessons Available!" color="emerald"
            message="Your learning path is empty. Seed the data to find your next lesson!" />
    </div>
</template>
