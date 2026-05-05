<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

const UBadge = resolveComponent('UBadge')
const UIcon = resolveComponent('UIcon')
const UButton = resolveComponent('UButton')

import { type AdminShopItem } from '~/constants/adminData'

const { shopItems, hasContent } = useUserStore()

const isEditModalOpen = ref(false)
const selectedItem = ref<AdminShopItem | null>(null)

const modalTitle = computed(() => {
    if (!selectedItem.value) return ''
    const isNew = !shopItems.value.some(i => i.id === selectedItem.value?.id)
    return isNew ? 'Add New Item' : `Edit Item: ${selectedItem.value.name}`
})

const colorOptions = [
    'primary', 'success', 'warning', 'info', 'error',
    'rose', 'fuchsia', 'purple', 'violet', 'indigo',
    'blue', 'sky', 'cyan', 'teal', 'emerald',
    'green', 'lime', 'yellow', 'amber', 'orange', 'red'
]

const iconOptions = [
    'i-ph-star-duotone', 'i-ph-planet-duotone', 'i-ph-rocket-launch-duotone',
    'i-ph-snowflake-duotone', 'i-ph-identification-card-duotone', 'i-ph-user-circle-duotone',
    'i-ph-magic-wand-duotone', 'i-ph-palette-duotone', 'i-ph-sword-duotone',
    'i-ph-shield-duotone', 'i-ph-crown-duotone', 'i-ph-lightning-duotone',
    'i-ph-fire-duotone', 'i-ph-drop-duotone', 'i-ph-leaf-duotone',
    'i-ph-heart-duotone', 'i-ph-gem-duotone', 'i-ph-coins-duotone',
    'i-ph-medal-duotone', 'i-ph-trophy-duotone', 'i-ph-backpack-duotone'
]

const openAddItemModal = () => {
    selectedItem.value = {
        id: Date.now(),
        name: '',
        price: 100,
        category: 'Consumable',
        status: 'Available',
        icon: 'i-ph-star-duotone',
        color: 'bg-primary-500',
        description: ''
    }
    isEditModalOpen.value = true
}

const openEditItemModal = (item: AdminShopItem) => {
    selectedItem.value = { ...item }
    isEditModalOpen.value = true
}

const saveItem = () => {
    if (!selectedItem.value) return
    const index = shopItems.value.findIndex(i => i.id === selectedItem.value!.id)
    const toast = useToast()

    if (index !== -1) {
        shopItems.value[index] = selectedItem.value
        toast.add({
            title: 'Item Updated',
            description: `${selectedItem.value.name} has been updated.`,
            color: 'success',
            icon: 'i-ph-check-circle-duotone'
        })
    } else {
        shopItems.value.unshift(selectedItem.value)
        toast.add({
            title: 'Item Added',
            description: `${selectedItem.value.name} has been added to the shop.`,
            color: 'success',
            icon: 'i-ph-check-circle-duotone'
        })
    }
    isEditModalOpen.value = false
}

