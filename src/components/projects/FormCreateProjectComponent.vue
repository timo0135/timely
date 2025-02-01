<script setup>

import {VCard, VCardText, VCardTitle} from "vuetify/components";
import {ref} from "vue";

const emit = defineEmits(['create']);
const name = ref('');
const description = ref('');

function save() {
  emit('create', name.value, description.value);
}
</script>

<template>
  <v-card>
    <v-card-title class="headline">Créer un projet</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="save">
        <v-text-field
          v-model="name"
          label="Nom"
          required
          variant="outlined"
        />
        <v-text-field
          v-model="description"
          label="Description"
          required
          variant="outlined"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn type="submit" color="primary" @click="save">Créer</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>
