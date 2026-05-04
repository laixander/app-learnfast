<script setup lang="ts">
interface FabAction {
    label: string
    icon: string
    color: string
    onClick: () => void
}

const props = defineProps<{
    actions: FabAction[]
    icon: string
    color: string
    position?: 'left' | 'right'
}>()

const isOpen = ref(false)
const position = props.position || 'left'

const toggle = () => isOpen.value = !isOpen.value
const close = () => isOpen.value = false
</script>

<template>
    <div class="fixed bottom-8 z-50 transition-all duration-300" :class="[
        position === 'left' ? 'left-8' : 'right-8'
    ]">
        <!-- Backdrop -->
        <Transition name="fab-backdrop">
            <div v-if="isOpen" class="fixed inset-0 bg-black/10 backdrop-blur-[2px] -z-10" @click="close" />
        </Transition>

        <!-- Actions Menu -->
        <div class="absolute bottom-20 flex flex-col gap-3" :class="[
            position === 'left' ? 'left-0 items-start' : 'right-0 items-end'
        ]">
            <TransitionGroup name="fab-item" tag="div" class="flex flex-col gap-3" :class="[
                position === 'left' ? 'items-start' : 'items-end'
            ]">
                <div v-if="isOpen" v-for="(action, i) in actions" :key="action.label"
                    class="flex items-center gap-3" :style="{ transitionDelay: `${i * 60}ms` }">
                    
                    <!-- Label for Right Position -->
                    <span v-if="position === 'right'"
                        class="bg-white text-neutral-800 font-black text-sm px-4 py-2 rounded-full shadow-xl ring-2 ring-white/80 whitespace-nowrap">
                        {{ action.label }}
                    </span>

                    <!-- Action Button -->
                    <button @click="action.onClick(); close()"
                        :class="[action.color, 'size-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 text-white']">
                        <UIcon :name="action.icon" class="size-6" />
                    </button>

                    <!-- Label for Left Position -->
                    <span v-if="position === 'left'"
                        class="bg-white text-neutral-800 font-black text-sm px-4 py-2 rounded-full shadow-xl ring-2 ring-white/80 whitespace-nowrap">
                        {{ action.label }}
                    </span>
                </div>
            </TransitionGroup>
        </div>

        <!-- Main Toggle Button -->
        <button @click="toggle"
            class="size-16 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95 ring-4 ring-white"
            :class="[
                color,
                isOpen ? 'rotate-45' : ''
            ]">
            <UIcon :name="icon" class="size-7 transition-transform duration-300" />
        </button>
    </div>
</template>

<style scoped>
/* FAB item enter/leave transitions */
.fab-item-enter-active,
.fab-item-leave-active {
    transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fab-item-enter-from,
.fab-item-leave-to {
    opacity: 0;
    transform: translateY(16px) scale(0.8);
}

/* Backdrop fade */
.fab-backdrop-enter-active,
.fab-backdrop-leave-active {
    transition: opacity 0.2s ease;
}

.fab-backdrop-enter-from,
.fab-backdrop-leave-to {
    opacity: 0;
}
</style>
