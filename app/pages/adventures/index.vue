<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'
definePageMeta({
    layout: 'dashboard'
})

const { categories, adventures } = useAdventures()
const { isSeeded, hasContent } = useUserStore()
const selectedCategory = ref('All')
const isMoreModalOpen = ref(false)

const maxVisible = 6

const activeCategories = computed(() => {
    return categories.value.filter(cat =>
        cat.name === 'All' || adventures.value.some(adv => adv.category === cat.name)
    )
})

const visibleCategories = computed(() => {
    // Return limited set if we have more than the limit
    return activeCategories.value.length > maxVisible ? activeCategories.value.slice(0, maxVisible) : activeCategories.value
})

const hasMoreCategories = computed(() => activeCategories.value.length > visibleCategories.value.length)

// Spotlight Effect Logic
const sectionRef = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(sectionRef)

const filteredAdventures = computed(() => {
    if (selectedCategory.value === 'All') return adventures.value
    return adventures.value.filter(adv => adv.category === selectedCategory.value)
})

const selectCategory = (name: string) => {
    selectedCategory.value = name
    isMoreModalOpen.value = false
}
</script>

<template>
    <div class="relative z-10 flex flex-col gap-10">
        <header class="flex flex-col justify-between gap-6">
            <!-- <div class="flex flex-col gap-2">
                <h1 class="text-4xl md:text-6xl font-black text-toned">
                    Great <span class="text-primary-600">Adventures</span>
                </h1>
                <p class="text-xl text-muted font-medium">Where will you go next, Felix?</p>
            </div> -->
            <!-- Create AI Sandbox UI -->
            <section v-if="isSeeded" ref="sectionRef"
                class="relative group bg-linear-to-br from-primary-50/50 via-white/80 to-indigo-50/50 dark:from-primary-950/20 dark:via-neutral-900/40 dark:to-indigo-950/20 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] border-4 border-white dark:border-neutral-800 shadow-[0_32px_64px_-12px_rgba(99,102,241,0.12)] overflow-hidden transition-all duration-500 hover:shadow-primary-500/20 mb-2">
                <!-- Spotlight Effect -->
                <div class="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    :style="{
                        background: `radial-gradient(500px circle at ${elementX}px ${elementY}px, rgba(99, 102, 241, 0.3), transparent 60%)`
                    }" />

                <!-- Decorative Elements -->
                <div
                    class="absolute -top-20 -right-20 size-96 bg-purple-400/20 rounded-full blur-[100px] group-hover:bg-purple-400/60 transition-colors duration-700 animate-pulse" />
                <div
                    class="absolute -bottom-20 -left-20 size-80 bg-fuchsia-400/20 rounded-full blur-[100px] group-hover:bg-fuchsia-400/60 transition-colors duration-700 animate-pulse" />

                <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div class="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                        <div
                            class="bg-linear-to-br from-primary-500 to-indigo-600 p-6 rounded-[2rem] shadow-2xl animate-float relative shrink-0">
                            <UIcon name="i-ph-flask-duotone" class="text-white size-16 md:size-20 flex" />
                            <div class="absolute -top-2 -right-2 bg-yellow-400 size-6 rounded-full animate-ping" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <h2 class="text-3xl md:text-5xl font-black text-toned leading-tight tracking-tight">
                                AI Adventure <span class="text-primary-600">Laboratory</span>
                            </h2>
                            <p class="text-lg md:text-xl text-muted font-medium max-w-xl">
                                Ready to learn something new? Use AI magic to turn any topic into a personalized journey
                                with
                                quizzes and badges!
                            </p>
                        </div>
                    </div>

                    <div class="flex flex-col items-center gap-4 shrink-0">
                        <div
                            class="relative p-[3px] rounded-[2.1rem] overflow-hidden group/btn racing-border-wrap w-fit hover:scale-105 active:scale-95 transition-all duration-500 shadow-2xl">
                            <div class="absolute inset-0 bg-white/10" />
                            <div
                                class="absolute -inset-[100%] bg-[conic-gradient(transparent,transparent,transparent,#6366f1_80%,transparent_100%)] animate-border-rotate" />

                            <UButton to="/create" label="Start Experimenting →" size="xl"
                                class="relative font-black px-10 py-6 rounded-[1.9rem] text-xl bg-linear-to-r from-primary-600 via-indigo-600 to-purple-600 hover:from-primary-700 hover:via-indigo-700 hover:to-purple-700 text-white border-0 overflow-hidden w-fit z-10" />
                        </div>
                        <span class="text-[10px] font-black text-muted uppercase tracking-[0.2em] opacity-40">
                            Takes less than 30 seconds
                        </span>
                    </div>
                </div>
            </section>
            <div v-if="hasContent"
                class="flex gap-2 bg-white/60 backdrop-blur-md px-2.5 py-2 rounded-2xl border-2 border-white overflow-x-auto no-scrollbar items-center">
                <UButton v-for="cat in visibleCategories" :key="cat.name" :label="cat.name" :icon="cat.icon"
                    variant="ghost" color="neutral"
                    class="font-bold px-6 py-2 rounded-xl whitespace-nowrap transition-all duration-300 border-2 border-transparent"
                    :class="{ 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg border-primary-400': selectedCategory === cat.name }"
                    @click="selectedCategory = cat.name" />

                <UButton v-if="hasMoreCategories" label="Explore All" icon="i-ph-sparkle-duotone" variant="soft"
                    color="primary"
                    class="font-black px-6 py-2 rounded-xl whitespace-nowrap shadow-sm border-2 border-primary-100 hover:scale-105 hover:bg-white transition-all ml-auto"
                    @click="isMoreModalOpen = true" />
            </div>
        </header>

        <div v-if="hasContent" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- AI Magic Creator Card -->
            <UCard
                class="group hover:ring-4 hover:ring-indigo-500/30 transition-all duration-500 rounded-[2.5rem] border-4 border-dashed border-indigo-200 shadow-xl overflow-hidden relative cursor-pointer bg-indigo-50/30"
                :ui="{ body: 'p-8 flex flex-col gap-6 relative z-10 h-full' }">
                <NuxtLink to="/adventures/create" class="absolute inset-0 z-0" />

                <div class="flex items-start justify-between pointer-events-none">
                    <div
                        class="bg-indigo-500 p-5 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                        <UIcon name="i-ph-magic-wand-duotone" class="text-white size-10 flex" />
                    </div>
                    <UBadge color="neutral" variant="solid"
                        class="bg-indigo-100 text-indigo-700 border-indigo-200 font-black rounded-full px-3 animate-pulse">
                        AI Magic
                    </UBadge>
                </div>

                <div class="flex flex-col gap-2 flex-1 pointer-events-none">
                    <h3 class="text-2xl font-black text-toned leading-tight">Create My Own!</h3>
                    <p class="text-muted font-medium leading-snug">Use AI to build a custom adventure about anything you
                        want!</p>
                </div>

                <UButton to="/create" label="Start Magic →" size="lg" block
                    class="mt-4 font-black rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white border-0 relative z-10" />
            </UCard>

            <AdventureCard v-for="adv in filteredAdventures" :key="adv.title" :adventure="adv" />
        </div>
        <AppEmptyState v-else icon="i-ph-mountains-duotone" title="No Adventures Found!" color="indigo"
            message="Your adventure map is currently empty. Seed the data to start your journey!" />
    </div>

    <!-- Category Explore Modal -->
    <UModal v-model:open="isMoreModalOpen" class="max-w-3xl">
        <template #header>
            <div class="flex items-center justify-between w-full p-4">
                <div class="flex flex-col gap-1">
                    <h2 class="text-3xl md:text-4xl font-black text-toned leading-tight">Explore <span
                            class="text-primary-600">All Topics</span></h2>
                    <p class="text-lg text-muted font-medium">Choose a subject to start your next adventure!</p>
                </div>
                <UButton icon="i-ph-x-bold" variant="ghost" color="neutral" class="rounded-full hover:bg-primary-50"
                    @click="isMoreModalOpen = false" />
            </div>
        </template>
        <template #body>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-6 p-4">
                <button v-for="cat in activeCategories" :key="cat.name"
                    class="group flex flex-col items-center gap-4 p-8 rounded-[2.5rem] transition-all duration-500 border-4 border-white shadow-xl hover:shadow-2xl hover:-translate-y-2 text-center relative overflow-hidden"
                    :class="selectedCategory === cat.name ? 'bg-primary-500 text-white border-primary-200' : 'bg-primary-50/50 hover:bg-white'"
                    @click="selectCategory(cat.name)">

                    <div
                        class="absolute -top-10 -right-10 size-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                    <div class="p-5 rounded-2xl shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
                        :class="selectedCategory === cat.name ? 'bg-white/20' : 'bg-white shadow-primary-500/10'">
                        <UIcon :name="cat.icon"
                            :class="[selectedCategory === cat.name ? 'text-white' : 'text-primary-500', 'size-12 flex']" />
                    </div>

                    <div class="text-xl font-black tracking-tight">{{ cat.name }}</div>
                </button>
            </div>
        </template>
    </UModal>
</template>
<style scoped>
@keyframes border-rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.animate-border-rotate {
    animation: border-rotate 4s linear infinite;
}

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