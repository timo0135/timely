<script setup>
import {RouterView} from 'vue-router'
import HeaderComponent from "@/components/HeaderComponent.vue";
</script>

<template>
  <HeaderComponent></HeaderComponent>
  <RouterView/>
</template>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  flex-shrink: 0;
}

main {
  flex-grow: 1;
  padding: 2rem;
}
</style>
