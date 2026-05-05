/**
 * simulateApi
 * A helper to wrap any logic in a simulated network delay.
 * This makes the UI feel real and ensures we handle loading states properly.
 */
export const simulateApi = async <T>(logic: () => T, delay: number = 800): Promise<T> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(logic())
        }, delay)
    })
}
