<script setup>
import {VCol, VSnackbar, VTextField} from "vuetify/components";
import FormComponent from "@/components/form/FormComponent.vue";
import {computed, getCurrentInstance, onMounted, ref, watch} from "vue";
import {marked} from "marked";
import EntriesListComponent from "@/components/time-tracker/EntriesListComponent.vue";

const createTimeTrackerDialog = ref(false);
const snackbar = ref(false);
const snackbarMessage = ref('');
const api = getCurrentInstance().appContext.config.globalProperties.$api();
const projects = ref([]);
const activities = ref([]);
const currentTimeEntries = ref({});
const currentTimeEntriesVModel = ref({});
const timer = ref(0);
let timerInterval = null;
const contentMd = ref('');
const timesEntries = ref([]);
const searchQuery = ref('');


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
  }).then(() => {
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
  api.get('/api/time-entries').then(async response => {
    const now = new Date();
    const lastEntry = response.data[response.data.length - 1];
    if (lastEntry) {
      const endDate = new Date(lastEntry.end);
      if (lastEntry.end === "0000-00-00 00:00:00" || endDate > now) {
        currentTimeEntries.value = lastEntry;
        if (!contentMd.value) {
          contentMd.value = await marked(currentTimeEntries.value.comment, {async: true});
        }
        if (Object.keys(currentTimeEntriesVModel.value).length === 0) {
          currentTimeEntriesVModel.value = { ...currentTimeEntries.value };
        }
        startTimer();
      } else {
        currentTimeEntries.value = {};
        clearInterval(timerInterval);
        timer.value = 0;
      }
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

const fetchEntries = () => {
  api.get('/api/time-entries').then(response => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    timesEntries.value = response.data.filter(entry => {
      const endDate = new Date(entry.end);
      return entry.end === "0000-00-00 00:00:00" || !entry.end || endDate.toISOString().split('T')[0] === today;
    });
  }).catch(error => {
    console.error(error);
    snackbarMessage.value = error.response.data.errors || 'An error occurred fetching time entries';
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

const stopTimer = () => {
  api.patch(`/api/time-entries/${currentTimeEntries.value.id}/stop`
  ).then(() => {
    clearInterval(timerInterval);
    timer.value = 0;
    currentTimeEntries.value = {};
  }).catch(error => {
    console.error(error);
    snackbarMessage.value = error.response.data.errors || 'An error occurred stopping timer';
    snackbar.value = true;
  });
};


const filteredEntries = computed(() => {
  return timesEntries.value.filter(entry => {
    return entry.comment.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

onMounted(async () => {
  fetchEntries();
  fetchProjects();
  fetchActivities();
  setInterval(getCurrentEntries, 1000);

});

watch([projects, activities], () => {
  fields.value[0].items = projects.value;
  fields.value[1].items = activities.value;
});

watch(() => currentTimeEntriesVModel.value.comment, async (newComment) => {
  contentMd.value = await marked(newComment, {async: true});
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
                  <v-card-title class="d-flex justify-space-between align-center">
                    <h3>Activité en cours</h3>
                    <div v-if="Object.keys(currentTimeEntries).length > 0" class="d-flex justify-space-between align-center">
                      <p>Début: {{ currentTimeEntries.start }}</p>
                      <p v-if="currentTimeEntries.end==='0000-00-00 00:00:00'" class="ml-5">Fin: Non définie</p>
                      <p v-else class="ml-5">Fin: {{ currentTimeEntries.end }}</p>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <v-row v-if="Object.keys(currentTimeEntries).length > 0">
                      <v-col cols="12">
                        <v-row>
                          <v-col cols="6">
                            <div>
                              <v-card-title>Informations (Visuel) :</v-card-title>
                              <div class="content" v-html="contentMd"></div>
                            </div>
                          </v-col>
                          <v-col cols="6">
                            <v-card-title>Informations (Texte) :</v-card-title>
                            <v-form @submit.prevent="">
                              <v-textarea
                                v-model="currentTimeEntriesVModel.comment"
                                label="Description"
                                variant="outlined"
                              ></v-textarea>
                            </v-form>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" class="timer-display d-flex justify-end align-center">
                            <p>{{ String(Math.floor(timer / 3600)).padStart(2, '0') }}:{{ String(Math.floor((timer % 3600) / 60)).padStart(2, '0') }}:{{ String(timer % 60).padStart(2, '0') }}</p>
                            <v-btn icon="mdi-stop" @click="stopTimer" class="ml-5"></v-btn>
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
          <v-col cols="12">
            <v-card>
              <v-card-title>
                <h3>Historique des activités du jour</h3>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="searchQuery"
                  label="Search entries"
                  variant="outlined"
                  clearable
                />
                <EntriesListComponent :entries="filteredEntries"/>
              </v-card-text>
            </v-card>
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
.content {
  margin-bottom: 1rem;
  min-height: 10rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
</style>
