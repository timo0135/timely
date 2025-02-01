<script setup>
import ProjectDetailsComponent from '@/components/projects/ProjectDetailsComponent.vue'
import { getCurrentInstance, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {VSnackbar} from "vuetify/components";

const project = ref({})
const route = useRoute()
const api = getCurrentInstance().appContext.config.globalProperties.$api();

const snackbar = ref(false);
const snackbarMessage = ref('');

onMounted(() => {
    api.get(`/api/projects/${route.params.id}`).then(response => {
        project.value = response.data
    }).catch(error => {
        console.log(error)
        snackbarMessage.value = error.response.data.errors || 'An error occurred during login';
        snackbar.value = true;
    })

})

function disableProject(id){
    api.patch(`/api/projects/${id}/disable`).then(response => {
        project.value = response.data
        console.log(response.data)
    }).catch(error => {
        console.log(error)
        snackbarMessage.value = error.response.data.errors || 'An error occurred during login';
        snackbar.value = true;
    })
}

function enableProject(id){
    api.patch(`/api/projects/${id}/enable`).then(response => {
        project.value = response.data
        console.log(response.data)
    }).catch(error => {
        console.log(error)
        snackbarMessage.value = error.response.data.errors || 'An error occurred during login';
        snackbar.value = true;
    })
}

function updateProject(id, name, description){
    api.put(`/api/projects/${id}`, {
        name: name,
        description: description
    }).then(response => {
        project.value = response.data
        console.log(response.data)
    }).catch(error => {
        console.log(error)
        snackbarMessage.value = error.response.data.errors || 'An error occurred during login';
        snackbar.value = true;
    })
}

</script>

<template>
    <ProjectDetailsComponent :project="project" @enable="enableProject" @disable="disableProject" @update="updateProject"/>
    <v-snackbar v-model="snackbar" :timeout="3000" color="red" location="top right">
      {{ snackbarMessage }}
    </v-snackbar>
</template>

<style scoped>
</style>
