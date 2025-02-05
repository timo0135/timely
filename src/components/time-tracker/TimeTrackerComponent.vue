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
const currentTimeEntries = ref({});
const timer = ref(0);
let timerInterval = null;

const fields = ref([
  { name: 'project', label: 'Projet', type: 'select', required: true, items: [], itemText: 'name', itemValue: 'id' },
  { name: 'activity', label: 'Activité', type: 'select', required: true, items: [], itemText: 'name', itemValue: 'id'},
  { name: 'start', label: 'Date de début', type: 'datetime-local', required: false },
  { name: 'end', label: 'Date de fin', type: 'datetime-local', required: false },
  { name: 'comment', label: 'Description', type: 'textarea', required: false }
]);

const startActivity = (modelFields) => {
  const projectField = modelFields.find(field => field.name === 'project');
  const activityField = modelFields.find(field => field.name === 'activity');
  const startField = modelFields.find(field => field.name === 'start');
  const endField = modelFields.find(field => field.name === 'end');
  const commentField = modelFields.find(field => field.name === 'comment');

  api.post('/api/time-entries', {
    project_id: projectField.value,
    activity_id: activityField.value,
    start: startField.value,
    end: endField.value,
    comment: commentField.value
  }).then((response) => {
    fetchProjects();
    fetchActivities();
    createTimeTrackerDialog.value = false;
  }).catch(error => {
    console.error(error);
    snackbarMessage.value = error.response.data.errors || 'An error occurred starting activity';
    snackbar.value = true;
  });
};

const getCurrentEntries = () => {
  api.get('/api/time-entries').then(response => {
    const now = new Date();
    const validEntries = response.data.filter(entry => {
      const endDate = new Date(entry.end);
      return entry.end === "0000-00-00 00:00:00" || endDate > now;
    });
    if (validEntries.length > 0) {
      currentTimeEntries.value = validEntries[validEntries.length - 1];
      startTimer();
    } else {
      currentTimeEntries.value = {};
      clearInterval(timerInterval);
      timer.value = 0;
    }
  }).catch(error => {
    console.error(error);
    snackbarMessage.value = error.response.data.errors || 'An error occurred fetching current time entries';
    snackbar.value = true;
  });
};

const startTimer = () => {
  clearInterval(timerInterval);
  const startTime = new Date(currentTimeEntries.value.start);
  timerInterval = setInterval(() => {
    timer.value = Math.floor((new Date() - startTime) / 1000);
  }, 100);
};

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
  setInterval(getCurrentEntries, 1000);
});

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
            <h2>Time Tracker</h2>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title>
                    <h3>Activité en cours</h3>
                  </v-card-title>
                  <v-card-text>
                    <v-row v-if="Object.keys(currentTimeEntries).length > 0">
                      <v-col cols="12">
                        <v-row>
                          <v-col cols="6">
                            <p>Project: {{ currentTimeEntries.project_id }}</p>
                            <p>Activity: {{ currentTimeEntries.activity_id }}</p>
                            <p>Start: {{ currentTimeEntries.start }}</p>
                            <p>End: {{ currentTimeEntries.end }}</p>
                          </v-col>
                          <v-col cols="6">
                            <p>Comment: {{ currentTimeEntries.comment }}</p>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" class="timer-display">
                            <p>{{ String(Math.floor(timer / 3600)).padStart(2, '0') }}:{{ String(Math.floor((timer % 3600) / 60)).padStart(2, '0') }}:{{ String(timer % 60).padStart(2, '0') }}</p>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-row v-else>
                      <v-col cols="12">
                        <p>Il n'y a pas d'activité en cours</p>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
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
.timer-display {
  font-size: 2em;
  text-align: right;
}
</style>
