<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})

const faqs = [
  { q: 'How do I earn XP?', a: 'You earn XP by completing lessons, finishing quests, and maintaining your daily streak!' },
  { q: 'What are Magic Coins?', a: 'Magic Coins are earned through adventures and can be spent in the Shop for cool avatar items.' },
  { q: 'Can I play with friends?', a: 'Yes! You can add friends, see their progress on the leaderboard, and send them gifts.' },
  { q: 'Is LearnFast free?', a: 'LearnFast is free for all explorers! Some special items in the shop might require extra effort to unlock.' }
]
</script>

<template>
  <BgDecorations />

  <div class="relative z-10 flex flex-col gap-10 max-w-3xl mx-auto">
    <header class="text-center flex flex-col gap-4">
      <div class="inline-flex items-center justify-center p-6 bg-primary-100 rounded-[2.5rem] shadow-inner self-center">
        <UIcon name="i-ph-question-duotone" class="text-primary-600 size-16" />
      </div>
      <h1 class="text-4xl md:text-6xl font-black text-toned">
        Need <span class="text-primary-600">Help?</span>
      </h1>
      <p class="text-xl text-muted font-medium">Don't worry, we're here to guide you!</p>
    </header>

    <div class="flex flex-col gap-6">
      <h2 class="text-2xl font-black text-toned px-4">Common Questions</h2>
      <UAccordion :items="faqs.map(f => ({ label: f.q, content: f.a }))"
        :ui="{ root: 'space-y-6', item: 'px-10 py-3 bg-white/60 backdrop-blur-md rounded-3xl border-2 border-white shadow-lg', label: 'text-lg font-black text-toned', content: 'text-lg text-muted', trailingIcon: 'size-6 text-primary' }" />
    </div>

    <div
      class="bg-linear-to-br from-indigo-600 to-primary-700 p-10 rounded-[3rem] shadow-2xl text-white text-center flex flex-col gap-6">
      <h2 class="text-3xl font-black">Still confused?</h2>
      <p class="text-lg font-medium opacity-90">Ask your parents or teachers for help, or send us a message!</p>
      <UButton label="Message Support" variant="solid" color="neutral"
        class="bg-white text-primary-600 font-black px-10 py-4 rounded-2xl self-center hover:scale-105 transition-all" />
    </div>
  </div>
</template>
