<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

const logs = ref([
    { timestamp: '2026-05-04 10:15:02', level: 'INFO', message: 'User "Felix" logged in successfully.', type: 'auth' },
    { timestamp: '2026-05-04 10:16:45', level: 'WARN', message: 'AI Token limit reaching 80% for session_id_9f4f.', type: 'system' },
    { timestamp: '2026-05-04 10:18:12', level: 'ERROR', message: 'Failed to load asset: /img/missing-avatar.png', type: 'error' },
    { timestamp: '2026-05-04 10:20:30', level: 'INFO', message: 'Admin updated shop pricing for "Streak Freeze".', type: 'admin' },
    { timestamp: '2026-05-04 10:22:15', level: 'INFO', message: 'New user "Luna" registered.', type: 'auth' }
])
</script>

<template>
    <div class="space-y-6 h-full flex flex-col">
        <div>
            <h2 class="text-3xl font-black text-slate-800">System Logs</h2>
            <p class="text-slate-500 font-medium italic">Monitor application events and health.</p>
        </div>

        <div class="flex-1 bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-800">
            <!-- Terminal Header -->
            <div class="h-10 bg-slate-800 flex items-center px-4 gap-2 border-b border-slate-700">
                <div class="size-3 rounded-full bg-rose-500" />
                <div class="size-3 rounded-full bg-amber-500" />
                <div class="size-3 rounded-full bg-emerald-500" />
                <span class="ml-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest">learnfast-main-log</span>
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
                    <UButton label="Clear Logs" variant="ghost" color="neutral" size="xs" />
                    <UButton label="Download JSON" variant="ghost" color="neutral" size="xs" />
                </div>
                <UBadge label="Live Stream: Active" color="success" variant="soft" size="xs" />
            </div>
        </div>
    </div>
</template>
