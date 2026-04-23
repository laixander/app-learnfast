export const useStickyHeader = (threshold = 20) => {
    const isScrolled = ref(false)

    const handleScroll = () => {
        isScrolled.value = window.scrollY > threshold
    }

    if (import.meta.client) {
        onMounted(() => {
            window.addEventListener('scroll', handleScroll)
            // Initial check
            handleScroll()
        })

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll)
        })
    }

    return {
        isScrolled
    }
}
