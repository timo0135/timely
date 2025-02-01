import { defineStore } from 'pinia';
import axios from 'axios';

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
    async login(key) {
      try {
        const response = await axios.get('https://timely.edu.netlor.fr/api/profile', {
          headers: {
            Authorization: `key=${key}`,
            "Content-Type": "application/json"
          }
        });
        this.user.id = response.data.id;
        this.user.apikey = key;
        this.user.email = response.data.email;
        this.user.name = response.data.name;
        this.isAuthenticated = true;
      } catch (error) {
        this.errors = error;
        console.error(error);
        throw new Error(error.response.data.errors.message);
      }
    },
    async register(email, name) {
      try {
        const response = await axios.post('https://timely.edu.netlor.fr/api/apikeys', {
          email: email,
          name: name
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        this.user.id = response.data.id;
        this.user.apikey = response.data.key;
        this.user.email = response.data.email;
        this.user.name = response.data.name;
        this.isAuthenticated = true;
      } catch (error) {
        this.errors = error;
        console.error('error', error);
        throw new Error(error.response.data.errors);
      }
    },
    logout() {
      this.user.id = null;
      this.user.apikey = null;
      this.user.email = null;
      this.user.name = null;
      this.isAuthenticated = false;
    },
    async update(email, name) {
      try {
        const response = await axios.put('https://timely.edu.netlor.fr/api/profile', {
          email: email,
          name: name
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `key=${this.user.apikey}`
          }
        });
        this.user.email = response.data.email;
        this.user.name = response.data.name;
      } catch (error) {
        this.errors = error;
        console.error(error);
        throw new Error(error.response.data.errors);
      }
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
