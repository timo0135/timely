<script setup>
import { VCol, VPagination, VSnackbar } from "vuetify/components";
import FormComponent from "@/components/form/FormComponent.vue";
import { getCurrentInstance, onMounted, ref, watch } from "vue";

const createTimeTrackerDialog = ref(false);
const snackbar = ref(false);
const snackbarMessage = ref('');
const itemsPerPage = ref(5);
const page = ref(1);
const api = getCurrentInstance().appContext.config.globalProperties.$api();
const projects = ref([]);
const activities = ref([]);

const startActivity = () => {};

const fetchProjects = () => {
  api.get('/api/projects').then(response => {
    projects.value = response.data;
  }).catch(error => {
    console.error(error);
    snackbarMessage.value = error.response.data.errors || 'An error occurred fetching projects';
    snackbar.value = true;
  });
};

const fetchActivities = () => {
  api.get('/api/activities').then(response => {
    activities.value = response.data;
  }).catch(error => {
    console.error(error);
    snackbarMessage.value = error.response.data.errors || 'An error occurred fetching activities';
    snackbar.value = true;
  });
};

onMounted(() => {
  fetchProjects();
  fetchActivities();
});

const fields = ref([
  { name: 'project', label: 'Projet', type: 'select', required: true, items: [], itemText: 'name', itemValue: 'id' },
  { name: 'activity', label: 'Activité', type: 'select', required: true, items: [], itemText: 'name', itemValue: 'id'},
  { name: 'start', label: 'Date de début', type: 'date', required: false },
  { name: 'end', label: 'Date de fin', type: 'date', required: false },
  { name: 'comment', label: 'Description', type: 'textarea', required: false }
]);

watch([projects, activities], () => {
  fields.value[0].items = projects.value;
  fields.value[1].items = activities.value;
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h2>Objectifs journaliers</h2>
          </v-card-title>
          <v-card-text>
          </v-card-text>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn icon="mdi-plus" @click="createTimeTrackerDialog = true"></v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="createTimeTrackerDialog" max-width="50em">
      <FormComponent title="Débuter une activité" @submit="startActivity" :fields="fields"/>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="3000" color="red" location="top right">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<style scoped>
</style>