const columns: TableColumn<any>[] = [
    {
        accessorKey: 'name',
        header: 'Item Name',
        cell: ({ row }) => h('div', { class: 'flex items-center gap-3' }, [
            h('div', { class: `size-10 rounded-xl flex items-center justify-center ${row.original.color || 'bg-slate-100'}` }, [
                h(UIcon, { name: String(row.original.icon), class: 'size-6 text-white' })
            ]),
            h('span', { class: 'font-bold text-slate-800' }, String(row.getValue('name')))
        ])
    },
    {
        accessorKey: 'category',
        header: 'Category'
    },
    {
        accessorKey: 'price',
        header: 'Price (Coins)',
        cell: ({ row }) => h('div', { class: 'flex items-center gap-1 font-black text-warning-600' }, [
            h(UIcon, { name: 'i-ph-atom-bold' }),
            h('span', {}, String(row.getValue('price')))
        ])
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = String(row.getValue('status'))
            return h(UBadge, {
                label: status,
                color: status === 'Available' ? 'success' : 'neutral',
                variant: 'subtle',
                size: 'md'
            })
        }
    },
    {
        accessorKey: 'actions',
        header: '',
        cell: ({ row }) => h(UButton, {
            icon: 'i-ph-pencil-duotone',
            variant: 'ghost',
            color: 'neutral',
            onClick: () => openEditItemModal(row.original)
        })
    }
]
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-3xl font-black text-slate-800">Shop Inventory</h2>
                <p class="text-slate-500 font-medium italic">Adjust prices and manage rewards.</p>
            </div>
            <UButton icon="i-ph-shopping-cart-simple-duotone" label="Add Item" color="primary"
                class="font-black rounded-xl" @click="openAddItemModal" />
        </div>

        <UCard class="border-none shadow-xl shadow-slate-200/50 overflow-hidden" :ui="{ body: 'sm:p-0' }">
            <UTable v-if="shopItems.length > 0" :data="shopItems" :columns="columns" class="w-full" />
            <div v-else class="py-12 flex flex-col items-center justify-center text-center px-4">
                <div class="size-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-4">
                    <UIcon name="i-ph-storefront-duotone" class="size-10" />
                </div>
                <h4 class="text-lg font-black text-slate-800">Shop is empty</h4>
                <p class="text-sm text-slate-500 font-medium max-w-xs mt-1">There are no items to display. Seed the database or add an item.</p>
            </div>
        </UCard>

        <!-- Edit Modal -->
        <UModal v-model:open="isEditModalOpen" v-if="selectedItem">
            <template #header>
                <div class="flex items-center justify-between w-full">
                    <h3 class="font-black text-slate-800">{{ modalTitle }}</h3>
                    <UButton color="neutral" variant="ghost" icon="i-ph-x-bold" @click="isEditModalOpen = false" />
                </div>
            </template>
            <template #body>
                <div class="space-y-6">
                    <div class="flex justify-center mb-4">
                        <div :class="[selectedItem.color, 'p-6 rounded-3xl shadow-lg']">
                            <UIcon :name="selectedItem.icon" class="text-white size-12 flex" />
                        </div>
                    </div>

                    <UFormField label="Item Name" class="font-bold">
                        <UInput v-model="selectedItem.name" class="rounded-xl w-full" />
                    </UFormField>

                    <UFormField label="Description" class="font-bold">
                        <UTextarea v-model="selectedItem.description" class="w-full" :rows="2" :ui="{ base: 'rounded-xl' }" />
                    </UFormField>

                    <div class="grid grid-cols-2 gap-4">
                        <UFormField label="Price (Coins)" class="font-bold">
                            <UInput v-model.number="selectedItem.price" type="number" class="rounded-xl w-full" />
                        </UFormField>
                        <UFormField label="Category" class="font-bold">
                            <USelect v-model="selectedItem.category" :items="['Avatar', 'Consumable', 'Title']" class="rounded-xl w-full" />
                        </UFormField>
                    </div>

                    <div class="pt-4 border-t border-slate-100 space-y-4">
                        <UFormField label="Icon (Phosphor)" class="font-bold">
                            <div class="flex flex-wrap gap-2 mb-3 max-h-40 overflow-y-auto p-1 scrollbar-hide">
                                <button v-for="icon in iconOptions" :key="icon" type="button"
                                    @click="selectedItem.icon = icon" :class="[
                                        'size-10 rounded-xl flex items-center justify-center transition-all duration-200 border-2 shrink-0',
                                        selectedItem.icon === icon ? 'bg-primary-500 text-white border-primary-500 shadow-md shadow-primary-500/20' : 'bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100'
                                    ]" :title="icon">
                                    <UIcon :name="icon" class="size-6" />
                                </button>
                            </div>
                            <UInput v-model="selectedItem.icon" placeholder="e.g. i-ph-star-duotone" class="rounded-xl w-full" />
                        </UFormField>
                        
                        <UFormField label="Color Theme" class="font-bold">
                            <div class="flex flex-wrap gap-2 py-1 mb-3">
                                <button v-for="color in colorOptions" :key="color" type="button"
                                    @click="selectedItem.color = `bg-${color}-500`" :class="[
                                        'size-8 rounded-full transition-all duration-200 ring-offset-2 border-2 border-white shadow-sm',
                                        `bg-${color}-500`,
                                        selectedItem.color === `bg-${color}-500` ? 'ring-2 ring-slate-800 scale-110' : 'hover:scale-110 opacity-70 hover:opacity-100'
                                    ]" :title="color" />
                            </div>
                            <UInput v-model="selectedItem.color" placeholder="e.g. bg-primary-500" class="rounded-xl w-full" />
                        </UFormField>
                    </div>

                    <UFormField label="Status" class="font-bold">
                        <USelect v-model="selectedItem.status" :items="['Available', 'Hidden', 'Out of Stock']" class="rounded-xl w-full" />
                    </UFormField>
                </div>
            </template>
            <template #footer>
                <div class="flex justify-end gap-3 w-full">
                    <UButton label="Cancel" color="neutral" variant="ghost" class="font-bold" @click="isEditModalOpen = false" />
                    <UButton label="Save Changes" color="primary" class="font-black px-6 shadow-lg shadow-primary-500/20 rounded-xl" @click="saveItem" />
                </div>
            </template>
        </UModal>
    </div>
</template>
