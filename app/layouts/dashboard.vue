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

const { user, seedData, clearData } = useUserStore()
const { seedDefaults: seedCategories } = useCategories()

const devActions = computed(() => [
    {
        label: 'Admin Center',
        icon: 'i-ph-shield-check-duotone',
        color: 'bg-indigo-600 hover:bg-indigo-700',
        onClick: () => navigateTo('/admin')
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

const userActions = [
    {
        label: 'New Adventure',
        icon: 'i-ph-magic-wand-duotone',
        color: 'bg-primary-500 hover:bg-primary-600',
        onClick: () => navigateTo('/create')
    },
    {
        label: 'Daily Quests',
        icon: 'i-ph-scroll-duotone',
        color: 'bg-yellow-500 hover:bg-yellow-600',
        onClick: () => navigateTo('/quests')
    },
    {
        label: 'My Collection',
        icon: 'i-ph-books-duotone',
        color: 'bg-indigo-500 hover:bg-indigo-600',
        onClick: () => navigateTo('/adventures')
    },
    {
        label: 'Daily Bonus',
        icon: 'i-ph-gift-duotone',
        color: 'bg-pink-500 hover:bg-pink-600',
        onClick: () => navigateTo('/rewards')
    }
]

const createActions = [
    {
        label: 'Back to Dashboard',
        icon: 'i-ph-layout-duotone',
        color: 'bg-indigo-500 hover:bg-indigo-600',
        onClick: () => navigateTo('/dashboard')
    },
    {
        label: 'My Adventures',
        icon: 'i-ph-mountains-duotone',
        color: 'bg-emerald-500 hover:bg-emerald-600',
        onClick: () => navigateTo('/adventures')
    },
    {
        label: 'Go Home',
        icon: 'i-ph-house-duotone',
        color: 'bg-primary-500 hover:bg-primary-600',
        onClick: () => navigateTo('/')
    }
]

const isCreatePage = computed(() => route.path === '/create')
const currentRightActions = computed(() => isCreatePage.value ? createActions : userActions)
const rightFabIcon = computed(() => isCreatePage.value ? 'i-ph-compass-bold' : 'i-ph-plus-bold')
const rightFabColor = computed(() => isCreatePage.value ? 'bg-indigo-600 shadow-indigo-500/40' : 'bg-linear-to-br from-primary-500 to-violet-600 shadow-primary-500/40')
</script>

<template>
    <div class="flex flex-col min-h-screen relative bg-linear-to-b from-purple-200 to-yellow-50">
        <BgDecorations />
        <UHeader v-if="route.meta.header !== false" :ui="{
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
        <UMain :class="[`flex flex-col flex-1 ${route.meta.header !== false ? 'pt-24' : 'pt-12'} pb-12`]">
            <UContainer>
                <slot />
            </UContainer>
        </UMain>

        <!-- FAB Menus -->
        <AppFab :actions="devActions" icon="i-ph-terminal-window-bold" color="bg-emerald-500 shadow-emerald-500/40"
            position="left" />

        <AppFab :actions="currentRightActions" :icon="rightFabIcon" :color="rightFabColor" position="right" />

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