import { ADVENTURES, CATEGORIES, ADVENTURE_HARMONIES } from '~/constants/adventures'

export const useAdventures = () => {
    const { customAdventures, isSeeded } = useUserStore()

    const allAdventures = computed(() => {
        return isSeeded.value
            ? [...customAdventures.value, ...ADVENTURES]
            : [...customAdventures.value]
    })

    // Dynamically build categories based on what adventures exist
    const allCategories = computed(() => {
        const cats = [...CATEGORIES]
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
        return ADVENTURE_HARMONIES[Math.floor(Math.random() * ADVENTURE_HARMONIES.length)] || ADVENTURE_HARMONIES[0]
    }

    return {
        categories: allCategories,
        adventures: allAdventures,
        getRandomHarmony
    }
}
