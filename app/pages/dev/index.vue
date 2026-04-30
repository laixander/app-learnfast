<script setup lang="ts">
import { DOCS_DATA } from '~/constants/documentation'

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
            <UIcon :name="DOCS_DATA.header.icon" class="size-20 text-indigo-500 mx-auto mb-4" />
            <h1 class="text-5xl font-black text-neutral-900 dark:text-white tracking-tight">
                {{ DOCS_DATA.header.title }}
            </h1>
            <p class="text-xl text-neutral-500 mt-4 max-w-2xl mx-auto">
                {{ DOCS_DATA.header.description }}
            </p>
        </div>

        <UCard class="shadow-2xl shadow-indigo-500/10 ring-4 ring-indigo-500/5" :ui="{ body: 'p-0 sm:p-0' }">
            <UTabs :items="tabs" variant="link" class="w-full"
                :ui="{ list: 'rounded-none p-4', indicator: 'h-1 rounded-full' }">
                <template #architecture>
                    <div class="p-6 md:p-10 space-y-8">
                        <div class="flex items-center gap-4">
                            <div class="bg-indigo-100 dark:bg-indigo-900/50 p-4 rounded-3xl shadow-inner">
                                <UIcon :name="DOCS_DATA.architecture.icon"
                                    class="size-10 text-indigo-600 dark:text-indigo-400 flex" />
                            </div>
                            <h2 class="text-3xl font-black">{{ DOCS_DATA.architecture.title }}</h2>
                        </div>
                        <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-4xl">
                            {{ DOCS_DATA.architecture.description }}
                        </p>

                        <div class="grid md:grid-cols-2 gap-6">
                            <UCard
                                class="bg-neutral-50 dark:bg-neutral-900/50 border-none ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-sm">
                                <h3 class="text-xl font-bold flex items-center gap-2 mb-4">
                                    <UIcon name="i-ph-folder-notch-open-duotone" class="text-purple-500 size-6" />
                                    Core Directories
                                </h3>
                                <ul class="space-y-4">
                                    <li v-for="dir in DOCS_DATA.architecture.coreDirectories" :key="dir.path"
                                        class="flex items-start gap-3">
                                        <UBadge variant="subtle" size="md" class="mt-0.5 font-mono">
                                            {{ dir.path }}
                                        </UBadge>
                                        <span class="text-neutral-600 dark:text-neutral-400">
                                            {{ dir.description }}
                                        </span>
                                    </li>
                                </ul>
                            </UCard>

                            <UCard
                                class="bg-neutral-50 dark:bg-neutral-900/50 border-none ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-sm">
                                <h3 class="text-xl font-bold flex items-center gap-2 mb-4">
                                    <UIcon name="i-ph-database-duotone" class="text-blue-500 size-6" />
                                    {{ DOCS_DATA.architecture.stateAndDataFlow.title }}
                                </h3>
                                <p class="text-neutral-600 dark:text-neutral-400 mb-2 leading-relaxed">
                                    {{ DOCS_DATA.architecture.stateAndDataFlow.content }}
                                </p>
                            </UCard>
                        </div>
                    </div>
                </template>

                <template #design_system>
                    <div class="p-6 md:p-10 space-y-12">
                        <div class="flex items-center gap-4">
                            <div class="bg-pink-100 dark:bg-pink-900/50 p-4 rounded-3xl shadow-inner">
                                <UIcon :name="DOCS_DATA.designSystem.icon"
                                    class="size-10 text-pink-600 dark:text-pink-400 flex" />
                            </div>
                            <h2 class="text-3xl font-black">{{ DOCS_DATA.designSystem.title }}</h2>
                        </div>

                        <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-4xl">
                            {{ DOCS_DATA.designSystem.description }}
                        </p>

                        <!-- 1. Colors -->
                        <div class="space-y-6">
                            <h3 class="text-2xl font-bold flex items-center gap-2">
                                <UIcon name="i-ph-swatches-duotone" class="text-pink-500" /> Color Palette
                            </h3>
                            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                                <div v-for="color in DOCS_DATA.designSystem.colors" :key="color.label"
                                    class="space-y-2">
                                    <div :class="[color.bg, 'h-16 rounded-2xl shadow-inner']"></div>
                                    <p class="text-center font-bold text-sm">{{ color.label }}</p>
                                    <p class="text-center text-xs text-neutral-500">{{ color.value }}</p>
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
                                            style="font-family: 'Sour Gummy', sans-serif;">{{
                                                DOCS_DATA.designSystem.typography.title }}</h4>
                                        <p class="text-neutral-500">{{ DOCS_DATA.designSystem.typography.description }}
                                        </p>
                                    </div>
                                    <div
                                        class="flex-1 bg-white dark:bg-neutral-800 p-6 rounded-md ring-1 ring-neutral-200 dark:ring-neutral-800">
                                        <p class="text-sm text-neutral-400 mb-2">{{
                                            DOCS_DATA.designSystem.typography.configTitle }}</p>
                                        <p class="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                                            {{ DOCS_DATA.designSystem.typography.configContent }}
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
                                <UCard v-for="shape in DOCS_DATA.designSystem.shapes" :key="shape.title"
                                    class="bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700">
                                    <h4 class="text-lg font-bold flex items-center gap-2 text-pink-600 mb-3">
                                        <UIcon :name="shape.icon" class="text-pink-400 size-6" /> {{ shape.title }}
                                    </h4>
                                    <p class="text-neutral-500 text-sm leading-relaxed mb-4">
                                        {{ shape.description }}
                                    </p>
                                    <div v-if="(shape as any).examples" class="flex gap-2">
                                        <UButton color="violet" variant="solid">{{ (shape as any).examples[0] }}
                                        </UButton>
                                        <UBadge color="pink" variant="subtle">{{ (shape as any).examples[1] }}</UBadge>
                                    </div>
                                    <div v-if="(shape as any).icons" class="flex gap-4 text-pink-500">
                                        <UIcon v-for="icon in (shape as any).icons" :key="icon" :name="icon"
                                            class="size-8" />
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
                                <UIcon :name="DOCS_DATA.frontend.icon"
                                    class="size-10 text-emerald-600 dark:text-emerald-400 flex" />
                            </div>
                            <h2 class="text-3xl font-black">{{ DOCS_DATA.frontend.title }}</h2>
                        </div>

                        <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-4xl">
                            {{ DOCS_DATA.frontend.description }}
                        </p>

                        <!-- 1. Layouts -->
                        <div class="space-y-6">
                            <h3 class="text-2xl font-bold flex items-center gap-2">
                                <UIcon name="i-ph-frame-corners-duotone" class="text-emerald-500" /> 1. Layout Wrappers
                            </h3>
                            <div class="grid lg:grid-cols-3 gap-6">
                                <UCard v-for="layout in DOCS_DATA.frontend.layouts" :key="layout.title"
                                    class="relative overflow-hidden shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-800">
                                    <div class="absolute -top-12 -left-12 size-32 rounded-full opacity-50 blur-3xl"
                                        :class="layout.glowColor"></div>
                                    <div class="flex flex-col h-full relative z-10">
                                        <h4 :class="[layout.textColor, 'text-xl font-bold mb-2']">{{ layout.title }}
                                        </h4>
                                        <p class="text-neutral-500 mb-4 flex-grow leading-relaxed text-sm">{{
                                            layout.description }}</p>
                                        <div
                                            class="bg-neutral-100 dark:bg-neutral-800 p-2 rounded-lg text-xs font-mono text-neutral-700 dark:text-neutral-300">
                                            {{ layout.file }}
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
                                <UCard v-for="module in DOCS_DATA.frontend.modules" :key="module.title"
                                    class="bg-neutral-50 dark:bg-neutral-900/50 ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-sm">
                                    <h4
                                        class="text-lg font-bold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                                        <UIcon :name="module.icon" :class="module.iconColor" /> {{ module.title }}
                                    </h4>
                                    <p class="text-neutral-600 dark:text-neutral-400 mb-3 text-sm leading-relaxed">
                                        <strong>Files:</strong>
                                        <code v-for="(file, idx) in module.files" :key="file"
                                            :class="[module.fileColor, 'font-mono text-xs px-1 rounded ml-1']">
                                            {{ file }}<span v-if="idx < module.files.length - 1">,</span>
                                        </code>
                                    </p>
                                    <p class="text-neutral-500 text-sm leading-relaxed">
                                        {{ module.description }}
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
                                    <UCard v-for="comp in DOCS_DATA.frontend.domainComponents" :key="comp.title"
                                        class="bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700">
                                        <h5 class="font-bold flex items-center gap-2 text-pink-600">
                                            <UIcon :name="comp.icon" class="text-pink-400" />
                                            {{ comp.title }}
                                        </h5>
                                        <p class="text-neutral-500 mt-2 text-sm leading-relaxed">{{ comp.description }}
                                        </p>
                                    </UCard>
                                </div>
                            </div>

                            <div
                                class="p-6 bg-neutral-100 dark:bg-neutral-900 rounded-lg ring-1 ring-neutral-200 dark:ring-neutral-800">
                                <h4 class="text-xl font-bold flex items-center gap-3 mb-3">
                                    <UIcon name="i-ph-cube-duotone" class="text-green-500 size-6" /> Nuxt UI
                                    Fundamentals
                                </h4>
                                <p class="text-neutral-600 dark:text-neutral-400 mb-4 text-sm">
                                    {{ DOCS_DATA.frontend.nuxtUI.description }}
                                </p>
                                <div class="flex flex-wrap gap-2">
                                    <UBadge v-for="comp in DOCS_DATA.frontend.nuxtUI.components" :key="comp"
                                        color="neutral" variant="solid" class="shadow-sm">
                                        {{ comp }}
                                    </UBadge>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

                <template #game_design>
                    <div class="p-6 md:p-10 space-y-12">
                        <div class="flex items-center gap-4">
                            <div class="bg-amber-100 dark:bg-amber-900/50 p-4 rounded-3xl shadow-inner">
                                <UIcon :name="DOCS_DATA.gameDesign.icon"
                                    class="size-10 text-amber-600 dark:text-amber-400 flex" />
                            </div>
                            <h2 class="text-3xl font-black">{{ DOCS_DATA.gameDesign.title }}</h2>
                        </div>

                        <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-4xl">
                            {{ DOCS_DATA.gameDesign.description }}
                        </p>

                        <!-- 1. Dictionary -->
                        <div class="space-y-6">
                            <h3 class="text-2xl font-bold flex items-center gap-2">
                                <UIcon name="i-ph-book-bookmark-duotone" class="text-fuchsia-500" /> App Dictionary
                            </h3>
                            <div class="grid md:grid-cols-2 gap-4">
                                <UCard v-for="item in DOCS_DATA.gameDesign.dictionary" :key="item.title"
                                    class="bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700">
                                    <h4 class="text-lg font-bold flex items-center gap-2 text-fuchsia-600 mb-2">
                                        <UIcon :name="item.icon" class="text-fuchsia-400 size-5" />
                                        {{ item.title }}
                                    </h4>
                                    <p class="text-neutral-500 text-sm leading-relaxed">{{ item.description }}</p>
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
                                <UCard v-for="rel in DOCS_DATA.gameDesign.relationships" :key="rel.title"
                                    :class="[rel.color, 'ring-1']">
                                    <h4 class="font-bold mb-2">{{ rel.title }}</h4>
                                    <ul class="text-sm space-y-2 text-neutral-600 dark:text-neutral-400">
                                        <li v-for="item in rel.items" :key="item">• {{ item }}</li>
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
                                <div v-for="(step, idx) in DOCS_DATA.gameDesign.journey" :key="step.phase"
                                    class="relative">
                                    <div class="absolute -left-[41px] top-1 bg-white dark:bg-neutral-900 ring-2 ring-violet-500 rounded-full size-4"
                                        :class="{ 'bg-violet-500 ring-4 ring-violet-100 dark:ring-violet-900': idx === 2 }">
                                    </div>
                                    <h4 class="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                                        <UIcon :name="step.icon" class="text-violet-500" /> {{ step.phase }}
                                    </h4>
                                    <p class="text-sm text-neutral-600 dark:text-neutral-400 mt-2">{{ step.description
                                        }}</p>
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
                                <pre><code>{{ DOCS_DATA.gameDesign.schema }}</code></pre>
                            </div>
                        </div>
                    </div>
                </template>

                <template #changelog>
                    <div class="p-6 md:p-10 space-y-8">
                        <div class="flex items-center gap-4">
                            <div class="bg-rose-100 dark:bg-rose-900/50 p-4 rounded-3xl shadow-inner">
                                <UIcon :name="DOCS_DATA.changelog.icon"
                                    class="size-10 text-rose-600 dark:text-rose-400 flex" />
                            </div>
                            <h2 class="text-3xl font-black">{{ DOCS_DATA.changelog.title }}</h2>
                        </div>

                        <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
                            {{ DOCS_DATA.changelog.description }}
                        </p>

                        <div class="relative border-l-2 border-rose-200 dark:border-rose-800 ml-4 space-y-10 py-4">

                            <div v-for="version in DOCS_DATA.changelog.versions" :key="version.version"
                                class="relative pl-8">
                                <div
                                    :class="[version.dotColor, 'absolute -left-2 top-1.5 rounded-full size-4 ring-4 ring-neutral-50 dark:ring-neutral-900']">
                                </div>
                                <div class="flex items-center gap-3 mb-2">
                                    <UBadge :color="version.color" variant="subtle" size="md">{{ version.version }}
                                    </UBadge>
                                    <span class="text-xs font-bold text-neutral-400 uppercase">{{ version.date }}</span>
                                    <UBadge v-if="(version as any).status" color="primary" variant="solid" size="sm">{{
                                        (version as any).status }}</UBadge>
                                </div>
                                <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-2">{{ version.title }}
                                </h3>
                                <ul class="list-disc list-inside text-neutral-600 dark:text-neutral-400 space-y-1">
                                    <li v-for="change in version.changes" :key="change" v-html="change"></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </template>
            </UTabs>
        </UCard>
    </div>
</template>