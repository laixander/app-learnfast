<script setup lang="ts">
definePageMeta({
    layout: 'dashboard'
})

const route = useRoute()
const { adventures } = useAdventures()
const { isSeeded, activeAdventureSlug, hasContent } = useUserStore()

const adventure = computed(() => {
    return adventures.value.find(a => a.slug === route.params.slug)
})

watch(adventure, (newVal) => {
    if (newVal) activeAdventureSlug.value = newVal.slug
}, { immediate: true })

// Redirect if data is cleared (no seeded data AND no custom adventures)
watch(hasContent, (newVal) => {
    if (!newVal) navigateTo('/adventures')
}, { immediate: true })

if (!adventure.value) {
    throw createError({ statusCode: 404, statusMessage: 'Adventure not found' })
}

const { lessons, getAdventureProgress } = useLessons()

const dynamicProgress = computed(() => {
    if (!adventure.value) return 0
    return getAdventureProgress(adventure.value.slug)
})

const adventureLessons = computed(() => {
    return lessons.filter(l => l.adventureSlug === adventure.value?.slug)
})

const timelineItems = computed(() => {
    return adventureLessons.value
})

const nextTimelineItem = computed(() => {
    // Find the first lesson that is 'current' (the next one to do)
    const currentLesson = adventureLessons.value.find(l => l.status === 'current')
    if (currentLesson) return { type: 'lesson' as const, lesson: currentLesson }
    // If no current lesson, check if all are completed (ready for final exam)
    if (adventureLessons.value.length > 0 && adventureLessons.value.every(l => l.status === 'completed')) {
        return { type: 'final-exam' as const, lesson: null }
    }
    // Fallback to first lesson
    return adventureLessons.value.length > 0 
        ? { type: 'lesson' as const, lesson: adventureLessons.value[0] } 
        : null
})

const startButtonLink = computed(() => {
    if (!nextTimelineItem.value) return `/lessons?adventure=${adventure.value?.slug}`
    if (nextTimelineItem.value.type === 'final-exam') return `/lessons?adventure=${adventure.value?.slug}`
    return `/lessons/${nextTimelineItem.value.lesson?.slug}`
})

const startButtonLabel = computed(() => {
    if (dynamicProgress.value === 0) return 'Start Adventure! →'
    if (dynamicProgress.value >= 100) return 'Take Final Exam! →'
    return 'Continue Adventure! →'
})

const tagline = computed(() => {
    return adventure.value?.startContent?.tagline || 'Your next big discovery is just one click away. Are you brave enough, Explorer?'
})

const progressMessage = computed(() => {
    return dynamicProgress.value > 0
        ? 'You are doing great! Keep going to earn your badge.'
        : 'Start today to begin your journey!'
})
</script>

