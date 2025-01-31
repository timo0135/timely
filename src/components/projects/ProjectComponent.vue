<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  project: Object,
});

const getProjectClass = () => {
  return props.project.is_enabled === 0 ? 'disabled-project' : '';
};
</script>

<template>
  <v-container>
    <v-card class="mx-auto my-5 pa-5" :class="getProjectClass()" max-width="600">
      <v-card-title>
        <h3 class="text-h5">{{ project.name }}</h3>
      </v-card-title>
      <v-card-text>
        <p>{{ project.description }}</p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.disabled-project {
  background-color: #f0f0f0;
}
.v-card{
  cursor: pointer;
}
</style>
