<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

definePageMeta({
    layout: 'admin',
    middleware: 'admin'
})

const { suggestions, addSuggestion, removeSuggestion, updateSuggestion, isLoading: isPromptLoading } = useSuggestions()
const { categories, addCategory, removeCategory, updateCategory, seedDefaults, isLoading } = useCategories()
const { adventures } = useAdventures()

const getAdventureCount = (categoryName: string) => {
    return adventures.value.filter(a => a.category === categoryName).length
}

const activeTab = ref('categories')
const tabs = [
    { label: 'Categories', value: 'categories', icon: 'i-ph-folder-duotone', slot: 'categories' as const },
    { label: 'Magical Prompts', value: 'prompts', icon: 'i-ph-magic-wand-duotone', slot: 'prompts' as const }
] satisfies TabsItem[]

const colorOptions = [
    'primary', 'success', 'warning', 'info', 'error',
    'rose', 'fuchsia', 'purple', 'violet', 'indigo',
    'blue', 'sky', 'cyan', 'teal', 'emerald',
    'green', 'lime', 'yellow', 'amber', 'orange', 'red'
]

const iconOptions = [
    'i-ph-folder-duotone', 'i-ph-sparkle-duotone', 'i-ph-planet-duotone',
    'i-ph-flask-duotone', 'i-ph-book-open-duotone', 'i-ph-graduation-cap-duotone',
    'i-ph-atom-duotone', 'i-ph-brain-duotone', 'i-ph-rocket-launch-duotone',
    'i-ph-microscope-duotone', 'i-ph-globe-hemisphere-west-duotone', 'i-ph-palette-duotone',
    'i-ph-music-notes-duotone', 'i-ph-leaf-duotone', 'i-ph-lightning-duotone',
    'i-ph-star-duotone', 'i-ph-map-trifold-duotone', 'i-ph-calculator-duotone',
    'i-ph-dna-duotone', 'i-ph-cpu-duotone', 'i-ph-tree-evergreen-duotone'
]

// Category Management State
const isCategoryModalOpen = ref(false)
const editingCategory = ref<any>(null)
const categoryForm = reactive({
    name: '',
    icon: 'i-ph-folder-duotone',
    color: 'primary',
    keywords: ''
})

const openAddCategory = () => {
    editingCategory.value = null
    categoryForm.name = ''
    categoryForm.icon = 'i-ph-folder-duotone'
    categoryForm.color = 'primary'
    categoryForm.keywords = ''
    isCategoryModalOpen.value = true
}

const openEditCategory = (cat: any) => {
    editingCategory.value = cat
    categoryForm.name = cat.name
    categoryForm.icon = cat.icon
    categoryForm.color = cat.color
    categoryForm.keywords = cat.keywords.join(', ')
    isCategoryModalOpen.value = true
}

const handleSaveCategory = () => {
    const keywordsArray = categoryForm.keywords.split(',').map(k => k.trim()).filter(k => k)
    if (editingCategory.value) {
        updateCategory(editingCategory.value.id, categoryForm.name, categoryForm.icon, categoryForm.color, keywordsArray)
    } else {
        addCategory(categoryForm.name, categoryForm.icon, categoryForm.color, keywordsArray)
    }
    isCategoryModalOpen.value = false
}

// Suggestion Management State
const isPromptModalOpen = ref(false)
const editingPrompt = ref<any>(null)
const promptForm = reactive({
    label: '',
    value: '',
    icon: 'i-ph-sparkle-duotone',
    color: 'primary'
})

const openAddPrompt = () => {
    editingPrompt.value = null
    promptForm.label = ''
    promptForm.value = ''
    promptForm.icon = 'i-ph-sparkle-duotone'
    promptForm.color = 'primary'
    isPromptModalOpen.value = true
}

const openEditPrompt = (s: any) => {
    editingPrompt.value = s
    promptForm.label = s.label
    promptForm.value = s.value
    promptForm.icon = s.icon || 'i-ph-sparkle-duotone'
    promptForm.color = s.color || 'primary'
    isPromptModalOpen.value = true
}

