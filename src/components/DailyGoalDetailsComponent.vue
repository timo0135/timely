<script setup>
import {defineProps, onMounted, ref} from 'vue';
import {marked} from 'marked';

const props = defineProps({
  goal: {
    type: Object,
    required: true
  }
});
const content = ref('')

onMounted(async () => {
  content.value = await marked(props.goal.content, {async: true})
})
</script>

<template>
  <div>
    <h3>{{ goal.name }}</h3>
    <div v-html="content"></div>
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
