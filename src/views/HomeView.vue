<script setup>
import {ref} from 'vue';
import TimeTrackerComponent from "@/components/time-tracker/TimeTrackerComponent.vue";
import { VContainer, VWindow, VWindowItem, VCardTitle, VCardText } from 'vuetify/components';
import DailyGoalComponent from "@/components/daily-objectif/DailyGoalComponent.vue";

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
          <TimeTrackerComponent />
        </v-card-text>

      </v-window-item>
    </v-window>
  </v-container>

</template>

<style scoped>
</style>
