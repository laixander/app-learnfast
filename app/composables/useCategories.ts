import { onMounted, watch } from 'vue'

export interface Category {
  id: string
  name: string
  icon: string
  color: string // Base color name (primary, success, etc.)
  keywords: string[] // Keywords for AI detection
}

const STORAGE_KEY = 'app_categories'

const DEFAULT_CATEGORIES: Category[] = [
    { id: '1', name: 'Science', icon: 'i-ph-flask-duotone', color: 'primary', keywords: ['space', 'planet', 'ocean', 'sea', 'fish', 'animal', 'nature', 'bug', 'cook', 'pizza', 'food', 'science'] },
    { id: '2', name: 'Math', icon: 'i-ph-calculator-duotone', color: 'success', keywords: ['math', 'number', 'algebra', 'calculus', 'geometry', 'counting'] },
    { id: '3', name: 'History', icon: 'i-ph-hourglass-duotone', color: 'warning', keywords: ['history', 'ancient', 'war', 'past', 'dino', 'fossil'] },
    { id: '4', name: 'Art', icon: 'i-ph-palette-duotone', color: 'error', keywords: ['art', 'paint', 'music', 'color', 'drawing', 'sketch'] },
    { id: '5', name: 'Computer', icon: 'i-ph-cpu-duotone', color: 'info', keywords: ['code', 'computer', 'robot', 'ai', 'tech', 'software', 'coding'] },
    { id: '6', name: 'English', icon: 'i-ph-book-open-duotone', color: 'secondary', keywords: ['english', 'story', 'book', 'write', 'grammar', 'reading'] },
    { id: '7', name: 'Geography', icon: 'i-ph-globe-hemisphere-west-duotone', color: 'teal', keywords: ['geography', 'earth', 'map', 'country', 'city', 'continent'] },
    { id: '8', name: 'Music', icon: 'i-ph-music-notes-duotone', color: 'fuchsia', keywords: ['music', 'song', 'instrument', 'melody', 'rhythm', 'band'] }
]

export const useCategories = () => {
    // Global reactive state
    const categories = useState<Category[]>('app-categories-state', () => [])
    const customAdventures = useState<any[]>('custom-adventures', () => [])
    const isLoading = useState('categories-loading', () => false)

    // Initial fetch using useAsyncData for SSR support
    const { data: initialData, refresh } = useAsyncData('categories-initial', () => $fetch<Category[]>('/api/categories'))
    
    // Watch for initial data (runs on server and client hydration)
    watch(initialData, (newData) => {
        if (newData) categories.value = newData
    }, { immediate: true })

    const fetchCategories = async () => {
        isLoading.value = true
        try {
            await refresh() // This re-runs useAsyncData and updates initialData
            if (initialData.value) categories.value = initialData.value
        } finally {
            isLoading.value = false
        }
    }

    const addCategory = async (name: string, icon: string, color: string, keywords: string[] = []) => {
        isLoading.value = true
        try {
            await $fetch('/api/categories', {
                method: 'POST',
                body: { name, icon, color, keywords }
            })
            await fetchCategories()
        } finally {
            isLoading.value = false
        }
    }

    const removeCategory = async (id: string) => {
        isLoading.value = true
        try {
            await $fetch('/api/categories', {
                method: 'DELETE',
                query: { id }
            })
            await fetchCategories()
        } finally {
            isLoading.value = false
        }
    }

    const updateCategory = async (id: string, name: string, icon: string, color: string, keywords: string[]) => {
        isLoading.value = true
        try {
            const oldCategory = categories.value.find(c => c.id === id)
            const oldName = oldCategory?.name

            await $fetch('/api/categories', {
                method: 'POST',
                body: { id, name, icon, color, keywords }
            })
            await fetchCategories()

            // Cascade update: If name changed, update all custom adventures using this category
            if (oldName && oldName !== name) {
                customAdventures.value = customAdventures.value.map(adv => ({
                    ...adv,
                    category: adv.category === oldName ? name : adv.category
                }))
            }
        } finally {
            isLoading.value = false
        }
    }

    const seedDefaults = async () => {
        isLoading.value = true
        try {
            await $fetch('/api/categories/seed', { method: 'POST' })
            await fetchCategories()
        } finally {
            isLoading.value = false
        }
    }

    const clearAll = async () => {
        isLoading.value = true
        try {
            await $fetch('/api/categories/clear', { method: 'POST' })
            await fetchCategories()
        } finally {
            isLoading.value = false
        }
    }

    const detectCategory = (topic: string): Category => {
        const t = topic.toLowerCase()
        for (const cat of categories.value) {
            if (cat.keywords.some(k => t.includes(k.toLowerCase()))) {
                return cat
            }
        }
        return categories.value[0] || DEFAULT_CATEGORIES[0]!
    }

    return {
        categories,
        isLoading,
        fetchCategories,
        addCategory,
        removeCategory,
        updateCategory,
        seedDefaults,
        clearAll,
        detectCategory
    }
}
