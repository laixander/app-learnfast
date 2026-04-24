<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const { lessons } = useLessons()
</script>

<template>
  <BgDecorations />

  <div class="relative z-10 flex flex-col gap-8">
    <header class="flex flex-col gap-2">
      <h1 class="text-4xl md:text-6xl font-black text-toned">
        My <span class="text-primary-600">Lessons</span>
      </h1>
      <p class="text-xl text-muted font-medium">Pick up where you left off, Explorer!</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard v-for="lesson in lessons" :key="lesson.slug"
        class="group hover:ring-4 hover:ring-primary-500/30 transition-all duration-500 rounded-[2.5rem] border-0 shadow-xl overflow-hidden"
        :ui="{ body: 'p-8 flex flex-col gap-4' }">
        <div class="flex items-start justify-between">
          <div
            :class="[lesson.color, 'p-4 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500']">
            <UIcon :name="lesson.icon" class="text-white size-8 flex" />
          </div>
          <div class="bg-primary-50 text-primary-600 px-4 py-1 rounded-full font-black text-sm">
            {{ lesson.xp }} XP
          </div>
        </div>
        <div>
          <div class="text-sm font-bold text-primary-600 uppercase tracking-widest">{{ lesson.category }}</div>
          <h3 class="text-2xl font-black text-toned">{{ lesson.title }}</h3>
        </div>
        <div class="flex items-center gap-2 mt-2">
          <UBadge variant="subtle" color="neutral">{{ lesson.level }}</UBadge>
        </div>
        <UButton :to="`/lessons/${lesson.slug}`" label="Start Lesson" block color="primary"
          class="mt-4 font-black rounded-xl" />
      </UCard>
    </div>
  </div>
</template>
