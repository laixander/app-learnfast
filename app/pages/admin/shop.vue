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

const shopItems = ref([
    { id: 1, name: 'Space Explorer Avatar', price: 500, category: 'Avatar', status: 'Available', icon: 'i-ph-user-circle-duotone' },
    { id: 2, name: 'Golden Streak Freeze', price: 1000, category: 'Consumable', status: 'Available', icon: 'i-ph-snowflake-duotone' },
    { id: 3, name: 'Master of Math Title', price: 2500, category: 'Title', status: 'Hidden', icon: 'i-ph-identification-card-duotone' }
])

const columns: TableColumn<any>[] = [
    {
        accessorKey: 'icon',
        header: '',
        cell: ({ row }) => h(UIcon, {
            name: String(row.getValue('icon')),
            class: 'size-6 text-primary-500'
        })
    },
    {
        accessorKey: 'name',
        header: 'Item Name'
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
        cell: () => h(UButton, {
            icon: 'i-ph-pencil-duotone',
            variant: 'ghost',
            color: 'neutral'
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
                class="font-black rounded-xl" />
        </div>

        <UCard class="border-none shadow-xl shadow-slate-200/50 overflow-hidden" :ui="{ body: 'sm:p-0' }">
            <UTable :data="shopItems" :columns="columns" class="w-full" />
        </UCard>
    </div>
</template>
