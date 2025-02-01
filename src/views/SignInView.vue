<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authentification.js';
import { useRouter } from "vue-router";
import { VContainer, VRow, VCol, VTextField, VBtn, VCard, VCardTitle, VCardText, VSnackbar } from 'vuetify/components';

const apikey = ref('');
const store = useAuthStore();
const router = useRouter();

const snackbar = ref(false);
const snackbarMessage = ref('');

const signIn = async () => {
  try {
    await store.login(apikey.value);
    await router.push('/');
  } catch (error) {
    snackbarMessage.value = error.message || 'An error occurred during login';
    snackbar.value = true;
    console.error(error);
  }
};
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <h2>Sign In</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="signIn">
              <v-text-field
                v-model="apikey"
                label="Api Key"
                type="text"
                required
                variant="outlined"
              />
              <v-btn type="submit" color="primary">Sign In</v-btn>
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
</style>
