<script setup lang="ts">
definePageMeta({
    layout: 'dashboard'
})

const { categories, adventures } = useAdventures()
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
            <div
                class="flex gap-2 bg-white/60 backdrop-blur-md p-2 rounded-2xl border-2 border-white overflow-x-auto no-scrollbar">
                <UButton v-for="cat in categories" :key="cat.name" :label="cat.name" :icon="cat.icon" variant="ghost"
                    color="neutral" class="font-bold px-6 py-2 rounded-xl whitespace-nowrap transition-all duration-300"
                    :class="{ 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg': selectedCategory === cat.name }"
                    @click="selectedCategory = cat.name" />
            </div>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <UCard v-for="adv in filteredAdventures" :key="adv.title"
                class="group hover:ring-8 hover:ring-primary-500/20 transition-all duration-500 rounded-[3rem] border-0 shadow-2xl overflow-hidden relative"
                :ui="{ body: 'p-10 flex flex-col gap-6' }">
                <div class="flex items-start justify-between">
                    <div
                        :class="[adv.color, 'p-6 rounded-[2rem] shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500']">
                        <UIcon :name="adv.icon" class="text-white size-12 flex" />
                    </div>
                    <div
                        class="bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full font-black text-primary-600 shadow-md">
                        {{ adv.progress }}%
                    </div>
                </div>
                <div>
                    <div class="text-sm font-black text-primary-600 uppercase tracking-widest">{{ adv.category }}</div>
                    <h3 class="text-3xl font-black text-toned leading-tight">{{ adv.title }}</h3>
                    <p class="text-muted font-medium mt-2 leading-snug">{{ adv.description }}</p>
                </div>
                <div class="flex flex-col gap-4 mt-2">
                    <div class="h-5 bg-primary-100 rounded-full overflow-hidden p-1 shadow-inner">
                        <div class="h-full rounded-full transition-all duration-1000" :class="adv.color"
                            :style="{ width: `${adv.progress}%` }" />
                    </div>
                    <UButton :to="`/adventures/${adv.slug}`" :label="adv.progress > 0 ? 'Continue' : 'Start Adventure'"
                        block size="xl" class="font-black rounded-2xl py-4 hover:translate-x-2 transition-transform"
                        :color="adv.progress > 0 ? 'primary' : 'neutral'" />
                </div>
            </UCard>
        </div>
    </div>
</template>
