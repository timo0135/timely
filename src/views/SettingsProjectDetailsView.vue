<script setup>
import ProjectDetailsComponent from '@/components/projects/ProjectDetailsComponent.vue'
import { getCurrentInstance, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const project = ref({})
const route = useRoute()
const api = getCurrentInstance().appContext.config.globalProperties.$api();

onMounted(() => {
    api.get(`/api/projects/${route.params.id}`).then(response => {
        project.value = response.data
    })

})

function disableProject(id){
    api.patch(`/api/projects/${id}/disable`).then(response => {
        project.value = response.data
        console.log(response.data)
    }).catch(error => {
        console.log(error)
    })
}

function enableProject(id){
    api.patch(`/api/projects/${id}/enable`).then(response => {
        project.value = response.data
        console.log(response.data)
    }).catch(error => {
        console.log(error)
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
    })
}

</script>

<template>
    <ProjectDetailsComponent :project="project" @enable="enableProject" @disable="disableProject" @update="updateProject"/>
</template>

<style scoped>
</style>