<script setup>
import {defineProps} from 'vue';

defineProps({
  label: String,
  type: {
    type: String,
    default: 'button'
  }
});
</script>

<template>
  <button :type="type">{{ label }}</button>
</template>

<style scoped>
button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}
</style>
