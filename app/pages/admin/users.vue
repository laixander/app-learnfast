<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn, TabsItem } from '@nuxt/ui'

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

// Resolve components for use in h() functions
const UAvatar = resolveComponent('UAvatar')
const UBadge = resolveComponent('UBadge')
const UIcon = resolveComponent('UIcon')
const UButton = resolveComponent('UButton')

const users = ref([
    { id: 1, name: 'Felix', role: 'ADMIN', status: 'Active', avatar: 'Felix' },
    { id: 2, name: 'Luna', level: 8, coins: 1200, role: 'USER', status: 'Active', avatar: 'Luna', plan: 'Free' },
    { id: 3, name: 'Atlas', role: 'MODERATOR', status: 'Active', avatar: 'Atlas' },
    { id: 4, name: 'Nova', level: 3, coins: 450, role: 'USER', status: 'Inactive', avatar: 'Nova', plan: 'Free' },
    { id: 5, name: 'Orion', level: 22, coins: 12400, role: 'USER', status: 'Active', avatar: 'Orion', plan: 'Pro' },
    { id: 6, name: 'Professor P.', role: 'ADMIN', status: 'Active', avatar: 'Professor' },
    { id: 7, name: 'Sky Walker', level: 5, coins: 200, role: 'USER', status: 'Active', avatar: 'Sky', plan: 'Free' }
])

const activeTab = ref('explorers')
const tabs = [
    { label: 'Explorers', value: 'explorers', icon: 'i-ph-users-three-duotone', slot: 'explorers' as const },
    { label: 'Staff & Team', value: 'staff', icon: 'i-ph-shield-star-duotone', slot: 'staff' as const }
] satisfies TabsItem[]

const isEditModalOpen = ref(false)
const selectedUser = ref<any>(null)

const openEditModal = (user: any) => {
    selectedUser.value = { ...user }
    isEditModalOpen.value = true
}

// Columns for regular Explorers (Players)
const explorerColumns: TableColumn<any>[] = [
    {
        accessorKey: 'name',
        header: 'Explorer',
        cell: ({ row }) => h('div', { class: 'flex items-center gap-3' }, [
            h(UAvatar, {
                src: `https://api.dicebear.com/9.x/thumbs/svg?seed=${String(row.original.avatar)}`,
                size: 'xs'
            }),
            h('span', { class: 'font-black text-slate-800' }, String(row.getValue('name')))
        ])
    },
    {
        accessorKey: 'level',
        header: 'Level',
        cell: ({ row }) => h(UBadge, {
            label: `Lvl ${String(row.getValue('level'))}`,
            color: 'primary',
            variant: 'soft',
            size: 'md',
            class: 'font-black'
        })
    },
    {
        accessorKey: 'plan',
        header: 'Plan',
        cell: ({ row }) => {
            const plan = String(row.getValue('plan'))
            return h(UBadge, {
                label: plan,
                color: plan === 'Pro' ? 'primary' : 'neutral',
                variant: 'soft',
                size: 'md',
                class: 'font-black'
            })
        }
    },
    {
        accessorKey: 'coins',
        header: 'Coins',
        cell: ({ row }) => h('div', { class: 'flex items-center gap-1' }, [
            h(UIcon, { name: 'i-ph-atom-duotone', class: 'text-warning-500' }),
            h('span', { class: 'font-bold text-slate-700' }, Number(row.getValue('coins')).toLocaleString())
        ])
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = String(row.getValue('status'))
            return h(UBadge, {
                label: status,
                color: status === 'Active' ? 'success' : 'neutral',
                variant: 'subtle',
                size: 'md'
            })
        }
    },
    {
        accessorKey: 'actions',
        header: '',
        cell: ({ row }) => h(UButton, {
            icon: 'i-ph-pencil-simple-duotone',
            variant: 'ghost',
            color: 'neutral',
            onClick: () => openEditModal(row.original)
        })
    }
]

// Columns for Staff (Admins/Moderators)
const staffColumns: TableColumn<any>[] = [
    {
        accessorKey: 'name',
        header: 'Staff Member',
        cell: ({ row }) => h('div', { class: 'flex items-center gap-3' }, [
            h(UAvatar, {
                src: `https://api.dicebear.com/9.x/thumbs/svg?seed=${String(row.original.avatar)}`,
                size: 'xs'
            }),
            h('span', { class: 'font-black text-slate-800' }, String(row.getValue('name')))
        ])
    },
    {
        accessorKey: 'role',
        header: 'System Permissions',
        cell: ({ row }) => {
            const role = String(row.getValue('role'))
            const color = role === 'ADMIN' ? 'error' : 'secondary'
            return h(UBadge, {
                label: role,
                color: color,
                variant: 'solid',
                size: 'sm',
                class: 'font-black tracking-widest'
            })
        }
    },
    {
        accessorKey: 'status',
        header: 'Account Status',
        cell: ({ row }) => {
            const status = String(row.getValue('status'))
            return h(UBadge, {
                label: status,
                color: status === 'Active' ? 'success' : 'neutral',
                variant: 'subtle',
                size: 'md'
            })
        }
    },
    {
        accessorKey: 'actions',
        header: '',
        cell: ({ row }) => h(UButton, {
            icon: 'i-ph-shield-check-duotone',
            variant: 'ghost',
            color: 'neutral',
            onClick: () => openEditModal(row.original)
        })
    }
]

