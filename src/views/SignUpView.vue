<script setup>
import {ref} from 'vue';
import FormButton from "@/components/FormButtonComponent.vue";
import {useAuthStore} from "@/stores/authentification.js";

const store = useAuthStore();

const name = ref('');
const email = ref('');

const signUp = () => {
  try {
    store.register(email.value, name.value);
    console.log(store.user);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="signUp">
      <div>
        <label for="name">Name:</label>
        <input id="name" v-model="name" type="text" required/>
      </div>
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" required/>
      </div>
      <FormButton label="Sign Up" type="submit"/>
    </form>
  </div>
</template>

<style scoped>
div {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
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
</style>
