<script setup>
import {RouterView} from 'vue-router'
import HeaderComponent from "@/components/HeaderComponent.vue";
</script>

<template>
  <v-app>
    <HeaderComponent></HeaderComponent>
    <RouterView/>
  </v-app>
</template>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f0f2f5;
  margin: 0;
  padding: 0;
}

header {
  flex-shrink: 0;
}

main {
  flex-grow: 1;
  padding: 2rem;
}
</style>