<template>
    <div v-if="adventure" class="relative">

        <div class="relative z-10 flex flex-col gap-10">
            <!-- Back Button -->
            <UButton to="/adventures" icon="i-ph-arrow-left-bold" label="Back to Adventures" variant="ghost"
                color="neutral"
                class="self-start font-black text-lg hover:bg-primary-100 hover:text-primary-600 rounded-2xl px-6" />

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <!-- Main Content -->
                <div class="lg:col-span-2 flex flex-col gap-8">
                    <div
                        class="bg-white/40 backdrop-blur-xl p-8 md:p-12 rounded-[3.5rem] border-4 border-white shadow-2xl">
                        <div class="flex flex-col md:flex-row items-center gap-8 mb-10 text-center md:text-left">
                            <div :class="[adventure.color, 'p-8 rounded-[2.5rem] shadow-2xl animate-float']">
                                <UIcon :name="adventure.icon" class="text-white size-20 md:size-24 flex" />
                            </div>
                            <div class="flex flex-col gap-2">
                                <div class="flex items-center justify-center md:justify-start gap-3">
                                    <UBadge color="primary" variant="subtle"
                                        class="font-black text-sm uppercase tracking-widest px-4 py-1 rounded-full">
                                        {{ adventure.category }}
                                    </UBadge>
                                </div>
                                <h1 class="text-5xl md:text-7xl font-black text-toned leading-tight">
                                    {{ adventure.title }}
                                </h1>
                            </div>
                        </div>

                        <div class="flex flex-col gap-6">
                            <h2 class="text-3xl font-black text-toned">What's this adventure about?</h2>
                            <p class="text-2xl text-muted font-medium leading-relaxed">
                                {{ adventure.longDescription }}
                            </p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                            <div
                                class="bg-white/60 p-6 rounded-xl border-2 border-white flex flex-col items-center gap-2 shadow-lg">
                                <UIcon name="i-ph-book-open-duotone" class="text-primary-500 size-10" />
                                <span class="text-3xl font-black text-toned">{{ adventure.lessons }}</span>
                                <span class="text-xs font-bold text-muted uppercase tracking-widest">Lessons</span>
                            </div>
                            <div
                                class="bg-white/60 p-6 rounded-xl border-2 border-white flex flex-col items-center gap-2 shadow-lg">
                                <UIcon name="i-ph-clock-duotone" class="text-emerald-500 size-10" />
                                <span class="text-3xl font-black text-toned">{{ adventure.time }}</span>
                                <span class="text-xs font-bold text-muted uppercase tracking-widest">Total Time</span>
                            </div>
                            <div
                                class="bg-white/60 p-6 rounded-xl border-2 border-white flex flex-col items-center gap-2 shadow-lg">
                                <UIcon name="i-ph-medal-duotone" class="text-orange-500 size-10" />
                                <span class="text-xl font-black text-toned text-center">{{ adventure.badge }}</span>
                                <span class="text-xs font-bold text-muted uppercase tracking-widest">Reward Badge</span>
                            </div>
                        </div>
                    </div>

                    <div
                        class="bg-linear-to-br from-primary-600 to-indigo-700 p-8 md:p-12 rounded-[3.5rem] shadow-2xl text-white relative overflow-hidden group">
                        <UIcon name="i-ph-rocket-launch-duotone"
                            class="absolute -bottom-10 -right-10 size-60 text-white/10 group-hover:rotate-12 transition-transform duration-700" />

                        <div class="relative z-10 flex flex-col gap-8 items-center text-center max-w-3xl mx-auto">
                            <div class="flex flex-col gap-4">
                                <h2 class="text-4xl md:text-6xl font-black tracking-tight">Ready to Start?</h2>
                                <p class="text-xl md:text-2xl opacity-90 font-medium">
                                    {{ tagline }}
                                </p>
                            </div>

                            <!-- Mission Objectives -->
                            <div
                                class="bg-white/10 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/20 w-full text-left flex flex-col gap-6 shadow-inner">
                                <h3 class="text-2xl font-black flex items-center gap-3">
                                    <UIcon name="i-ph-flag-pennant-duotone" class="text-yellow-400 size-8" />
                                    Your Mission Objectives
                                </h3>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div v-for="(goal, index) in adventure.startContent?.goals" :key="index"
                                        class="flex items-start gap-4">
                                        <div
                                            class="size-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 shadow-lg">
                                            <UIcon :name="goal.icon" :class="['size-7', goal.color]" />
                                        </div>
                                        <div>
                                            <p class="font-black text-xl">{{ goal.title }}</p>
                                            <p class="text-white/70 text-sm font-medium leading-snug">{{
                                                goal.description }}</p>
                                        </div>
                                    </div>

                                    <!-- Fallback if no goals defined -->
                                    <template v-if="!adventure.startContent?.goals">
                                        <div class="flex items-start gap-4">
                                            <div
                                                class="size-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                                                <UIcon name="i-ph-book-open-duotone" class="size-6 text-yellow-300" />
                                            </div>
                                            <div>
                                                <p class="font-black text-lg">Master Lessons</p>
                                                <p class="text-white/70 text-sm font-medium leading-snug">Complete all
                                                    {{ adventure.lessons }}
                                                    lessons in this journey.</p>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>

                            <div class="flex flex-col gap-4 items-center mt-4">
                                <UButton :to="startButtonLink"
                                    :label="startButtonLabel" size="xl" color="neutral"
                                    class="bg-white text-primary-600 font-black px-16 py-6 rounded-[2.5rem] text-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl" />
                                <p
                                    class="text-white/60 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                                    <UIcon name="i-ph-lock-open-duotone" />
                                    Free to play for all explorers
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar / Stats -->
                <div class="flex flex-col gap-8">
                    <div
                        class="bg-white/60 backdrop-blur-xl p-8 rounded-[3rem] border-4 border-white shadow-xl flex flex-col gap-6">
                        <h3 class="text-2xl font-black text-toned flex items-center gap-3">
                            <UIcon name="i-ph-chart-bar-duotone" class="text-primary-500" />
                            Your Progress
                        </h3>
                        <div class="flex flex-col gap-4">
                            <div class="flex justify-between items-end">
                                <span class="text-lg font-bold text-muted">Adventure Score</span>
                                <span class="text-3xl font-black text-primary-600">{{ dynamicProgress }}%</span>
                            </div>
                            <div class="h-6 bg-primary-100 rounded-full overflow-hidden p-1.5 shadow-inner">
                                <div class="h-full rounded-full transition-all duration-1000" :class="adventure.color"
                                    :style="{ width: `${dynamicProgress}%` }" />
                            </div>
                            <p class="text-sm font-medium text-muted mt-2">
                                {{ progressMessage }}
                            </p>
                        </div>
                    </div>

                    <div
                        class="bg-white/60 backdrop-blur-xl p-8 rounded-[3rem] border-4 border-white shadow-xl flex flex-col gap-6">
                        <h3 class="text-2xl font-black text-toned flex items-center gap-3">
                            <UIcon name="i-ph-scroll-duotone" class="text-yellow-500" />
                            Learning Goals
                        </h3>
                        <ul class="flex flex-col gap-4">
                            <li v-for="(goal, index) in adventure.startContent?.goals" :key="index"
                                class="flex gap-3 items-start">
                                <div
                                    class="size-6 rounded-full bg-emerald-100 flex items-center justify-center mt-1 shrink-0">
                                    <UIcon name="i-ph-check-bold" class="text-emerald-600 size-4" />
                                </div>
                                <span class="text-lg font-medium text-toned leading-snug">{{ goal.title }}</span>
                            </li>
                            <!-- Fallback if no goals defined -->
                            <li v-if="!adventure.startContent?.goals" v-for="i in 3" :key="i"
                                class="flex gap-3 items-start">
                                <div
                                    class="size-6 rounded-full bg-emerald-100 flex items-center justify-center mt-1 shrink-0">
                                    <UIcon name="i-ph-check-bold" class="text-emerald-600 size-4" />
                                </div>
                                <span class="text-lg font-medium text-toned leading-snug">Amazing goal #{{ i }} that you
                                    will
                                    master!</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Lesson Timeline -->
                    <div
                        class="bg-white/60 backdrop-blur-xl p-8 rounded-[3rem] border-4 border-white shadow-xl flex flex-col gap-6">
                        <h3 class="text-2xl font-black text-toned flex items-center gap-3">
                            <UIcon name="i-ph-list-checks-duotone" class="text-primary-500" />
                            Lesson Timeline
                        </h3>
                        <div class="flex flex-col gap-6 relative">
                            <!-- Timeline Line -->
                            <div class="absolute left-4.5 top-4 bottom-4 w-1 bg-primary-100 rounded-full z-0" />

                            <template v-for="(item, index) in timelineItems" :key="index">
                                <!-- Lesson Step -->
                                <div class="flex gap-4 items-center relative z-10">
                                    <div
                                        class="size-9 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white shrink-0 bg-primary-500">
                                        <UIcon :name="item.icon" class="text-white size-5" />
                                    </div>
                                    <div class="flex-1">
                                        <div class="flex items-center gap-2">
                                            <div
                                                class="text-[10px] font-black text-primary-600 uppercase tracking-widest leading-none">
                                                Lesson {{ index + 1 }}</div>
                                        </div>
                                        <div class="font-bold text-toned leading-tight text-sm">{{ item.title }}</div>
                                    </div>
                                </div>

                                <!-- Mini Quiz (Every 2nd lesson) -->
                                <div v-if="(index + 1) % 2 === 0"
                                    class="flex gap-4 items-center relative z-10 ml-1">
                                    <div
                                        class="size-7 rounded-full bg-yellow-400 flex items-center justify-center shadow-md ring-2 ring-white shrink-0">
                                        <UIcon name="i-ph-question-bold" class="text-yellow-900 size-4" />
                                    </div>
                                    <div class="flex-1">
                                        <div class="text-[10px] font-black text-yellow-600 uppercase tracking-widest">
                                            Knowledge Quiz</div>
                                    </div>
                                </div>
                            </template>

                            <!-- Final Quiz -->
                            <div class="flex gap-4 items-center relative z-10">
                                <div
                                    class="size-9 rounded-full bg-linear-to-br from-orange-400 to-rose-500 flex items-center justify-center shadow-lg ring-4 ring-white shrink-0">
                                    <UIcon name="i-ph-trophy-duotone" class="text-white size-5" />
                                </div>
                                <div class="flex-1">
                                    <div
                                        class="text-[10px] font-black text-orange-600 uppercase tracking-widest leading-none mb-0.5">
                                        Final Exam</div>
                                    <div class="font-black text-toned leading-tight text-sm">Mastery Challenge</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes float {

    0%,
    100% {
        transform: translateY(0) rotate(0);
    }

    50% {
        transform: translateY(-15px) rotate(3deg);
    }
}

.animate-float {
    animation: float 5s ease-in-out infinite;
}
</style>
