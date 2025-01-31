<script setup>
import SettingsHeaderComponent from '@/components/settings/SettingsHeaderComponent.vue';
import ProjectListComponent from '@/components/projects/ProjectListComponent.vue';
import { ref, onMounted, getCurrentInstance, watch } from 'vue';
import { VContainer, VRow, VCol, VTextField } from 'vuetify/components';

const projects = ref([]);
const search = ref('');

const api = getCurrentInstance().appContext.config.globalProperties.$api();

const fetchProjects = (searchQuery) => {
  api.get('/api/projects', {
    params: {
      keywords: searchQuery,
    },
  })
    .then((response) => {
      projects.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

onMounted(() => {
  api.get('/api/projects').then((response) => {
    projects.value = response.data;
  });
});

watch(search, (newSearch) => {
  fetchProjects(newSearch);
});
</script>

<template>
  <v-container>
    <SettingsHeaderComponent />
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="search"
          label="Search projects"
          variant="outlined"
          clearable
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <ProjectListComponent :projects="projects" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>
