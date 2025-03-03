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
  VPagination, VSnackbar, VProgressCircular
} from 'vuetify/components';
import FormCreateProjectComponent from "@/components/projects/FormCreateProjectComponent.vue";

const projects = ref([]);
const search = ref('');
const page = ref(1);
const itemsPerPage = ref(5);
const createProjectDialog = ref(false);
const snackbar = ref(false);
const snackbarMessage = ref('');
const loading = ref(true);

const api = getCurrentInstance().appContext.config.globalProperties.$api();

const fetchProjects = (searchQuery) => {
  api.get('/api/projects', {
    params: {
      keywords: searchQuery,
    },
  })
    .then((response) => {
      projects.value = response.data;
      loading.value = false;
    })
    .catch((error) => {
      console.error(error);
      snackbarMessage.value = error.response.data.errors || 'An error occurred fetching projects';
      snackbar.value = true;
      loading.value = false;
    });
};

const createProject = (name, description) => {
  api.post('/api/projects', {
    name: name,
    description: description,
  })
    .then((response) => {
      projects.value.push(response.data);
      createProjectDialog.value = false;
    })
    .catch((error) => {
      console.error(error);
      snackbarMessage.value = error.response.data.errors || 'An error occurred creating project';
      snackbar.value = true;
    });
};

onMounted(() => {
  api.get('/api/projects').then((response) => {
    projects.value = response.data;
    loading.value = false;
  }).catch((error) => {
    console.error(error);
    snackbarMessage.value = error.response.data.errors || 'An error occurred fetching projects';
    snackbar.value = true;
    loading.value = false;
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
            <div v-if="loading" class="progress-container">
              <v-progress-circular
                indeterminate
                color="primary"
              />
            </div>
            <v-list v-else>
              <ProjectListComponent :projects="paginatedProjects" />
            </v-list>
            <v-pagination
              v-model="page"
              :length="numberOfPages"
            />
            <v-col cols="12" class="d-flex justify-end">
              <v-btn icon="mdi-plus" @click="createProjectDialog = true"></v-btn>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="createProjectDialog" max-width="50em">
      <FormCreateProjectComponent @create="createProject" />
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="3000" color="red" location="top right">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.progress-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>
