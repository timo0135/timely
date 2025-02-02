<script setup>

import FormComponent from "@/components/form/FormComponent.vue";
import DailyGoalDetailsComponent from "@/components/DailyGoalDetailsComponent.vue";
import {computed, getCurrentInstance, onMounted, ref} from "vue";
import {VCol, VSnackbar} from "vuetify/components";

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


const getGoals = async () => {
  try {
    const response = await api.get('/api/daily-objectives');
    goals.value = response.data;
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

const filteredGoals = computed(() => {
  return goals.value.filter(goal => {
    return goal.name.toLowerCase().includes(searchQuery.value.toLowerCase()) && (showCompleted.value || !goal.completed);
  });
});

onMounted(getGoals);

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
            <v-text-field v-model="searchQuery" placeholder="Rechercher un objectif" variant="outlined"/>
            <v-checkbox v-model="showCompleted" label="Afficher les objectifs complétés"/>
            <ul>
              <li v-for="goal in filteredGoals" :key="goal.id">
                <DailyGoalDetailsComponent :goal="goal"/>
              </li>
            </ul>
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
