import type { Lesson } from '~/types/lessons'
import { lessonBanks } from '~/constants/lessonBanks'

import { MANUAL_LESSONS } from '~/constants/lessons'

export const useLessons = () => {
    const { adventures } = useAdventures()

    // Use manual lessons from constants
    const allLessons = [...MANUAL_LESSONS]

    adventures.forEach(adv => {
        const currentLessons = allLessons.filter(l => l.adventureSlug === adv.slug)
        const remaining = adv.lessons - currentLessons.length
        const bank = lessonBanks[adv.slug] || []

        for (let i = 0; i < remaining; i++) {
            const b = bank[i % bank.length]
            const lessonNumber = currentLessons.length + i + 1
            allLessons.push({
                slug: `${adv.slug}-lesson-${lessonNumber}`,
                adventureSlug: adv.slug,
                title: b?.title || `${adv.title} Chapter ${lessonNumber}`,
                category: adv.category,
                level: b?.level || 'Intermediate',
                xp: b?.xp || 250,
                icon: b?.icon || adv.icon,
                color: adv.color,
                steps: [
                    {
                        title: b?.title || 'Mastery Concept',
                        content: b?.content || `Explore ${adv.title} in this exciting lesson!`,
                        icon: b?.icon || 'i-ph-sparkle-duotone',
                        color: 'text-primary-500'
                    }
                ],
                quiz: [
                    {
                        question: b?.quizQ || `What did you learn about ${adv.title}?`,
                        options: b?.quizOpts || ['Everything!', 'A lot!', 'So much!', 'All of the above!'],
                        answer: b?.quizA || 'All of the above!'
                    }
                ]
            })
        }
    })

    const { completedLessons } = useUserStore()

    // Calculate status for each lesson based on completed lessons
    allLessons.forEach(lesson => {
        const adv = adventures.find(a => a.slug === lesson.adventureSlug)
        if (!adv) {
            lesson.status = 'locked'
            return
        }

        const advLessons = allLessons.filter(l => l.adventureSlug === adv.slug)
        const lessonIndex = advLessons.indexOf(lesson)
        
        // Check how many lessons in this adventure are completed
        const completedCount = advLessons.filter(l => completedLessons.value.includes(l.slug)).length
        
        if (completedLessons.value.includes(lesson.slug)) {
            lesson.status = 'completed'
        } else if (lessonIndex === completedCount) {
            // It's the next lesson in the sequence. 
            // If the user hasn't completed ANY lessons in this adventure yet, and the original progress was 0, keep it locked until they start from the hub.
            // But if they have completed at least one, or the adventure is partially started (like Space Explorer at 65%), it's 'current'.
            if (completedCount === 0 && adv.progress === 0) {
                lesson.status = 'locked'
            } else {
                lesson.status = 'current'
            }
        } else {
            lesson.status = 'locked'
        }
    })

    const getAdventureProgress = (adventureSlug: string) => {
        const advLessons = allLessons.filter(l => l.adventureSlug === adventureSlug)
        if (advLessons.length === 0) return 0
        const completedCount = advLessons.filter(l => completedLessons.value.includes(l.slug)).length
        
        // If the user hasn't seeded/completed anything yet but the adventure has a hardcoded initial progress, we can keep it for demo purposes.
        // Actually, returning the real calculated progress is better now that we track it.
        return Math.round((completedCount / advLessons.length) * 100)
    }

    return {
        lessons: allLessons,
        getAdventureProgress
    }
}

