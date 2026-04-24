<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const settingsGroups = [
  {
    title: 'Sound & Music',
    icon: 'i-ph-speaker-high-duotone',
    items: [
      { label: 'Background Music', value: true },
      { label: 'Sound Effects', value: true }
    ]
  },
  {
    title: 'Notifications',
    icon: 'i-ph-bell-duotone',
    items: [
      { label: 'Daily Reminders', value: true },
      { label: 'Friend Updates', value: false }
    ]
  },
  {
    title: 'App Theme',
    icon: 'i-ph-palette-duotone',
    items: [
      { label: 'Dark Mode', value: false },
      { label: 'High Contrast', value: false }
    ]
  }
]
</script>

<template>
  <BgDecorations />

  <div class="relative z-10 flex flex-col gap-10 max-w-2xl mx-auto">
    <header class="flex flex-col gap-2">
      <h1 class="text-4xl md:text-6xl font-black text-toned">
        Control <span class="text-primary-600">Center</span>
      </h1>
      <p class="text-xl text-muted font-medium">Make your experience just right!</p>
    </header>

    <div class="flex flex-col gap-8">
      <div v-for="group in settingsGroups" :key="group.title" class="flex flex-col gap-4">
        <div class="flex items-center gap-3 px-4">
          <UIcon :name="group.icon" class="text-primary-500 size-6" />
          <h2 class="text-xl font-black text-toned uppercase tracking-widest">{{ group.title }}</h2>
        </div>
        <div class="bg-white/60 backdrop-blur-md rounded-[2.5rem] border-2 border-white shadow-xl overflow-hidden">
          <div v-for="(item, index) in group.items" :key="item.label"
            class="flex items-center justify-between p-6 hover:bg-primary-50/30 transition-colors"
            :class="{ 'border-b-2 border-white': index < group.items.length - 1 }">
            <span class="text-lg font-bold text-toned">{{ item.label }}</span>
            <USwitch v-model="item.value" color="primary" />
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4 mt-6">
      <UButton label="Save Changes" block color="primary" class="font-black py-4 rounded-2xl shadow-lg" />
      <UButton label="Log Out" block variant="ghost" color="neutral"
        class="font-bold text-rose-500 hover:bg-rose-50 rounded-2xl" />
    </div>
  </div>
</template>
