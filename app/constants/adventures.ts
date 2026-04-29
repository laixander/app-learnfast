import type { Adventure, Category } from '~/types/adventures'

export const CATEGORIES: Category[] = [
    { name: 'All', icon: 'i-ph-grid-four-duotone' },
    { name: 'Science', icon: 'i-ph-planet-duotone' },
    { name: 'Math', icon: 'i-ph-calculator-duotone' },
    { name: 'History', icon: 'i-ph-hourglass-duotone' },
    { name: 'Art', icon: 'i-ph-palette-duotone' }
]

export const ADVENTURES: Adventure[] = [
    {
        slug: 'space-explorer',
        title: 'Space Explorer',
        category: 'Science',
        description: 'Visit the planets and learn about stars!',
        longDescription: 'Embark on a cosmic journey! Discover the secrets of our solar system, walk on the moon, and learn what makes stars shine so bright. Perfect for young astronomers ready to blast off!',
        icon: 'i-ph-planet-duotone',
        progress: 65,
        color: 'bg-indigo-500',
        blob: 'bg-indigo-400/20',
        badge: 'Galactic Voyager',
        lessons: 12,
        time: '45 mins',
        buttonClass: 'bg-indigo-600 hover:bg-indigo-700',
        startContent: {
            tagline: 'The stars are waiting for you! Grab your space helmet and prepare for a journey beyond the clouds.',
            goals: [
                { title: 'Visit Planets', description: 'Stop by all 8 planets in our neighborhood.', icon: 'i-ph-planet-duotone', color: 'text-yellow-300' },
                { title: 'Walk on Moon', description: 'Experience low gravity and see the craters!', icon: 'i-ph-footprints-duotone', color: 'text-slate-300' },
                { title: 'Star Gazing', description: 'Learn how to identify different star patterns.', icon: 'i-ph-star-duotone', color: 'text-orange-300' },
                { title: 'Sun Science', description: 'Discover why the Sun is the center of it all.', icon: 'i-ph-sun-duotone', color: 'text-yellow-500' }
            ]
        }
    },
    {
        slug: 'dino-world',
        title: 'Dino World',
        category: 'History',
        description: 'Travel back in time to meet the T-Rex!',
        longDescription: 'Roar into the past! Meet the giants that ruled the Earth millions of years ago. Learn about different species, their diets, and how they lived in this prehistoric adventure.',
        icon: 'i-ph-butterfly-duotone',
        progress: 30,
        color: 'bg-emerald-500',
        blob: 'bg-emerald-400/20',
        badge: 'Dino Expert',
        lessons: 10,
        time: '35 mins',
        buttonClass: 'bg-emerald-600 hover:bg-emerald-700',
        startContent: {
            tagline: 'Step back millions of years! Can you find the hidden fossils and name every dinosaur you meet?',
            goals: [
                { title: 'Dig for Fossils', description: 'Use your tools to find bones buried in the dirt.', icon: 'i-ph-shovel-duotone', color: 'text-amber-400' },
                { title: 'Meet the T-Rex', description: 'See the King of Dinosaurs in his natural home.', icon: 'i-ph-skull-duotone', color: 'text-emerald-300' },
                { title: 'Dino Diet', description: 'Learn who ate plants and who was a hunter.', icon: 'i-ph-leaf-duotone', color: 'text-green-300' },
                { title: 'Jungle Trek', description: 'Navigate through the giant ferns and swamps.', icon: 'i-ph-tree-duotone', color: 'text-lime-300' }
            ]
        }
    },
    {
        slug: 'math-wizard',
        title: 'Math Wizard',
        category: 'Math',
        description: 'Solve puzzles and unlock magic spells!',
        longDescription: 'Numbers are your magic wand! Solve mystical equations and logic puzzles to unlock powerful spells. Math has never been this magical or fun!',
        icon: 'i-ph-magic-wand-duotone',
        progress: 85,
        color: 'bg-violet-500',
        blob: 'bg-violet-400/20',
        badge: 'Spellcaster',
        lessons: 15,
        time: '50 mins',
        buttonClass: 'bg-violet-600 hover:bg-violet-700',
        startContent: {
            tagline: 'Your magic wand is powered by numbers! Solve the mysteries of the Wizard Tower and become a master.',
            goals: [
                { title: 'Spell Casting', description: 'Solve addition spells to open locked doors.', icon: 'i-ph-sparkles-duotone', color: 'text-cyan-300' },
                { title: 'Logic Potions', description: 'Mix the right amounts to create magic effects.', icon: 'i-ph-flask-duotone', color: 'text-purple-300' },
                { title: 'Wizard Duel', description: 'Outsmart the puzzles to win the magic trophy.', icon: 'i-ph-sword-duotone', color: 'text-indigo-300' },
                { title: 'Number Maze', description: 'Find your way through the counting labyrinth.', icon: 'i-ph-path-duotone', color: 'text-violet-300' }
            ]
        }
    },
    {
        slug: 'art-studio',
        title: 'Art Studio',
        category: 'Art',
        description: 'Create your own masterpieces!',
        longDescription: 'Unleash your inner artist! Explore colors, shapes, and textures. Learn about famous artists and create your own digital masterpieces in this colorful studio.',
        icon: 'i-ph-palette-duotone',
        progress: 15,
        color: 'bg-rose-500',
        blob: 'bg-rose-400/20',
        badge: 'Master Painter',
        lessons: 8,
        time: '30 mins',
        buttonClass: 'bg-rose-600 hover:bg-rose-700',
        startContent: {
            tagline: 'The world is your canvas! Pick up your brush and let your imagination run wild with colors.',
            goals: [
                { title: 'Color Mixing', description: 'Learn how to make every color of the rainbow.', icon: 'i-ph-paint-brush-duotone', color: 'text-pink-300' },
                { title: 'Famous Artists', description: 'Meet the people who painted the world.', icon: 'i-ph-palette-duotone', color: 'text-rose-300' },
                { title: 'Shape Scavenger', description: 'Find hidden shapes in famous paintings.', icon: 'i-ph-shapes-duotone', color: 'text-orange-300' },
                { title: 'Digital Canvas', description: 'Create your very first digital masterpiece.', icon: 'i-ph-desktop-duotone', color: 'text-blue-300' }
            ]
        }
    },
    {
        slug: 'ocean-deep',
        title: 'Ocean Deep',
        category: 'Science',
        description: 'Dive into the blue and meet the whales!',
        longDescription: 'Splashing into discovery! Dive deep into the ocean to meet amazing sea creatures. Learn about coral reefs, whales, and the importance of our blue planet.',
        icon: 'i-ph-waves-duotone',
        progress: 0,
        color: 'bg-blue-500',
        blob: 'bg-blue-400/20',
        badge: 'Deep Sea Diver',
        lessons: 14,
        time: '55 mins',
        buttonClass: 'bg-blue-600 hover:bg-blue-700',
        startContent: {
            tagline: 'Take a deep breath and dive in! Exploring the blue ocean and its mysterious creatures.',
            goals: [
                { title: 'Whale Watching', description: 'Find the giant whales in the deep blue.', icon: 'i-ph-fish-duotone', color: 'text-blue-300' },
                { title: 'Coral Reefs', description: 'Explore the colorful homes of tiny fish.', icon: 'i-ph-flower-lotus-duotone', color: 'text-cyan-300' },
                { title: 'Submarine Trip', description: 'Drive a sub to the very bottom of the sea.', icon: 'i-ph-navigation-arrow-duotone', color: 'text-indigo-300' },
                { title: 'Ocean Health', description: 'Learn how to keep our oceans clean and safe.', icon: 'i-ph-shield-check-duotone', color: 'text-emerald-300' }
            ]
        }
    },
    {
        slug: 'bug-hunter',
        title: 'Bug Hunter',
        category: 'Science',
        description: 'Find all the tiny creatures in the garden.',
        longDescription: 'Tiny world, big wonders! Grab your magnifying glass and explore the garden. Learn about bees, butterflies, and all the creepy crawlies that help our world grow.',
        icon: 'i-ph-bug-duotone',
        progress: 0,
        color: 'bg-lime-500',
        blob: 'bg-lime-400/20',
        badge: 'Nature Scout',
        lessons: 9,
        time: '25 mins',
        buttonClass: 'bg-lime-600 hover:bg-lime-700',
        startContent: {
            tagline: 'Grab your magnifying glass! There is a whole tiny world hiding in your backyard.',
            goals: [
                { title: 'Bee Buddy', description: 'Watch how bees make honey and help flowers.', icon: 'i-ph-flower-duotone', color: 'text-yellow-400' },
                { title: 'Ant Colony', description: 'See how ants work together to build homes.', icon: 'i-ph-house-duotone', color: 'text-orange-400' },
                { title: 'Butterfly Life', description: 'Follow the journey from egg to butterfly.', icon: 'i-ph-butterfly-duotone', color: 'text-lime-300' },
                { title: 'Garden Search', description: 'Find 10 different bugs hiding in the grass.', icon: 'i-ph-magnifying-glass-duotone', color: 'text-green-300' }
            ]
        }
    }
]

export const ADVENTURE_HARMONIES = [
    { color: 'bg-indigo-500', blob: 'bg-indigo-400/20', button: 'bg-indigo-600 hover:bg-indigo-700' },
    { color: 'bg-emerald-500', blob: 'bg-emerald-400/20', button: 'bg-emerald-600 hover:bg-emerald-700' },
    { color: 'bg-violet-500', blob: 'bg-violet-400/20', button: 'bg-violet-600 hover:bg-violet-700' },
    { color: 'bg-rose-500', blob: 'bg-rose-400/20', button: 'bg-rose-600 hover:bg-rose-700' },
    { color: 'bg-blue-500', blob: 'bg-blue-400/20', button: 'bg-blue-600 hover:bg-blue-700' },
    { color: 'bg-amber-500', blob: 'bg-amber-400/20', button: 'bg-amber-600 hover:bg-amber-700' },
    { color: 'bg-cyan-500', blob: 'bg-cyan-400/20', button: 'bg-cyan-600 hover:bg-cyan-700' },
    { color: 'bg-fuchsia-500', blob: 'bg-fuchsia-400/20', button: 'bg-fuchsia-600 hover:bg-fuchsia-700' }
]
