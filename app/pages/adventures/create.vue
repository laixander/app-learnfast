<script setup lang="ts">
definePageMeta({
    layout: 'dashboard'
})

const { user, addCustomAdventure } = useUserStore()
const { getRandomHarmony } = useAdventures()
const { detectCategory } = useCategories()

// Wizard State
const currentStep = ref(0) // 0: onboarding, 1: topic, 2: materials, 3: duration, 4: confidence, 5: generating, 6: reveal
const totalSteps = 4 // (Topic, Materials, Duration, Confidence)
const generatedAdventure = ref<any>(null)

const form = reactive({
    topic: '',
    materials: [] as any[],
    duration: 'standard',
    confidenceItems: [
        { text: 'Basic Concepts', score: 0 },
        { text: 'Key Vocabulary', score: 0 },
        { text: 'Real-world Examples', score: 0 },
        { text: 'Advanced Mastery', score: 0 }
    ]
})

const { suggestions } = useSuggestions()

const steps = [
    {
        title: 'Spark of Inspiration',
        description: 'Think of any topic you want to learn about! Dinosaurs, Space, or even How Pizza is Made.',
        icon: 'i-ph-lightbulb-duotone',
        color: 'bg-amber-100',
        iconColor: 'text-amber-500',
        blob: 'bg-amber-400'
    },
    {
        title: 'AI Alchemy',
        description: 'Our AI magically crafts custom lessons and quizzes just for you in seconds.',
        icon: 'i-ph-flask-duotone',
        color: 'bg-purple-100',
        iconColor: 'text-purple-500',
        blob: 'bg-purple-400'
    },
    {
        title: 'The Grand Adventure',
        description: 'Jump into your personalized world, earn your AI badge, and become a master!',
        icon: 'i-ph-mountains-duotone',
        color: 'bg-indigo-100',
        iconColor: 'text-indigo-500',
        blob: 'bg-indigo-400'
    }
]

const nextStep = () => {
    if (currentStep.value < 6) currentStep.value++
}

const prevStep = () => {
    if (currentStep.value > 0) currentStep.value--
}

const selectSuggestion = (val: string) => {
    form.topic = val
}

const startGeneration = () => {
    nextStep()
    
    setTimeout(() => {
        const detected = detectCategory(form.topic)
        const harmony = getRandomHarmony()!
        const slug = `custom-${Date.now()}`

        generatedAdventure.value = {
            slug,
            title: form.topic || 'My Custom Adventure',
            category: detected.name,
            description: 'A personalized learning journey created just for you!',
            longDescription: 'This adventure was specially crafted by AI based on your interests.',
            icon: detected.icon,
            progress: 0,
            color: harmony.color,
            blob: harmony.blob,
            badge: 'AI Explorer',
            lessons: 5,
            time: '30 mins',
            buttonClass: harmony.button,
            startContent: {
                tagline: 'Your custom journey awaits!',
                goals: [
                    { title: 'Intro', description: 'Begin your journey.', icon: 'i-ph-star-duotone', color: 'text-yellow-400' }
                ]
            }
        }

        addCustomAdventure(generatedAdventure.value)
        nextStep()
    }, 5000)
}
</script>

