export default defineNuxtRouteMiddleware((to, from) => {
    // Admin authentication disabled by request
    return

    /*
    const { user } = useUserStore()
    
    if (user.value.role !== 'ADMIN') {
        const toast = useToast()
        toast.add({
            title: 'Access Denied',
            description: 'You do not have permission to access the admin area.',
            color: 'error',
            icon: 'i-ph-lock-duotone'
        })
        return navigateTo('/dashboard')
    }
    */
})
