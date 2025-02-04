<script setup>

import {ref} from "vue";
import {VColorPicker} from "vuetify/components";

const props = defineProps({
  fields: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

const localFields = ref(props.fields.map(field => {
  return {
    ...field,
    model: field.model !== undefined ? field.model : ''
  };
}));

const emit = defineEmits(['submit']);

const handleSubmit = (event) => {
  event.preventDefault();
  let modelFields = localFields.value.map(field => {
    return {
      name: field.name,
      value: field.model
    };
  });
  emit('submit', modelFields);
};
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h2>{{ title }}</h2>
      </v-card-title>
      <v-card-text>
        <form @submit.prevent="handleSubmit">
          <div v-for="field in localFields" :key="field.name">
            <v-textarea
              v-if="field.type === 'textarea'"
              :label="field.label"
              :id="field.name"
              v-model="field.model"
              :required="field.required"
              variant="outlined"
            />
            <v-select
              v-else-if="field.type === 'select'"
              :label="field.label"
              :id="field.name"
              v-model="field.model"
              :items="field.items"
              :item-title="field.itemText"
              :item-value="field.itemValue"
              :required="field.required"
              variant="outlined"
            />

            <v-color-picker
              v-else-if="field.type === 'color'"
              :label="field.label"
              :id="field.name"
              v-model="field.model"
              :required="field.required"
              mode="hexa"
              hide-inputs
              hide-canvas
            />
            <v-text-field
              v-else
              :label="field.label"
              :id="field.name"
              v-model="field.model"
              :type="field.type"
              :required="field.required"
              variant="outlined"
            />
          </div>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn type="submit" color="primary" @click="handleSubmit">Enregistrer</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
</style>
