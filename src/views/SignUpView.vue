<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authentification.js';
import {
  VContainer,
  VRow,
  VCol,
  VTextField,
  VBtn,
  VCard,
  VCardTitle,
  VCardText,
  VSnackbar
} from 'vuetify/components';

const store = useAuthStore();

const name = ref('');
const email = ref('');

const snackbar = ref(false);
const snackbarMessage = ref('');
const signUp = async () => {
  try {
    await store.register(email.value, name.value);
    console.log(store.user);
  } catch (error) {
    snackbarMessage.value = error.message || 'An error occurred during login';
    snackbar.value = true;
    console.error(error);
  }
};
</script>

<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <h2>Sign Up</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="signUp">
              <v-text-field
                v-model="name"
                label="Name"
                type="text"
                required
                variant="outlined"
              />
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
                variant="outlined"
              />
              <v-btn type="submit" color="primary">Sign Up</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="3000" color="red" location="top right">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
