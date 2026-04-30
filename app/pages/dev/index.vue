<script setup lang="ts">
definePageMeta({
    layout: 'dashboard'
})

const tabs = [
    { label: 'Architecture', icon: 'i-ph-buildings-duotone', slot: 'architecture' },
    { label: 'Design System', icon: 'i-ph-palette-duotone', slot: 'design_system' },
    { label: 'Frontend Ecosystem', icon: 'i-ph-layout-duotone', slot: 'frontend' },
    { label: 'Game Design', icon: 'i-ph-game-controller-duotone', slot: 'game_design' },
    { label: 'Changelog', icon: 'i-ph-clock-counter-clockwise-duotone', slot: 'changelog' }
]
</script>

<template>
    <div class="relative flex flex-col z-10 py-12">

        <div class="text-center mb-12">
            <UIcon name="i-ph-book-open-text-duotone" class="size-20 text-indigo-500 mx-auto mb-4" />
            <h1 class="text-5xl font-black text-neutral-900 dark:text-white tracking-tight">Developer Blueprint &
                Documentation</h1>
            <p class="text-xl text-neutral-500 mt-4 max-w-2xl mx-auto">Comprehensive technical reference for
                LearnFast's architecture, design system, frontend ecosystem, and gamification mechanics.</p>
        </div>

        <UCard class="shadow-2xl shadow-indigo-500/10 ring-4 ring-indigo-500/5" :ui="{ body: 'p-0 sm:p-0' }">
            <UTabs :items="tabs" variant="link" class="w-full"
                :ui="{ list: 'rounded-none p-4', indicator: 'h-1 rounded-full' }">
                <template #architecture>
                    <div class="p-6 md:p-10 space-y-8">
                        <div class="flex items-center gap-4">
                            <div class="bg-indigo-100 dark:bg-indigo-900/50 p-4 rounded-3xl shadow-inner">
                                <UIcon name="i-ph-buildings-duotone"
                                    class="size-10 text-indigo-600 dark:text-indigo-400 flex" />
                            </div>
                            <h2 class="text-3xl font-black">System Architecture</h2>
                        </div>
                        <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-4xl">
                            The application follows the Nuxt 4 directory structure, ensuring strong separation of
                            concerns.
                            The architecture leans heavily on Vue's Composition API, Nuxt's auto-imports, and the
                            robust <code class="bg-neutral-100 text-indigo-500 px-1 py-0.5 rounded">nuxt/ui</code>
                            ecosystem.
                        </p>

                        <div class="grid md:grid-cols-2 gap-6">
                            <UCard
                                class="bg-neutral-50 dark:bg-neutral-900/50 border-none ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-sm">
                                <h3 class="text-xl font-bold flex items-center gap-2 mb-4">
                                    <UIcon name="i-ph-folder-notch-open-duotone" class="text-purple-500 size-6" />
                                    Core Directories
                                </h3>
                                <ul class="space-y-4">
                                    <li class="flex items-start gap-3">
                                        <UBadge variant="subtle" size="md" class="mt-0.5 font-mono">app/pages/
                                        </UBadge>
                                        <span class="text-neutral-600 dark:text-neutral-400">File-based routing
                                            defining application screens.</span>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <UBadge variant="subtle" size="md" class="mt-0.5 font-mono">app/layouts/
                                        </UBadge>
                                        <span class="text-neutral-600 dark:text-neutral-400">Root structural
                                            wrappers (e.g., dashboard nav vs landing).</span>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <UBadge variant="subtle" size="md" class="mt-0.5 font-mono">app/components/
                                        </UBadge>
                                        <span class="text-neutral-600 dark:text-neutral-400">Reusable
                                            domain-specific UI components.</span>
                                    </li>
                                    <li class="flex items-start gap-3">
                                        <UBadge variant="subtle" size="md" class="mt-0.5 font-mono">app/types/
                                        </UBadge>
                                        <span class="text-neutral-600 dark:text-neutral-400">Centralized TypeScript
                                            interfaces for consistent data modeling.</span>
                                    </li>
                                </ul>
                            </UCard>

                            <UCard
                                class="bg-neutral-50 dark:bg-neutral-900/50 border-none ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-sm">
                                <h3 class="text-xl font-bold flex items-center gap-2 mb-4">
                                    <UIcon name="i-ph-database-duotone" class="text-blue-500 size-6" />
                                    State & Data Flow
                                </h3>
                                <p class="text-neutral-600 dark:text-neutral-400 mb-2 leading-relaxed">
                                    Data is primarily managed using Vue 3 reactive primitives (<code
                                        class="bg-neutral-100 text-blue-500 px-1 py-0.5 rounded">ref</code>, <code
                                        class="bg-neutral-100 text-blue-500 px-1 py-0.5 rounded">computed</code>)
                                    within component script blocks.
                                    Shared logic and global state are orchestrated through Nuxt composables,
                                    centralized <code
                                        class="bg-neutral-100 text-blue-500 px-1 py-0.5 rounded">app/types</code>, and
                                    layout-level provision.
                                </p>
                            </UCard>
                        </div>
                    </div>
                </template>

                <template #design_system>
                    <div class="p-6 md:p-10 space-y-12">
                        <div class="flex items-center gap-4">
                            <div class="bg-pink-100 dark:bg-pink-900/50 p-4 rounded-3xl shadow-inner">
                                <UIcon name="i-ph-palette-duotone"
                                    class="size-10 text-pink-600 dark:text-pink-400 flex" />
                            </div>
                            <h2 class="text-3xl font-black">Design System & Theming</h2>
                        </div>

                        <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-4xl">
                            The visual language of LearnFast. Our design system prioritizes a kid-friendly, playful,
                            and vibrant aesthetic through custom typography, rounded shapes, and a high-contrast
                            color palette.
                        </p>

                        <!-- 1. Colors -->
                        <div class="space-y-6">
                            <h3 class="text-2xl font-bold flex items-center gap-2">
                                <UIcon name="i-ph-swatches-duotone" class="text-pink-500" /> Color Palette
                            </h3>
                            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                                <div class="space-y-2">
                                    <div class="h-16 rounded-2xl bg-violet-500 shadow-inner"></div>
                                    <p class="text-center font-bold text-sm">Primary</p>
                                    <p class="text-center text-xs text-neutral-500">Violet</p>
                                </div>
                                <div class="space-y-2">
                                    <div class="h-16 rounded-2xl bg-pink-500 shadow-inner"></div>
                                    <p class="text-center font-bold text-sm">Secondary</p>
                                    <p class="text-center text-xs text-neutral-500">Pink</p>
                                </div>
                                <div class="space-y-2">
                                    <div class="h-16 rounded-2xl bg-lime-500 shadow-inner"></div>
                                    <p class="text-center font-bold text-sm">Success</p>
                                    <p class="text-center text-xs text-neutral-500">Lime</p>
                                </div>
                                <div class="space-y-2">
                                    <div class="h-16 rounded-2xl bg-cyan-500 shadow-inner"></div>
                                    <p class="text-center font-bold text-sm">Info</p>
                                    <p class="text-center text-xs text-neutral-500">Cyan</p>
                                </div>
                                <div class="space-y-2">
                                    <div class="h-16 rounded-2xl bg-amber-500 shadow-inner"></div>
                                    <p class="text-center font-bold text-sm">Warning</p>
                                    <p class="text-center text-xs text-neutral-500">Amber</p>
                                </div>
                                <div class="space-y-2">
                                    <div class="h-16 rounded-2xl bg-rose-500 shadow-inner"></div>
                                    <p class="text-center font-bold text-sm">Error</p>
                                    <p class="text-center text-xs text-neutral-500">Rose</p>
                                </div>
                                <div class="space-y-2">
                                    <div class="h-16 rounded-2xl bg-slate-500 shadow-inner"></div>
                                    <p class="text-center font-bold text-sm">Neutral</p>
                                    <p class="text-center text-xs text-neutral-500">Slate</p>
                                </div>
                            </div>
                        </div>

                        <USeparator class="my-8" />

                        <!-- 2. Typography -->
                        <div class="space-y-6">
                            <h3 class="text-2xl font-bold flex items-center gap-2">
                                <UIcon name="i-ph-text-aa-duotone" class="text-pink-500" /> Typography
                            </h3>
                            <UCard
                                class="bg-neutral-50 dark:bg-neutral-900 border-none ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-sm">
                                <div class="flex flex-col md:flex-row items-center gap-8">
                                    <div class="text-center md:text-left flex-1">
                                        <h4 class="text-6xl font-black mb-2"
                                            style="font-family: 'Sour Gummy', sans-serif;">Sour Gummy</h4>
                                        <p class="text-neutral-500">The primary brand font used globally across the
                                            application. It is inherently bubbly, legible, and fun.</p>
                                    </div>
                                    <div
                                        class="flex-1 bg-white dark:bg-neutral-800 p-6 rounded-2xl ring-1 ring-neutral-200 dark:ring-neutral-700">
                                        <p class="text-sm text-neutral-400 mb-2">CSS Configuration (<code
                                                class="font-mono text-xs">main.css</code>)</p>
                                        <p class="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                                            We shifted the entire Tailwind type scale up one step (e.g., <code
                                                class="bg-neutral-100 dark:bg-neutral-900 px-1 rounded">text-xs</code>
                                            is now <code
                                                class="bg-neutral-100 dark:bg-neutral-900 px-1 rounded">0.875rem</code>).
                                            This ensures readability for younger users.
                                        </p>
                                    </div>
                                </div>
                            </UCard>
                        </div>

                        <USeparator class="my-8" />

                        <!-- 3. Shapes & Components -->
                        <div class="space-y-6">
                            <h3 class="text-2xl font-bold flex items-center gap-2">
                                <UIcon name="i-ph-bounding-box-duotone" class="text-pink-500" /> Shapes &
                                Iconography
                            </h3>
                            <div class="grid md:grid-cols-2 gap-4">
                                <UCard
                                    class="bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700">
                                    <h4 class="text-lg font-bold flex items-center gap-2 text-pink-600 mb-3">
                                        <UIcon name="i-ph-circle-duotone" class="text-pink-400 size-6" /> Rounded
                                        Geometry
                                    </h4>
                                    <p class="text-neutral-500 text-sm leading-relaxed mb-4">Inputs, Buttons,
                                        Textareas, and Badges default to <code
                                            class="font-mono bg-neutral-100 dark:bg-neutral-900 px-1 rounded">rounded-full</code>
                                        to soften the UI. Containers use a default <code
                                            class="font-mono bg-neutral-100 dark:bg-neutral-900 px-1 rounded">--ui-radius: 1rem</code>.
                                    </p>
                                    <div class="flex gap-2">
                                        <UButton color="violet" variant="solid">Primary</UButton>
                                        <UBadge color="pink" variant="subtle">Badge</UBadge>
                                    </div>
                                </UCard>
                                <UCard
                                    class="bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700">
                                    <h4 class="text-lg font-bold flex items-center gap-2 text-pink-600 mb-3">
                                        <UIcon name="i-ph-star-duotone" class="text-pink-400 size-6" /> Phosphor
                                        Icons
                                    </h4>
                                    <p class="text-neutral-500 text-sm leading-relaxed mb-4">All application icons
                                        are configured in <code
                                            class="font-mono bg-neutral-100 dark:bg-neutral-900 px-1 rounded">app.config.ts</code>
                                        utilizing the Phosphor icon set (<code
                                            class="font-mono bg-neutral-100 dark:bg-neutral-900 px-1 rounded">i-ph-*</code>),
                                        known for its clean, modern curves.</p>
                                    <div class="flex gap-4 text-pink-500">
                                        <UIcon name="i-ph-rocket-duotone" class="size-8" />
                                        <UIcon name="i-ph-planet-duotone" class="size-8" />
                                        <UIcon name="i-ph-alien-duotone" class="size-8" />
                                    </div>
                                </UCard>
                            </div>
                        </div>

                    </div>
                </template>

                <template #frontend>
                    <div class="p-6 md:p-10 space-y-12">
                        <div class="flex items-center gap-4">
                            <div class="bg-emerald-100 dark:bg-emerald-900/50 p-4 rounded-3xl shadow-inner">
                                <UIcon name="i-ph-layout-duotone"
                                    class="size-10 text-emerald-600 dark:text-emerald-400 flex" />
                            </div>
                            <h2 class="text-3xl font-black">Frontend Ecosystem</h2>
                        </div>

                        <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-4xl">
                            A complete breakdown of how the UI is constructed, starting from the outermost layout
                            wrappers down to the specific page modules and atomic components.
                        </p>

                        <!-- 1. Layouts -->
                        <div class="space-y-6">
                            <h3 class="text-2xl font-bold flex items-center gap-2">
                                <UIcon name="i-ph-frame-corners-duotone" class="text-emerald-500" /> 1. Layout
                                Wrappers
                            </h3>
                            <div class="grid lg:grid-cols-3 gap-6">
                                <UCard
                                    class="border-t-4 border-t-amber-500 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-800">
                                    <div class="flex flex-col h-full">
                                        <h4 class="text-xl font-bold text-amber-600 mb-2">Landing Layout</h4>
                                        <p class="text-neutral-500 mb-4 flex-grow leading-relaxed text-sm">Used
                                            exclusively for
                                            public-facing unauthenticated pages (the marketing site).</p>
                                        <div
                                            class="bg-neutral-100 dark:bg-neutral-800 p-2 rounded-lg text-xs font-mono text-neutral-700 dark:text-neutral-300">
                                            app/layouts/landing.vue
                                        </div>
                                    </div>
                                </UCard>
                                <UCard
                                    class="border-t-4 border-t-purple-500 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-800">
                                    <div class="flex flex-col h-full">
                                        <h4 class="text-xl font-bold text-purple-600 mb-2">Login Layout</h4>
                                        <p class="text-neutral-500 mb-4 flex-grow leading-relaxed text-sm">A
                                            streamlined,
                                            centered layout designed to wrap authentication flows without
                                            distraction.</p>
                                        <div
                                            class="bg-neutral-100 dark:bg-neutral-800 p-2 rounded-lg text-xs font-mono text-neutral-700 dark:text-neutral-300">
                                            app/layouts/login.vue
                                        </div>
                                    </div>
                                </UCard>
                                <UCard
                                    class="border-t-4 border-t-indigo-500 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-800">
                                    <div class="flex flex-col h-full">
                                        <h4 class="text-xl font-bold text-indigo-600 mb-2">Dashboard Layout</h4>
                                        <p class="text-neutral-500 mb-4 flex-grow leading-relaxed text-sm">The core
                                            application
                                            shell featuring a top nav, bottom nav for mobile, and user stat
                                            tracking.</p>
                                        <div
                                            class="bg-neutral-100 dark:bg-neutral-800 p-2 rounded-lg text-xs font-mono text-neutral-700 dark:text-neutral-300">
                                            app/layouts/dashboard.vue
                                        </div>
                                    </div>
                                </UCard>
                            </div>
                        </div>

                        <USeparator class="my-8" />

                        <!-- 2. Page Modules -->
                        <div class="space-y-6">
                            <h3 class="text-2xl font-bold flex items-center gap-2">
                                <UIcon name="i-ph-tree-structure-duotone" class="text-blue-500" /> 2. Page Modules &
                                Wiring
                            </h3>
                            <div class="grid md:grid-cols-2 gap-4">
                                <UCard
                                    class="bg-neutral-50 dark:bg-neutral-900/50 ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-sm">
                                    <h4
                                        class="text-lg font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                                        <UIcon name="i-ph-lock-key-duotone" class="text-teal-500" /> Auth Module
                                    </h4>
                                    <p class="text-neutral-600 dark:text-neutral-400 mb-3 text-sm leading-relaxed">
                                        <strong>Files:</strong> <code
                                            class="text-teal-600 font-mono text-xs bg-teal-50 px-1 rounded">login.vue</code>,
                                        <code
                                            class="text-teal-600 font-mono text-xs bg-teal-50 px-1 rounded">register.vue</code>
                                    </p>
                                    <p class="text-neutral-500 text-sm leading-relaxed">
                                        Uses the `login` layout. Integrates `UAuthForm` for standardized form
                                        validation and submission. Transitions user to the Dashboard on success.
                                    </p>
                                </UCard>
                                <UCard
                                    class="bg-neutral-50 dark:bg-neutral-900/50 ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-sm">
                                    <h4
                                        class="text-lg font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                                        <UIcon name="i-ph-books-duotone" class="text-cyan-500" /> Core Content
                                    </h4>
                                    <p class="text-neutral-600 dark:text-neutral-400 mb-3 text-sm leading-relaxed">
                                        <strong>Files:</strong> <code
                                            class="text-cyan-600 font-mono text-xs bg-cyan-50 px-1 rounded">dashboard.vue</code>,
                                        <code
                                            class="text-cyan-600 font-mono text-xs bg-cyan-50 px-1 rounded">adventures/[slug].vue</code>,
                                        <code
                                            class="text-cyan-600 font-mono text-xs bg-cyan-50 px-1 rounded">lessons/[slug].vue</code>
                                    </p>
                                    <p class="text-neutral-500 text-sm leading-relaxed">
                                        `dashboard.vue` acts as the entry point. Dynamic routing (`[slug].vue`) is
                                        used to render specific missions or interactive lessons.
                                    </p>
                                </UCard>
                                <UCard
                                    class="bg-neutral-50 dark:bg-neutral-900/50 ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-sm">
                                    <h4
                                        class="text-lg font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                                        <UIcon name="i-ph-trophy-duotone" class="text-yellow-500" /> Gamification
                                    </h4>
                                    <p class="text-neutral-600 dark:text-neutral-400 mb-3 text-sm leading-relaxed">
                                        <strong>Files:</strong> <code
                                            class="text-yellow-600 font-mono text-xs bg-yellow-50 px-1 rounded">shop.vue</code>,
                                        <code
                                            class="text-yellow-600 font-mono text-xs bg-yellow-50 px-1 rounded">leaderboard.vue</code>
                                    </p>
                                    <p class="text-neutral-500 text-sm leading-relaxed">
                                        Wrapped by `dashboard` layout. Heavily relies on `UIcon` and `UBadge` to
                                        visualize progression, virtual currency, and relative ranking.
                                    </p>
                                </UCard>
                                <UCard
                                    class="bg-neutral-50 dark:bg-neutral-900/50 ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-sm">
                                    <h4
                                        class="text-lg font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                                        <UIcon name="i-ph-user-gear-duotone" class="text-rose-500" /> User
                                        Management
                                    </h4>
                                    <p class="text-neutral-600 dark:text-neutral-400 mb-3 text-sm leading-relaxed">
                                        <strong>Files:</strong> <code
                                            class="text-rose-600 font-mono text-xs bg-rose-50 px-1 rounded">profile.vue</code>,
                                        <code
                                            class="text-rose-600 font-mono text-xs bg-rose-50 px-1 rounded">settings.vue</code>
                                    </p>
                                    <p class="text-neutral-500 text-sm leading-relaxed">
                                        Provides user state modification interfaces. Uses `USwitch`, `UAvatar`, and
                                        `UButton` to map and mutate user preferences.
                                    </p>
                                </UCard>
                            </div>
                        </div>

                        <USeparator class="my-8" />

                        <!-- 3. Components -->
                        <div class="space-y-8">
                            <h3 class="text-2xl font-bold flex items-center gap-2">
                                <UIcon name="i-ph-puzzle-piece-duotone" class="text-orange-500" /> 3. Components
                                Ecosystem
                            </h3>

                            <div>
                                <h4 class="text-xl font-bold flex items-center gap-3 mb-4">
                                    <UIcon name="i-ph-paint-brush-duotone" class="text-pink-500 size-6" /> Custom
                                    Domain Components
                                </h4>
                                <div class="grid md:grid-cols-2 gap-4">
                                    <UCard
                                        class="bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700">
                                        <h5 class="font-bold flex items-center gap-2 text-pink-600">
                                            <UIcon name="i-ph-magic-wand-duotone" class="text-pink-400" />
                                            AppLogo.vue
                                        </h5>
                                        <p class="text-neutral-500 mt-2 text-sm leading-relaxed">The centralized
                                            branding asset. Integrated within Auth screens and Dashboard navigation
                                            bars for a consistent visual identity.</p>
                                    </UCard>
                                    <UCard
                                        class="bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700">
                                        <h5 class="font-bold flex items-center gap-2 text-pink-600">
                                            <UIcon name="i-ph-shapes-duotone" class="text-pink-400" />
                                            BgDecorations.vue
                                        </h5>
                                        <p class="text-neutral-500 mt-2 text-sm leading-relaxed">Abstract SVG
                                            background elements that inject a vibrant, kid-friendly aesthetic into
                                            the landing and dashboard screens.</p>
                                    </UCard>
                                </div>
                            </div>

                            <div
                                class="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-3xl ring-1 ring-neutral-200 dark:ring-neutral-800">
                                <h4 class="text-xl font-bold flex items-center gap-3 mb-3">
                                    <UIcon name="i-ph-cube-duotone" class="text-green-500 size-6" /> Nuxt UI
                                    Fundamentals
                                </h4>
                                <p class="text-neutral-600 dark:text-neutral-400 mb-4 text-sm">
                                    Instead of building basic components from scratch, the app relies heavily on
                                    `@nuxt/ui` for rapid, accessible development.
                                </p>
                                <div class="flex flex-wrap gap-2">
                                    <UBadge color="neutral" variant="solid" class="shadow-sm">UCard</UBadge>
                                    <UBadge color="neutral" variant="solid" class="shadow-sm">UButton</UBadge>
                                    <UBadge color="neutral" variant="solid" class="shadow-sm">UIcon</UBadge>
                                    <UBadge color="neutral" variant="solid" class="shadow-sm">UContainer</UBadge>
                                    <UBadge color="neutral" variant="solid" class="shadow-sm">UTabs</UBadge>
                                    <UBadge color="neutral" variant="solid" class="shadow-sm">UBadge</UBadge>
                                    <UBadge color="neutral" variant="solid" class="shadow-sm">UAuthForm</UBadge>
                                    <UBadge color="neutral" variant="solid" class="shadow-sm">UAvatar</UBadge>
                                    <UBadge color="neutral" variant="solid" class="shadow-sm">UProgress</UBadge>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

                <template #game_design>
                    <div class="p-6 md:p-10 space-y-12">
                        <div class="flex items-center gap-4">
                            <div class="bg-amber-100 dark:bg-amber-900/50 p-4 rounded-3xl shadow-inner">
                                <UIcon name="i-ph-game-controller-duotone"
                                    class="size-10 text-amber-600 dark:text-amber-400 flex" />
                            </div>
                            <h2 class="text-3xl font-black">Game Design & User Flow</h2>
                        </div>

                        <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-4xl">
                            Detailed specification of the app's terminology, the sequence of page interactions, and
                            how learning mechanics map to progression and economy systems.
                        </p>

                        <!-- 1. Dictionary -->
                        <div class="space-y-6">
                            <h3 class="text-2xl font-bold flex items-center gap-2">
                                <UIcon name="i-ph-book-bookmark-duotone" class="text-fuchsia-500" /> App Dictionary
                            </h3>
                            <div class="grid md:grid-cols-2 gap-4">
                                <UCard
                                    class="bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700">
                                    <h4 class="text-lg font-bold flex items-center gap-2 text-fuchsia-600 mb-2">
                                        <UIcon name="i-ph-map-trifold-duotone" class="text-fuchsia-400 size-5" />
                                        Adventure
                                    </h4>
                                    <p class="text-neutral-500 text-sm leading-relaxed">A themed parent container
                                        that groups a series of related learning modules. For example, 'Space
                                        Explorer'.</p>
                                </UCard>
                                <UCard
                                    class="bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700">
                                    <h4 class="text-lg font-bold flex items-center gap-2 text-fuchsia-600 mb-2">
                                        <UIcon name="i-ph-graduation-cap-duotone" class="text-fuchsia-400 size-5" />
                                        Lesson (Mission)
                                    </h4>
                                    <p class="text-neutral-500 text-sm leading-relaxed">The interactive learning
                                        content consisting of theory steps and a quiz. Completing these progresses
                                        the Adventure.</p>
                                </UCard>
                                <UCard
                                    class="bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700">
                                    <h4 class="text-lg font-bold flex items-center gap-2 text-fuchsia-600 mb-2">
                                        <UIcon name="i-ph-atom-duotone" class="text-fuchsia-400 size-5" /> Atoms /
                                        Coins
                                    </h4>
                                    <p class="text-neutral-500 text-sm leading-relaxed">The in-app virtual currency.
                                        Earned by completing Lessons and claiming Daily Rewards. Used in the Shop.
                                    </p>
                                </UCard>
                                <UCard
                                    class="bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700">
                                    <h4 class="text-lg font-bold flex items-center gap-2 text-fuchsia-600 mb-2">
                                        <UIcon name="i-ph-medal-duotone" class="text-fuchsia-400 size-5" /> Badges /
                                        Ranks
                                    </h4>
                                    <p class="text-neutral-500 text-sm leading-relaxed">Achievements unlocked by
                                        reaching certain milestones. Displayed on the user Profile and Leaderboard.
                                    </p>
                                </UCard>
                                <UCard
                                    class="bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700">
                                    <h4 class="text-lg font-bold flex items-center gap-2 text-fuchsia-600 mb-2">
                                        <UIcon name="i-ph-test-tube-duotone" class="text-fuchsia-400 size-5" /> AI
                                        Laboratory
                                    </h4>
                                    <p class="text-neutral-500 text-sm leading-relaxed">The AI-powered wizard where
                                        students can generate custom adventures based on their own interests and
                                        prompts.</p>
                                </UCard>
                                <UCard
                                    class="bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700">
                                    <h4 class="text-lg font-bold flex items-center gap-2 text-fuchsia-600 mb-2">
                                        <UIcon name="i-ph-cpu-duotone" class="text-fuchsia-400 size-5" /> AI Lesson
                                        Engine
                                    </h4>
                                    <p class="text-neutral-500 text-sm leading-relaxed">The core generation logic
                                        that transforms raw text, files, or images into interactive learning modules
                                        and quizzes.</p>
                                </UCard>
                            </div>
                        </div>

                        <USeparator class="my-8" />

                        <!-- 2. System Relationships -->
                        <div class="space-y-6">
                            <h3 class="text-2xl font-bold flex items-center gap-2">
                                <UIcon name="i-ph-intersect-duotone" class="text-amber-500" /> System Relationships
                            </h3>
                            <div class="grid lg:grid-cols-3 gap-4">
                                <UCard
                                    class="bg-amber-50 dark:bg-amber-900/10 ring-1 ring-amber-200 dark:ring-amber-800">
                                    <h4 class="font-bold text-amber-600 mb-2">1. Actions (Triggers)</h4>
                                    <ul class="text-sm space-y-2 text-neutral-600 dark:text-neutral-400">
                                        <li>• Completing <strong>Lessons</strong></li>
                                        <li>• Finishing <strong>Daily Quests</strong></li>
                                        <li>• Logging in daily (<strong>Day Streak</strong>)</li>
                                    </ul>
                                </UCard>
                                <UCard
                                    class="bg-green-50 dark:bg-green-900/10 ring-1 ring-green-200 dark:ring-green-800">
                                    <h4 class="font-bold text-green-600 mb-2">2. Rewards (Currency)</h4>
                                    <ul class="text-sm space-y-2 text-neutral-600 dark:text-neutral-400">
                                        <li>• Yields <strong>XP Points</strong> (Leveling)</li>
                                        <li>• Yields <strong>Magic Coins</strong> (Spending)</li>
                                        <li>• Unlocks <strong>Badges</strong> (Status)</li>
                                    </ul>
                                </UCard>
                                <UCard
                                    class="bg-purple-50 dark:bg-purple-900/10 ring-1 ring-purple-200 dark:ring-purple-800">
                                    <h4 class="font-bold text-purple-600 mb-2">3. Sinks (Engagement)</h4>
                                    <ul class="text-sm space-y-2 text-neutral-600 dark:text-neutral-400">
                                        <li>• Spend Coins in the <strong>Shop</strong></li>
                                        <li>• Compete on <strong>Friends Leaderboard</strong></li>
                                        <li>• Unlock new <strong>Adventures</strong></li>
                                    </ul>
                                </UCard>
                            </div>
                        </div>

                        <USeparator class="my-8" />

                        <!-- 3. Engagement Journey (App Flow) -->
                        <UCard
                            class="bg-neutral-50 dark:bg-neutral-900 border-none ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-sm">
                            <h3 class="text-xl font-bold flex items-center gap-2 mb-6">
                                <UIcon name="i-ph-git-branch-duotone" class="text-violet-500 size-6" /> User
                                Engagement Journey
                            </h3>

                            <div
                                class="space-y-8 relative border-l-2 border-violet-200 dark:border-violet-800 ml-4 pl-8 py-4">
                                <div class="relative">
                                    <div
                                        class="absolute -left-[41px] top-1 bg-white dark:bg-neutral-900 ring-2 ring-violet-500 rounded-full size-4">
                                    </div>
                                    <h4 class="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                                        <UIcon name="i-ph-number-circle-one-fill" class="text-violet-500" /> Phase
                                        1: Empty State & Onboarding (Day 1)
                                    </h4>
                                    <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-2">User lands on
                                        <code
                                            class="text-violet-600 font-mono text-xs bg-violet-50 px-1 rounded">index.vue</code>
                                        and creates a profile (<code
                                            class="text-violet-600 font-mono text-xs bg-violet-50 px-1 rounded">register.vue</code>).
                                        They start at Level 1, 0 XP, 0 Coins. Only the "Starter Adventure" is
                                        unlocked. Prompted to complete the first lesson for a bonus.
                                    </p>
                                </div>
                                <div class="relative">
                                    <div
                                        class="absolute -left-[41px] top-1 bg-white dark:bg-neutral-900 ring-2 ring-violet-500 rounded-full size-4">
                                    </div>
                                    <h4 class="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                                        <UIcon name="i-ph-number-circle-two-fill" class="text-violet-500" /> Phase
                                        2: Habit Forming (Days 2-7)
                                    </h4>
                                    <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-2">User returns to
                                        <code
                                            class="text-violet-600 font-mono text-xs bg-violet-50 px-1 rounded">dashboard.vue</code>
                                        to keep Streak alive. They engage with Daily Quests, hit Level 2, earn the
                                        "Novice" badge, and use Atoms in <code
                                            class="text-violet-600 font-mono text-xs bg-violet-50 px-1 rounded">shop.vue</code>.
                                    </p>
                                </div>
                                <div class="relative">
                                    <div
                                        class="absolute -left-[41px] top-1 bg-violet-500 ring-4 ring-violet-100 dark:ring-violet-900 rounded-full size-4">
                                    </div>
                                    <h4 class="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                                        <UIcon name="i-ph-number-circle-three-fill" class="text-violet-500" /> Phase
                                        3: Long-Term Loop (Weeks 2+)
                                    </h4>
                                    <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-2">Social systems
                                        engage via <code
                                            class="text-violet-600 font-mono text-xs bg-violet-50 px-1 rounded">leaderboard.vue</code>.
                                        Users buy "Streak Freezes" to protect investments and grind XP in <code
                                            class="text-violet-600 font-mono text-xs bg-violet-50 px-1 rounded">lessons/[slug].vue</code>
                                        to unlock advanced Adventures.</p>
                                </div>
                                <div class="relative">
                                    <div
                                        class="absolute -left-[41px] top-1 bg-white dark:bg-neutral-900 ring-2 ring-violet-500 rounded-full size-4">
                                    </div>
                                    <h4 class="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                                        <UIcon name="i-ph-number-circle-four-fill" class="text-violet-500" /> Phase
                                        4: Creative Mastery & Personalized Learning
                                    </h4>
                                    <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-2">Power users
                                        utilize the <code
                                            class="text-violet-600 font-mono text-xs bg-violet-50 px-1 rounded">AI Adventure Laboratory</code>
                                        to generate their own missions. They upload documents to the <code
                                            class="text-violet-600 font-mono text-xs bg-violet-50 px-1 rounded">AI Lesson Engine</code>
                                        to convert schoolwork into gamified study sessions.</p>
                                </div>
                            </div>
                        </UCard>

                        <USeparator class="my-8" />

                        <!-- 4. Schema -->
                        <div>
                            <h3 class="text-xl font-bold flex items-center gap-2 mb-4">
                                <UIcon name="i-ph-code-block-duotone" class="text-neutral-500 size-6" /> Data Schema
                                Blueprint
                            </h3>
                            <div
                                class="bg-neutral-900 text-neutral-300 p-6 rounded-2xl overflow-x-auto font-mono text-sm shadow-inner ring-1 ring-neutral-800">
                                <pre><code>// App State / Pinia Store Blueprint
