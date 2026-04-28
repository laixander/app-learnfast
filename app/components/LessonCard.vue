<script setup lang="ts">
import type { Lesson } from '~/composables/useLessons'

defineProps<{
    lesson: Lesson
}>()
</script>

<template>
    <UCard
        class="group transition-all duration-500 rounded-[2.5rem] border-0 shadow-xl overflow-hidden relative"
        :class="[
            lesson.status === 'locked' ? 'opacity-70 grayscale-[0.5] pointer-events-none' : 'hover:ring-4 hover:ring-primary-500/30 cursor-pointer',
            lesson.status === 'current' ? 'ring-2 ring-primary-400 shadow-primary-500/20' : ''
        ]"
        :ui="{ body: 'p-8 flex flex-col gap-4 h-full relative z-10' }">
        
        <div class="flex items-start justify-between">
            <div
                :class="[lesson.status === 'locked' ? 'bg-slate-300' : lesson.color, 'p-4 rounded-2xl shadow-lg transition-all duration-500', lesson.status !== 'locked' && 'group-hover:scale-110 group-hover:rotate-6']">
                <UIcon :name="lesson.status === 'locked' ? 'i-ph-lock-simple-fill' : lesson.icon" :class="[lesson.status === 'locked' ? 'text-slate-500' : 'text-white', 'size-8 flex']" />
            </div>
            <div class="flex flex-col items-end gap-1">
                <div class="bg-primary-50 text-primary-600 px-4 py-1 rounded-full font-black text-sm shadow-sm">
                    {{ lesson.xp }} XP
                </div>
                <UBadge v-if="lesson.status === 'completed'" color="success" variant="subtle" class="font-bold text-[10px] px-2 rounded-md uppercase">
                    <UIcon name="i-ph-check-circle-bold" class="mr-1" /> Completed
                </UBadge>
                <UBadge v-else-if="lesson.status === 'current'" color="primary" variant="solid" class="font-bold text-[10px] px-2 rounded-md uppercase shadow-sm">
                    <UIcon name="i-ph-star-fill" class="mr-1" /> Up Next
                </UBadge>
            </div>
        </div>
        <div class="flex flex-col gap-1 mt-2">
            <div class="text-sm font-bold text-primary-600 uppercase tracking-widest">{{ lesson.category }}</div>
            <h3 class="text-2xl font-black text-toned leading-tight">{{ lesson.title }}</h3>
        </div>
        <div class="flex items-center gap-2 mt-auto pt-4">
            <UBadge variant="subtle" color="neutral" class="font-bold px-3 rounded-lg">{{ lesson.level }}</UBadge>
        </div>
        <UButton 
            :to="lesson.status !== 'locked' ? `/lessons/${lesson.slug}` : undefined" 
            :label="lesson.status === 'completed' ? 'Review Lesson' : (lesson.status === 'locked' ? 'Locked' : 'Start Lesson')" 
            block 
            :color="lesson.status === 'completed' ? 'neutral' : (lesson.status === 'locked' ? 'gray' : 'primary')"
            :variant="lesson.status === 'completed' ? 'subtle' : 'solid'"
            class="mt-4 font-black rounded-xl py-3 transition-all" 
            :class="lesson.status !== 'locked' && 'shadow-lg hover:shadow-primary-500/20 hover:scale-[1.02]'"
            :disabled="lesson.status === 'locked'" />
    </UCard>
</template>
