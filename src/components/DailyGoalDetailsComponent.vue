<script setup>
import {defineProps, onMounted, ref, watch} from 'vue';
import {marked} from 'marked';

const props = defineProps({
  goal: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update', 'delete', 'done', 'undone']);
const content = ref('')
const localGoal = ref({
  id: props.goal.id,
  name: props.goal.name,
  content: props.goal.content,
  date: props.goal.date,
  done: props.goal.done === 1
})

const save = () => {
  emit('update', localGoal.value.id, localGoal.value.name, localGoal.value.content)
}

const deleteGoal = () => {
  emit('delete', localGoal.value.id)
}

onMounted(async () => {
  content.value = await marked(localGoal.value.content, {async: true})
})

watch(() => localGoal.value.content, async () => {
  content.value = await marked(localGoal.value.content, {async: true})
})

watch(() => localGoal.value.done, () => {
  if(localGoal.value.done){
    emit('undone', localGoal.value.id)
  }else{
    emit('done', localGoal.value.id)
  }
})
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title style="text-align: center">Objectif journalier</v-card-title>
      <v-row>
        <v-col cols="6">
          <div>
            <v-card-title>Informations (Visuel) :</v-card-title>
            <h2>{{ localGoal.name }}</h2>
            <div class="content" v-html="content"></div>
            <p>Date de création: {{ localGoal.date }}</p>
          </div>
          <v-checkbox v-model="localGoal.done" label="Objectif complété"></v-checkbox>
        </v-col>
        <v-col cols="6">
          <v-card-title>Informations (Texte) :</v-card-title>
          <v-form @submit.prevent="save">
            <v-text-field
              v-model="localGoal.name"
              label="Nom"
              variant="outlined"
            ></v-text-field>
            <v-textarea
              v-model="localGoal.content"
              label="Description"
              variant="outlined"
            ></v-textarea>
            <v-text-field
              v-model="localGoal.date"
              label="Date de création"
              variant="outlined"
              readonly
            ></v-text-field>
          </v-form>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="deleteGoal">Supprimer</v-btn>
        <v-btn color="primary" @click="save">Enregistrer</v-btn>
      </v-card-actions>
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
