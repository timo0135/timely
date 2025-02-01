<script setup>
import SettingsHeaderComponent from '@/components/settings/SettingsHeaderComponent.vue';
import ActivityListComponent from "@/components/activities/ActivityListComponent.vue";
import { getCurrentInstance, onMounted, ref, watch, computed } from "vue";
import {
  VCol,
  VContainer,
  VRow,
  VTextField,
  VCard,
  VCardTitle,
  VCardText,
  VPagination,
  VSnackbar
} from "vuetify/components";
import FormCreateActivityComponent from "@/components/activities/FormCreateActivityComponent.vue";

const activities = ref([]);
const search = ref('');
const page = ref(1);
const itemsPerPage = ref(5);
const createActivityDialog = ref(false);
const snackbar = ref(false);
const snackbarMessage = ref('');

const api = getCurrentInstance().appContext.config.globalProperties.$api();

const fetchProjects = (searchQuery) => {
  api.get('/api/activities', {
    params: {
      keywords: searchQuery,
    },
  })
    .then((response) => {
      activities.value = response.data;
    })
    .catch((error) => {
      console.error(error);
      snackbarMessage.value = error.response.data.errors || 'An error occurred fetching activities';
      snackbar.value = true;
    });
};

const createActivity = (name, color) => {
  api.post('/api/activities', {
    name: name,
    color: color,
  })
    .then((response) => {
      activities.value.push(response.data);
      createActivityDialog.value = false;
    })
    .catch((error) => {
      console.error(error);
      snackbarMessage.value = error.response.data.errors || 'An error occurred creating activity';
      snackbar.value = true;
    });
};

onMounted(() => {
  fetchProjects(search.value);
});

watch(search, (newSearch) => {
  fetchProjects(newSearch);
});

const paginatedActivities = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;

  return activities.value.slice(start, end);
});

const totalActivities = computed(() => activities.value.length);
const numberOfPages = computed(() => Math.ceil(totalActivities.value / itemsPerPage.value));
</script>

<template>
  <v-container>
    <SettingsHeaderComponent />
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h2>Activités</h2>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="search"
              label="Search activities"
              variant="outlined"
              clearable
            />
            <v-list>
              <ActivityListComponent :activities="paginatedActivities" />
            </v-list>
            <v-pagination
              v-model="page"
              :length="numberOfPages"
            />
            <v-col cols="12" class="d-flex justify-end">
              <v-btn icon="mdi-plus" @click="createActivityDialog = true"></v-btn>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="createActivityDialog" max-width="50em">
      <FormCreateActivityComponent @create="createActivity" />
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="3000" color="red" location="top right">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<style scoped>
</style>
