import {defineStore} from 'pinia';
import axios from 'axios';
import router from "@/router/index.js";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      id: null,
      apikey: null,
      email: null,
      name: null
    },
    isAuthenticated: false,
    errors: null
  }),
  actions: {
    login(key) {
      axios.get('https://timely.edu.netlor.fr/api/profile', {
        headers: {
          Authorization: `key=${key}`,
          "Content-Type": "application/json"
        }
      }).then(response => {
        this.user.id = response.data.id;
        this.user.apikey = key;
        this.user.email = response.data.email;
        this.user.name = response.data.name;
        this.isAuthenticated = true;
      }).catch(error => {
        this.errors = error;
        console.error(error);
      });
    },
    register(email, name) {
      axios.post('https://timely.edu.netlor.fr/api/apikeys', {
        email: email,
        name: name
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        this.user.id = response.data.id;
        this.user.apikey = response.data.key;
        this.user.email = response.data.email;
        this.user.name = response.data.name;
        this.isAuthenticated = true;
      }).catch(error => {
        this.errors = error;
        console.error(error);
      });
    },
    logout() {
      this.user.id = null;
      this.user.apikey = null;
      this.user.email = null;
      this.user.name = null;
      this.isAuthenticated = false;
      router.push('/signin');
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth',
        storage: localStorage
      }
    ]
  }
});
