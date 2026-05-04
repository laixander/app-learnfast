import { ref, watch, onMounted, onUnmounted } from 'vue'

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
    // Global reactive state via Nuxt's useState
    const suggestions = useState<Suggestion[]>('magical-suggestions-state', () => [])
    const initialized = useState('magical-suggestions-initialized', () => false)

    const save = () => {
        if (import.meta.client) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(suggestions.value))
        }
    }

    const load = () => {
        if (import.meta.server) return
        
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                suggestions.value = parsed.map((s: any) => ({
                    ...s,
                    icon: s.icon || 'i-ph-sparkle-duotone',
                    color: s.color?.includes('-') ? 'primary' : (s.color || 'primary')
                }))
            } catch (e) {
                suggestions.value = JSON.parse(JSON.stringify(DEFAULT_SUGGESTIONS))
            }
        } else {
            suggestions.value = JSON.parse(JSON.stringify(DEFAULT_SUGGESTIONS))
            save()
        }
        initialized.value = true
    }

    // Sync across tabs in real-time
    const handleStorageChange = (e: StorageEvent) => {
        if (e.key === STORAGE_KEY && e.newValue) {
            console.log('Realtime Sync: Suggestions updated from another tab')
            try {
                suggestions.value = JSON.parse(e.newValue)
            } catch (err) {
                console.error('Failed to sync suggestions', err)
            }
        }
    }

    const addSuggestion = (label: string, value: string, icon: string = 'i-ph-sparkle-duotone', color: string = 'primary') => {
        const newSuggestion = {
            id: Date.now().toString(),
            label,
            value,
            icon,
            color
        }
        // Use spread to ensure reactivity triggers everywhere
        suggestions.value = [...suggestions.value, newSuggestion]
        save()
    }

    const removeSuggestion = (id: string) => {
        suggestions.value = suggestions.value.filter(s => s.id !== id)
        save()
    }

    const updateSuggestion = (id: string, label: string, value: string, icon: string, color: string) => {
        suggestions.value = suggestions.value.map(s => 
            s.id === id ? { id, label, value, icon, color } : s
        )
        save()
    }

    const seedDefaults = () => {
        suggestions.value = JSON.parse(JSON.stringify(DEFAULT_SUGGESTIONS))
        save()
    }

    const clearAll = () => {
        suggestions.value = []
        save()
    }

    // Lifecycle: Setup listener
    if (import.meta.client) {
        if (!initialized.value) {
            load()
        }
        
        onMounted(() => {
            window.addEventListener('storage', handleStorageChange)
        })

        onUnmounted(() => {
            window.removeEventListener('storage', handleStorageChange)
        })
    }

    return {
        suggestions,
        addSuggestion,
        removeSuggestion,
        updateSuggestion,
        seedDefaults,
        clearAll,
        load
    }
}
