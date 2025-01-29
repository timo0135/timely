import { createApp } from 'vue'
import { createPinia } from 'pinia'
import api from './plugins/api'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)

app.use(pinia)
app.use(router)
app.use(api, {
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    key: import.meta.env.VITE_API_KEY
})

app.mount('#app')
