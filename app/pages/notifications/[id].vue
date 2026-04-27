<script setup lang="ts">
import { DEFAULT_NOTIFICATIONS } from '~/constants/gameData'

definePageMeta({
    layout: 'dashboard'
})

const route = useRoute()
const { isSeeded, notifications, markNoteRead } = useUserStore()

const note = computed(() => {
    return notifications.value.find(n => n.id === Number(route.params.id))
})

// Mark as read when viewed
onMounted(() => {
    if (note.value) markNoteRead(note.value.id)
})

// Redirect if data is cleared or not found
watch([isSeeded, note], ([seeded, currentNote]) => {
    if (!seeded) navigateTo('/notifications')
}, { immediate: true })

onMounted(() => {
    if (note.value) {
        markNoteRead(note.value.id)
    } else if (isSeeded.value) {
        navigateTo('/notifications')
    }
})
</script>

<template>
    <div v-if="note" class="relative max-w-3xl mx-auto">
        <div class="relative z-10 flex flex-col gap-10">
            <!-- Back Button -->
            <UButton to="/notifications" icon="i-ph-arrow-left-bold" label="Back to Updates" variant="ghost"
                color="neutral"
                class="self-start font-black text-lg hover:bg-primary-100 hover:text-primary-600 rounded-2xl px-6" />

            <div class="bg-white/40 backdrop-blur-xl p-10 md:p-16 rounded-[3.5rem] border-4 border-white shadow-2xl flex flex-col gap-10 items-center text-center">
                <div :class="[note.bg, 'p-10 rounded-[3rem] shadow-2xl animate-float']">
                    <UIcon :name="note.icon" :class="[note.color, 'size-24 md:size-32 flex']" />
                </div>

                <div class="flex flex-col gap-4">
                    <div class="text-sm font-bold text-primary-600 uppercase tracking-widest">{{ note.time }}</div>
                    <h1 class="text-4xl md:text-5xl font-black text-toned leading-tight">{{ note.title }}</h1>
                    <p class="text-2xl text-muted font-medium leading-relaxed max-w-2xl mt-4">
                        {{ note.fullMessage }}
                    </p>
                </div>

                <div class="flex items-center gap-4 mt-6">
                    <UButton to="/notifications" label="Got it, thanks!" color="primary" size="xl"
                        class="font-black px-12 py-4 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all" />
                </div>
            </div>
        </div>

        <!-- Background Decoration -->
        <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div class="absolute top-1/4 -right-20 size-96 bg-primary-200/20 rounded-full blur-3xl animate-pulse" />
            <div class="absolute bottom-1/4 -left-20 size-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse"
                style="animation-delay: 2s" />
        </div>
    </div>
</template>

<style scoped>
@keyframes float {
    0%, 100% { transform: translateY(0) rotate(0); }
    50% { transform: translateY(-20px) rotate(2deg); }
}
.animate-float {
    animation: float 5s ease-in-out infinite;
}
</style>
