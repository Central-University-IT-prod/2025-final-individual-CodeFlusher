import {useDarkModeController} from "~/stores/darkmode.store";

export const setupDarkMode = () => {

    const {darkMode} = storeToRefs(useDarkModeController())

    const switchMode = async () => {
        const mainHTMLElement = document.querySelector("html");
        if (!mainHTMLElement) {
            return;
        }

        mainHTMLElement.className = darkMode.value ? "dark" : "";
    }

    watch(darkMode, switchMode)

    switchMode()
}