<script setup>
import {ref} from 'vue';
import {useAuthStore} from "@/stores/authentification.js";
import router from "@/router/index.js";
import FormComponent from "@/components/form/FormComponent.vue";

const apikey = ref('');

const store = useAuthStore();
const fields = [
  {name: 'apiKey', label: 'Api Key', type: 'text', required: true, model: apikey},
];
const signIn = async () => {
  try {
    store.login(apikey.value);
    await router.push('/home');
    console.log(store.user);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div>
    <h2>Sign In</h2>
    <FormComponent :fields="fields" :onSubmit="signIn"/>
    <p class="blue" @click="router.push('/signup')">Pas de compte ?</p>
  </div>
</template>

<style scoped>
div {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

form div {
  margin-bottom: 1rem;
  max-width: 600px;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  box-sizing: border-box;
  max-width: 100%;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.blue {
  cursor: pointer;
  color: #007bff;
}
</style>
