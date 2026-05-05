<script setup lang="ts">
definePageMeta({
    layout: 'landing',
})

const features = [
    {
        icon: 'i-ph-game-controller-duotone',
        title: 'Learn While Playing',
        description: 'Our games are designed to teach you important things while you have the best time ever!',
        color: 'bg-orange-100',
        iconColor: 'text-orange-500',
        blobColor: 'bg-orange-400'
    },
    {
        icon: 'i-ph-palette-duotone',
        title: 'Express Yourself',
        description: 'Create, color, and design! Show off your unique style and creativity to the world.',
        color: 'bg-pink-100',
        iconColor: 'text-pink-500',
        blobColor: 'bg-pink-400'
    },
    {
        icon: 'i-ph-planet-duotone',
        title: 'Explore New Worlds',
        description: 'Travel through science, history, and space without ever leaving your seat.',
        color: 'bg-blue-100',
        iconColor: 'text-blue-500',
        blobColor: 'bg-blue-400'
    },
    {
        icon: 'i-ph-trophy-duotone',
        title: 'Win Rewards',
        description: 'Collect badges and trophies as you finish lessons and level up your skills!',
        color: 'bg-yellow-100',
        iconColor: 'text-yellow-600',
        blobColor: 'bg-yellow-400'
    },
    {
        icon: 'i-ph-users-three-duotone',
        title: 'Safe Community',
        description: 'A friendly and safe space to learn and grow alongside other kids just like you.',
        color: 'bg-purple-100',
        iconColor: 'text-purple-500',
        blobColor: 'bg-purple-400'
    },
    {
        icon: 'i-ph-shield-check-duotone',
        title: 'Parent Approved',
        description: 'Parents love our safe environment and the progress reports they get to see!',
        color: 'bg-green-100',
        iconColor: 'text-green-500',
        blobColor: 'bg-green-400'
    }
]

const plans = [
    {
        name: 'Free Explorer',
        icon: 'i-ph-rocket-launch-duotone',
        iconColor: 'text-emerald-500',
        iconBg: 'bg-emerald-100',
        price: '0',
        period: 'forever',
        description: 'Start your learning journey with the basics — no cost, no worries!',
        color: 'from-emerald-400 to-teal-500',
        ringColor: 'hover:ring-emerald-400/40',
        blobColor: 'bg-emerald-400',
        buttonColor: 'emerald' as const,
        buttonLabel: 'Start Free!',
        popular: false,
        features: [
            '5 Adventures per month',
            '3 Fun quizzes daily',
            'Basic badges & stickers',
            'Community access',
            'Progress tracking'
        ]
    },
    {
        name: 'Super Learner',
        icon: 'i-ph-crown-duotone',
        iconColor: 'text-primary-500',
        iconBg: 'bg-primary-100',
        price: '9.99',
        period: 'month',
        description: 'Unlock everything and become the ultimate learning superstar!',
        color: 'from-primary-500 to-purple-600',
        ringColor: 'hover:ring-primary-400/40',
        blobColor: 'bg-primary-400',
        buttonColor: 'primary' as const,
        buttonLabel: 'Go Super!',
        popular: true,
        features: [
            'Unlimited Adventures',
            'Unlimited quizzes & games',
            'All badges & trophies',
            'Create your own quizzes',
            'Priority community access',
            'Detailed progress reports',
            'No ads ever'
        ]
    },
    {
        name: 'Family Pack',
        icon: 'i-ph-house-duotone',
        iconColor: 'text-amber-500',
        iconBg: 'bg-amber-100',
        price: '19.99',
        period: 'month',
        description: 'Learning fun for the whole family — up to 5 kids on one plan!',
        color: 'from-amber-400 to-orange-500',
        ringColor: 'hover:ring-amber-400/40',
        blobColor: 'bg-amber-400',
        buttonColor: 'amber' as const,
        buttonLabel: 'Get Family Plan!',
        popular: false,
        features: [
            'Everything in Super Learner',
            'Up to 5 kid profiles',
            'Family leaderboard',
            'Parent dashboard',
            'Shared achievements',
            'Family challenges',
            'Priority support',
            'Early access to new content'
        ]
    }
]
</script>

