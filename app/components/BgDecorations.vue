<script setup lang="ts">
import { useMouse, useWindowSize, useMounted } from '@vueuse/core'

const { x, y } = useMouse()
const { width, height } = useWindowSize()
const isMounted = useMounted()

const backgroundIcons = [
    { name: 'i-ph-star-duotone', top: '5%', left: '10%', size: 'size-20', color: 'text-yellow-400/15', rotate: '-rotate-12', depth: 0.2 },
    { name: 'i-ph-planet-duotone', top: '75%', left: '80%', size: 'size-32', color: 'text-purple-400/15', rotate: 'rotate-12', depth: 0.4 },
    { name: 'i-ph-atom-duotone', top: '15%', left: '85%', size: 'size-24', color: 'text-blue-400/15', rotate: 'rotate-45', depth: 0.25 },
    { name: 'i-ph-pencil-circle-duotone', top: '80%', left: '15%', size: 'size-28', color: 'text-orange-400/15', rotate: '-rotate-12', depth: 0.35 },
    { name: 'i-ph-rocket-launch-duotone', top: '10%', left: '70%', size: 'size-24', color: 'text-blue-500/15', rotate: '-rotate-45', depth: 0.15 },
    { name: 'i-ph-graduation-cap-duotone', top: '65%', left: '5%', size: 'size-20', color: 'text-pink-400/15', rotate: 'rotate-12', depth: 0.2 },
    { name: 'i-ph-book-open-duotone', top: '40%', left: '20%', size: 'size-28', color: 'text-green-400/15', rotate: '-rotate-12', depth: 0.3 },
    { name: 'i-ph-heart-duotone', top: '20%', left: '30%', size: 'size-12', color: 'text-red-400/15', rotate: 'rotate-12', depth: 0.1 },
    { name: 'i-ph-palette-duotone', top: '85%', left: '40%', size: 'size-16', color: 'text-yellow-500/15', rotate: '-rotate-12', depth: 0.25 },
    { name: 'i-ph-balloon-duotone', top: '30%', left: '90%', size: 'size-28', color: 'text-pink-500/15', rotate: 'rotate-12', depth: 0.45 },
    { name: 'i-ph-confetti-duotone', top: '55%', left: '92%', size: 'size-20', color: 'text-orange-500/15', rotate: '-rotate-12', depth: 0.2 },
    { name: 'i-ph-bicycle-duotone', top: '50%', left: '5%', size: 'size-16', color: 'text-purple-500/15', rotate: 'rotate-45', depth: 0.15 },
    { name: 'i-ph-brain-duotone', top: '85%', left: '65%', size: 'size-24', color: 'text-indigo-400/15', rotate: '-rotate-12', depth: 0.3 },
    { name: 'i-ph-lightbulb-duotone', top: '5%', left: '40%', size: 'size-16', color: 'text-yellow-600/15', rotate: 'rotate-12', depth: 0.1 },
    { name: 'i-ph-music-notes-duotone', top: '10%', left: '92%', size: 'size-20', color: 'text-cyan-400/15', rotate: '-rotate-45', depth: 0.25 },
    { name: 'i-ph-camera-duotone', top: '40%', left: '75%', size: 'size-14', color: 'text-teal-400/15', rotate: 'rotate-12', depth: 0.2 },
    { name: 'i-ph-sketch-logo-duotone', top: '60%', left: '30%', size: 'size-14', color: 'text-blue-300/15', rotate: '-rotate-45', depth: 0.15 },
    { name: 'i-ph-flying-saucer-duotone', top: '90%', left: '90%', size: 'size-24', color: 'text-emerald-400/15', rotate: 'rotate-12', depth: 0.5 },
    { name: 'i-ph-magic-wand-duotone', top: '25%', left: '5%', size: 'size-20', color: 'text-violet-400/15', rotate: '-rotate-12', depth: 0.2 },
    { name: 'i-ph-microscope-duotone', top: '70%', left: '90%', size: 'size-20', color: 'text-lime-400/15', rotate: 'rotate-12', depth: 0.35 }
]

const getParallaxStyle = (depth: number) => {
    // If not mounted or window size is invalid, return default style to prevent hydration mismatch
    if (!isMounted.value || !isFinite(width.value) || !isFinite(height.value)) {
        return {
            transform: 'translate3d(0, 0, 0)',
            transition: 'transform 0.15s ease-out'
        }
    }

    // Center the offset calculation
    const offsetX = (x.value - width.value / 2) * depth * 0.05
    const offsetY = (y.value - height.value / 2) * depth * 0.05

    // Double check for finite values before returning
    const safeX = isFinite(offsetX) ? offsetX : 0
    const safeY = isFinite(offsetY) ? offsetY : 0

    return {
        transform: `translate3d(${safeX}px, ${safeY}px, 0)`,
        transition: 'transform 0.15s ease-out'
    }
}
</script>

<template>
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <UIcon
            v-for="(icon, index) in backgroundIcons"
            :key="index"
            :name="icon.name"
            class="absolute opacity-80"
            :class="[icon.size, icon.color, icon.rotate]"
            :style="{
                top: icon.top,
                left: icon.left,
                ...getParallaxStyle(icon.depth)
            }"
        />
    </div>
</template>