const q = ref('')
const explorersData = computed(() => users.value.filter(u => u.role === 'USER'))
const staffData = computed(() => users.value.filter(u => u.role !== 'USER'))

const modalTitle = computed(() => {
    if (!selectedUser.value) return ''
    const userType = selectedUser.value.role === 'USER' ? 'Explorer' : 'Staff Member'
    return `Edit ${userType}: ${selectedUser.value.name}`
})

const filteredExplorers = computed(() => {
    if (!q.value) return explorersData.value
    return explorersData.value.filter(u => u.name.toLowerCase().includes(q.value.toLowerCase()))
})

const filteredStaff = computed(() => {
    if (!q.value) return staffData.value
    return staffData.value.filter(u => u.name.toLowerCase().includes(q.value.toLowerCase()))
})

const saveUser = () => {
    const index = users.value.findIndex(u => u.id === selectedUser.value.id)
    if (index !== -1) {
        users.value[index] = selectedUser.value
        const toast = useToast()
        toast.add({
            title: 'Record Updated',
            description: `${selectedUser.value.name}'s details have been updated.`,
            color: 'success',
            icon: 'i-ph-check-circle-duotone'
        })
    }
    isEditModalOpen.value = false
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h2 class="text-3xl font-black text-slate-800">Directory Control</h2>
                <p class="text-slate-500 font-medium italic">Manage players and platform staff members.</p>
            </div>
            <div class="flex items-center gap-3">
                <UInput v-model="q" icon="i-ph-magnifying-glass-duotone" placeholder="Search directory..." class="w-64"
                    :ui="{ base: 'rounded-xl' }" />
            </div>
        </div>

        <UTabs v-model="activeTab" :items="tabs" class="w-full" :ui="{ list: 'rounded-2xl' }">
            <template #explorers>
                <UCard class="border-none shadow-xl shadow-slate-200/50 overflow-hidden mt-4" :ui="{ body: 'sm:p-0' }">
                    <UTable :data="filteredExplorers" :columns="explorerColumns" class="w-full" />
                </UCard>
            </template>

            <template #staff>
                <UCard class="border-none shadow-xl shadow-slate-200/50 overflow-hidden mt-4" :ui="{ body: 'sm:p-0' }">
                    <UTable :data="filteredStaff" :columns="staffColumns" class="w-full" />
                </UCard>
            </template>
        </UTabs>

        <!-- Edit Modal -->
        <UModal v-model:open="isEditModalOpen" v-if="selectedUser">
            <template #header>
                <div class="flex items-center justify-between w-full">
                    <h3 class="font-black text-slate-800">{{ modalTitle }}</h3>
                    <UButton color="neutral" variant="ghost" icon="i-ph-x-bold" @click="isEditModalOpen = false" />
                </div>
            </template>
            <template #body>
                <div class="space-y-6">
                    <div class="flex justify-center mb-4">
                        <div class="relative">
                            <UAvatar :src="`https://api.dicebear.com/9.x/thumbs/svg?seed=${selectedUser.avatar}`"
                                size="3xl" class="ring-4 ring-primary-100 shadow-xl" />
                        </div>
                    </div>

                    <UFormField label="Name / Identifier" class="font-bold">
                        <UInput v-model="selectedUser.name" class="rounded-xl" />
                    </UFormField>

                    <!-- Player Stats: Only show if NOT staff -->
                    <div v-if="selectedUser.role === 'USER'" class="space-y-6">
                        <div class="grid grid-cols-2 gap-4">
                            <UFormField label="Level" class="font-bold">
                                <UInput v-model.number="selectedUser.level" type="number" class="rounded-xl" />
                            </UFormField>
                            <UFormField label="Coins" class="font-bold">
                                <UInput v-model.number="selectedUser.coins" type="number" class="rounded-xl" />
                            </UFormField>
                        </div>
                        <UFormField label="Subscription Plan" class="font-bold">
                            <USelect v-model="selectedUser.plan" :options="['Free', 'Pro']" class="rounded-xl" />
                        </UFormField>
                    </div>

                    <!-- System Access: Visible for both but staff focus -->
                    <div class="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                        <UFormField label="System Role" class="font-bold">
                            <USelect v-model="selectedUser.role" :options="['USER', 'MODERATOR', 'ADMIN']"
                                class="rounded-xl" />
                        </UFormField>
                        <UFormField label="Account Status" class="font-bold">
                            <USelect v-model="selectedUser.status" :options="['Active', 'Inactive', 'Suspended']"
                                class="rounded-xl" />
                        </UFormField>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="flex justify-end gap-3">
                    <UButton label="Cancel" color="neutral" variant="ghost" class="font-bold"
                        @click="isEditModalOpen = false" />
                    <UButton label="Save Changes" color="primary"
                        class="font-black px-6 shadow-lg shadow-primary-500/20" @click="saveUser" />
                </div>
            </template>
        </UModal>
    </div>
</template>
