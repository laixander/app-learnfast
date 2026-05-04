import { ref, watch, onMounted, onUnmounted } from 'vue'

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
    { id: '6', name: 'English', icon: 'i-ph-book-open-duotone', color: 'secondary', keywords: ['english', 'story', 'book', 'write', 'grammar', 'reading'] }
]

export const useCategories = () => {
    const categories = useState<Category[]>('app-categories-state', () => [...DEFAULT_CATEGORIES])
    const initialized = useState('app-categories-initialized', () => false)

    const save = () => {
        if (import.meta.client) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(categories.value))
        }
    }

    const load = () => {
        if (import.meta.server) return
        
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            try {
                categories.value = JSON.parse(saved)
            } catch (e) {
                categories.value = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES))
            }
        } else {
            categories.value = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES))
            save()
        }
        initialized.value = true
    }

    const handleStorageChange = (e: StorageEvent) => {
        if (e.key === STORAGE_KEY && e.newValue) {
            try {
                categories.value = JSON.parse(e.newValue)
            } catch (err) {}
        }
    }

    const addCategory = (name: string, icon: string, color: string, keywords: string[] = []) => {
        categories.value = [...categories.value, {
            id: Date.now().toString(),
            name,
            icon,
            color,
            keywords
        }]
        save()
    }

    const removeCategory = (id: string) => {
        categories.value = categories.value.filter(c => c.id !== id)
        save()
    }

    const updateCategory = (id: string, name: string, icon: string, color: string, keywords: string[]) => {
        const oldCategory = categories.value.find(c => c.id === id)
        const oldName = oldCategory?.name

        categories.value = categories.value.map(c => 
            c.id === id ? { id, name, icon, color, keywords } : c
        )
        save()

        // Cascade update: If name changed, update all custom adventures using this category
        if (oldName && oldName !== name) {
            const { customAdventures } = useUserStore()
            customAdventures.value = customAdventures.value.map(adv => ({
                ...adv,
                category: adv.category === oldName ? name : adv.category
            }))
        }
    }

    const seedDefaults = () => {
        categories.value = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES))
        save()
    }

    const clearAll = () => {
        categories.value = []
        save()
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

    if (import.meta.client) {
        if (!initialized.value) load()
        onMounted(() => window.addEventListener('storage', handleStorageChange))
        onUnmounted(() => window.removeEventListener('storage', handleStorageChange))
    }

    return {
        categories,
        addCategory,
        removeCategory,
        updateCategory,
        seedDefaults,
        clearAll,
        detectCategory,
        load
    }
}