<template>
    <div class="relative z-10 flex flex-col gap-10 pb-20">
        <!-- Back/Navigation -->
        <div class="flex items-center justify-between">
            <UButton @click="currentStep === 0 ? navigateTo('/adventures') : prevStep()" 
                icon="i-ph-arrow-left-bold" 
                :label="currentStep === 0 ? 'Back to Adventures' : 'Go Back'" 
                variant="ghost"
                color="neutral"
                class="font-black text-lg hover:bg-primary-100 hover:text-primary-600 rounded-2xl px-6" />
            
            <!-- Progress Tracker (visible after onboarding) -->
            <div v-if="currentStep > 0 && currentStep < 5" class="flex items-center gap-4 bg-white/40 backdrop-blur-md px-6 py-2 rounded-full border-2 border-white shadow-lg">
                <div class="flex gap-2">
                    <div v-for="i in totalSteps" :key="i" 
                        class="size-3 rounded-full transition-all duration-500"
                        :class="i <= currentStep ? 'bg-indigo-500 scale-125' : 'bg-indigo-200'" />
                </div>
                <span class="text-sm font-black text-indigo-600 uppercase tracking-widest">Step {{ currentStep }} of {{ totalSteps }}</span>
            </div>
        </div>

        <!-- 0: ONBOARDING -->
        <template v-if="currentStep === 0">
            <!-- Hero Section -->
            <header
                class="relative bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 p-12 md:p-20 rounded-[4rem] shadow-2xl overflow-hidden text-white">
                <UIcon name="i-ph-sparkle-fill" class="absolute top-10 right-20 size-12 text-yellow-300/30 animate-pulse" />
                <UIcon name="i-ph-sparkle-fill" class="absolute bottom-20 left-10 size-8 text-white/20 animate-bounce" />
                <div class="relative z-10 flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
                    <div class="bg-white/20 backdrop-blur-md p-6 rounded-[2.5rem] shadow-2xl ring-4 ring-white/30 animate-float">
                        <UIcon name="i-ph-magic-wand-duotone" class="text-white size-20 md:size-24 flex" />
                    </div>
                    <h1 class="text-5xl md:text-8xl font-black tracking-tight leading-none drop-shadow-lg">
                        AI Adventure <br> <span class="text-yellow-300">Laboratory</span>
                    </h1>
                    <p class="text-xl md:text-3xl font-medium opacity-90 leading-relaxed">
                        Welcome, Scientist {{ user.name }}! Here, you can use the power of AI to create 
                        any learning adventure your heart desires.
                    </p>
                </div>
            </header>

            <!-- Steps Info -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <UCard v-for="(step, index) in steps" :key="index"
                    class="group hover:-translate-y-3 transition-all duration-500 shadow-xl hover:shadow-2xl border-0 overflow-hidden relative rounded-[3rem]"
                    :ui="{ body: 'p-10 flex flex-col items-center text-center gap-6 relative z-10 h-full' }">
                    <div class="absolute top-6 left-6 size-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black shadow-lg">
                        {{ index + 1 }}
                    </div>
                    <div :class="[step.color, 'p-8 rounded-[2rem] scale-90 group-hover:scale-105 group-hover:rotate-6 transition-all duration-500 relative mt-4']">
                        <UIcon :name="step.icon" :class="[step.iconColor, 'size-16 md:size-20 flex']" />
                    </div>
                    <div class="flex flex-col gap-3 flex-1">
                        <h3 class="text-2xl font-black text-toned group-hover:text-indigo-600 transition-colors">{{ step.title }}</h3>
                        <p class="text-lg text-muted font-medium leading-relaxed">{{ step.description }}</p>
                    </div>
                </UCard>
            </div>

            <div class="bg-white/40 backdrop-blur-xl p-10 rounded-[3.5rem] border-4 border-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div class="flex items-center gap-6 text-left">
                    <div class="p-5 rounded-2xl bg-indigo-500 shadow-lg shrink-0">
                        <UIcon name="i-ph-star-fill" class="text-white size-8 flex" />
                    </div>
                    <div>
                        <h3 class="text-2xl font-black text-toned">Ready to begin your experiment?</h3>
                        <p class="text-muted font-medium">It only takes a few seconds to build a whole world!</p>
                    </div>
                </div>
                <UButton @click="nextStep" label="Enter the Laboratory!" icon="i-ph-rocket-launch-bold" size="xl"
                    class="font-black px-12 py-6 rounded-2xl shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all text-xl bg-indigo-600 hover:bg-indigo-700 text-white border-0" />
            </div>
        </template>

        <!-- 1: TOPIC INPUT -->
        <template v-else-if="currentStep === 1">
            <div class="max-w-4xl mx-auto w-full flex flex-col gap-12 text-center py-10">
                <div class="flex flex-col gap-4">
                    <div class="bg-amber-100 p-5 rounded-3xl w-fit mx-auto shadow-inner mb-2">
                        <UIcon name="i-ph-lightbulb-duotone" class="text-amber-500 size-16" />
                    </div>
                    <h2 class="text-5xl md:text-7xl font-black text-toned leading-tight">The Spark of Inspiration</h2>
                    <p class="text-xl md:text-2xl text-muted font-medium">What amazing thing do you want to learn about today?</p>
                </div>

                <div class="relative group">
                    <div class="absolute -inset-4 bg-linear-to-r from-amber-400 to-indigo-400 rounded-[3.5rem] blur-xl opacity-20 group-focus-within:opacity-40 transition-opacity" />
                    <textarea 
                        v-model="form.topic"
                        placeholder="Type your dream topic here... (e.g. How do Astronauts sleep in space?)"
                        class="w-full min-h-[200px] p-10 text-2xl md:text-3xl font-bold bg-white/80 backdrop-blur-xl rounded-[3rem] border-4 border-white shadow-2xl focus:ring-8 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden transition-all placeholder:text-muted/40"
                    />
                </div>

                <div class="flex flex-col gap-6">
                    <p class="text-sm font-black text-muted uppercase tracking-widest">Or try a magical suggestion:</p>
                    <div class="flex flex-wrap justify-center gap-3">
                        <UButton v-for="s in suggestions" :key="s.id" @click="selectSuggestion(s.value)"
                            variant="soft" color="neutral"
                            class="pl-2 pr-4 py-2 rounded-xl font-bold text-base hover:scale-105 active:scale-95 transition-all bg-white/60 hover:bg-indigo-50 border-2 border-white shadow-md">
                            <template #leading>
                                <div :class="['size-8 rounded-lg flex items-center justify-center', `bg-${s.color}-50 text-${s.color}-600`] ">
                                    <UIcon :name="s.icon" class="size-5" />
                                </div>
                            </template>
                            {{ s.label }}
                        </UButton>
                    </div>
                </div>

                <UButton 
                    @click="nextStep"
                    :disabled="!form.topic.trim()"
                    label="Next: Add Ingredients →" 
                    size="xl"
                    class="mt-6 font-black px-16 py-8 rounded-3xl text-2xl shadow-2xl transition-all self-center"
                    :class="form.topic.trim() ? 'bg-indigo-600 hover:bg-indigo-700 hover:scale-105' : 'bg-muted opacity-50 cursor-not-allowed'" />
            </div>
        </template>

        <!-- 2: MATERIAL UPLOAD -->
        <template v-else-if="currentStep === 2">
            <div class="max-w-4xl mx-auto w-full flex flex-col gap-12 text-center py-10">
                <div class="flex flex-col gap-4">
                    <div class="bg-purple-100 p-5 rounded-3xl w-fit mx-auto shadow-inner mb-2">
                        <UIcon name="i-ph-flask-duotone" class="text-purple-500 size-16" />
                    </div>
                    <h2 class="text-5xl md:text-7xl font-black text-toned leading-tight">Mix Your Potion</h2>
                    <p class="text-xl md:text-2xl text-muted font-medium">Want to add your own notes, pictures, or books to the mix? (Optional)</p>
                </div>

                <div class="relative group">
                    <div class="absolute -inset-4 bg-linear-to-r from-purple-400 to-pink-400 rounded-[4rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div class="bg-white/80 backdrop-blur-xl p-16 rounded-[4rem] border-4 border-dashed border-purple-300 flex flex-col items-center gap-6 shadow-2xl transition-all hover:border-purple-500 group">
                        <div class="size-32 bg-purple-100 rounded-full flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 transition-transform">
                            <UIcon name="i-ph-upload-simple-duotone" class="text-purple-600 size-16" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <h3 class="text-3xl font-black text-toned">Drop your materials here!</h3>
                            <p class="text-muted font-medium text-lg">PDFs, Images, or Text Files (Max 10MB)</p>
                        </div>
                        <UButton label="Choose Files" color="purple" variant="soft" size="xl" class="font-bold px-10 rounded-2xl border-2 border-purple-200" />
                    </div>
                </div>

                <div class="flex items-center justify-center gap-6 mt-6">
                    <UButton 
                        @click="nextStep"
                        label="Skip & Stir Potion" 
                        variant="ghost" 
                        color="neutral"
                        class="font-black text-xl px-10 py-5 rounded-2xl hover:bg-white/40" />
                    <UButton 
                        @click="nextStep"
                        label="Next: Set Duration →" 
                        size="xl"
                        color="purple"
                        class="font-black px-16 py-8 rounded-3xl text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all" />
                </div>
            </div>
        </template>

        <!-- 3: DURATION SELECTION -->
        <template v-else-if="currentStep === 3">
            <div class="max-w-6xl mx-auto w-full flex flex-col gap-12 text-center py-10">
                <div class="flex flex-col gap-4">
                    <div class="bg-indigo-100 p-5 rounded-3xl w-fit mx-auto shadow-inner mb-2">
                        <UIcon name="i-ph-clock-duotone" class="text-indigo-600 size-16" />
                    </div>
                    <h2 class="text-5xl md:text-7xl font-black text-toned leading-tight">Plan Your Journey</h2>
                    <p class="text-xl md:text-2xl text-muted font-medium">How long should this adventure be?</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <UCard v-for="d in [
                        { id: 'mini', title: 'Mini Quest', lessons: 3, quizzes: 2, time: '15 mins', icon: 'i-ph-lightning-duotone', color: 'text-yellow-500', bg: 'bg-yellow-50' },
                        { id: 'standard', title: 'Standard Adventure', lessons: 5, quizzes: 3, time: '30 mins', icon: 'i-ph-map-trifold-duotone', color: 'text-indigo-500', bg: 'bg-indigo-50' },
                        { id: 'epic', title: 'Epic Journey', lessons: 8, quizzes: 5, time: '60 mins', icon: 'i-ph-crown-duotone', color: 'text-purple-500', bg: 'bg-purple-50' }
                    ]" :key="d.id"
                        @click="form.duration = d.id"
                        class="group cursor-pointer transition-all duration-500 rounded-[3rem] border-4 overflow-hidden relative"
                        :class="form.duration === d.id ? 'border-indigo-500 ring-8 ring-indigo-500/10 scale-105' : 'border-white hover:border-indigo-200'"
                        :ui="{ body: 'p-10 flex flex-col items-center gap-6' }">
                        
                        <div :class="[d.bg, 'p-8 rounded-[2rem] shadow-inner transition-transform group-hover:scale-110']">
                            <UIcon :name="d.icon" :class="[d.color, 'size-16']" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <h3 class="text-3xl font-black text-toned">{{ d.title }}</h3>
                            <div class="flex flex-col gap-1 text-muted font-bold">
                                <p class="flex items-center justify-center gap-2">
                                    <UIcon name="i-ph-book-open-bold" /> {{ d.lessons }} Lessons
                                </p>
                                <p class="flex items-center justify-center gap-2">
                                    <UIcon name="i-ph-question-bold" /> {{ d.quizzes }} Quizzes
                                </p>
                                <p class="flex items-center justify-center gap-2 text-primary-600 mt-2">
                                    <UIcon name="i-ph-timer-bold" /> {{ d.time }}
                                </p>
                            </div>
                        </div>

                        <div v-if="form.duration === d.id" class="absolute top-6 right-6">
                            <div class="size-10 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-bounce">
                                <UIcon name="i-ph-check-bold" class="text-white size-5" />
                            </div>
                        </div>
                    </UCard>
                </div>

                <UButton 
                    @click="nextStep"
                    label="Final Preparation →" 
                    size="xl"
                    class="mt-6 font-black px-16 py-8 rounded-3xl text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all self-center bg-indigo-600 hover:bg-indigo-700 text-white border-0" />
            </div>
        </template>

        <!-- 4: CONFIDENCE CHECK -->
        <template v-else-if="currentStep === 4">
            <div class="max-w-4xl mx-auto w-full flex flex-col gap-12 text-center py-10">
                <div class="flex flex-col gap-4">
                    <div class="bg-rose-100 p-5 rounded-3xl w-fit mx-auto shadow-inner mb-2">
                        <UIcon name="i-ph-brain-duotone" class="text-rose-500 size-16" />
                    </div>
                    <h2 class="text-5xl md:text-7xl font-black text-toned leading-tight">The Mind Mirror</h2>
                    <p class="text-xl md:text-2xl text-muted font-medium">How much do you already know about these things?</p>
                </div>

                <div class="bg-white/60 backdrop-blur-xl p-8 md:p-12 rounded-[4rem] border-4 border-white shadow-2xl flex flex-col gap-8">
                    <div v-for="(item, index) in form.confidenceItems" :key="index"
                        class="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-[2.5rem] bg-white shadow-sm border-2 border-primary-50 transition-all hover:shadow-md">
                        <div class="text-2xl font-black text-toned flex-1 text-left">
                            {{ item.text }}
                        </div>
                        <div class="flex gap-3">
                            <button v-for="star in 5" :key="star"
                                @click="item.score = star"
                                class="size-12 rounded-2xl transition-all duration-300 flex items-center justify-center group/star"
                                :class="star <= item.score ? 'bg-amber-400 text-white scale-110 shadow-lg' : 'bg-primary-50 text-primary-200 hover:bg-amber-100'">
                                <UIcon :name="star <= item.score ? 'i-ph-star-fill' : 'i-ph-star-duotone'" class="size-7" />
                            </button>
                        </div>
                    </div>
                </div>

                <UButton 
                    @click="startGeneration"
                    label="Begin the Magic! ✨" 
                    size="xl"
                    class="mt-6 font-black px-16 py-8 rounded-3xl text-3xl shadow-2xl hover:scale-110 active:scale-95 transition-all self-center bg-linear-to-r from-indigo-600 to-purple-600 text-white border-0" />
            </div>
        </template>

        <!-- 5: GENERATING ANIMATION -->
        <template v-else-if="currentStep === 5">
            <div class="fixed inset-0 z-50 bg-indigo-900/90 backdrop-blur-3xl flex flex-col items-center justify-center text-white overflow-hidden">
                <!-- Background decorations -->
                <UIcon name="i-ph-sparkle-fill" class="absolute top-1/4 left-1/4 size-20 text-yellow-400/20 animate-pulse" />
                <UIcon name="i-ph-sparkle-fill" class="absolute bottom-1/4 right-1/4 size-32 text-purple-400/20 animate-bounce" />
                
                <div class="relative">
                    <!-- The Cauldron / Magic Circle -->
                    <div class="size-64 md:size-80 rounded-full border-8 border-indigo-400/30 border-t-indigo-400 animate-spin" style="animation-duration: 3s" />
                    <div class="absolute inset-0 flex items-center justify-center animate-float">
                        <UIcon name="i-ph-magic-wand-duotone" class="text-white size-32 md:size-40" />
                    </div>
                </div>

                <div class="mt-16 flex flex-col items-center gap-6 text-center max-w-lg">
                    <h2 class="text-4xl md:text-6xl font-black tracking-tight animate-pulse">Brewing Your Adventure...</h2>
                    <p class="text-xl md:text-2xl text-indigo-200 font-medium leading-relaxed">
                        Mixing the lessons, stirring the quizzes, and adding a dash of wonder!
                    </p>
                    
                    <!-- Progress bar -->
                    <div class="w-full h-4 bg-white/10 rounded-full overflow-hidden mt-4 shadow-inner">
                        <div class="h-full bg-indigo-400 rounded-full animate-progress" />
                    </div>
                </div>
            </div>
        </template>

        <!-- 6: REVEAL -->
        <template v-else-if="currentStep === 6">
            <div class="max-w-4xl mx-auto w-full flex flex-col gap-12 text-center py-10 animate-in fade-in zoom-in duration-700">
                <div class="flex flex-col gap-4">
                    <div class="bg-indigo-500 p-6 rounded-full w-fit mx-auto shadow-2xl animate-bounce mb-2">
                        <UIcon name="i-ph-confetti-duotone" class="text-white size-20" />
                    </div>
                    <h2 class="text-5xl md:text-8xl font-black text-toned leading-tight">Ta-da! It's Ready!</h2>
                    <p class="text-xl md:text-3xl text-muted font-medium">Your custom adventure has been magically created.</p>
                </div>

                <div class="flex justify-center">
                    <AdventureCard 
                        v-if="generatedAdventure"
                        class="w-full max-w-md scale-110 shadow-[0_35px_60px_-15px_rgba(99,102,241,0.3)]"
                        :adventure="generatedAdventure"
                    />
                </div>

                <div class="flex flex-col items-center gap-6 mt-10">
                    <UButton 
                        v-if="generatedAdventure"
                        :to="`/adventures/${generatedAdventure.slug}`"
                        label="Jump Into Adventure! →" 
                        size="xl"
                        class="font-black px-20 py-8 rounded-3xl text-3xl shadow-2xl hover:scale-105 active:scale-95 transition-all text-white border-0" 
                        :class="generatedAdventure.buttonClass" />
                    <UButton 
                        @click="currentStep = 0"
                        label="Create Another Magic" 
                        variant="ghost" 
                        color="neutral"
                        class="font-bold text-xl px-10 py-4 rounded-2xl opacity-60 hover:opacity-100" />
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped>
@keyframes float {
    0%, 100% { transform: translateY(0) rotate(0); }
    50% { transform: translateY(-15px) rotate(3deg); }
}
.animate-float {
    animation: float 5s ease-in-out infinite;
}

textarea::selection {
    background: var(--color-indigo-200);
}
</style>
