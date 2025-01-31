<script setup>
import { defineProps } from 'vue';
import ProjectComponent from '@/components/projects/ProjectComponent.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
defineProps({
  projects: Array,
});

function goToProjectDetail(id) {
  router.push(`/settings/projects/${id}`);
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        v-for="project in projects"
        :key="project.id"
        cols="12"
        md="6"
        lg="4"
      >
        <ProjectComponent
          :project="project"
          @click="goToProjectDetail(project.id)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>
