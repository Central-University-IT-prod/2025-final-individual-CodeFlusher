export const useDarkModeController = defineStore('dark_mode', () => {
    const darkMode = ref<Boolean>(false)

    const toggleDarkMode = () => {
        darkMode.value = !darkMode.value
    }
    return {darkMode, toggleDarkMode}
}, {
    persist: true
})

