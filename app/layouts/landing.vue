<script setup>
useHead({
    meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
        { rel: 'icon', href: '/favicon.ico' }
    ],
    htmlAttrs: {
        lang: 'en'
    }
})

const title = 'Nuxt Starter Template'
const description = 'A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours.'

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
    twitterCard: 'summary_large_image'
})

const { isScrolled } = useStickyHeader()
</script>

<template>
    <div class="flex flex-col min-h-screen relative bg-linear-to-b from-purple-200 to-yellow-50">
        <UHeader :ui="{
            root: [
                'backdrop-blur-none bg-transparent border-b-0 fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-none w-full max-w-(--ui-container) mx-auto px-8 h-auto',
                isScrolled ? 'pt-4' : 'pt-0'
            ].join(' '),
            container: [
                'transition-all duration-500 flex items-center pointer-events-auto',
                isScrolled
                    ? 'bg-white/70 backdrop-blur-2xl shadow-2xl shadow-primary-600/40 p-6 rounded-sm ring-6 ring-primary-500/40'
                    : 'bg-transparent p-4 rounded-sm ring-6 ring-primary-500/0'
            ].join(' ')
        }">
            <template #left>
                <NuxtLink to="/" class="flex items-center gap-2 group">
                    <AppLogo class="h-12 w-auto shrink-0 transition-all duration-500 group-hover:scale-110" />
                    <span
                        class="text-primary-600 font-black tracking-tight text-2xl ml-2 transition-all duration-500">LearnFast!</span>
                </NuxtLink>
            </template>

            <template #right>
                <div class="flex items-center gap-3">
                    <UButton label="Login" to="/login" color="primary" icon="i-ph-sign-in" />
                </div>
            </template>
        </UHeader>

        <UMain class="flex flex-col flex-1">
            <NuxtPage />
        </UMain>

        <!-- Fancy Footer -->
        <footer class="relative overflow-hidden">
            <!-- Wavy SVG separator -->
            <div class="w-full overflow-hidden leading-[0]">
                <svg class="relative block w-full h-16 md:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,40 C150,100 350,0 600,40 C850,80 1050,0 1200,40 L1200,120 L0,120 Z"
                        class="fill-primary-700" />
                    <path d="M0,60 C200,110 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z"
                        class="fill-primary-800/80" />
                </svg>
            </div>

            <div class="bg-linear-to-br from-primary-800 via-purple-900 to-indigo-950 relative">
                <!-- Decorative floating elements -->
                <UIcon name="i-ph-sparkle-fill"
                    class="absolute top-8 left-[10%] size-6 text-yellow-400/20 animate-pulse" />
                <UIcon name="i-ph-star-fill"
                    class="absolute top-16 right-[15%] size-5 text-purple-300/15 animate-bounce" />
                <UIcon name="i-ph-sparkle-fill"
                    class="absolute bottom-20 left-[70%] size-4 text-primary-300/20 animate-pulse" />
                <UIcon name="i-ph-planet-fill"
                    class="absolute top-12 right-[40%] size-8 text-indigo-400/10 animate-spin"
                    style="animation-duration: 20s" />

                <div class="max-w-(--ui-container) mx-auto px-6 md:px-8 pt-12 pb-8">
                    <!-- Top section: brand + links -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        <!-- Brand column -->
                        <div class="flex flex-col gap-4">
                            <NuxtLink to="/" class="flex items-center gap-3 group w-fit">
                                <AppLogo class="h-10 w-fit" />
                                <span class="text-white font-black tracking-tight text-2xl">LearnFast!</span>
                            </NuxtLink>
                            <p class="text-primary-200/70 text-sm leading-relaxed max-w-xs">
                                Making learning feel like an adventure. Join thousands of kids exploring, creating, and
                                growing
                                every day.
                            </p>
                        </div>

                        <!-- Quick Links -->
                        <div class="flex flex-col gap-3">
                            <h4 class="text-white/90 font-bold text-sm uppercase tracking-widest mb-1">Explore</h4>
                            <NuxtLink to="/register"
                                class="text-primary-200/60 hover:text-yellow-300 text-sm font-medium transition-colors duration-300 w-fit flex items-center gap-2 group">
                                <UIcon name="i-ph-rocket-launch"
                                    class="size-4 group-hover:translate-x-0.5 transition-transform" />
                                Start Learning
                            </NuxtLink>
                            <NuxtLink to="/login"
                                class="text-primary-200/60 hover:text-yellow-300 text-sm font-medium transition-colors duration-300 w-fit flex items-center gap-2 group">
                                <UIcon name="i-ph-sign-in"
                                    class="size-4 group-hover:translate-x-0.5 transition-transform" />
                                Sign In
                            </NuxtLink>
                        </div>

                        <!-- Social / Connect -->
                        <div class="flex flex-col gap-3">
                            <h4 class="text-white/90 font-bold text-sm uppercase tracking-widest mb-1">Connect</h4>
                            <div class="flex items-center gap-2">
                                <UButton to="https://github.com/nuxt-ui-templates/starter" target="_blank"
                                    icon="i-simple-icons-github" aria-label="GitHub" variant="ghost"
                                    class="text-primary-200/50 hover:text-white hover:bg-white/10 transition-all" />
                                <UButton to="#" icon="i-simple-icons-x" aria-label="X" variant="ghost"
                                    class="text-primary-200/50 hover:text-white hover:bg-white/10 transition-all" />
                                <UButton to="#" icon="i-simple-icons-discord" aria-label="Discord" variant="ghost"
                                    class="text-primary-200/50 hover:text-white hover:bg-white/10 transition-all" />
                            </div>
                        </div>
                    </div>

                    <!-- Divider -->
                    <div class="h-px bg-linear-to-r from-transparent via-white/15 to-transparent mb-6" />

                    <!-- Bottom bar -->
                    <div class="flex flex-col md:flex-row items-center justify-between gap-3">
                        <p class="text-primary-200/40 text-xs font-medium">
                            © {{ new Date().getFullYear() }} LearnFast — Made with
                            <UIcon name="i-ph-heart-fill" class="inline size-3 text-pink-400 animate-pulse mx-0.5" />
                            for curious minds
                        </p>
                        <p class="text-primary-200/30 text-xs">
                            Learning is an adventure!
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
