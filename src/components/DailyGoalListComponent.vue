<script setup>
import { VList, VListItem, VListItemTitle, VDialog } from "vuetify/components";
import { ref } from "vue";
import DailyGoalDetailsComponent from "@/components/DailyGoalDetailsComponent.vue";

defineProps({
  goals: Array,
});

const dialogGoalDetails = ref(false);
const selectedGoal = ref(null);

const openDialog = (goal) => {
  selectedGoal.value = goal;
  dialogGoalDetails.value = true;
};
</script>

<template>
  <v-list>
    <v-list-item
      v-for="goal in goals"
      :key="goal.id"
      @click="openDialog(goal)"
    >
      <v-list-item-title>{{ goal.name }}</v-list-item-title>
    </v-list-item>
  </v-list>

  <v-dialog v-model="dialogGoalDetails" max-width="50em">
    <DailyGoalDetailsComponent :goal="selectedGoal" />
  </v-dialog>
</template>

<style scoped>
.v-list-item {
  cursor: pointer;
  border-bottom: black 1px solid;
}

.v-list-item:hover {
  background-color: #f0f0f0;
}
</style>
