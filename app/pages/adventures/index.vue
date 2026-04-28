<script setup lang="ts">
definePageMeta({
    layout: 'dashboard'
})

const { categories, adventures } = useAdventures()
const { isSeeded } = useUserStore()
const selectedCategory = ref('All')

const filteredAdventures = computed(() => {
    if (selectedCategory.value === 'All') return adventures
    return adventures.filter(adv => adv.category === selectedCategory.value)
})
</script>

<template>
    <div class="relative z-10 flex flex-col gap-10">
        <header class="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div class="flex flex-col gap-2">
                <h1 class="text-4xl md:text-6xl font-black text-toned">
                    Great <span class="text-primary-600">Adventures</span>
                </h1>
                <p class="text-xl text-muted font-medium">Where will you go next, Felix?</p>
            </div>
            <div v-if="isSeeded"
                class="flex gap-2 bg-white/60 backdrop-blur-md p-2 rounded-2xl border-2 border-white overflow-x-auto no-scrollbar">
                <UButton v-for="cat in categories" :key="cat.name" :label="cat.name" :icon="cat.icon" variant="ghost"
                    color="neutral" class="font-bold px-6 py-2 rounded-xl whitespace-nowrap transition-all duration-300"
                    :class="{ 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg': selectedCategory === cat.name }"
                    @click="selectedCategory = cat.name" />
            </div>
        </header>

        <div v-if="isSeeded" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- AI Magic Creator Card -->
            <UCard v-if="selectedCategory === 'All' || selectedCategory === 'Science'"
                class="group hover:ring-4 hover:ring-indigo-500/30 transition-all duration-500 rounded-[2.5rem] border-4 border-dashed border-indigo-200 shadow-xl overflow-hidden relative cursor-pointer bg-indigo-50/30"
                :ui="{ body: 'p-8 flex flex-col gap-6 relative z-10 h-full' }">
                <NuxtLink to="/adventures/create" class="absolute inset-0 z-0" />
                
                <div class="flex items-start justify-between pointer-events-none">
                    <div class="bg-indigo-500 p-5 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                        <UIcon name="i-ph-magic-wand-duotone" class="text-white size-10 flex" />
                    </div>
                    <UBadge color="neutral" variant="solid" class="bg-indigo-100 text-indigo-700 border-indigo-200 font-black rounded-full px-3 animate-pulse">
                        AI Magic
                    </UBadge>
                </div>

                <div class="flex flex-col gap-2 flex-1 pointer-events-none">
                    <h3 class="text-2xl font-black text-toned leading-tight">Create My Own!</h3>
                    <p class="text-muted font-medium leading-snug">Use AI to build a custom adventure about anything you want!</p>
                </div>

                <UButton to="/adventures/create" label="Start Magic →" size="lg" block
                    class="mt-4 font-black rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white border-0 relative z-10" />
            </UCard>

            <AdventureCard v-for="adv in filteredAdventures" :key="adv.title" :adventure="adv" />
        </div>
        <AppEmptyState v-else icon="i-ph-mountains-duotone" title="No Adventures Found!" color="indigo"
            message="Your adventure map is currently empty. Seed the data to start your journey!" />
    </div>
</template>
