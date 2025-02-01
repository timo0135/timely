<script setup>
import { getCurrentInstance, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {VSnackbar} from "vuetify/components";
import ActivityDetailsComponent from "@/components/activities/ActivityDetailsComponent.vue";

const activity = ref({})
const route = useRoute()
const api = getCurrentInstance().appContext.config.globalProperties.$api();

const snackbar = ref(false);
const snackbarMessage = ref('');

onMounted(() => {
  api.get(`/api/activities/${route.params.id}`).then(response => {
    activity.value = response.data
  }).catch(error => {
    console.log(error)
    snackbarMessage.value = error.response.data.errors || 'An error occurred during login';
    snackbar.value = true;
  })

})

function disableActivity(id){
  api.patch(`/api/activities/${id}/disable`).then(response => {
    activity.value = response.data
    console.log(response.data)
  }).catch(error => {
    console.log(error)
    snackbarMessage.value = error.response.data.errors || 'An error occurred during login';
    snackbar.value = true;
  })
}

function enableActivity(id){
  api.patch(`/api/activities/${id}/enable`).then(response => {
    activity.value = response.data
    console.log(response.data)
  }).catch(error => {
    console.log(error)
    snackbarMessage.value = error.response.data.errors || 'An error occurred during login';
    snackbar.value = true;
  })
}

function updateActivity(id, name, color){
  api.put(`/api/activities/${id}`, {
    name: name,
    color: color
  }).then(response => {
    activity.value = response.data
    console.log(response.data)
  }).catch(error => {
    console.log(error)
    snackbarMessage.value = error.response.data.errors || 'An error occurred during login';
    snackbar.value = true;
  })
}

</script>

<template>
  <ActivityDetailsComponent :activity="activity" @enable="enableActivity" @disable="disableActivity" @update="updateActivity"/>
  <v-snackbar v-model="snackbar" :timeout="3000" color="red" location="top right">
    {{ snackbarMessage }}
  </v-snackbar>
</template>

<style scoped>
</style>
