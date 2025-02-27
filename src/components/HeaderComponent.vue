<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/stores/authentification.js";

const showMenu = ref(false);
const router = useRouter();
const store = useAuthStore();

const isAuthenticated = () => {
  return store.isAuthenticated;
};

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const navigateTo = (path) => {
  showMenu.value = false;
  router.push(path);
};

const logout = () => {
  store.logout();
  navigateTo('/signin');
};


</script>

<template>
  <header>
    <h1 @click="navigateTo('/')" class="title">Timely</h1>
    <nav>
      <button @click="navigateTo('/statistics')">Statistics</button>
    </nav>
    <div class="icon-container">
      <v-icon @click="toggleMenu" size="x-large">mdi-account</v-icon>
      <div :class="['dropdown-menu', { show: showMenu }]">
        <template v-if="isAuthenticated()">
          <button @click="navigateTo('/settings')">Settings</button>
          <button @click="logout" class="logout">Logout</button>
        </template>
        <template v-else>
          <button @click="navigateTo('/signin')">Sign In</button>
          <button @click="navigateTo('/signup')">Sign Up</button>
        </template>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  cursor: pointer;
}

.icon-container {
  position: relative;
}

.icon {
  cursor: pointer;
  font-size: 1.5rem;
  transition: color 0.3s;
}

.icon:hover {
  color: #007bff;
}

.logout {
  color: red;
}

.dropdown-menu {
  position: absolute;
  top: 2.5rem;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
  transition: opacity 0.3s, transform 0.3s;
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-menu.show {
  opacity: 1;
  transform: translateY(0);
}

.dropdown-menu button {
  display: block;
  white-space: nowrap;
  width: 100%;
  padding: 1rem 1.25rem;
  text-align: center;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 1rem;
}

.dropdown-menu button:hover {
  background: #f0f0f0;
}

.activity-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.timer {
  display: flex;
  align-items: center;
}

.timer p {
  margin: 0 1rem 0 0;
}

nav {
  display: flex;
  gap: 1rem;
}

nav button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.3s;
}

nav button:hover {
  color: #007bff;
}
</style>
