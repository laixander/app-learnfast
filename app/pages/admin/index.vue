<script setup lang="ts">
import { EMPTY_ADMIN_STATS } from '~/constants/adminData'

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

const { adminStats, adminActions, hasContent } = useUserStore()

const displayStats = computed(() => {
    return adminStats.value.length > 0 ? adminStats.value : EMPTY_ADMIN_STATS
})
</script>

<template>
    <div class="space-y-10">
        <!-- Welcome Section -->
        <div class="flex flex-col gap-2">
            <h2 class="text-3xl font-black text-slate-800">Mission Control</h2>
            <p class="text-slate-500 font-medium italic">Everything is looking stellar today, Captain!</p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <UCard v-for="stat in displayStats" :key="stat.label"
                class="overflow-hidden border-none shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/60 transition-all duration-300 group">
                <div class="flex items-center justify-between">
                    <div
                        :class="`size-12 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 group-hover:scale-110 transition-transform duration-300`">
                        <UIcon :name="stat.icon" class="size-6" />
                    </div>
                    <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ stat.trend
                    }}</span>
                </div>
                <div class="mt-4">
                    <p class="text-slate-500 font-bold text-xs uppercase tracking-wider">{{ stat.label }}</p>
                    <p class="text-3xl font-black text-slate-800 mt-1">{{ stat.value }}</p>
                </div>
            </UCard>
        </div>

        <!-- Activity & Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Recent Activity -->
            <UCard class="lg:col-span-2 border-none shadow-xl shadow-slate-200/50" :ui="{ body: 'sm:p-4' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="font-black text-slate-800 flex items-center gap-2">
                            <UIcon name="i-ph-clock-counter-clockwise-duotone" class="text-primary-500" />
                            Recent Activity
                        </h3>
                        <UButton label="View All" variant="ghost" color="neutral" size="xs" class="font-bold" />
                    </div>
                </template>

                <div v-if="adminActions.length > 0" class="space-y-1">
                    <div v-for="(item, i) in adminActions" :key="i"
                        class="flex items-center justify-between group hover:bg-primary-50 p-4 rounded-2xl transition-all duration-300">
                        <div class="flex items-center gap-4">
                            <div
                                :class="`size-10 rounded-full bg-${item.color}-50 flex items-center justify-center text-${item.color}-600`">
                                <UIcon :name="item.icon" class="size-5" />
                            </div>
                            <div>
                                <p class="text-sm font-black text-slate-800">
                                    <span class="text-primary-600">{{ item.user }}</span> {{ item.action }}
                                </p>
                                <p class="text-xs font-bold text-slate-400">{{ item.time }}</p>
                            </div>
                        </div>
                        <UButton icon="i-ph-dots-three-bold" variant="ghost" color="neutral"
                            class="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>

                <!-- Empty State for Activity -->
                <div v-else class="py-12 flex flex-col items-center justify-center text-center px-4">
                    <div class="size-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-4">
                        <UIcon name="i-ph-ghost-duotone" class="size-10" />
                    </div>
                    <h4 class="text-lg font-black text-slate-800">No activity logged yet</h4>
                    <p class="text-sm text-slate-500 font-medium max-w-xs mt-1">Actions taken by explorers and admins will appear here once the mission starts.</p>
                </div>
            </UCard>

            <!-- Quick Controls -->
            <div class="space-y-6">
                <UCard
                    class="border-none shadow-xl shadow-slate-200/50 bg-linear-to-br from-primary-500 to-violet-600 text-white">
                    <div class="space-y-4">
                        <div class="flex items-center gap-3">
                            <UIcon name="i-ph-lightning-duotone" class="size-6" />
                            <h3 class="font-black">Quick Actions</h3>
                        </div>
                        <p class="text-xs font-bold text-primary-100 opacity-80">Commonly used administrative triggers.
                        </p>
                        <div class="grid grid-cols-2 gap-3 mt-4">
                            <UButton label="Reset Quests" variant="soft" color="neutral" block
                                class="text-primary-600 font-black text-xs h-10" />
                            <UButton label="Add XP Bonus" variant="soft" color="neutral" block
                                class="text-primary-600 font-black text-xs h-10" />
                            <UButton label="Broadcast" variant="soft" color="neutral" block
                                class="text-primary-600 font-black text-xs h-10 col-span-2" />
                        </div>
                    </div>
                </UCard>

                <UCard class="border-none shadow-xl shadow-slate-200/50">
                    <h3 class="font-black text-slate-800 flex items-center gap-2 mb-4">
                        <UIcon name="i-ph-info-duotone" class="text-info-500" />
                        System Status
                    </h3>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold text-slate-500">Database</span>
                            <UBadge label="Connected" color="success" variant="soft" size="md" />
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold text-slate-500">AI Engine</span>
                            <UBadge label="Online" color="success" variant="soft" size="md" />
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-xs font-bold text-slate-500">Storage</span>
                            <UBadge label="84% Free" color="info" variant="soft" size="md" />
                        </div>
                    </div>
                </UCard>
            </div>
        </div>
    </div>
</template>
