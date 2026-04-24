<script setup>
const route = useRoute()
const { isScrolled } = useStickyHeader()

const navLinks = [
  { label: 'Home', to: '/', icon: 'i-ph-house-duotone', color: 'primary' },
  { label: 'Dashboard', to: '/dashboard', icon: 'i-ph-layout-duotone', color: 'secondary' },
  { label: 'Adventures', to: '/adventures', icon: 'i-ph-mountains-duotone', color: 'success' },
  { label: 'Shop', to: '/shop', icon: 'i-ph-storefront-duotone', color: 'info' }
]
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
          ? 'bg-white/70 backdrop-blur-2xl shadow-2xl shadow-primary-600/40 p-6 rounded-lg ring-4 ring-white'
          : 'bg-transparent p-4 rounded-sm ring-4 ring-white/0'
      ].join(' ')
    }">
      <template #left>
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <AppLogo class="h-10 w-auto shrink-0 transition-all duration-500 group-hover:scale-110" />
          <span
            class="text-primary-600 font-black tracking-tight text-xl ml-2 transition-all duration-500">LearnFast!</span>
        </NuxtLink>
      </template>


      <div class="hidden md:flex items-center gap-4">
        <UButton v-for="link in navLinks" :key="link.to" :to="link.to" :label="link.label" :icon="link.icon"
          :variant="route.path === link.to ? 'solid' : 'ghost'" :color="link.color"
          class="font-black rounded-xl px-5 py-2.5 transition-all duration-300" :class="[
            route.path === link.to
              ? 'shadow-lg shadow-primary-500/20 scale-105'
              : 'hover:scale-105 active:scale-95'
          ]" />
      </div>

      <template #right>
        <div class="flex items-center gap-3">
          <UButton to="/notifications" icon="i-ph-bell-duotone" variant="ghost" color="neutral" class="rounded-full" />
          <NuxtLink to="/profile">
            <UAvatar src="https://api.dicebear.com/9.x/thumbs/svg?seed=Felix" alt="User" size="sm"
              class="ring-2 ring-primary-500 shadow-lg cursor-pointer transition-transform hover:scale-110" />
          </NuxtLink>
        </div>
      </template>
    </UHeader>

    <UMain class="flex flex-col flex-1 pt-24 pb-12">
      <UContainer>
        <slot />
      </UContainer>
    </UMain>

    <UFooter class="mt-auto py-8">
      <template #left>
        <span class="text-sm text-muted font-medium">© {{ new Date().getFullYear() }} LearnFast! Adventures</span>
      </template>
      <template #right>
        <div class="flex gap-4">
          <UButton to="/help" icon="i-ph-question-duotone" variant="ghost" color="neutral" size="sm" />
          <UButton to="/settings" icon="i-ph-gear-duotone" variant="ghost" color="neutral" size="sm" />
        </div>
      </template>
    </UFooter>
  </div>
</template>
