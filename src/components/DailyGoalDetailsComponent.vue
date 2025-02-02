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
  <v-container>
    <v-card>
      <v-card-title style="text-align: center">Objectif journalier</v-card-title>
      <div>
        <v-card-title>Informations (Visuel) :</v-card-title>
        <h2>{{ goal.name }}</h2>
        <div class="content" v-html="content"></div>
        <p>Date de création: {{ goal.date }}</p>
      </div>
      <div>
        <v-card-title>Commentaires</v-card-title>
        <v-card>
          <v-card-title>Commentaire 1</v-card-title>
          <p>Contenu du commentaire 1</p>
        </v-card>
        <v-card>
          <v-card-title>Commentaire 2</v-card-title>
          <p>Contenu du commentaire 2</p>
        </v-card>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
.content {
  margin-bottom: 1rem;
  min-height: 10rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

h2{
  font-size: 1.5rem;
}

.v-card-title {
  font-size: 1.5rem;
}

.v-card {
  padding: 1rem;
}
</style>
