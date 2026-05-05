import { onMounted, watch } from 'vue'

export interface Suggestion {
  id: string
  label: string
  value: string
  icon: string
  color: string
}

const STORAGE_KEY = 'magical_suggestions'

const DEFAULT_SUGGESTIONS: Suggestion[] = [
    { id: '1', label: 'Outer Space', value: 'Exploring the Solar System and Planets', icon: 'i-ph-planet-duotone', color: 'primary' },
    { id: '2', label: 'Dinosaurs', value: 'The Age of Dinosaurs and Fossils', icon: 'i-ph-butterfly-duotone', color: 'warning' },
    { id: '3', label: 'Cooking', value: 'The Science of Baking and Pizza', icon: 'i-ph-cooking-pot-duotone', color: 'error' },
    { id: '4', label: 'Robots', value: 'How Robots Work and Coding', icon: 'i-ph-cpu-duotone', color: 'info' },
    { id: '5', label: 'Oceans', value: 'Deep Sea Creatures and Coral Reefs', icon: 'i-ph-waves-duotone', color: 'success' }
]

export const useSuggestions = () => {
    // Global reactive state
    const suggestions = useState<Suggestion[]>('magical-suggestions-state', () => [])
    const isLoading = useState('suggestions-loading', () => false)

    // Initial fetch using useAsyncData for SSR support
    const { data: initialData, refresh } = useAsyncData('suggestions-initial', () => $fetch<Suggestion[]>('/api/suggestions'))
    
    // Watch for initial data
    watch(initialData, (newData) => {
        if (newData) suggestions.value = newData
    }, { immediate: true })

    const fetchSuggestions = async () => {
        isLoading.value = true
        try {
            await refresh()
            if (initialData.value) suggestions.value = initialData.value
        } finally {
            isLoading.value = false
        }
    }

    const addSuggestion = async (label: string, value: string, icon: string = 'i-ph-sparkle-duotone', color: string = 'primary') => {
        isLoading.value = true
        try {
            await $fetch('/api/suggestions', {
                method: 'POST',
                body: { label, value, icon, color }
            })
            await fetchSuggestions()
        } finally {
            isLoading.value = false
        }
    }

    const removeSuggestion = async (id: string) => {
        isLoading.value = true
        try {
            await $fetch('/api/suggestions', {
                method: 'DELETE',
                query: { id }
            })
            await fetchSuggestions()
        } finally {
            isLoading.value = false
        }
    }

    const updateSuggestion = async (id: string, label: string, value: string, icon: string, color: string) => {
        isLoading.value = true
        try {
            await $fetch('/api/suggestions', {
                method: 'POST',
                body: { id, label, value, icon, color }
            })
            await fetchSuggestions()
        } finally {
            isLoading.value = false
        }
    }

    const seedDefaults = async () => {
        isLoading.value = true
        try {
            // Bulk operation: reset all will be handled by the seed endpoint on the server if needed
            // but for now we just call seed
            await $fetch('/api/suggestions/seed', { method: 'POST' })
            await fetchSuggestions()
        } finally {
            isLoading.value = false
        }
    }

    const clearAll = async () => {
        isLoading.value = true
        try {
            await $fetch('/api/suggestions/clear', { method: 'POST' })
            await fetchSuggestions()
        } finally {
            isLoading.value = false
        }
    }

    return {
        suggestions,
        isLoading,
        fetchSuggestions,
        addSuggestion,
        removeSuggestion,
        updateSuggestion,
        seedDefaults,
        clearAll
    }
}
