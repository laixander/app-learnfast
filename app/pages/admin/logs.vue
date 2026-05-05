<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

import { MOCK_LOGS, type AdminLog } from '~/constants/adminData'

const { hasContent } = useUserStore()

const logs = ref<AdminLog[]>(hasContent.value ? [...MOCK_LOGS] : [])

watch(hasContent, (newVal) => {
    logs.value = newVal ? [...MOCK_LOGS] : []
})
</script>

<template>
    <div class="space-y-6 h-full flex flex-col">
        <div>
            <h2 class="text-3xl font-black text-slate-800">System Logs</h2>
            <p class="text-slate-500 font-medium italic">Monitor application events and health.</p>
        </div>

        <div class="flex-1 bg-slate-900 rounded-lg shadow-2xl overflow-hidden flex flex-col border border-slate-800">
            <!-- Terminal Header -->
            <div class="h-12 bg-slate-800 flex items-center px-4 gap-2 border-b border-slate-700">
                <div class="size-3 rounded-full bg-rose-500" />
                <div class="size-3 rounded-full bg-amber-500" />
                <div class="size-3 rounded-full bg-emerald-500" />
                <span class="ml-4 text-xs font-mono text-slate-400 uppercase tracking-widest">learnfast-main-log</span>
            </div>

            <!-- Log Stream -->
            <div class="flex-1 p-6 font-mono text-sm overflow-auto space-y-2">
                <div v-for="(log, i) in logs" :key="i" class="flex gap-4 group">
                    <span class="text-slate-500 shrink-0 select-none">[{{ log.timestamp }}]</span>
                    <span :class="{
                        'text-emerald-400': log.level === 'INFO',
                        'text-amber-400': log.level === 'WARN',
                        'text-rose-400': log.level === 'ERROR'
                    }" class="font-bold shrink-0">[{{ log.level }}]</span>
                    <span class="text-slate-300">{{ log.message }}</span>
                </div>
                <div class="animate-pulse text-emerald-400">_</div>
            </div>

            <div class="p-4 bg-slate-800/50 border-t border-slate-700 flex items-center justify-between">
                <div class="flex gap-4">
                    <UButton label="Clear Logs" variant="ghost" color="neutral" size="sm" />
                    <UButton label="Download JSON" variant="ghost" color="neutral" size="sm" />
                </div>
                <UBadge label="Live Stream: Active" color="success" variant="soft" size="md" />
            </div>
        </div>
    </div>
</template>
