<script setup>
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h4">Settings <v-icon>mdi-cog</v-icon></h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn  to="/settings/profile" class="mr-4">Mon Profil</v-btn>
        <v-btn  to="/settings/projects" class="mr-4">Mes Projets</v-btn>
        <v-btn  to="/settings/activities">Mes Activités</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-btn {
  text-transform: none;
}
</style>
