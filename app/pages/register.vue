<script setup lang="ts">
import type { AuthFormField } from '@nuxt/ui'

definePageMeta({
    layout: 'login'
})

const pending = ref(false)

const fields = ref<AuthFormField[]>([
    {
        name: 'name',
        type: 'text',
        label: 'Nickname',
        variant: 'soft',
        placeholder: 'What should we call you?'
    },
    {
        name: 'email',
        type: 'text',
        label: "Parent's Email",
        variant: 'soft',
        placeholder: 'parent@example.com'
    },
    {
        name: 'password',
        type: 'password',
        label: 'Create a Password',
        variant: 'soft',
        placeholder: 'Shhh! Keep it secret!'
    }
])

// simulate registration with loading
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
                        <h2 class="text-xl font-bold text-center">Join <span class="text-primary-500">LearnFast!</span>
                        </h2>
                        <p
                            class="flex items-center gap-3 text-[1.15rem] text-toned font-light text-center whitespace-nowrap before:content-[''] before:h-1 before:w-5 before:bg-primary-200 before:rounded-full after:content-[''] after:h-1 after:w-5 after:bg-primary-200 after:rounded-full">
                            Ready for an adventure?
                        </p>
                    </div>
                </div>
            </template>
            <template #submit>
                <UButton type="submit" block size="lg" :loading="pending" class="shadow-lg shadow-primary-200">
                    {{ pending ? 'Setting up...' : "Let's Go!" }}
                    <template #trailing>
                        <UIcon v-if="!pending" name="i-ph-atom" class="w-6 h-6" />
                    </template>
                </UButton>
            </template>
            <template #footer>
                <p class="text-center">Already have an account? <ULink
                        class="font-medium text-primary-500 hover:text-primary-600" to="/login">Login here</ULink>
                </p>
            </template>
        </UAuthForm>
    </UCard>
</template>
