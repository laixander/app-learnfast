<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui'

definePageMeta({
    layout: 'login'
})

const pending = ref(false)

const fields = ref<AuthFormField[]>([
    {
        name: 'email',
        type: 'text',
        label: 'Your Email',
        variant: 'soft',
        placeholder: 'friend@example.com',
        icon: 'i-ph-envelope-simple-duotone'
    },
    {
        name: 'password',
        type: 'password',
        label: 'Secret Password',
        variant: 'soft',
        placeholder: 'Keep it a secret!',
        icon: 'i-ph-lock-duotone'
    }
])

// simulate login with loading
// TODO: Integrate with actual authentication
async function onSubmit(data: any) {
    pending.value = true
    await new Promise(resolve => setTimeout(resolve, 2500))
    pending.value = false

    await navigateTo('/dashboard')
}
</script>

<template>
    <UCard class="w-full md:max-w-sm shadow-2xl shadow-purple-600/20 ring-6 ring-purple-600/5 relative z-10"
        :ui="{ body: 'sm:p-10' }">
        <UAuthForm :fields="fields" class="w-full" @submit="onSubmit">
            <template #title>
                <div class="flex flex-col justify-center items-center gap-4">
                    <div class="size-1/3">
                        <AppLogo class="size-full" />
                    </div>
                    <div class="flex flex-col items-center">
                        <h2 class="text-xl font-bold text-center">Welcome to <span
                                class="text-primary-500">LearnFast!</span></h2>
                        <p
                            class="flex items-center gap-3 text-[1.15rem] text-toned font-light text-center whitespace-nowrap before:content-[''] before:h-1 before:w-5 before:bg-primary-200 before:rounded-full after:content-[''] after:h-1 after:w-5 after:bg-primary-200 after:rounded-full">
                            Start learning today!
                        </p>
                    </div>
                </div>
            </template>
            <template #submit>
                <UButton type="submit" block size="lg" :loading="pending" class="shadow-lg shadow-primary-200">
                    {{ pending ? 'Logging in...' : 'Start Learning!' }}
                    <template #trailing>
                        <UIcon v-if="!pending" name="i-ph-atom" class="w-6 h-6" />
                    </template>
                </UButton>
            </template>
            <template #footer>
                <p class="text-center">Don't have an account? <ULink
                        class="font-medium text-primary-500 hover:text-primary-600" to="/register">Register
                        here</ULink>
                </p>
            </template>
        </UAuthForm>
    </UCard>
</template>