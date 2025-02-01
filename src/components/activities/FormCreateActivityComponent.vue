<script setup>
import { ref, watch } from 'vue';
import { VCard, VCardText, VCardTitle, VForm, VTextField, VBtn, VCardActions, VSpacer, VColorPicker } from 'vuetify/components';

const name = ref('');
const color = ref('#FF3434');
const emit = defineEmits(['create']);

watch(color, (newColor) => {
  console.log('Color changed to:', newColor);
});

function save() {
  emit('create', name.value, color.value);
}
</script>

<template>
  <v-card>
    <v-card-title class="headline">Créer une activité</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="save">
        <v-text-field
          v-model="name"
          label="Nom"
          required
          variant="outlined"
        />
        <v-color-picker
          v-model="color"
          mode="hexa"
          hide-inputs
          hide-canvas
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
