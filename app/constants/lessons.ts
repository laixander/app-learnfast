import type { Lesson } from '~/types/lessons'

export const MANUAL_LESSONS: Lesson[] = [
    // Space Explorer (Science)
    {
        slug: 'intro-to-planets',
        adventureSlug: 'space-explorer',
        title: 'Introduction to Planets',
        category: 'Science',
        level: 'Beginner',
        xp: 500,
        icon: 'i-ph-planet-duotone',
        color: 'bg-indigo-500',
        steps: [
            {
                title: 'The Sun is the Star!',
                content: 'Did you know the Sun is actually a giant star? It sits right in the center of our solar system and keeps all the planets warm.',
                icon: 'i-ph-sun-duotone',
                color: 'text-yellow-500'
            },
            {
                title: 'Rocky Planets',
                content: 'The first four planets - Mercury, Venus, Earth, and Mars - are made of rock. We live on Earth, the only planet with liquid water!',
                icon: 'i-ph-mountains-duotone',
                color: 'text-orange-500'
            },
            {
                title: 'Gas Giants',
                content: 'Jupiter and Saturn are HUGE! They are mostly made of gas and don\'t have a solid surface to stand on. Saturn has beautiful rings made of ice!',
                icon: 'i-ph-cloud-duotone',
                color: 'text-blue-400'
            }
        ],
        quiz: [
            {
                question: 'Which planet do we live on?',
                options: ['Mars', 'Earth', 'Jupiter', 'The Moon'],
                answer: 'Earth'
            },
            {
                question: 'What is the Sun?',
                options: ['A Planet', 'A Star', 'A Moon', 'A Comet'],
                answer: 'A Star'
            }
        ]
    },
    {
        slug: 'moon-mission',
        adventureSlug: 'space-explorer',
        title: 'Moon Mission',
        category: 'Science',
        level: 'Beginner',
        xp: 400,
        icon: 'i-ph-rocket-launch-duotone',
        color: 'bg-slate-500',
        steps: [
            {
                title: 'The Gray Giant',
                content: 'The Moon is our closest neighbor in space. It doesn\'t have its own light; it reflects the Sun like a giant mirror!',
                icon: 'i-ph-moon-duotone',
                color: 'text-slate-300'
            }
        ],
        quiz: [
            {
                question: 'Does the Moon make its own light?',
                options: ['Yes', 'No', 'Sometimes', 'Only at night'],
                answer: 'No'
            }
        ]
    },

    // Dino World (History)
    {
        slug: 'dino-fossils',
        adventureSlug: 'dino-world',
        title: 'Dino Fossils',
        category: 'History',
        level: 'Intermediate',
        xp: 750,
        icon: 'i-ph-butterfly-duotone',
        color: 'bg-rose-500',
        steps: [
            {
                title: 'What are Fossils?',
                content: 'Fossils are the remains of plants and animals that lived a long, long time ago. They turned into rock over millions of years!',
                icon: 'i-ph-scroll-duotone',
                color: 'text-amber-700'
            }
        ],
        quiz: [
            {
                question: 'What do fossils turn into over time?',
                options: ['Water', 'Rock', 'Dust', 'Ice'],
                answer: 'Rock'
            }
        ]
    },
    {
        slug: 't-rex-facts',
        adventureSlug: 'dino-world',
        title: 'T-Rex Facts',
        category: 'History',
        level: 'Intermediate',
        xp: 600,
        icon: 'i-ph-skull-duotone',
        color: 'bg-emerald-500',
        steps: [
            {
                title: 'King of Dinosaurs',
                content: 'The T-Rex was one of the largest meat-eaters to ever live. Its teeth were as big as bananas!',
                icon: 'i-ph-knife-duotone',
                color: 'text-rose-600'
            }
        ],
        quiz: [
            {
                question: 'How big were T-Rex teeth?',
                options: ['Small like peas', 'Big as bananas', 'Medium like apples', 'Gigantic like trees'],
                answer: 'Big as bananas'
            }
        ]
    },

    // Math Wizard (Math)
    {
        slug: 'addition-fun',
        adventureSlug: 'math-wizard',
        title: 'Addition Fun',
        category: 'Math',
        level: 'Easy',
        xp: 300,
        icon: 'i-ph-plus-circle-duotone',
        color: 'bg-emerald-500',
        steps: [
            {
                title: 'What is Addition?',
                content: 'Addition is when you put two or more groups together to find out how many there are in total. We use the plus (+) sign!',
                icon: 'i-ph-plus-bold',
                color: 'text-emerald-500'
            }
        ],
        quiz: [
            {
                question: 'What is 2 + 2?',
                options: ['3', '4', '5', '6'],
                answer: '4'
            }
        ]
    },
    {
        slug: 'magic-subtraction',
        adventureSlug: 'math-wizard',
        title: 'Magic Subtraction',
        category: 'Math',
        level: 'Easy',
        xp: 350,
        icon: 'i-ph-minus-circle-duotone',
        color: 'bg-violet-500',
        steps: [
            {
                title: 'The Minus Wand',
                content: 'Subtraction is taking away from a group. If you have 5 spells and use 2, you have 3 left!',
                icon: 'i-ph-magic-wand-duotone',
                color: 'text-violet-400'
            }
        ],
        quiz: [
            {
                question: 'What is 5 - 2?',
                options: ['1', '2', '3', '4'],
                answer: '3'
            }
        ]
    },

    // Art Studio (Art)
    {
        slug: 'color-mixing',
        adventureSlug: 'art-studio',
        title: 'Color Mixing',
        category: 'Art',
        level: 'Easy',
        xp: 250,
        icon: 'i-ph-palette-duotone',
        color: 'bg-violet-500',
        steps: [
            {
                title: 'Primary Colors',
                content: 'Red, Blue, and Yellow are primary colors. You can\'t make them by mixing other colors, but you can use them to make ALL other colors!',
                icon: 'i-ph-paint-brush-duotone',
                color: 'text-primary-500'
            }
        ],
        quiz: [
            {
                question: 'What color do you get if you mix Yellow and Blue?',
                options: ['Purple', 'Green', 'Orange', 'Brown'],
                answer: 'Green'
            }
        ]
    },

    // Ocean Deep (Science)
    {
        slug: 'whale-watching',
        adventureSlug: 'ocean-deep',
        title: 'Whale Watching',
        category: 'Science',
        level: 'Easy',
        xp: 450,
        icon: 'i-ph-fish-duotone',
        color: 'bg-blue-500',
        steps: [
            {
                title: 'Gentle Giants',
                content: 'Blue whales are the largest animals ever! They can grow as long as three school buses!',
                icon: 'i-ph-truck-duotone',
                color: 'text-blue-300'
            }
        ],
        quiz: [
            {
                question: 'How long can a blue whale grow?',
                options: ['One bus', 'Two buses', 'Three buses', 'Four buses'],
                answer: 'Three buses'
            }
        ]
    },

    // Bug Hunter (Science)
    {
        slug: 'bee-buddy',
        adventureSlug: 'bug-hunter',
        title: 'Bee Buddy',
        category: 'Science',
        level: 'Easy',
        xp: 300,
        icon: 'i-ph-flower-duotone',
        color: 'bg-yellow-500',
        steps: [
            {
                title: 'Busy Bees',
                content: 'Bees fly from flower to flower to collect nectar. They help plants grow by carrying pollen!',
                icon: 'i-ph-bug-duotone',
                color: 'text-yellow-600'
            }
        ],
        quiz: [
            {
                question: 'What do bees collect from flowers?',
                options: ['Water', 'Nectar', 'Leaves', 'Sticks'],
                answer: 'Nectar'
            }
        ]
    }
]