<template>
    <BgDecorations />

    <UPageHero
        description="Discover a world of fun, games, and learning with LearnFast. Start your journey today and unlock your potential!"
        class="relative z-10 min-h-screen flex items-center justify-center">
        <template #title>
            <div class="flex flex-col items-center justify-center gap-2">
                <div class="relative">
                    <!-- Floating sparkles -->
                    <UIcon name="i-ph-sparkle-fill"
                        class="absolute -top-8 -right-8 size-12 text-yellow-400 animate-pulse" />
                    <UIcon name="i-ph-sparkle-fill"
                        class="absolute -bottom-4 -left-12 size-8 text-primary-400 animate-bounce" />

                    <h1 class="text-5xl md:text-9xl font-black tracking-tight leading-none select-none text-center">
                        <span
                            class="block text-yellow-500 drop-shadow-[0_5px_0_theme(colors.yellow.700)] transform -rotate-3 mb-2 transition-transform hover:rotate-0 duration-500">
                            Learning is an
                        </span>
                        <span
                            class="block bg-linear-to-r from-primary-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm transform rotate-1 transition-transform hover:rotate-0 duration-500">
                            Adventure!
                        </span>
                    </h1>
                </div>
            </div>
        </template>

        <template #links>
            <UButton label="Start Learning!" to="/register" size="xl" trailing-icon="i-ph-atom"
                class="shadow-xl shadow-primary-500/20 px-8 py-4 text-lg font-bold hover:scale-105 active:scale-95 transition-all" />
            <UButton label="Login" to="/login" size="xl" variant="subtle" color="neutral" icon="i-ph-sign-in"
                class="px-8 py-4 text-lg font-medium ring-0 hover:bg-primary-50 hover:text-primary-600" />
        </template>
    </UPageHero>

    <UPageSection id="features">
        <template #title>
            <div class="flex flex-col items-center gap-6 mb-4">
                <h2 class="text-4xl md:text-7xl font-black tracking-tight text-toned text-center relative px-4">
                    Why Kids Love <span
                        class="text-primary-600 drop-shadow-[0_5px_0_theme(colors.primary.800/0.2)]">LearnFast!</span>
                    <!-- Decorative underline svg -->
                    <svg class="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 md:w-64 h-6 text-yellow-400 opacity-60"
                        viewBox="0 0 200 20" fill="none" preserveAspectRatio="none">
                        <path d="M5 15C50 5 150 5 195 15" stroke="currentColor" stroke-width="10"
                            stroke-linecap="round" />
                    </svg>
                </h2>
            </div>
        </template>

        <template #description>
            <div class="text-center mt-12">
                <p class="text-xl md:text-3xl text-muted font-medium leading-relaxed">
                    We make learning feel like
                    <span
                        class="relative inline-block px-4 py-1 bg-purple-100 text-primary-600 rounded-sm transform rotate-1 hover:rotate-0 transition-transform cursor-default">playing</span>.
                    Here's why LearnFast is the perfect place to grow and explore!
                </p>
            </div>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <UCard v-for="(feature, index) in features" :key="index"
                class="group hover:-translate-y-3 transition-all duration-500 shadow-xl hover:shadow-2xl border-0 overflow-hidden relative rounded-[2.5rem] hover:ring-6 hover:ring-primary-500/30"
                :ui="{ body: 'p-10 flex flex-col items-center text-center gap-6 relative z-10' }">

                <!-- Animated Background Blob -->
                <div class="absolute -top-10 -right-10 size-32 opacity-10 group-hover:opacity-20 transition-all duration-700 blur-2xl group-hover:scale-150"
                    :class="feature.blobColor" />

                <div
                    :class="[feature.color, 'p-8 rounded-[2rem] scale-90 group-hover:scale-105 group-hover:rotate-6 transition-all duration-500 relative shadow-inner shadow-black/5']">
                    <UIcon :name="feature.icon" :class="[feature.iconColor, 'size-16 md:size-20']" />
                </div>

                <div class="flex flex-col gap-3">
                    <h3
                        class="text-2xl md:text-3xl font-black text-toned tracking-tight group-hover:text-primary-600 transition-colors">
                        {{ feature.title }}</h3>
                    <p class="text-lg text-muted font-medium leading-relaxed">{{ feature.description }}</p>
                </div>

                <!-- Interactive indicator -->
                <div
                    class="mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div class="h-1.5 w-12 rounded-full mx-auto" :class="feature.blobColor" />
                </div>
            </UCard>
        </div>
    </UPageSection>

    <!-- Pricing Plans Section -->
    <UPageSection id="plans">
        <template #title>
            <div class="flex flex-col items-center gap-6 mb-4">
                <h2 class="text-4xl md:text-7xl font-black tracking-tight text-toned text-center relative px-4">
                    Pick Your <span
                        class="text-primary-600 drop-shadow-[0_5px_0_theme(colors.primary.800/0.2)]">Plan!</span>
                    <!-- Decorative underline svg -->
                    <svg class="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 md:w-64 h-6 text-primary-400 opacity-60"
                        viewBox="0 0 200 20" fill="none" preserveAspectRatio="none">
                        <path d="M5 15C50 5 150 5 195 15" stroke="currentColor" stroke-width="10"
                            stroke-linecap="round" />
                    </svg>
                </h2>
            </div>
        </template>

        <template #description>
            <div class="text-center mt-12">
                <p class="text-xl md:text-3xl text-muted font-medium leading-relaxed">
                    Every learner deserves the
                    <span
                        class="relative inline-block px-4 py-1 bg-purple-100 text-primary-600 rounded-sm transform rotate-1 hover:rotate-0 transition-transform cursor-default">best
                        tools</span>.
                    Choose the plan that fits your adventure!
                </p>
            </div>
        </template>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 items-start">
            <UCard v-for="(plan, index) in plans" :key="index"
                class="group hover:-translate-y-3 transition-all duration-500 shadow-xl hover:shadow-2xl border-0 overflow-hidden relative rounded-[2.5rem] hover:ring-6"
                :class="[plan.ringColor, plan.popular ? 'ring-4 ring-primary-400/50 scale-[1.02] lg:scale-105' : '']"
                :ui="{ body: 'p-10 flex flex-col items-center text-center gap-6 relative z-10' }">

                <!-- Animated Background Blob -->
                <div class="absolute -top-16 -right-16 size-48 opacity-10 group-hover:opacity-25 transition-all duration-700 blur-3xl group-hover:scale-150 rounded-full"
                    :class="plan.blobColor" />
                <div class="absolute -bottom-10 -left-10 size-32 opacity-5 group-hover:opacity-15 transition-all duration-700 blur-2xl group-hover:scale-125 rounded-full"
                    :class="plan.blobColor" />

                <!-- Popular badge -->
                <div v-if="plan.popular" class="absolute -top-0 -right-0 z-20">
                    <div
                        class="bg-linear-to-r from-primary-500 to-purple-600 text-white text-sm font-black px-6 py-2 rounded-bl-2xl rounded-tr-[2.5rem] shadow-lg shadow-primary-500/30 flex items-center gap-2">
                        <UIcon name="i-ph-star-fill" class="size-4 text-yellow-300" /> Most Popular!
                    </div>
                </div>

                <!-- Plan Icon & Name -->
                <div class="flex flex-col items-center gap-3 pt-2">
                    <div
                        :class="[plan.iconBg, 'p-6 rounded-[2rem] scale-90 group-hover:scale-105 group-hover:rotate-6 transition-all duration-500 relative shadow-inner shadow-black/5']">
                        <UIcon :name="plan.icon" :class="[plan.iconColor, 'size-12 md:size-14 flex']" />
                    </div>
                    <h3 class="text-2xl md:text-3xl font-black text-toned tracking-tight">{{ plan.name }}</h3>
                </div>

                <!-- Price -->
                <div class="flex items-baseline gap-1">
                    <span v-if="plan.price !== '0'" class="text-2xl font-bold text-muted">$</span>
                    <span class="text-5xl md:text-6xl font-black bg-linear-to-r bg-clip-text text-transparent"
                        :class="plan.color">
                        {{ plan.price === '0' ? 'FREE' : plan.price }}
                    </span>
                    <span v-if="plan.price !== '0'" class="text-lg font-bold text-muted">/{{ plan.period }}</span>
                </div>

                <!-- Description -->
                <p class="text-lg text-muted font-medium leading-relaxed">{{ plan.description }}</p>

                <!-- Divider -->
                <div class="w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />

                <!-- Features List -->
                <ul class="w-full space-y-4 text-left">
                    <li v-for="(feat, fi) in plan.features" :key="fi"
                        class="flex items-center gap-3 text-base font-medium text-toned">
                        <div class="flex-shrink-0 size-7 rounded-full bg-linear-to-br flex items-center justify-center shadow-sm"
                            :class="plan.color">
                            <UIcon name="i-ph-check-bold" class="size-4 text-white" />
                        </div>
                        {{ feat }}
                    </li>
                </ul>

                <!-- CTA Button -->
                <UButton :label="plan.buttonLabel" to="/register" size="xl" :color="plan.buttonColor" block
                    class="mt-4 py-4 text-lg font-black shadow-xl hover:scale-105 active:scale-95 transition-all" />

                <!-- Interactive indicator -->
                <div
                    class="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div class="h-1.5 w-12 rounded-full mx-auto bg-linear-to-r" :class="plan.color" />
                </div>
            </UCard>
        </div>
    </UPageSection>

    <UPageSection>
        <UPageCTA title="Ready for your next big discovery?"
            description="Join thousands of kids who are already exploring and learning. It's time to start your adventure!"
            :ui="{
                root: 'bg-linear-to-br from-primary-600 via-purple-600 to-indigo-700 shadow-2xl shadow-primary-500/30 relative overflow-hidden rounded-[3rem]',
                title: 'text-white text-4xl md:text-6xl font-black tracking-tight leading-tight',
                description: 'text-xl md:text-2xl text-primary-50/90 font-medium leading-relaxed',
            }">
            <template #links>
                <UButton label="Create My Account!" to="/register" size="xl" color="neutral" variant="solid"
                    trailing-icon="i-ph-atom"
                    class="px-10 py-5 text-xl font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10" />
                <UButton label="I Already Have One" to="/login" size="xl" variant="ghost" color="neutral"
                    icon="i-ph-user"
                    class="text-white hover:bg-white/10 px-10 py-5 text-xl font-medium rounded-2xl transition-all" />
            </template>
        </UPageCTA>
    </UPageSection>
</template>
