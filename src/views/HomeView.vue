<script setup>
import {ref, computed, onMounted, getCurrentInstance} from 'vue';
import TimeTracker from "@/components/TimeTracker.vue";
import DailyGoal from "@/components/DailyGoalDetailsComponent.vue";
import FormComponent from "@/components/form/FormComponent.vue";
// import HomeHeaderComponent from "@/components/home/HomeHeaderComponent.vue";
import { VContainer, VWindow, VWindowItem, VCardTitle, VCardText } from 'vuetify/components';
import DailyGoalComponent from "@/components/DailyGoalComponent.vue";

const tab = ref('one');
// const drawer = ref(false);

</script>

<template>
  <v-container>
<!--    <HomeHeaderComponent/>-->
    <v-tabs v-model="tab" grow>
      <v-tab value="one">Objectif Quotidien</v-tab>
      <v-tab value="two">Time Tracker</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="one">
        <DailyGoalComponent />
      </v-window-item>
      <v-window-item value="two">
        <v-card-title>Time Tracker</v-card-title>
        <v-card-text>
          <TimeTracker />
        </v-card-text>

      </v-window-item>
    </v-window>
  </v-container>

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
