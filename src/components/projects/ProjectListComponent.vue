<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
defineProps({
  projects: Array,
});

function goToProjectDetail(id) {
  router.push(`/settings/projects/${id}`);
}

function getProjectClass(project) {
  return project.is_enabled === 0 ? 'disabled-project' : '';
}
</script>

<template>
  <v-list-item
    v-for="project in projects"
    :key="project.id"
    @click="goToProjectDetail(project.id)"
    :class="getProjectClass(project)"
  >
    <v-list-item-title>{{ project.name }}</v-list-item-title>
  </v-list-item>
</template>

<style scoped>
.v-list-item {
  cursor: pointer;
  border-bottom: black 1px solid;
}

.v-list-item:hover {
  background-color: #f0f0f0;
}

.disabled-project {
  opacity: 0.5;
}
</style>
