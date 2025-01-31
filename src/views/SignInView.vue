<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authentification.js';
import { VContainer, VRow, VCol, VTextField, VBtn, VCard, VCardTitle, VCardText } from 'vuetify/components';

const apikey = ref('');

const store = useAuthStore();

const signIn = () => {
  try {
    store.login(apikey.value);
    console.log(store.user);
  } catch (error) {
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
  </v-container>
</template>

<style scoped>
</style>
