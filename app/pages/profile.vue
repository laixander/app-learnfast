<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const stats = [
  { label: 'Total XP', value: '15.4k', icon: 'i-ph-lightning-duotone', color: 'text-yellow-500' },
  { label: 'Lessons Done', value: '42', icon: 'i-ph-book-open-duotone', color: 'text-emerald-500' },
  { label: 'Badges', value: '12', icon: 'i-ph-medal-duotone', color: 'text-pink-500' },
  { label: 'Friends', value: '8', icon: 'i-ph-users-duotone', color: 'text-indigo-500' }
]

const recentBadges = [
  { name: 'Fast Learner', icon: 'i-ph-rocket-launch-duotone', color: 'bg-indigo-500' },
  { name: 'Math Genius', icon: 'i-ph-calculator-duotone', color: 'bg-emerald-500' },
  { name: 'Book Worm', icon: 'i-ph-book-duotone', color: 'bg-rose-500' }
]
</script>

<template>
  <BgDecorations />

  <div class="relative z-10 flex flex-col gap-10 max-w-4xl mx-auto">
    <!-- Profile Header -->
    <div
      class="flex flex-col items-center text-center gap-6 bg-white/40 backdrop-blur-xl p-10 rounded-[3rem] border-4 border-white shadow-2xl">
      <div class="relative">
        <div
          class="absolute -inset-4 bg-linear-to-r from-primary-400 to-pink-400 rounded-full blur-xl opacity-50 animate-pulse" />
        <UAvatar src="https://api.dicebear.com/9.x/thumbs/svg?seed=Felix" alt="User" size="xl"
          class="relative ring-8 ring-white size-32 md:size-40 shadow-2xl" />
        <div
          class="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 font-black px-6 py-2 rounded-full text-xl shadow-lg border-4 border-white transform rotate-6">
          LVL 12
        </div>
      </div>
      <div>
        <h1 class="text-4xl md:text-5xl font-black text-toned">Explorer Felix</h1>
        <p class="text-xl text-muted font-medium mt-1">Master of Space and Math</p>
      </div>
      <div class="flex gap-4">
        <UButton label="Edit Profile" icon="i-ph-pencil-duotone" variant="solid" color="primary"
          class="font-bold px-8 py-3 rounded-2xl" />
        <UButton icon="i-ph-share-network-duotone" variant="subtle" color="primary" class="rounded-2xl px-4" />
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div v-for="stat in stats" :key="stat.label"
        class="bg-white/60 backdrop-blur-md p-6 rounded-[2.5rem] border-2 border-white flex flex-col items-center gap-2 shadow-lg">
        <UIcon :name="stat.icon" :class="[stat.color, 'size-10']" />
        <span class="text-3xl font-black text-toned leading-none">{{ stat.value }}</span>
        <span class="text-xs font-bold text-muted uppercase tracking-widest">{{ stat.label }}</span>
      </div>
    </div>

    <!-- Badges Section -->
    <div class="bg-white/60 backdrop-blur-md p-8 rounded-[3rem] border-2 border-white shadow-xl">
      <h2 class="text-2xl font-black text-toned mb-6 flex items-center gap-3">
        <UIcon name="i-ph-medal-duotone" class="text-pink-500" />
        Recent Badges
      </h2>
      <div class="flex flex-wrap gap-6 justify-center">
        <div v-for="badge in recentBadges" :key="badge.name" class="flex flex-col items-center gap-3 group">
          <div
            :class="[badge.color, 'p-6 rounded-3xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500']">
            <UIcon :name="badge.icon" class="text-white size-12 flex" />
          </div>
          <span class="font-black text-toned">{{ badge.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
