import type {RouterConfig} from "@nuxt/schema";

export default <RouterConfig>{
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (savedPosition) {
                    resolve(savedPosition)
                } else if (to.hash) {
                    const element = document.getElementById(to.hash.substr(1))
                    if (element) {
                        resolve({
                            top: element.getBoundingClientRect().top + window.scrollY - document.getElementById('header')!.getBoundingClientRect().height,
                            behavior: 'smooth'
                        })
                    } else {
                        resolve({top: 0, behavior: 'smooth'})
                    }
                } else {
                    resolve({top: 0, behavior: 'smooth'})
                }
            }, 10)
        })
    },
    scrollBehaviorType: 'smooth',
}