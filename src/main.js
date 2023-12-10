
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { createI18n, useI18n } from 'vue-i18n'
import { languages } from './i18n'
import { defaultLocale } from './i18n'


// import './assets/styles/theme.css'

// Plugins
import { registerPlugins } from '@/plugins'

const pinia = createPinia()

const localStorageLang = localStorage.getItem('language')
const messages = Object.assign(languages)
const i18n = createI18n({
    legacy: false, 
    locale: localStorageLang || defaultLocale,
    fallbackLocale: 'en', 
    messages
})

const app = createApp(App, {
    setup(){
        const {t} = useI18n()
        return {t}
    }
})

registerPlugins(app)
app.use(i18n)
app.use(pinia)
app.mount('#app')
