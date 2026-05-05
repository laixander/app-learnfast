<script setup lang="ts">
import { useMouseInElement } from '@vueuse/core'

const { user, seedData, clearData, isSyncing } = useUserStore()
const { seedDefaults: seedCategories, isLoading: isCategoryLoading } = useCategories()
const route = useRoute()

const devActions = computed(() => [
    {
        label: 'Dashboard',
        icon: 'i-ph-layout-duotone',
        color: 'bg-indigo-600 hover:bg-indigo-700',
        onClick: () => navigateTo('/dashboard')
    },
    {
        label: 'DevDocs',
        icon: 'i-ph-book-duotone',
        color: 'bg-amber-500 hover:bg-amber-600',
        onClick: () => navigateTo('/dev')
    },
    {
        label: 'Seed All Data',
        icon: 'i-ph-database-duotone',
        color: 'bg-emerald-500 hover:bg-emerald-600',
        loading: isSyncing.value || isCategoryLoading.value,
        onClick: () => { seedData(); seedCategories() }
    },
    {
        label: 'Clear Data',
        icon: 'i-ph-trash-duotone',
        color: 'bg-rose-500 hover:bg-rose-600',
        loading: isSyncing.value,
        onClick: () => clearData()
    }
])

const adminLinks = [
    { label: 'Overview', icon: 'i-ph-chart-pie-slice-duotone', to: '/admin', color: 'primary' },
    { label: 'Users', icon: 'i-ph-users-duotone', to: '/admin/users', color: 'secondary' },
    { label: 'Content', icon: 'i-ph-books-duotone', to: '/admin/content', color: 'success' },
    { label: 'Shop', icon: 'i-ph-storefront-duotone', to: '/admin/shop', color: 'info' },
    // { label: 'Quests', icon: 'i-ph-scroll-duotone', to: '/admin/quests', color: 'warning' },
    { label: 'System Logs', icon: 'i-ph-terminal-window-duotone', to: '/admin/logs', color: 'error' }
] as const

const activeLink = computed(() => adminLinks.find(l => l.to === route.path) || adminLinks[0])
const isSidebarCollapsed = ref(false)

const sidebarRef = ref(null)
const { elementX, elementY } = useMouseInElement(sidebarRef)
</script>

