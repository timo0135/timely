<script setup>
import {ref, computed, watch, getCurrentInstance, onMounted} from 'vue';

const instance = getCurrentInstance();
const api = () => instance.appContext.config.globalProperties.$api?.();

const today = new Date().toISOString().split('T')[0];
const startDate = ref(today);
const endDate = ref(today);
const selectedProject = ref(null);

const totalTime = ref(0);
const projectStats = ref([]);
const activityStats = ref([]);
const timeEntries = ref([]);
const totalProjects = computed(() => projectStats.value.length);

const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('red');

const fetchActivityDetails = async (activityId) => {
  const apiInstance = api();
  const {data} = await apiInstance.get(`/api/activities/${activityId}`);
  return data;
};

const fetchStatistics = async () => {
  const apiInstance = api();

  try {
    const {data} = await apiInstance.get('/api/time-entries', {
      params: {
        from: startDate.value,
        to: endDate.value,
        project_id: selectedProject.value || undefined
      }
    });

    if (data.length === 0) {
      snackbarMessage.value = 'Aucune donnée disponible pour cette période.';
      snackbarColor.value = 'orange';
      snackbar.value = true;
    }

    totalTime.value = data.reduce((acc, entry) => acc + ((new Date(entry.end) - new Date(entry.start)) / 3600000), 0);

    const projectsMap = new Map();
    const activitiesMap = new Map();

    data.forEach(entry => {
      const duration = (new Date(entry.end) - new Date(entry.start)) / 3600000;

      projectsMap.set(entry.project_id, (projectsMap.get(entry.project_id) || 0) + duration);
      activitiesMap.set(entry.activity_id, (activitiesMap.get(entry.activity_id) || 0) + duration);
    });

    let projectIndex = 1;
    const projectNames = new Map();
    projectStats.value = Array.from(projectsMap, ([id, duration]) => {
      const name = `Projet ${projectIndex++}`;
      projectNames.set(id, name);
      return {
        id,
        name,
        count: duration
      };
    });

    let activityIndex = 1;
    const activityNames = new Map();
    activityStats.value = await Promise.all(Array.from(activitiesMap, async ([id, duration]) => {
      const activityDetails = await fetchActivityDetails(id);
      console.log(activityDetails);
      const name = `Activité ${activityIndex++}`;
      const color = activityDetails.color || '#eae3e3';
      activityNames.set(id, name);
      return {
        id,
        name,
        duration,
        color
      };
    }));
    console.log(activityStats.value);

    timeEntries.value = data.map(entry => ({
      ...entry,
      project_name: projectNames.get(entry.project_id),
      activity_name: activityNames.get(entry.activity_id)
    }));
  } catch (error) {
    snackbarMessage.value = 'Erreur lors du chargement des statistiques';
    snackbarColor.value = 'red';
    snackbar.value = true;
  }
};

watch([startDate, endDate, selectedProject], fetchStatistics);

onMounted(() => {
  fetchStatistics();
});

const resetFilters = () => {
  startDate.value = today;
  endDate.value = today;
  selectedProject.value = null;
  fetchStatistics();
};

const formatDuration = (hours) => {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m < 10 ? '0' + m : m}m`;
};
</script>

<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title>Statistiques</v-card-title>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="startDate" label="Date de début" type="date"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="endDate" label="Date de fin" type="date"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="selectedProject"
            label="Projet"
            :items="projectStats"
            item-value="id"
            item-title="name"
            clearable
          ></v-select>
        </v-col>
      </v-row>

      <v-btn color="secondary" @click="resetFilters">Réinitialiser les filtres</v-btn>

      <v-row>
        <v-col cols="6">
          <v-card class="pa-3">
            <v-card-title>Total heures travaillées</v-card-title>
            <v-card-text class="text-h5">{{ totalTime.toFixed(2) }} heures</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="pa-3">
            <v-card-title>Nombre de projets concernés</v-card-title>
            <v-card-text class="text-h5">{{ totalProjects }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="d-flex justify-center">
        <v-col cols="12" md="8" v-if="activityStats.length > 0 && !selectedProject">
          <v-card class="mx-auto text-center" color="secondary" dark>
            <v-card-text>
              <v-sheet color="rgba(0, 0, 0, .12)">
                <v-sparkline
                  :model-value="activityStats.map(a => a.duration)"
                  color="rgba(255, 255, 255, .7)"
                  height="100"
                  padding="24"
                  stroke-linecap="round"
                  smooth
                >
                  <template v-slot:label="item">
                    {{ activityStats[item.index].name }}:
                    {{ formatDuration(item.value).split(' ')[0] }}
                  </template>
                </v-sparkline>
              </v-sheet>
            </v-card-text>

            <v-card-text>
              <div class="text-h4 font-weight-thin">
                Par type d'activité
              </div>
            </v-card-text>

            <v-divider></v-divider>
          </v-card>
        </v-col>
        <v-col cols="12" md="8" v-if="selectedProject">
          <v-card
            class="mx-auto text-center"
            color="secondary"
            dark
          >
            <v-card-text>
              <v-sheet color="rgba(0, 0, 0, .12)">
                <v-sparkline
                  :model-value="activityStats.map(a => a.duration)"
                  color="rgba(255, 255, 255, .7)"
                  height="100"
                  padding="24"
                  stroke-linecap="round"
                  smooth
                >
                  <template v-slot:label="item">
                    {{ formatDuration(item.value) }}
                  </template>
                </v-sparkline>
              </v-sheet>
            </v-card-text>

            <v-card-text>
              <div class="text-h4 font-weight-thin">
                {{ projectStats.find(p => p.id === selectedProject).name }}
              </div>
            </v-card-text>

            <v-divider></v-divider>

          </v-card>
        </v-col>
      </v-row>

      <v-table>
        <thead>
        <tr>
          <th>Projet</th>
          <th>Activité</th>
          <th>Début</th>
          <th>Fin</th>
          <th>Durée</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="entry in timeEntries" :key="entry.id">
          <td>{{ entry.project_name }}</td>
          <td>{{ entry.activity_name }}</td>
          <td>{{ entry.start }}</td>
          <td>{{ entry.end }}</td>
          <td>{{ formatDuration((new Date(entry.end) - new Date(entry.start)) / 3600000) }}</td>
        </tr>
        </tbody>
      </v-table>
    </v-card>

    <v-snackbar v-model="snackbar" :timeout="3000" :color="snackbarColor" location="top right">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>
