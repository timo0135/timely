<script setup>
import { defineProps } from 'vue';
// import {marked} from 'marked';

defineProps({
  goal: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div>
    <h3>{{ goal.name }}</h3>
    <p v-html="marked(goal.content)"></p>
    <p>Date de création: {{ goal.date }}</p>
  </div>
</template>

<style scoped>
div {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
</style>
