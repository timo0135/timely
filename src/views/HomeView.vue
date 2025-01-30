<script setup>
import {ref, computed, onMounted, getCurrentInstance} from 'vue';
import TimeTracker from "@/components/TimeTracker.vue";
import DailyGoal from "@/components/DailyGoal.vue";
import FormComponent from "@/components/form/FormComponent.vue";

const name = ref('');
const description = ref('');
const searchQuery = ref('');
const showCompleted = ref(false);
const goals = ref([]);
const currentView = ref('daily-goals');
const api = getCurrentInstance().appContext.config.globalProperties.$api();

const fields = [
  {name: 'name', label: 'Nom', type: 'text', required: true},
  {name: 'description', label: 'Description', type: 'text', required: true}
];
const getGoals = async () => {
  try {
    const response = await api.get('/api/daily-objectives');
    goals.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const addGoal = async () => {
  try {
    const response = await api.post('/api/daily-objectives', {
      name: name.value,
      content: description.value
    });
    goals.value.push(response.data);
    name.value = '';
    description.value = '';
  } catch (error) {
    console.error(error);
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
  <div class="home-container">
    <aside class="sidebar">
      <button @click="currentView = 'time-tracker'">Time Tracker</button>
      <button @click="currentView = 'daily-goals'">Daily Goals</button>
    </aside>
    <main class="main-content">
      <TimeTracker v-if="currentView === 'time-tracker'"/>
      <div class="daily-goals-container" v-else-if="currentView === 'daily-goals'">
        <div class="top-bar">
          <h2>Objectifs journaliers</h2>
          <div class="search-bar">
            <input type="text" v-model="searchQuery" placeholder="Rechercher un objectif"/>
          </div>
        </div>
        <div class="goals-container">
          <div>
            <h2>Ajouter un objectif</h2>
            <FormComponent :on-submit="addGoal" :fields="fields"/>
          </div>
          <ul>
            <li v-for="goal in filteredGoals" :key="goal.id">
              <DailyGoal :goal="goal"/>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>

</template>

<style scoped>
.home-container {
  display: flex;
}

.sidebar {
  width: 200px;
  background-color: #f8f9fa;
  padding: 1rem;
}

.main-content {
  flex: 1;
  display: flex;
  padding: 1rem;
}

.daily-goals-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.top-bar {
  display: flex;
  justify-content: space-evenly;
  align-self: center;
}

.daily-goals-container h2 {
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

.daily-goals-container .search-bar {
  align-self: center;
  padding: 1rem;
}

.daily-goals-container .search-bar input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  box-sizing: border-box;
}

.goals-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

ul {
  flex: 1;
  list-style: none;
  padding: 0;
  margin: 0;
}

textarea {
  max-width: 100%;
  width: 100%;
}
</style>
