<script setup lang="ts">
definePageMeta({
    layout: 'dashboard'
})

const notifications = [
    { id: 1, title: 'Quest Complete!', message: 'You earned 50 XP for completing a Math lesson.', time: '2 mins ago', icon: 'i-ph-check-circle-duotone', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 2, title: 'New Badge!', message: 'Congratulations! You unlocked the "Early Bird" badge.', time: '1 hour ago', icon: 'i-ph-medal-duotone', color: 'text-pink-500', bg: 'bg-pink-50' },
    { id: 3, title: 'Friend Request', message: 'Anika.Dev sent you a friend request.', time: '3 hours ago', icon: 'i-ph-user-plus-duotone', color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { id: 4, title: 'Daily Streak!', message: 'Keep it up! You are on a 5-day streak.', time: 'Yesterday', icon: 'i-ph-fire-duotone', color: 'text-orange-500', bg: 'bg-orange-50' }
]
</script>

<template>
    <BgDecorations />

    <div class="relative z-10 flex flex-col gap-8 max-w-3xl mx-auto">
        <header class="flex flex-col gap-2">
            <h1 class="text-4xl md:text-6xl font-black text-toned">
                News & <span class="text-primary-600">Updates</span>
            </h1>
            <p class="text-xl text-muted font-medium">See what's happening in your adventure!</p>
        </header>

        <div class="flex flex-col gap-4">
            <div v-for="note in notifications" :key="note.id"
                class="group flex items-center gap-6 bg-white/60 backdrop-blur-md p-6 rounded-[2.5rem] border-2 border-white shadow-xl hover:-translate-x-2 transition-all duration-300">
                <div
                    :class="[note.bg, 'p-4 rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-500']">
                    <UIcon :name="note.icon" :class="[note.color, 'size-10 flex']" />
                </div>
                <div class="flex-1">
                    <h3 class="text-xl font-black text-toned">{{ note.title }}</h3>
                    <p class="text-muted font-medium">{{ note.message }}</p>
                    <span class="text-sm font-bold text-primary-400 mt-1 block">{{ note.time }}</span>
                </div>
                <UButton icon="i-ph-dots-three-outline-vertical-fill" variant="ghost" color="neutral"
                    class="rounded-full" />
            </div>
        </div>

        <UButton label="Clear All Notifications" variant="subtle" color="primary" class="font-bold py-4 rounded-2xl" />
    </div>
</template>
