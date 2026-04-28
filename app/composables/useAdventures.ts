import { ADVENTURES, CATEGORIES } from '~/constants/adventures'

export const useAdventures = () => {
    return {
        categories: CATEGORIES,
        adventures: ADVENTURES
    }
}
