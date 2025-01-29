import {createApp} from 'vue'
import {createPinia} from 'pinia'
import api from './plugins/api'
import piniaPersist from 'pinia-plugin-persist'
import {library} from '@fortawesome/fontawesome-svg-core';
import {faUser} from '@fortawesome/free-solid-svg-icons';

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)

// Icons
library.add(faUser);

app.use(api, {
  baseUrl: import.meta.env.VITE_API_BASE_URL
})
app.use(pinia)
app.use(router)

app.mount('#app')
