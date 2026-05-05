export const DOCS_DATA = {
    header: {
        title: 'Developer Blueprint & Documentation',
        description: "Comprehensive technical reference for LearnFast's architecture, design system, frontend ecosystem, and gamification mechanics.",
        icon: 'i-ph-book-open-text-duotone'
    },
    architecture: {
        title: 'System Architecture',
        description: "The application follows the Nuxt 4 directory structure, ensuring strong separation of concerns. The architecture leans heavily on Vue's Composition API, Nuxt's auto-imports, and the robust nuxt/ui ecosystem.",
        icon: 'i-ph-buildings-duotone',
        coreDirectories: [
            { path: 'app/pages/', description: 'File-based routing defining application screens.' },
            { path: 'app/layouts/', description: 'Root structural wrappers (e.g., dashboard nav vs landing).' },
            { path: 'app/components/', description: 'Reusable domain-specific UI components.' },
            { path: 'app/types/', description: 'Centralized TypeScript interfaces for consistent data modeling.' }
        ],
        stateAndDataFlow: {
            title: 'State & Data Flow',
            content: "Data is primarily managed using Vue 3 reactive primitives (ref, computed) within component script blocks. Shared logic and global state are orchestrated through Nuxt composables, centralized app/types, and layout-level provision."
        },
        businessLogic: {
            title: 'Core Composables',
            icon: 'i-ph-function-duotone',
            items: [
                { name: 'useUserStore', description: 'Centralized store for user profile, stats, and persistent state.' },
                { name: 'useAdventures', description: 'Manages adventure listings and dynamic styling resolution.' },
                { name: 'useCategories', description: 'Handles category management and administrative content seeding.' },
                { name: 'useSuggestions', description: 'Orchestrates AI-driven topic and category suggestions.' }
            ]
        }
    },
    designSystem: {
        title: 'Design System & Theming',
        description: 'The visual language of LearnFast. Our design system prioritizes a kid-friendly, playful, and vibrant aesthetic through custom typography, rounded shapes, and a high-contrast color palette.',
        icon: 'i-ph-palette-duotone',
        colors: [
            { label: 'Primary', value: 'Violet', bg: 'bg-violet-500' },
            { label: 'Secondary', value: 'Pink', bg: 'bg-pink-500' },
            { label: 'Success', value: 'Lime', bg: 'bg-lime-500' },
            { label: 'Info', value: 'Cyan', bg: 'bg-cyan-500' },
            { label: 'Warning', value: 'Amber', bg: 'bg-amber-500' },
            { label: 'Error', value: 'Rose', bg: 'bg-rose-500' },
            { label: 'Neutral', value: 'Slate', bg: 'bg-slate-500' }
        ],
        typography: {
            title: 'Sour Gummy',
            description: 'The primary brand font used globally across the application. It is inherently bubbly, legible, and fun.',
            configTitle: 'CSS Configuration (main.css)',
            configContent: 'We shifted the entire Tailwind type scale up one step (e.g., text-xs is now 0.875rem). This ensures readability for younger users.'
        },
        shapes: [
            {
                title: 'Rounded Geometry',
                icon: 'i-ph-circle-duotone',
                description: 'Inputs, Buttons, Textareas, and Badges default to rounded-full to soften the UI. Containers use a default --ui-radius: 1rem.',
                examples: ['Primary Button', 'Badge']
            },
            {
                title: 'Phosphor Icons',
                icon: 'i-ph-star-duotone',
                description: 'All application icons are configured in app.config.ts utilizing the Phosphor icon set (i-ph-*), known for its clean, modern curves.',
                icons: ['i-ph-rocket-duotone', 'i-ph-planet-duotone', 'i-ph-alien-duotone']
            },
            {
                title: 'Design-as-Data',
                icon: 'i-ph-tree-structure-duotone',
                description: 'Visual harmony is achieved through metadata. Adventures inherit their color and icon themes directly from their assigned Category, ensuring a scalable and dynamic content engine.',
                examples: ['Category Icons', 'Dynamic Badges']
            }
        ]
    },
    frontend: {
        title: 'Frontend Ecosystem',
        description: 'A complete breakdown of how the UI is constructed, starting from the outermost layout wrappers down to the specific page modules and atomic components.',
        icon: 'i-ph-layout-duotone',
        layouts: [
            { title: 'Landing Layout', description: 'Used exclusively for public-facing unauthenticated pages (the marketing site).', file: 'app/layouts/landing.vue', glowColor: 'bg-amber-500', textColor: 'text-amber-600' },
            { title: 'Login Layout', description: 'A streamlined, centered layout designed to wrap authentication flows without distraction.', file: 'app/layouts/login.vue', glowColor: 'bg-purple-500', textColor: 'text-purple-600' },
            { title: 'Dashboard Layout', description: 'The core application shell featuring a top nav, bottom nav for mobile, and user stat tracking.', file: 'app/layouts/dashboard.vue', glowColor: 'bg-indigo-500', textColor: 'text-indigo-600' }
        ],
        modules: [
            { title: 'Auth Module', icon: 'i-ph-lock-key-duotone', iconColor: 'text-teal-500', files: ['login.vue', 'register.vue'], fileColor: 'text-teal-600 bg-teal-50', description: 'Uses the `login` layout. Integrates `UAuthForm` for standardized form validation and submission. Transitions user to the Dashboard on success.' },
            { title: 'Core Content', icon: 'i-ph-books-duotone', iconColor: 'text-cyan-500', files: ['dashboard.vue', 'adventures/[slug].vue', 'lessons/[slug].vue'], fileColor: 'text-cyan-600 bg-cyan-50', description: '`dashboard.vue` acts as the entry point. Dynamic routing (`[slug].vue`) is used to render specific missions or interactive lessons.' },
            { title: 'Gamification', icon: 'i-ph-trophy-duotone', iconColor: 'text-yellow-500', files: ['shop.vue', 'leaderboard.vue'], fileColor: 'text-yellow-600 bg-yellow-50', description: 'Wrapped by `dashboard` layout. Heavily relies on `UIcon` and `UBadge` to visualize progression, virtual currency, and relative ranking.' },
            { title: 'User Management', icon: 'i-ph-user-gear-duotone', iconColor: 'text-rose-500', files: ['profile.vue', 'settings.vue'], fileColor: 'text-rose-600 bg-rose-50', description: 'Provides user state modification interfaces. Uses `USwitch`, `UAvatar`, and `UButton` to map and mutate user preferences.' },
            { title: 'Mission Control', icon: 'i-ph-shield-check-duotone', iconColor: 'text-indigo-500', files: ['admin/content.vue', 'admin/users.vue'], fileColor: 'text-indigo-600 bg-indigo-50', description: 'The administrative engine for content management. Features dynamic category CRUD, adventure connection tracking, and system-wide data seeding tools.' }
        ],
        domainComponents: [
            { title: 'AppLogo.vue', icon: 'i-ph-magic-wand-duotone', description: 'The centralized branding asset. Integrated within Auth screens and Dashboard navigation bars for a consistent visual identity.' },
            { title: 'BgDecorations.vue', icon: 'i-ph-shapes-duotone', description: 'Abstract SVG background elements that inject a vibrant, kid-friendly aesthetic into the landing and dashboard screens.' },
            { title: 'AppFab.vue', icon: 'i-ph-terminal-window-duotone', description: 'A highly flexible floating menu system. Supports environment-aware actions like data seeding, dev-nav, and user-specific triggers with smart positioning.' }
        ],
        nuxtUI: {
            description: 'Instead of building basic components from scratch, the app relies heavily on @nuxt/ui for rapid, accessible development.',
            components: ['UCard', 'UButton', 'UIcon', 'UContainer', 'UTabs', 'UBadge', 'UAuthForm', 'UAvatar', 'UProgress']
        }
    },
    gameDesign: {
        title: 'Game Design & User Flow',
        description: "Detailed specification of the app's terminology, the sequence of page interactions, and how learning mechanics map to progression and economy systems.",
        icon: 'i-ph-game-controller-duotone',
        dictionary: [
            { title: 'Adventure', icon: 'i-ph-map-trifold-duotone', description: "A themed parent container that groups a series of related learning modules. For example, 'Space Explorer'." },
            { title: 'Lesson (Mission)', icon: 'i-ph-graduation-cap-duotone', description: 'The interactive learning content consisting of theory steps and a quiz. Completing these progresses the Adventure.' },
            { title: 'Atoms / Coins', icon: 'i-ph-atom-duotone', description: 'The in-app virtual currency. Earned by completing Lessons and claiming Daily Rewards. Used in the Shop.' },
            { title: 'Badges / Ranks', icon: 'i-ph-medal-duotone', description: 'Achievements unlocked by reaching certain milestones. Displayed on the user Profile and Leaderboard.' },
            { title: 'AI Laboratory', icon: 'i-ph-test-tube-duotone', description: 'The AI-powered wizard where students can generate custom adventures based on their own interests and prompts.' },
            { title: 'AI Lesson Engine', icon: 'i-ph-cpu-duotone', description: 'The core generation logic that transforms raw text, files, or images into interactive learning modules and quizzes.' }
        ],
        relationships: [
            { title: '1. Actions (Triggers)', color: 'bg-amber-50 ring-amber-200 text-amber-600', items: ['Completing Lessons', 'Finishing Daily Quests', 'Logging in daily (Day Streak)'] },
            { title: '2. Rewards (Currency)', color: 'bg-green-50 ring-green-200 text-green-600', items: ['Yields XP Points (Leveling)', 'Yields Magic Coins (Spending)', 'Unlocks Badges (Status)'] },
            { title: '3. Sinks (Engagement)', color: 'bg-purple-50 ring-purple-200 text-purple-600', items: ['Spend Coins in the Shop', 'Compete on Friends Leaderboard', 'Unlock new Adventures'] }
        ],
        journey: [
            { phase: 'Phase 1: Empty State & Onboarding (Day 1)', description: 'User lands on index.vue and creates a profile (register.vue). They start at Level 1, 0 XP, 0 Coins. Only the "Starter Adventure" is unlocked. Prompted to complete the first lesson for a bonus.', icon: 'i-ph-number-circle-one-fill' },
            { phase: 'Phase 2: Habit Forming (Days 2-7)', description: 'User returns to dashboard.vue to keep Streak alive. They engage with Daily Quests, hit Level 2, earn the "Novice" badge, and use Atoms in shop.vue.', icon: 'i-ph-number-circle-two-fill' },
            { phase: 'Phase 3: Long-Term Loop (Weeks 2+)', description: 'Social systems engage via leaderboard.vue. Users buy "Streak Freezes" to protect investments and grind XP in lessons/[slug].vue to unlock advanced Adventures.', icon: 'i-ph-number-circle-three-fill' },
            { phase: 'Phase 4: Creative Mastery & Personalized Learning', description: 'Power users utilize the AI Adventure Laboratory to generate their own missions. They upload documents to the AI Lesson Engine to convert schoolwork into gamified study sessions.', icon: 'i-ph-number-circle-four-fill' }
        ],
        schema: `// App State / Pinia Store Blueprint
interface UserProfile {
  id: string;
  level: number;
  xp: number;
  magicCoins: number;
  dayStreak: {
    current: number;
    highest: number;
    lastActiveDate: string;
    freezesAvailable: number; // Bought from Shop
  };
  badges: string[]; // Unlocked Badge IDs
  friends: string[]; // Friend User IDs
}

interface DailyQuest {
  id: string;
  type: 'LESSONS_COMPLETED' | 'XP_EARNED' | 'PERFECT_QUIZ';
  targetValue: number;
  currentValue: number;
  rewardCoins: number;
  isCompleted: boolean;
}`
    },
    changelog: {
        title: 'Project Changelog',
        description: 'A timeline of significant feature additions, structural refactors, and aesthetic updates to the application.',
        icon: 'i-ph-clock-counter-clockwise-duotone',
        versions: [
            {
                version: 'v1.9.0',
                date: 'May 5, 2026',
                status: 'Current',
                color: 'emerald',
                dotColor: 'bg-emerald-500',
                title: 'Real-Time Sync & Performance Optimization',
                changes: [
                    'Implemented <strong>Real-Time State Synchronization</strong> using reactive watchers on <code>useAsyncData</code>.',
                    'Eliminated <strong>Network Latency Simulation</strong> to achieve near-instantaneous data loading and UI transitions.',
                    'Fixed <strong>Hydration Class Mismatches</strong> by standardizing server/client rendering for dynamic components.',
                    'Optimized <strong>Reactive CRUD Workflows</strong> ensuring immediate UI feedback without manual refreshes.',
                    'Refined <strong>Global State Watchers</strong> to propagate backend changes instantly to all application modules.'
                ]
            },
            {
                version: 'v1.8.0',
                date: 'May 5, 2026',
                color: 'neutral',
                dotColor: 'bg-neutral-300',
                title: 'Admin Sidebar Overhaul & Shop Sync',
                changes: [
                    'Implemented <strong>Collapsible Sidebar</strong> with smooth cubic-bezier width animation and icon-only mode.',
                    'Added <strong>Cursor Spotlight Effect</strong> to the admin sidebar using <code>useMouseInElement</code> with primary color radial gradient.',
                    'Fixed <strong>Sidebar Sticky Positioning</strong> by locking root layout to <code>h-screen</code> with internal overflow scrolling.',
                    'Applied <strong>Dynamic Active Link Background</strong> using per-link theme color (<code>bg-${link.color}-500/20</code>).',
                    'Disabled <strong>translate-x offset</strong> on nav items when sidebar is collapsed for perfect vertical alignment.',
                    'Wired <strong>Toggle Button</strong> with a horizontal flip animation (<code>-scale-x-100</code>) to indicate sidebar state.',
                    'Fixed <strong>Dashboard Shop Empty State</strong> by extending <code>hasContent</code> to include <code>shopItems.value.length</code>.',
                    'Added <strong>Pricing Plans Section</strong> to the landing page between Features and CTA.'
                ]
            },
            {
                version: 'v1.7.0',
                date: 'May 4, 2026',
                color: 'neutral',
                dotColor: 'bg-neutral-300',
                title: 'Admin Content Engine & Component Unification',
                changes: [
                    'Completed <strong>Admin Content Engine Migration</strong> with dynamic category-driven visuals.',
                    'Implemented <strong>Dynamic Adventure Styling</strong> inheriting icons/colors from managed categories.',
                    'Launched Reusable <code>AppFab</code> component unifying developer and user floating menus.',
                    'Consolidated seeder logic into a centralized <strong>"Seed All Data"</strong> developer action.',
                    'Added <strong>Interactive Spotlight Hover</strong> effect to the main Dashboard header.',
                    'Disabled <strong>Admin Authentication</strong> middleware for seamless administrative access.',
                    'Enhanced <strong>Category Management</strong> with live adventure counts and empty states.',
                    'Optimized <strong>Tailwind Safelist</strong> for dynamic color generation support.'
                ]
            },
            {
                version: 'v1.6.0',
                date: 'Apr 30, 2026',
                color: 'neutral',
                dotColor: 'bg-neutral-300',
                title: 'Daily Quests, Laboratory VFX & Profile Customization',
                changes: [
                    'Launched <strong>Edit Profile</strong> suite with dynamic avatar selection and title customization.',
                    'Implemented persistent <code>updateUser</code> action in the user store for profile management.',
                    'Refactored <strong>Developer Documentation</strong> into a modular, data-driven <code>DOCS_DATA</code> architecture.',
                    'Added <strong>Interactive Spotlight Glow</strong> effect to the AI Laboratory sandbox.',
                    'Enhanced layout wrappers with subtle mesh-glow accents and improved <em>glassmorphism</em>.',
                    'Optimized <strong>Profile UX</strong> by grouping empty states and streamlining badge visibility.',
                    'Implemented <strong>Full-page Daily Quests</strong> experience replacing dashboard widget.',
                    'Extended <code>Quest Data Model</code> to support categories and difficulty levels.',
                    'Enhanced <strong>AI Adventure Laboratory</strong> with dynamic icon detection.',
                    'Improved <strong>Adventure Card</strong> display ordering for custom content.',
                    'Resolved <code>Custom Adventure Navigation</code> and visibility issues.',
                    'Polished <strong>Create Adventure</strong> wizard with color harmony logic and progress tracking.'
                ]
            },
            {
                version: 'v1.5.0',
                date: 'Apr 29, 2026',
                color: 'neutral',
                dotColor: 'bg-neutral-300',
                title: 'Thematic Quizzes & UX Stability',
                changes: [
                    'Implemented <strong>Thematic Quiz System</strong> with knowledge checks and mastery exams.',
                    'Enhanced <strong>UX Stability</strong> with flickering fixes and optimized adventure transitions.',
                    'Added <strong>Dynamic Icon Detection</strong> for custom-created adventures.',
                    'Standardized <strong>Global Type System</strong> across the entire application hierarchy.',
                    'Finalized <strong>AI Laboratory Polish</strong> with alchemical themes and progress tracking.'
                ]
            },
            {
                version: 'v1.4.0',
                date: 'Apr 28, 2026',
                color: 'neutral',
                dotColor: 'bg-neutral-300',
                title: 'AI Laboratory & Type Systems',
                changes: [
                    'Launched <strong>AI Adventure Laboratory</strong> wizard with dynamic card generation.',
                    'Integrated <strong>AI Lesson Engine</strong> with file-based content generation and onboarding.',
                    'Refactored <strong>Quiz Type System</strong> with centralized interfaces and interactive modals.',
                    'Enhanced <strong>Adventure Card Aesthetics</strong> with premium hover effects and dynamic tints.'
                ]
            },
            {
                version: 'v1.3.0',
                date: 'Apr 27, 2026',
                color: 'neutral',
                dotColor: 'bg-neutral-300',
                title: 'Centralized State & Notifications',
                changes: [
                    'Implemented <strong>Global Data Seeder</strong> with <code>LocalStorage</code> persistence.',
                    'Added premium <code>AppEmptyState</code> component across all core modules.',
                    'Launched <strong>Advanced Notification</strong> system (Read/Unread, Global State, Details).',
                    'Refactored data flow to use centralized <code>useUserStore</code> actions.'
                ]
            },
            {
                version: 'v1.2.0',
                date: 'Apr 26, 2026',
                color: 'neutral',
                dotColor: 'bg-neutral-300',
                title: 'Documentation & Refinements',
                changes: [
                    'Added comprehensive <strong>Developer Documentation</strong> (<code>paper.vue</code>).',
                    'Implemented <strong>App Flow</strong> mapping and technical dictionary.',
                    'Refactored portfolio references and simplified external integrations.'
                ]
            },
            {
                version: 'v1.1.0',
                date: 'Apr 25, 2026',
                color: 'neutral',
                dotColor: 'bg-neutral-300',
                title: 'Dashboard & Gamification Expansion',
                changes: [
                    'Built out the <strong>Gamification Loop</strong> (<code>shop</code>, <code>rewards</code>, <code>leaderboard</code>).',
                    'Integrated kid-friendly aesthetics using <code>BgDecorations.vue</code>.',
                    'Wired dynamic routing for <strong>Adventures</strong> and <strong>Lessons</strong>.',
                    'Resolved hydration mismatches in personalized content generation.'
                ]
            },
            {
                version: 'v1.0.0',
                date: 'Apr 24, 2026',
                color: 'neutral',
                dotColor: 'bg-neutral-300',
                title: 'Initial Architecture',
                changes: [
                    'Migrated folder structure to standard <strong>Nuxt 4</strong> conventions.',
                    'Established Core Layouts (<code>landing</code>, <code>login</code>, <code>dashboard</code>).',
                    'Integrated <code>@nuxt/ui</code> as the primary design system foundation.',
                    'Deployed the initial user <strong>Authentication</strong> flows.'
                ]
            }
        ]
    }
} as const
