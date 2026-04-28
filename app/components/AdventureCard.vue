<script setup lang="ts">
import type { Adventure } from '~/types/adventures'

const props = defineProps<{
    adventure: Adventure
}>()

const { lessons, getAdventureProgress } = useLessons()

const currentLesson = computed(() => {
    return lessons.find(l => l.adventureSlug === props.adventure.slug && l.status === 'current')
})

const dynamicProgress = computed(() => {
    return getAdventureProgress(props.adventure.slug)
})
</script>

<template>
    <UCard
        class="group hover:ring-4 hover:ring-primary-500/30 transition-all duration-500 rounded-[2.5rem] border-0 shadow-xl overflow-hidden relative cursor-pointer relative"
        :ui="{ body: 'p-8 flex flex-col gap-6 relative z-10' }">
        <NuxtLink :to="`/lessons?adventure=${adventure.slug}`" class="absolute inset-0 -z-10" />
        <div
            :class="[adventure.blob, 'absolute inset-0 transition-transform duration-700 group-hover:scale-150 pointer-events-none']" />

        <div class="flex items-start justify-between pointer-events-none">
            <div
                :class="[adventure.color, 'p-5 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500']">
                <UIcon :name="adventure.icon" class="text-white size-10 flex" />
            </div>
            <div class="bg-white/80 px-4 py-1 rounded-full font-black text-primary-600 shadow-sm">
                {{ dynamicProgress }}%
            </div>
        </div>

        <div class="flex flex-col gap-2 pointer-events-none">
            <div v-if="adventure.category" class="text-sm font-black text-primary-600 uppercase tracking-widest">{{
                adventure.category }}</div>
            <h3 class="text-2xl font-black text-toned leading-tight">{{ adventure.title }}</h3>
            <p class="text-muted font-medium leading-snug">{{ adventure.description }}</p>
        </div>

        <div class="flex flex-col gap-2">
            <div class="h-4 bg-primary-100 rounded-full overflow-hidden p-1 shadow-inner pointer-events-none">
                <div class="h-full rounded-full transition-all duration-1000" :class="adventure.color"
                    :style="{ width: `${dynamicProgress}%` }" />
            </div>
            <UButton
                :to="dynamicProgress > 0 && currentLesson ? `/lessons/${currentLesson.slug}` : `/adventures/${adventure.slug}`"
                :label="dynamicProgress > 0 ? 'Continue →' : 'Start Lessons →'" size="lg" block
                class="mt-2 font-black rounded-xl hover:translate-x-1 transition-transform"
                :color="adventure.color === 'bg-indigo-500' ? 'primary' : 'neutral'" />

            <!-- <UButton :to="`/adventures/${adventure.slug}`" label="Continue →" size="lg" block
                class="mt-2 font-black rounded-xl hover:translate-x-1 transition-transform"
                :color="adventure.color === 'bg-indigo-500' ? 'primary' : 'neutral'" /> -->
        </div>
    </UCard>
</template>