const handleSavePrompt = () => {
    if (editingPrompt.value) {
        updateSuggestion(editingPrompt.value.id, promptForm.label, promptForm.value, promptForm.icon, promptForm.color)
    } else {
        addSuggestion(promptForm.label, promptForm.value, promptForm.icon, promptForm.color)
    }
    isPromptModalOpen.value = false
}
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-3xl font-black text-slate-800">Content Engine</h2>
                <p class="text-slate-500 font-medium italic">Control categories and AI magic prompts.</p>
            </div>
            <UButton v-if="activeTab === 'categories'" @click="openAddCategory" icon="i-ph-plus-bold"
                label="Add Category" color="primary" :loading="isLoading"
                class="font-black rounded-xl shadow-lg shadow-primary-500/20" />
            <UButton v-else @click="openAddPrompt" icon="i-ph-sparkle-bold" label="Add Prompt" color="primary"
                :loading="isPromptLoading" class="font-black rounded-xl shadow-lg shadow-primary-500/20" />
        </div>

        <UTabs v-model="activeTab" :items="tabs" class="w-full" :ui="{ list: 'rounded-2xl' }">
            <template #categories>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    <UCard v-for="cat in categories" :key="cat.id"
                        class="border-none shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300">
                        <!-- ... card content ... -->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <div
                                    :class="`size-12 shrink-0 rounded-2xl bg-${cat.color}-50 flex items-center justify-center text-${cat.color}-600`">
                                    <UIcon :name="cat.icon" class="size-6" />
                                </div>
                                <div>
                                    <h3 class="font-black text-lg text-slate-800">{{ cat.name }}</h3>
                                    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">{{
                                        cat.keywords.length }} AI Keywords</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-1">
                                <UButton icon="i-ph-pencil-duotone" variant="ghost" color="neutral"
                                    @click="openEditCategory(cat)" />
                                <UButton icon="i-ph-trash-duotone" variant="ghost" color="error"
                                    @click="removeCategory(cat.id)" />
                            </div>
                        </div>
                        <div class="mt-4 flex items-center justify-between">
                            <div class="flex flex-wrap gap-1.5">
                                <UBadge v-for="k in cat.keywords.slice(0, 5)" :key="k" :label="k" variant="soft"
                                    size="md" :color="(cat.color as any)" class="rounded-lg font-bold" />
                                <UBadge v-if="cat.keywords.length > 5" :label="`+${cat.keywords.length - 5}`"
                                    variant="soft" size="md" color="neutral" class="rounded-lg font-bold" />
                            </div>

                            <div class="flex items-center gap-1.5 text-slate-400 font-bold text-xs shrink-0 ml-4">
                                <UIcon name="i-ph-mountains-duotone" class="size-4" />
                                <span>{{ getAdventureCount(cat.name) }}</span>
                            </div>
                        </div>
                    </UCard>
                    <AppEmptyState v-if="categories.length === 0" title="No categories found"
                        message="Add a new category to get started." icon="i-ph-folder-duotone"
                        class="md:col-span-2 lg:col-span-3" />
                </div>
            </template>

            <template #prompts>
                <!-- ... existing prompt template ... -->
                <div class="mt-4 space-y-4">
                    <UCard v-for="s in suggestions" :key="s.id"
                        class="border-none shadow-lg shadow-slate-200/50 overflow-hidden" :ui="{ body: 'p-4' }">
                        <div class="flex items-center justify-between gap-4">
                            <div class="flex items-center gap-4 flex-1">
                                <div
                                    :class="['size-12 shrink-0 rounded-xl flex items-center justify-center', `bg-${s.color}-50 text-${s.color}-600`]">
                                    <UIcon :name="s.icon" class="size-6" />
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-black text-slate-800 text-lg">{{ s.label }}</h4>
                                    <p class="text-sm text-slate-500 font-medium">{{ s.value }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-1">
                                <UButton icon="i-ph-pencil-duotone" variant="ghost" color="neutral"
                                    @click="openEditPrompt(s)" />
                                <UButton icon="i-ph-trash-duotone" variant="ghost" color="error"
                                    @click="removeSuggestion(s.id)" />
                            </div>
                        </div>
                    </UCard>

                    <AppEmptyState v-if="suggestions.length === 0" title="No magical prompts"
                        message="Add some sparks of inspiration for the explorers." icon="i-ph-sparkle-duotone" />
                </div>
            </template>
        </UTabs>

        <!-- Category Modal -->
        <UModal v-model:open="isCategoryModalOpen">
            <template #header>
                <div class="flex items-center justify-between w-full">
                    <h3 class="font-black text-slate-800">{{ editingCategory ? 'Edit' : 'Add' }} Category</h3>
                    <UButton color="neutral" variant="ghost" icon="i-ph-x-bold" @click="isCategoryModalOpen = false" />
                </div>
            </template>
            <template #body>
                <div class="space-y-6">
                    <UFormField label="Category Name" class="font-bold">
                        <UInput v-model="categoryForm.name" placeholder="e.g. Science" class="rounded-xl w-full" />
                    </UFormField>
                    <UFormField label="Icon (Phosphor)" class="font-bold">
                        <div class="flex flex-wrap gap-2 mb-3 max-h-40 overflow-y-auto p-1 scrollbar-hide">
                            <button v-for="icon in iconOptions" :key="icon" type="button"
                                @click="categoryForm.icon = icon" :class="[
                                    'size-10 rounded-xl flex items-center justify-center transition-all duration-200 border-2 shrink-0',
                                    categoryForm.icon === icon ? 'bg-primary-500 text-white border-primary-500 shadow-md shadow-primary-500/20' : 'bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100'
                                ]" :title="icon">
                                <UIcon :name="icon" class="size-6" />
                            </button>
                        </div>
                        <UInput v-model="categoryForm.icon" placeholder="e.g. i-ph-flask-duotone"
                            class="rounded-xl w-full" />
                    </UFormField>
                    <UFormField label="Color Key" class="font-bold">
                        <div class="flex flex-wrap gap-2 py-1">
                            <button v-for="color in colorOptions" :key="color" type="button"
                                @click="categoryForm.color = color" :class="[
                                    'size-8 rounded-full transition-all duration-200 ring-offset-2 border-2 border-white shadow-sm',
                                    `bg-${color}-500`,
                                    categoryForm.color === color ? 'ring-2 ring-slate-800 scale-110' : 'hover:scale-110 opacity-70 hover:opacity-100'
                                ]" :title="color" />
                        </div>
                    </UFormField>
                    <UFormField label="Keywords (Comma separated)" help="Used by AI to categorize new adventures"
                        class="font-bold">
                        <UTextarea v-model="categoryForm.keywords" placeholder="space, planet, science, experiment..."
                            class="w-full" :rows="3" :ui="{ base: 'rounded-md' }" />
                    </UFormField>
                </div>
            </template>
            <template #footer>
                <div class="flex justify-end gap-3 w-full">
                    <UButton label="Cancel" color="neutral" variant="ghost" class="font-bold"
                        @click="isCategoryModalOpen = false" />
                    <UButton :label="editingCategory ? 'Update Category' : 'Create Category'" color="primary"
                        :loading="isLoading" class="font-black px-6 rounded-xl" @click="handleSaveCategory" />
                </div>
            </template>
        </UModal>

        <!-- Prompt Modal -->
        <UModal v-model:open="isPromptModalOpen">
            <template #header>
                <div class="flex items-center justify-between w-full">
                    <h3 class="font-black text-slate-800">{{ editingPrompt ? 'Edit' : 'Add' }} Magic Prompt</h3>
                    <UButton color="neutral" variant="ghost" icon="i-ph-x-bold" @click="isPromptModalOpen = false" />
                </div>
            </template>
            <template #body>
                <div class="space-y-6">
                    <UFormField label="Label" class="font-bold">
                        <UInput v-model="promptForm.label" placeholder="e.g. Outer Space" class="rounded-xl" />
                    </UFormField>
                    <UFormField label="Icon (Phosphor)" class="font-bold">
                        <div class="flex flex-wrap gap-2 mb-3 max-h-40 overflow-y-auto p-1 scrollbar-hide">
                            <button v-for="icon in iconOptions" :key="icon" type="button"
                                @click="promptForm.icon = icon" :class="[
                                    'size-10 rounded-xl flex items-center justify-center transition-all duration-200 border-2 shrink-0',
                                    promptForm.icon === icon ? 'bg-primary-500 text-white border-primary-500 shadow-md shadow-primary-500/20' : 'bg-slate-50 text-slate-500 border-transparent hover:bg-slate-100'
                                ]" :title="icon">
                                <UIcon :name="icon" class="size-6" />
                            </button>
                        </div>
                        <UInput v-model="promptForm.icon" placeholder="e.g. i-ph-planet-duotone" class="rounded-xl" />
                    </UFormField>
                    <UFormField label="Color Key" class="font-bold">
                        <div class="flex flex-wrap gap-2 py-1">
                            <button v-for="color in colorOptions" :key="color" type="button"
                                @click="promptForm.color = color" :class="[
                                    'size-8 rounded-full transition-all duration-200 ring-offset-2 border-2 border-white shadow-sm',
                                    `bg-${color}-500`,
                                    promptForm.color === color ? 'ring-2 ring-slate-800 scale-110' : 'hover:scale-110 opacity-70 hover:opacity-100'
                                ]" :title="color" />
                        </div>
                    </UFormField>
                    <UFormField label="AI Prompt Value" class="font-bold">
                        <UTextarea v-model="promptForm.value" placeholder="e.g. Exploring the Solar System and Planets"
                            class="w-full" :rows="3" :ui="{ base: 'rounded-md' }" />
                    </UFormField>
                </div>
            </template>
            <template #footer>
                <div class="flex justify-end gap-3 w-full">
                    <UButton label="Cancel" color="neutral" variant="ghost" class="font-bold"
                        @click="isPromptModalOpen = false" />
                    <UButton :label="editingPrompt ? 'Update Prompt' : 'Save Prompt'" color="primary"
                        :loading="isPromptLoading" class="font-black px-6 rounded-xl" @click="handleSavePrompt" />
                </div>
            </template>
        </UModal>
    </div>
</template>
