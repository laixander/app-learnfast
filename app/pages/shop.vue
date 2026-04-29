<script setup lang="ts">
import { SHOP_ITEMS } from '~/constants/gameData'

definePageMeta({
    layout: 'dashboard'
})

const { stats, isSeeded, hasContent } = useUserStore()
</script>

<template>
    <div class="relative z-10 flex flex-col gap-8">
        <header class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="flex flex-col gap-2">
                <h1 class="text-4xl md:text-6xl font-black text-toned">
                    Explorer <span class="text-orange-500">Shop</span>
                </h1>
                <p class="text-xl text-muted font-medium">Spend your Magic Coins on cool gear!</p>
            </div>
            <div v-if="hasContent"
                class="bg-white/60 backdrop-blur-md px-8 py-4 rounded-3xl border-2 border-white flex items-center gap-4 shadow-xl">
                <UIcon name="i-ph-coins-duotone" class="text-orange-500 size-10" />
                <div class="flex flex-col">
                    <span class="text-sm font-bold text-muted uppercase">Your Balance</span>
                    <span class="text-3xl font-black text-toned">{{ stats.coins }}</span>
                </div>
            </div>
        </header>

        <template v-if="hasContent">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <UCard v-for="item in SHOP_ITEMS" :key="item.name"
                    class="group hover:ring-4 hover:ring-orange-500/30 transition-all duration-500 rounded-[2.5rem] border-0 shadow-xl overflow-hidden"
                    :ui="{ body: 'p-8 flex flex-col items-center text-center gap-4' }">
                    <div
                        :class="[item.color, 'p-6 rounded-3xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500']">
                        <UIcon :name="item.icon" class="text-white size-12 flex" />
                    </div>
                    <div>
                        <h3 class="text-2xl font-black text-toned">{{ item.name }}</h3>
                        <p class="text-muted font-medium text-sm mt-1">{{ item.description }}</p>
                    </div>
                    <div
                        class="flex items-center gap-2 bg-orange-100 text-orange-700 px-6 py-2 rounded-2xl font-black text-xl">
                        <UIcon name="i-ph-coins-duotone" />
                        {{ item.price }}
                    </div>
                    <UButton label="Buy Now" block color="warning" class="mt-2 font-black rounded-xl py-3" />
                </UCard>
            </div>
        </template>
        <AppEmptyState v-else icon="i-ph-storefront-duotone" title="Shop is Empty!" color="amber"
            message="No items available right now. Seed the data to stock the shelves!" />
    </div>
</template>
