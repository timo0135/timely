<script setup>
import { defineProps } from 'vue';
// import { VList, VListItem, VListItemTitle } from 'vuetify/components';

defineProps({
  activities: Array,
});

function getActivityClass(activity) {
  return activity.is_enabled === 0 ? 'disabled-activity' : '';
}
</script>

<template>
  <v-list-item
    v-for="activity in activities"
    :key="activity.id"
    :class="getActivityClass(activity)"
  >
    <v-list-item-title>{{ activity.name }}</v-list-item-title>
  </v-list-item>
</template>

<style scoped>

.v-list-item {
  cursor: pointer;
  border-bottom: black 1px solid;
}

.v-list-item:hover {
  background-color: #f0f0f0;

}

.disabled-activity {
  opacity: 0.5;
}
</style>
