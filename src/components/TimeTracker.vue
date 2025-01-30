<!-- src/components/TimeTracker.vue -->
<script setup>
import {ref, onMounted} from 'vue';
import axios from 'axios';

const projects = ref([]);
const activities = ref([]);
const currentActivity = ref(null);
const notes = ref('');
const startTime = ref(null);

const fetchProjectsAndActivities = async () => {
  // Fetch projects and activities from the API
  // This is a placeholder, replace with actual API calls
  projects.value = await axios.get('/api/projects');
  activities.value = await axios.get('/api/activities');
};

const startActivity = (project, activityType) => {
  currentActivity.value = {project, activityType, startTime: new Date()};
  startTime.value = new Date();
};

const stopActivity = async () => {
  if (currentActivity.value) {
    const duration = (new Date() - startTime.value) / 1000; // duration in seconds
    await axios.post('/api/activities', {
      project: currentActivity.value.project,
      activityType: currentActivity.value.activityType,
      notes: notes.value,
      duration,
      startTime: startTime.value
    });
    currentActivity.value = null;
    notes.value = '';
    startTime.value = null;
  }
};

onMounted(fetchProjectsAndActivities);
</script>

<template>
  <div>
    <h2>Time Tracker</h2>
    <div v-if="currentActivity">
      <p>Current Activity: {{ currentActivity.project }} - {{ currentActivity.activityType }}</p>
      <p>Duration: {{ (new Date() - startTime) / 1000 }} seconds</p>
      <textarea v-model="notes" placeholder="Notes (Markdown supported)"></textarea>
      <button @click="stopActivity">Stop Activity</button>
    </div>
    <div v-else>
      <select v-model="selectedProject">
        <option v-for="project in projects" :key="project.id" :value="project">{{
            project.name
          }}
        </option>
      </select>
      <select v-model="selectedActivityType">
        <option v-for="activity in activities" :key="activity.id" :value="activity">{{
            activity.name
          }}
        </option>
      </select>
      <button @click="startActivity(selectedProject, selectedActivityType)">Start Activity</button>
    </div>
    <h3>Today's Activities</h3>
    <!-- List of today's activities with options to edit, delete, and create new entries -->
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
