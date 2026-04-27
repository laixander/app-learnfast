<script setup lang="ts">
const props = withDefaults(defineProps<{
    icon?: string
    title?: string
    message?: string
    color?: string
}>(), {
    icon: 'i-ph-magnifying-glass-duotone',
    title: 'Nothing Here Yet!',
    message: 'Seed the data using the + button to get started.',
    color: 'violet'
})

const colorMap: Record<string, { bg: string; icon: string; pill: string; glow: string; blob1: string; blob2: string }> = {
    violet: { bg: 'from-violet-100 to-purple-50', icon: 'text-violet-500', pill: 'bg-violet-100 text-violet-700', glow: 'bg-violet-300', blob1: 'bg-violet-200', blob2: 'bg-purple-200' },
    pink: { bg: 'from-pink-100 to-rose-50', icon: 'text-pink-500', pill: 'bg-pink-100 text-pink-700', glow: 'bg-pink-300', blob1: 'bg-pink-200', blob2: 'bg-rose-200' },
    amber: { bg: 'from-amber-100 to-yellow-50', icon: 'text-amber-500', pill: 'bg-amber-100 text-amber-700', glow: 'bg-amber-300', blob1: 'bg-amber-200', blob2: 'bg-yellow-200' },
    cyan: { bg: 'from-cyan-100 to-blue-50', icon: 'text-cyan-500', pill: 'bg-cyan-100 text-cyan-700', glow: 'bg-cyan-300', blob1: 'bg-cyan-200', blob2: 'bg-blue-200' },
    emerald: { bg: 'from-emerald-100 to-green-50', icon: 'text-emerald-500', pill: 'bg-emerald-100 text-emerald-700', glow: 'bg-emerald-300', blob1: 'bg-emerald-200', blob2: 'bg-green-200' },
    indigo: { bg: 'from-indigo-100 to-blue-50', icon: 'text-indigo-500', pill: 'bg-indigo-100 text-indigo-700', glow: 'bg-indigo-300', blob1: 'bg-indigo-200', blob2: 'bg-blue-200' }
}

// Guaranteed non-undefined — falls back to violet if an unknown color is passed
const theme = computed(() => colorMap[props.color] ?? colorMap.violet!)
</script>

<template>
    <div :class="`bg-linear-to-br ${theme.bg} rounded-[3rem] border-4 border-white/80 shadow-2xl overflow-hidden relative`">
        <!-- Decorative blobs -->
        <div :class="`absolute -top-16 -left-16 size-48 ${theme.blob1} rounded-full blur-3xl opacity-60`" />
        <div :class="`absolute -bottom-16 -right-16 size-64 ${theme.blob2} rounded-full blur-3xl opacity-50`" />

        <div class="relative z-10 flex flex-col items-center text-center py-16 px-8 gap-6">
            <!-- Animated icon container -->
            <div class="relative">
                <div :class="`absolute inset-0 ${theme.glow} rounded-full blur-2xl opacity-40 animate-pulse scale-150`" />
                <div class="relative bg-white/80 backdrop-blur-sm p-8 rounded-[2rem] shadow-xl ring-4 ring-white animate-bounce-slow">
                    <UIcon :name="icon" :class="`size-16 ${theme.icon}`" />
                </div>
            </div>

            <!-- Stars decoration -->
            <div class="flex gap-2">
                <UIcon v-for="i in 5" :key="i" name="i-ph-star-fill"
                    :class="`size-4 ${theme.icon} opacity-${i % 2 === 0 ? '40' : '70'}`" />
            </div>

            <!-- Text -->
            <div class="flex flex-col gap-2 max-w-sm">
                <h3 class="text-3xl font-black text-neutral-800">{{ title }}</h3>
                <p class="text-neutral-500 font-medium text-lg leading-relaxed">{{ message }}</p>
            </div>

            <!-- Hint pill -->
            <div :class="`${theme.pill} px-6 py-3 rounded-full font-black text-sm flex items-center gap-2 shadow-sm`">
                <UIcon name="i-ph-plus-circle-duotone" class="size-5" />
                Press the + button to seed data
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes bounce-slow {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}
.animate-bounce-slow {
    animation: bounce-slow 3s ease-in-out infinite;
}
</style>
