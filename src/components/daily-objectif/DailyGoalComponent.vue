<script setup>

import FormComponent from "@/components/form/FormComponent.vue";
import {computed, getCurrentInstance, onMounted, ref, watch} from "vue";
import {VCol, VPagination, VSnackbar} from "vuetify/components";
import DailyGoalListComponent from "@/components/daily-objectif/DailyGoalListComponent.vue";

const fields = [
  {name: 'name', label: 'Nom', type: 'text', required: true},
  {name: 'description', label: 'Description', type: 'textarea', required: true}
];

const searchQuery = ref('');
const goals = ref([]);
const api = getCurrentInstance().appContext.config.globalProperties.$api();
const showCompleted = ref(false);
const createDailyGoalDialog = ref(false);
const snackbar = ref(false);
const snackbarMessage = ref('');
const itemsPerPage = ref(5);
const page = ref(1);


const getGoals = async () => {
  try {
    const response = await api.get('/api/daily-objectives');
    let g = response.data;
    if(showCompleted.value){
      goals.value = g;
    }else{
      goals.value = g.filter(goal => goal.done === 0);
    }
  } catch (error) {
    console.error(error);
    snackbarMessage.value = error.response.data.errors || 'An error occurred fetching daily goals';
    snackbar.value = true;
  }
};

const addGoal = async (modelFields) => {
  try {
    const nameField = modelFields.find(field => field.name === 'name');
    const descriptionField = modelFields.find(field => field.name === 'description');

    const response = await api.post('/api/daily-objectives', {
      name: nameField.value,
      content: descriptionField.value
    });
    goals.value.push(response.data);
    createDailyGoalDialog.value = false;
  } catch (error) {
    console.error(error);
    snackbarMessage.value = error.response.data.errors || 'An error occurred creating daily goal';
    snackbar.value = true;
  }
};

const updateGoal = (id, name, content) => {
  api.put(`/api/daily-objectives/${id}`, {
    name: name,
    content: content
  }).then(
    getGoals()
  ).catch(error => {
    console.error(error);
  });
};

const doneAGoal = (id) => {
  api.patch(`/api/daily-objectives/${id}/done`).then(
    response => {
      goals.value = goals.value.filter(goal => goal.id !== response.data.id);
      getGoals()
    }
  ).catch(error => {
    console.error(error);
  });
};

const undoneAGoal = (id) => {
  api.patch(`/api/daily-objectives/${id}/undone`).then( response => {
    goals.value = goals.value.filter(goal => goal.id !== response.data.id);
    getGoals()
  }).catch(error => {
    console.error(error);
  });
};

const deleteGoal = (id) => {
  api.delete(`/api/daily-objectives/${id}`).then( response => {
    goals.value = goals.value.filter(goal => goal.id !== response.data.id);
    getGoals() // Mise à jour de la liste des objectifs
  }).catch(error => {
    console.error(error);
  });
};

const paginatedGoals = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;

  return filteredGoals.value.slice(start, end);
});

const filteredGoals = computed(() => {
  return goals.value.filter(goal => {
    return goal.name.toLowerCase().includes(searchQuery.value.toLowerCase()) && (showCompleted.value || !goal.completed);
  });
});

const totalProjects = computed(() => goals.value.length);
const numberOfPages = computed(() => Math.ceil(totalProjects.value / itemsPerPage.value));

onMounted(getGoals);

watch(showCompleted, getGoals);

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
            <v-text-field v-model="searchQuery" label="Rechercher un objectif" variant="outlined"/>
            <v-checkbox v-model="showCompleted" label="Afficher les objectifs complétés"/>
            <v-list>
              <DailyGoalListComponent :goals="paginatedGoals" @update="updateGoal" @delete="deleteGoal" @done="doneAGoal" @undone="undoneAGoal"/>
            </v-list>
            <v-pagination
              v-model="page"
              :length="numberOfPages"
            />
          </v-card-text>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn icon="mdi-plus" @click="createDailyGoalDialog = true"></v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="createDailyGoalDialog" max-width="50em">
      <FormComponent title="Créer un objectif journalier" @submit="addGoal" :fields="fields"/>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="3000" color="red" location="top right">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<style scoped>

</style>