interface UserProfile {
  id: string;
  level: number;
  xp: number;
  magicCoins: number;
  dayStreak: {
    current: number;
    highest: number;
    lastActiveDate: string;
    freezesAvailable: number; // Bought from Shop
  };
  badges: string[]; // Unlocked Badge IDs
  friends: string[]; // Friend User IDs
}

interface DailyQuest {
  id: string;
  type: 'LESSONS_COMPLETED' | 'XP_EARNED' | 'PERFECT_QUIZ';
  targetValue: number;
  currentValue: number;
  rewardCoins: number;
  isCompleted: boolean;
}</code></pre>
                            </div>
                        </div>
                    </div>
                </template>

                <template #changelog>
                    <div class="p-6 md:p-10 space-y-8">
                        <div class="flex items-center gap-4">
                            <div class="bg-rose-100 dark:bg-rose-900/50 p-4 rounded-3xl shadow-inner">
                                <UIcon name="i-ph-clock-counter-clockwise-duotone"
                                    class="size-10 text-rose-600 dark:text-rose-400 flex" />
                            </div>
                            <h2 class="text-3xl font-black">Project Changelog</h2>
                        </div>

                        <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
                            A timeline of significant feature additions, structural refactors, and aesthetic updates
                            to the application.
                        </p>

                        <div class="relative border-l-2 border-rose-200 dark:border-rose-800 ml-4 space-y-10 py-4">

                            <!-- "Implemented full-page Daily Quests experience replacing dashboard widget, with extended Quest data model for categories and levels",
            "Enhanced AI Adventure Laboratory with dynamic icon detection and improved adventure card display ordering",
            "Resolved custom adventure navigation issues including 'Start Lessons' visibility and access to Adventure Hub",
            "Polished 'Create Adventure' wizard with color harmony logic and dynamic progress trackers", -->

                            <div class="relative pl-8">
                                <div
                                    class="absolute -left-2 top-1.5 bg-rose-500 rounded-full size-4 ring-4 ring-neutral-50 dark:ring-neutral-900">
                                </div>
                                <div class="flex items-center gap-3 mb-2">
                                    <UBadge color="rose" variant="subtle" size="md">v1.5.0</UBadge>
                                    <span class="text-xs font-bold text-neutral-400 uppercase">Apr 29, 2026</span>
                                    <UBadge color="primary" variant="solid" size="sm">Current</UBadge>
                                </div>
                                <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-2">Thematic Quizzes &
                                    UX Stability</h3>
                                <ul class="list-disc list-inside text-neutral-600 dark:text-neutral-400 space-y-1">
                                    <li>Implemented `Thematic Quiz System` with knowledge checks and mastery exams.</li>
                                    <li>Enhanced `UX Stability` with flickering fixes and optimized adventure
                                        transitions.</li>
                                    <li>Added `Dynamic Icon Detection` for custom-created adventures.</li>
                                    <li>Standardized `Global Type System` across the entire application hierarchy.</li>
                                    <li>Finalized `AI Laboratory Polish` with alchemical themes and progress tracking.
                                    </li>
                                </ul>
                            </div>

                            <div class="relative pl-8">
                                <div
                                    class="absolute -left-2 top-1.5 bg-neutral-300 dark:bg-neutral-600 rounded-full size-4 ring-4 ring-neutral-50 dark:ring-neutral-900">
                                </div>
                                <div class="flex items-center gap-3 mb-2">
                                    <UBadge color="neutral" variant="subtle" size="md">v1.4.0</UBadge>
                                    <span class="text-xs font-bold text-neutral-400 uppercase">Apr 28, 2026</span>
                                </div>
                                <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-2">AI Laboratory &
                                    Type Systems</h3>
                                <ul class="list-disc list-inside text-neutral-600 dark:text-neutral-400 space-y-1">
                                    <li>Launched `AI Adventure Laboratory` wizard with dynamic card generation.</li>
                                    <li>Integrated `AI Lesson Engine` with file-based content generation and onboarding.
                                    </li>
                                    <li>Refactored `Quiz Type System` with centralized interfaces and interactive
                                        modals.</li>
                                    <li>Enhanced `Adventure Card Aesthetics` with premium hover effects and dynamic
                                        tints.</li>
                                </ul>
                            </div>

                            <div class="relative pl-8">
                                <div
                                    class="absolute -left-2 top-1.5 bg-neutral-300 dark:bg-neutral-600 rounded-full size-4 ring-4 ring-neutral-50 dark:ring-neutral-900">
                                </div>
                                <div class="flex items-center gap-3 mb-2">
                                    <UBadge color="neutral" variant="subtle" size="md">v1.3.0</UBadge>
                                    <span class="text-xs font-bold text-neutral-400 uppercase">Apr 27, 2026</span>
                                </div>
                                <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-2">Centralized
                                    State &
                                    Notifications</h3>
                                <ul class="list-disc list-inside text-neutral-600 dark:text-neutral-400 space-y-1">
                                    <li>Implemented Global Data Seeder with LocalStorage persistence.</li>
                                    <li>Added Premium `AppEmptyState` component across all core modules.</li>
                                    <li>Launched Advanced Notification system (Read/Unread, Global State, Details).
                                    </li>
                                    <li>Refactored data flow to use centralized `useUserStore` actions.</li>
                                </ul>
                            </div>

                            <div class="relative pl-8">
                                <div
                                    class="absolute -left-2 top-1.5 bg-neutral-300 dark:bg-neutral-600 rounded-full size-4 ring-4 ring-neutral-50 dark:ring-neutral-900">
                                </div>
                                <div class="flex items-center gap-3 mb-2">
                                    <UBadge color="neutral" variant="subtle" size="md">v1.2.0</UBadge>
                                    <span class="text-xs font-bold text-neutral-400 uppercase">Apr 26, 2026</span>
                                </div>
                                <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-2">Documentation &
                                    Refinements</h3>
                                <ul class="list-disc list-inside text-neutral-600 dark:text-neutral-400 space-y-1">
                                    <li>Added comprehensive Developer Documentation (`paper.vue`).</li>
                                    <li>Implemented App Flow mapping and Dictionary.</li>
                                    <li>Refactored portfolio references and simplified external integrations.</li>
                                </ul>
                            </div>

                            <div class="relative pl-8">
                                <div
                                    class="absolute -left-2 top-1.5 bg-neutral-300 dark:bg-neutral-600 rounded-full size-4 ring-4 ring-neutral-50 dark:ring-neutral-900">
                                </div>
                                <div class="flex items-center gap-3 mb-2">
                                    <UBadge color="neutral" variant="subtle" size="md">v1.1.0</UBadge>
                                    <span class="text-xs font-bold text-neutral-400 uppercase">Apr 25, 2026</span>
                                </div>
                                <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-2">Dashboard &
                                    Gamification Expansion</h3>
                                <ul class="list-disc list-inside text-neutral-600 dark:text-neutral-400 space-y-1">
                                    <li>Built out the Gamification Loop (`shop`, `rewards`, `leaderboard`).</li>
                                    <li>Integrated kid-friendly aesthetics using `BgDecorations.vue`.</li>
                                    <li>Wired dynamic routing for Adventures and Lessons.</li>
                                    <li>Resolved hydration mismatches in personalized content generation.</li>
                                </ul>
                            </div>

                            <div class="relative pl-8">
                                <div
                                    class="absolute -left-2 top-1.5 bg-neutral-300 dark:bg-neutral-600 rounded-full size-4 ring-4 ring-neutral-50 dark:ring-neutral-900">
                                </div>
                                <div class="flex items-center gap-3 mb-2">
                                    <UBadge color="neutral" variant="subtle" size="md">v1.0.0</UBadge>
                                    <span class="text-xs font-bold text-neutral-400 uppercase">Apr 24, 2026</span>
                                </div>
                                <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-2">Initial
                                    Architecture</h3>
                                <ul class="list-disc list-inside text-neutral-600 dark:text-neutral-400 space-y-1">
                                    <li>Migrated folder structure to standard Nuxt 4 conventions.</li>
                                    <li>Established Core Layouts (`landing`, `login`, `dashboard`).</li>
                                    <li>Integrated `@nuxt/ui` as the primary design system foundation.</li>
                                    <li>Deployed the initial user Authentication flows.</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </template>
            </UTabs>
        </UCard>
    </div>
</template>