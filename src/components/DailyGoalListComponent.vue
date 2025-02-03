<script setup>
import { VList, VListItem, VListItemTitle, VDialog } from "vuetify/components";
import { ref } from "vue";
import DailyGoalDetailsComponent from "@/components/DailyGoalDetailsComponent.vue";

defineProps({
  goals: Array,
});

const dialogGoalDetails = ref(false);
const selectedGoal = ref(null);

const emit = defineEmits(['update', 'delete', 'done', 'undone']);
const openDialog = (goal) => {
  selectedGoal.value = goal;
  dialogGoalDetails.value = true;
};

const update = (id, name, content) => {
  emit('update', id, name, content);
  dialogGoalDetails.value = false;
};

const deleteGoal = (id) => {
  emit('delete', id);
  dialogGoalDetails.value = false;
};

const done = (id) => {
  emit('done', id);
};

const undone = (id) => {
  emit('undone', id);
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

  <v-dialog v-model="dialogGoalDetails" max-width="90em">
    <DailyGoalDetailsComponent :goal="selectedGoal" @update="update" @delete="deleteGoal" @done="done" @undone="undone" />
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
