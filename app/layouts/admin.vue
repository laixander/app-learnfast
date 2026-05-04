<script setup lang="ts">
const { user, seedData, clearData } = useUserStore()
const { seedDefaults: seedCategories } = useCategories()
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
        onClick: () => { seedData(); seedCategories() }
    },
    {
        label: 'Clear Data',
        icon: 'i-ph-trash-duotone',
        color: 'bg-rose-500 hover:bg-rose-600',
        onClick: () => clearData()
    }
])

const adminLinks = [
    { label: 'Overview', icon: 'i-ph-chart-pie-slice-duotone', to: '/admin', color: 'primary' },
    { label: 'Users', icon: 'i-ph-users-duotone', to: '/admin/users', color: 'secondary' },
    { label: 'Content', icon: 'i-ph-books-duotone', to: '/admin/content', color: 'success' },
    { label: 'Shop', icon: 'i-ph-storefront-duotone', to: '/admin/shop', color: 'info' },
    { label: 'Quests', icon: 'i-ph-scroll-duotone', to: '/admin/quests', color: 'warning' },
    { label: 'System Logs', icon: 'i-ph-terminal-window-duotone', to: '/admin/logs', color: 'error' }
] as const

const activeLink = computed(() => adminLinks.find(l => l.to === route.path) || adminLinks[0])
</script>

<template>
    <div class="min-h-screen bg-slate-50 flex overflow-hidden font-sour-gummy">
        <BgDecorations />

        <!-- Sidebar -->
        <aside
            class="hidden lg:flex flex-col w-64 bg-white/80 backdrop-blur-xl border-r border-slate-200 shrink-0 z-20">
            <div class="p-6 flex items-center gap-3">
                <AppLogo class="h-8 w-auto shrink-0" />
                <span class="text-xl font-black text-slate-800 tracking-tight">Admin<span
                        class="text-primary-500">!</span></span>
            </div>

            <nav class="flex-1 px-4 space-y-1.5 mt-4">
                <UButton v-for="link in adminLinks" :key="link.to" :to="link.to" :icon="link.icon" :label="link.label"
                    variant="ghost" :color="route.path === link.to ? link.color : 'neutral'"
                    class="w-full justify-start font-bold rounded-xl py-3 transition-all duration-200" :class="[
                        route.path === link.to
                            ? 'bg-slate-100 shadow-sm translate-x-1'
                            : 'hover:translate-x-1'
                    ]" />
            </nav>

            <div class="p-6 border-t border-slate-100 bg-slate-50/50">
                <UButton to="/dashboard" icon="i-ph-arrow-square-out-duotone" label="Back to App" variant="soft"
                    color="neutral" class="w-full justify-start font-bold rounded-xl px-4" />
            </div>
        </aside>

        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col min-w-0 overflow-auto relative z-10">
            <!-- Header -->
            <header
                class="h-20 bg-white/60 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-30">
                <!-- Mobile Logo -->
                <div class="lg:hidden flex items-center gap-2">
                    <AppLogo class="h-8 w-auto" />
                    <span class="font-black text-slate-800">Admin!</span>
                </div>

                <div class="hidden lg:flex items-center gap-2">
                    <div
                        :class="`size-2 rounded-full bg-${activeLink.color}-500 shadow-lg shadow-${activeLink.color}-500/50`" />
                    <h1 class="text-slate-500 font-black uppercase tracking-[0.2em]">
                        {{ activeLink.label }}
                    </h1>
                </div>

                <div class="flex items-center gap-4">
                    <div class="text-right hidden sm:block">
                        <p class="text-sm font-black text-slate-900">{{ user.name }}</p>
                        <p class="text-[10px] font-black text-primary-500 uppercase tracking-widest">{{ user.role }}</p>
                    </div>
                    <NuxtLink to="/profile">
                        <UAvatar :src="`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.avatar}`" alt="Admin"
                            size="md"
                            class="ring-2 ring-white shadow-lg shadow-slate-200 cursor-pointer transition-transform hover:scale-110" />
                    </NuxtLink>
                </div>
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
