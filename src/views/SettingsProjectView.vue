<script setup>
import SettingsHeaderComponent from '@/components/settings/SettingsHeaderComponent.vue';
import ProjectListComponent from '@/components/projects/ProjectListComponent.vue';
import {ref, onMounted, getCurrentInstance, watch, computed} from 'vue';
import {
  VContainer,
  VRow,
  VCol,
  VTextField,
  VCardTitle,
  VCardText,
  VCard,
  VPagination
} from 'vuetify/components';
import ActivityListComponent from "@/components/activities/ActivityListComponent.vue";

const projects = ref([]);
const search = ref('');
const page = ref(1);
const itemsPerPage = ref(5);

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

const paginatedProjects = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;

  return projects.value.slice(start, end);
});

const totalProjects = computed(() => projects.value.length);
const numberOfPages = computed(() => Math.ceil(totalProjects.value / itemsPerPage.value));
</script>

<template>
  <v-container>
    <SettingsHeaderComponent />
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h2>Projets</h2>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="search"
              label="Search Projects"
              variant="outlined"
              clearable
            />
            <v-list>
              <ProjectListComponent :projects="paginatedProjects" />
            </v-list>
            <v-pagination
              v-model="page"
              :length="numberOfPages"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>
