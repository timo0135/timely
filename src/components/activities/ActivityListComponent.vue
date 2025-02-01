<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { VList, VListItem, VListItemTitle, VAvatar } from 'vuetify/components';

defineProps({
  activities: Array,
});
const router = useRouter();

function getActivityClass(activity) {
  return activity.is_enabled === 0 ? 'disabled-activity' : '';
}

function goToActivityDetail(id) {
  router.push(`/settings/activities/${id}`);
}
</script>

<template>
  <v-list>
    <v-list-item
      v-for="activity in activities"
      :key="activity.id"
      :class="getActivityClass(activity)"
      @click="goToActivityDetail(activity.id)"
    >
      <v-row class="justify-space-between">
        <v-col>
          <v-list-item-title>{{ activity.name }}</v-list-item-title>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-avatar :color="activity.color" size="24"></v-avatar>
        </v-col>
      </v-row>
    </v-list-item>
  </v-list>
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
