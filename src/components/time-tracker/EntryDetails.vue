<script setup>

import {getCurrentInstance, onMounted, ref, watch} from "vue";
import {marked} from "marked";
import {VSnackbar} from "vuetify/components";

const api = getCurrentInstance().appContext.config.globalProperties.$api();
const snackbar = ref(false);
const snackbarMessage = ref('');

const props = defineProps({
  currentEntry: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close']);

const save = () => {
  api.put(`/api/time-entries/${dataEntry.value.id}`, {
    comment: dataEntry.value.comment
  }).then(() => {
    emit('close');
  }).catch(error => {
    console.log(error);
    snackbarMessage.value = error.response.data.errors || 'An error occurred starting activity';
    snackbar.value = true;
  })
}

const deleteEntry = () => {
  api.delete(`/api/time-entries/${dataEntry.value.id}`).then(() => {
    emit('close');
  }).catch(error => {
    console.log(error);
    snackbarMessage.value = error.response.data.errors || 'An error occurred starting activity';
    snackbar.value = true;
  })
}

const dataEntry = ref(props.currentEntry);

const contentMd = ref('');

onMounted(async () => {
  contentMd.value = await marked(props.currentEntry.comment, {async: true});
})

watch(() => dataEntry.value.comment, async () => {
  contentMd.value = await marked(dataEntry.value.comment, {async: true});
})

</script>

<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between align-center">
      <h3>{{ title }}</h3>
      <div v-if="Object.keys(dataEntry).length > 0" class="d-flex justify-space-between align-center">
        <p>Début: {{ dataEntry.start }}</p>
        <p v-if="dataEntry.end==='0000-00-00 00:00:00'" class="ml-5">Fin: Non définie</p>
        <p v-else class="ml-5">Fin: {{ dataEntry.end }}</p>
      </div>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="6">
              <div>
                <v-card-title>Informations (Visuel) :</v-card-title>
                <div class="content" v-html="contentMd"></div>
              </div>
            </v-col>
            <v-col cols="6">
              <v-card-title>Informations (Texte) :</v-card-title>
              <v-form @submit.prevent="">
                <v-textarea
                  v-model="dataEntry.comment"
                  label="Description"
                  variant="outlined"
                ></v-textarea>
              </v-form>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="error" @click="deleteEntry">Supprimer</v-btn>
      <v-btn color="primary" @click="save">Enregistrer</v-btn>
    </v-card-actions>
  </v-card>
  <v-snackbar v-model="snackbar" :timeout="3000" color="red" location="top right">
    {{ snackbarMessage }}
  </v-snackbar>
</template>

<style scoped>
.timer-display {
  font-size: 2em;
  text-align: right;
}
.content {
  margin-bottom: 1rem;
  min-height: 10rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
</style>
