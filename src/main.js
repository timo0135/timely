import { createApp } from 'vue';
import { createPinia } from 'pinia';
import api from './plugins/api';
import piniaPersist from 'pinia-plugin-persist';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

import App from './App.vue';
import router from './router';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist);

app.use(api, {
  baseUrl: import.meta.env.VITE_API_BASE_URL,
});
app.use(vuetify);
app.use(pinia);
app.use(router);

app.mount('#app');
