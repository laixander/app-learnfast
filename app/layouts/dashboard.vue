<script setup lang="ts">
const route = useRoute()
const { isScrolled } = useStickyHeader()

const navLinks = [
    { label: 'Home', to: '/', icon: 'i-ph-house-duotone', color: 'primary', match: ['/'] },
    { label: 'Dashboard', to: '/dashboard', icon: 'i-ph-layout-duotone', color: 'secondary', match: ['/dashboard'] },
    { label: 'Adventures', to: '/adventures', icon: 'i-ph-mountains-duotone', color: 'success', match: ['/adventures', '/lessons'] },
    { label: 'Shop', to: '/shop', icon: 'i-ph-storefront-duotone', color: 'info', match: ['/shop'] }
] as const

const isNavActive = (link: typeof navLinks[number]) => {
    // Exact match for Home to avoid matching everything
    if (link.to === '/') return route.path === '/'
    return link.match.some(prefix => route.path.startsWith(prefix))
}

const fabOpen = ref(false)

const { seedData, clearData } = useUserStore()

const fabActions = [
    {
        label: 'DevDocs',
        icon: 'i-ph-book-duotone',
        color: 'bg-amber-500 hover:bg-amber-600',
        onClick: () => { navigateTo('/dev'); fabOpen.value = false }
    },
    {
        label: 'Seed Data',
        icon: 'i-ph-database-duotone',
        color: 'bg-emerald-500 hover:bg-emerald-600',
        onClick: () => { seedData(); fabOpen.value = false }
    },
    {
        label: 'Clear Data',
        icon: 'i-ph-trash-duotone',
        color: 'bg-rose-500 hover:bg-rose-600',
        onClick: () => { clearData(); fabOpen.value = false }
    }
]
</script>

<template>
    <div class="flex flex-col min-h-screen relative bg-linear-to-b from-purple-200 to-yellow-50">
        <BgDecorations />
        <UHeader :ui="{
            root: [
                'backdrop-blur-none bg-transparent border-b-0 fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-none w-full max-w-(--ui-container) mx-auto px-8 h-auto',
                isScrolled ? 'pt-4' : 'pt-0'
            ].join(' '),
            container: [
                'transition-all duration-500 flex items-center pointer-events-auto',
                isScrolled
                    ? 'bg-white/70 backdrop-blur-2xl shadow-2xl shadow-primary-600/40 p-6 rounded-lg ring-4 ring-white'
                    : 'bg-transparent p-4 rounded-sm ring-4 ring-white/0'
            ].join(' ')
        }">
            <template #left>
                <NuxtLink to="/" class="flex items-center gap-2 group">
                    <AppLogo class="h-10 w-auto shrink-0 transition-all duration-500 group-hover:scale-110" />
                    <span
                        class="text-primary-600 font-black tracking-tight text-xl ml-2 transition-all duration-500">LearnFast!</span>
                </NuxtLink>
            </template>


            <div class="hidden md:flex items-center gap-4">
                <UButton v-for="link in navLinks" :key="link.to" :to="link.to" :label="link.label" :icon="link.icon"
                    :variant="isNavActive(link) ? 'solid' : 'ghost'" :color="link.color"
                    class="font-black rounded-xl px-5 py-2.5 transition-all duration-300" :class="[
                        isNavActive(link)
                            ? 'shadow-lg shadow-primary-500/20 scale-105'
                            : 'hover:scale-105 active:scale-95'
                    ]" />
            </div>

            <template #right>
                <div class="flex items-center gap-3">
                    <UButton to="/notifications" icon="i-ph-bell-duotone" variant="ghost" color="neutral"
                        class="rounded-full" />
                    <NuxtLink to="/profile">
                        <UAvatar src="https://api.dicebear.com/9.x/thumbs/svg?seed=Felix" alt="User" size="sm"
                            class="ring-2 ring-primary-500 shadow-lg cursor-pointer transition-transform hover:scale-110" />
                    </NuxtLink>
                </div>
            </template>
        </UHeader>

        <UMain class="flex flex-col flex-1 pt-24 pb-12">
            <UContainer>
                <slot />
            </UContainer>
        </UMain>

        <!-- FAB Menu -->
        <div class="fixed bottom-8 right-8 z-50">
            <!-- Backdrop -->
            <Transition name="fab-backdrop">
                <div v-if="fabOpen" class="fixed inset-0 bg-black/10 backdrop-blur-[2px] -z-10"
                    @click="fabOpen = false" />
            </Transition>

            <!-- Action Items — absolutely positioned above the main button -->
            <div class="absolute bottom-20 right-0 flex flex-col items-end gap-3">
                <TransitionGroup name="fab-item" tag="div" class="flex flex-col items-end gap-3">
                    <div v-if="fabOpen" v-for="(action, i) in fabActions" :key="action.label"
                        class="flex items-center gap-3" :style="{ transitionDelay: `${i * 60}ms` }">
                        <!-- Label Pill -->
                        <span
                            class="bg-white text-neutral-800 font-black text-sm px-4 py-2 rounded-full shadow-xl ring-2 ring-white/80 whitespace-nowrap">
                            {{ action.label }}
                        </span>
                        <!-- Action Button -->
                        <button @click="action.onClick"
                            :class="[action.color, 'size-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 text-white']">
                            <UIcon :name="action.icon" class="size-6" />
                        </button>
                    </div>
                </TransitionGroup>
            </div>

            <!-- Main FAB Toggle -->
            <button @click="fabOpen = !fabOpen"
                class="size-16 rounded-full bg-linear-to-br from-primary-500 to-violet-600 shadow-2xl shadow-primary-500/40 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95 ring-4 ring-white"
                :class="fabOpen ? 'rotate-45 shadow-violet-600/50' : ''">
                <UIcon name="i-ph-plus-bold" class="size-7 transition-transform duration-300" />
            </button>
        </div>

        <UFooter class="mt-auto py-8">
            <template #left>
                <span class="text-sm text-muted font-medium">© {{ new Date().getFullYear() }} LearnFast!
                    Adventures</span>
            </template>
            <template #right>
                <div class="flex gap-4">
                    <UButton to="/help" icon="i-ph-question-duotone" variant="ghost" color="neutral" />
                    <UButton to="/settings" icon="i-ph-gear-duotone" variant="ghost" color="neutral" />
                </div>
            </template>
        </UFooter>
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