<template>
    <div class="h-screen bg-primary-50 flex overflow-hidden font-sour-gummy">
        <BgDecorations />

        <!-- Sidebar Wrapper for Inset Float -->
        <div class="hidden lg:flex flex-col p-4 shrink-0 z-20 sticky top-0 h-screen">
            <aside ref="sidebarRef"
                class="group relative flex-1 flex flex-col bg-slate-900 rounded-md shadow-2xl shadow-slate-900/20 overflow-hidden border border-slate-800 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                :class="isSidebarCollapsed ? 'w-[5.5rem]' : 'w-64'">

                <!-- Spotlight Effect -->
                <div class="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    :style="{
                        background: `radial-gradient(400px circle at ${elementX}px ${elementY}px, rgba(99, 102, 241, 0.3), transparent 60%)`
                    }" />

                <div class="relative z-10 p-8 pb-4 flex items-center gap-3 transition-all duration-300"
                    :class="isSidebarCollapsed ? 'justify-center px-4' : ''">
                    <AppLogo class="h-8 w-auto shrink-0" />
                    <span v-show="!isSidebarCollapsed"
                        class="text-2xl font-black text-white tracking-tight shrink-0">Admin<span
                            class="text-amber-500">!</span></span>
                </div>

                <nav class="relative z-10 flex-1 px-4 space-y-2 mt-4">
                    <UButton v-for="link in adminLinks" :key="link.to" :to="link.to" :icon="link.icon"
                        :label="isSidebarCollapsed ? undefined : link.label" variant="ghost"
                        :color="route.path === link.to ? link.color : 'neutral'"
                        class="w-full font-bold rounded-2xl py-3 transition-all duration-200 active:bg-elevated/20 shrink-0"
                        :class="[
                            isSidebarCollapsed ? 'justify-center px-0' : 'justify-start',
                            route.path === link.to
                                ? [`bg-${link.color}-500/20 shadow-sm`, !isSidebarCollapsed && 'translate-x-1']
                                : ['text-slate-400 hover:text-white hover:bg-white/5', !isSidebarCollapsed && 'hover:translate-x-1']
                        ]" :title="isSidebarCollapsed ? link.label : undefined" />
                </nav>

                <!-- add name and role here -->
                <div class="relative z-10 py-4 border-t border-white/10 bg-white/5 mt-auto transition-all duration-300"
                    :class="isSidebarCollapsed ? 'px-0 flex justify-center' : 'px-6'">
                    <div class="flex items-center" :class="isSidebarCollapsed ? 'justify-center' : 'gap-4'">
                        <UAvatar :src="`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.avatar}`" alt="Admin"
                            size="md"
                            class="ring-2 ring-white shadow-lg shadow-slate-200 cursor-pointer transition-transform hover:scale-110 shrink-0" />
                        <div v-show="!isSidebarCollapsed" class="flex flex-col overflow-hidden">
                            <p class="text-sm font-black text-white truncate">{{ user.name }}</p>
                            <p class="text-[10px] font-black text-red-500 uppercase tracking-widest truncate">{{
                                user.role }}</p>
                        </div>
                    </div>
                </div>

                <!-- <div class="p-6 border-t border-white/10 bg-white/5 mt-auto">
                    <UButton to="/dashboard" icon="i-ph-arrow-square-out-duotone" label="Back to App" variant="ghost"
                        color="neutral" class="w-full justify-start font-bold rounded-xl px-4 text-slate-400 hover:text-white hover:bg-white/10" />
                </div> -->
            </aside>
        </div>

        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col min-w-0 overflow-auto relative z-10">
            <!-- Header -->
            <header class="h-20 flex items-center justify-between px-8 shrink-0 sticky top-0 z-30">
                <!-- Mobile Logo -->
                <div class="lg:hidden flex items-center gap-2">
                    <AppLogo class="h-8 w-auto" />
                    <span class="font-black text-slate-800">Admin!</span>
                </div>

                <!-- add button to toggle sidebar into icon only -->
                <div class="hidden lg:flex items-center gap-2">
                    <UButton icon="i-ph-list-duotone" variant="ghost" color="neutral"
                        class="rounded-full p-2 transition-transform duration-300"
                        :class="isSidebarCollapsed ? '' : '-scale-x-100'"
                        @click="isSidebarCollapsed = !isSidebarCollapsed" />
                </div>

                <div class="hidden lg:flex items-center gap-2">
                    <div
                        :class="`size-2 rounded-full bg-${activeLink.color}-500 shadow-lg shadow-${activeLink.color}-500/50`" />
                    <h1 class="text-slate-500 font-black uppercase tracking-[0.2em]">
                        {{ activeLink.label }}
                    </h1>
                </div>

                <!-- <div class="flex items-center gap-4">
                    <div class="text-right hidden sm:block">
                        <p class="text-sm font-black text-slate-900">{{ user.name }}</p>
                        <p class="text-[10px] font-black text-primary-500 uppercase tracking-widest">{{ user.role }}</p>
                    </div>
                    <NuxtLink to="/profile">
                        <UAvatar :src="`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.avatar}`" alt="Admin"
                            size="md"
                            class="ring-2 ring-white shadow-lg shadow-slate-200 cursor-pointer transition-transform hover:scale-110" />
                    </NuxtLink>
                </div> -->
            </header>

            <!-- Page Slot -->
            <main class="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
                <slot />
            </main>

            <!-- Mobile Bottom Nav (simplified) -->
            <nav
                class="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-xl border-t border-slate-200 flex items-center justify-around px-4 z-40">
                <UButton v-for="link in adminLinks.slice(0, 4)" :key="link.to" :to="link.to" :icon="link.icon"
                    variant="ghost" :color="route.path === link.to ? link.color : 'neutral'" class="rounded-xl p-3"
                    :class="route.path === link.to ? 'bg-slate-100 scale-110' : ''" />
            </nav>
        </div>

        <!-- FAB Menu (Dev Tools) -->
        <AppFab :actions="devActions" icon="i-ph-terminal-window-bold" color="bg-emerald-500 shadow-emerald-500/40"
            position="right" />
    </div>
</template>

<style scoped>
/* Ensure smooth transitions for layout changes if any */
.layout-enter-active,
.layout-leave-active {
    transition: opacity 0.2s ease;
}

.layout-enter-from,
.layout-leave-to {
    opacity: 0;
}
</style>
