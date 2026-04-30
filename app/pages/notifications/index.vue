<script setup lang="ts">
definePageMeta({
    layout: 'dashboard'
})

const {
    isSeeded,
    hasContent,
    notifications,
    markNoteRead,
    toggleNoteRead,
    deleteNote,
    clearAllNotes
} = useUserStore()

const viewDetails = (id: number) => {
    console.log('Navigating to notification:', id)
    markNoteRead(id)
    return navigateTo(`/notifications/${id}`)
}

const getActions = (id: number) => {
    const note = notifications.value.find(n => n.id === id)
    return [
        [{
            label: 'View Details',
            icon: 'i-ph-eye-duotone',
            to: `/notifications/${id}`
        }],
        [{
            label: note?.read ? 'Mark as Unread' : 'Mark as Read',
            icon: note?.read ? 'i-ph-envelope-simple-duotone' : 'i-ph-check-circle-duotone',
            onSelect: () => toggleNoteRead(id)
        }, {
            label: 'Delete',
            icon: 'i-ph-trash-duotone',
            color: 'rose' as const,
            onSelect: () => deleteNote(id)
        }]
    ]
}
</script>

<template>
    <div class="relative z-10 flex flex-col gap-8 max-w-3xl mx-auto">
        <header class="flex flex-col gap-2">
            <h1 class="text-4xl md:text-6xl font-black text-toned">
                News & <span class="text-primary-600">Updates</span>
            </h1>
            <p class="text-xl text-muted font-medium">See what's happening in your adventure!</p>
        </header>

        <template v-if="hasContent && notifications.length">
            <div class="flex flex-col gap-4">
                <div v-for="note in notifications" :key="note.id"
                    class="group flex items-center gap-6 bg-white/60 backdrop-blur-md p-6 rounded-[2.5rem] border-2 border-white shadow-xl hover:-translate-x-2 transition-all duration-300 cursor-pointer relative"
                    :class="{ 'opacity-70 shadow-sm grayscale-[0.3]': note.read }" @click="viewDetails(note.id)">

                    <!-- Unread Dot -->
                    <div v-if="!note.read" class="absolute top-9 left-6 z-20">
                        <span class="relative flex h-4 w-4">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-4 w-4 bg-primary-500"></span>
                        </span>
                    </div>

                    <div
                        :class="[note.bg, 'p-4 rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-500']">
                        <UIcon :name="note.icon" :class="[note.color, 'size-10 flex']" />
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center gap-2">
                            <h3 class="text-xl font-black text-toned">{{ note.title }}</h3>
                            <UBadge v-if="!note.read" color="primary" variant="subtle" size="sm">NEW</UBadge>
                        </div>
                        <p class="text-muted font-medium">{{ note.message }}</p>
                        <span class="text-sm font-bold text-primary-400 mt-1 block">{{ note.time }}</span>
                    </div>
                    <UDropdownMenu :items="getActions(note.id)" :popper="{ placement: 'bottom-end' }">
                        <UButton icon="i-ph-dots-three-outline-vertical-fill" variant="ghost" color="neutral"
                            class="rounded-full" @click.stop />
                    </UDropdownMenu>
                </div>
            </div>

            <UButton label="Clear All Notifications" variant="subtle" block class="font-bold py-4"
                @click="clearAllNotes" />
        </template>
        <AppEmptyState v-else icon="i-ph-bell-slash-duotone" title="All Caught Up!" color="cyan"
            message="No new notifications at the moment. We'll let you know when something exciting happens!" />
    </div>
</template>
