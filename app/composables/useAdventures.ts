import { ADVENTURES, ADVENTURE_HARMONIES } from '~/constants/adventures'

export const useAdventures = () => {
    const { customAdventures, isSeeded } = useUserStore()
    const { categories: managedCategories } = useCategories()

    const getHarmony = (colorKey: string) => {
        return {
            color: `bg-${colorKey}-500`,
            blob: `bg-${colorKey}-400/20`,
            button: `bg-${colorKey}-600 hover:bg-${colorKey}-700`
        }
    }

    const allAdventures = computed(() => {
        const rawAdventures = isSeeded.value
            ? [...customAdventures.value, ...ADVENTURES]
            : [...customAdventures.value]

        return rawAdventures.map(adv => {
            const category = managedCategories.value.find(c => c.name === adv.category)
            
            // Default styling if category is missing (e.g. during sync or initial load)
            const icon = category?.icon || 'i-ph-folder-duotone'
            const harmony = getHarmony(category?.color || 'primary')

            return {
                ...adv,
                icon,
                color: harmony.color,
                blob: harmony.blob,
                buttonClass: harmony.button
            }
        })
    })

    // Dynamically build categories based on managed categories + any unique categories in adventures
    const allCategories = computed(() => {
        // Start with the "All" filter + admin-managed categories
        const cats = [
            { name: 'All', icon: 'i-ph-grid-four-duotone' },
            ...managedCategories.value.map(c => ({
                name: c.name,
                icon: c.icon
            }))
        ]

        // Auto-discover any categories used in adventures that aren't in the managed list
        allAdventures.value.forEach(adv => {
            if (!cats.find(c => c.name === adv.category)) {
                cats.push({
                    name: adv.category,
                    icon: 'i-ph-folder-duotone'
                })
            }
        })
        return cats
    })

    const getRandomHarmony = () => {
        const harmonies = ADVENTURE_HARMONIES.map(h => h.color.replace('bg-', '').replace('-500', ''))
        const randomKey = harmonies[Math.floor(Math.random() * harmonies.length)] || 'primary'
        return getHarmony(randomKey)
    }

    return {
        categories: allCategories,
        adventures: allAdventures,
        getRandomHarmony,
        getHarmony
    }
}
