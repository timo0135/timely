<script setup>
import { defineProps, defineEmits, ref, nextTick, watch } from 'vue';
import { VContainer, VCard, VCardTitle, VCardText, VTextField, VBtn, VRow, VCol } from 'vuetify/components';
import SettingsHeaderComponent from "@/components/settings/SettingsHeaderComponent.vue";

const props = defineProps({
  project: Object,
});
const emit = defineEmits(['enable', 'disable', 'update']);

const isEditing = ref({
  name: false,
  description: false,
});

const localProject = ref({ ...props.project });

watch(() => props.project, (newProject) => {
  localProject.value = { ...newProject };
});

const nameField = ref(null);
const descriptionField = ref(null);

const toggleEdit = async (field) => {
  isEditing.value[field] = !isEditing.value[field];
  await nextTick();
  if (isEditing.value[field]) {
    if (field === 'name') {
      nameField.value.focus();
    } else if (field === 'description') {
      descriptionField.value.focus();
    }
  }
};

const save = () => {
  emit('update', localProject.value.id, localProject.value.name, localProject.value.description);
  isEditing.value.name = false;
  isEditing.value.description = false;
};
</script>

<template>
  <v-container>
    <SettingsHeaderComponent />
    <v-card class="mx-auto my-5 pa-5" max-width="600">
      <v-card-title>
        <h2 class="text-h5">Project Details</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="save">
          <v-row>
            <v-col cols="12">
              <v-text-field
                id="name"
                v-model="localProject.name"
                :readonly="!isEditing.name"
                label="Name"
                variant="outlined"
                ref="nameField"
              >
                <template v-slot:append>
                  <v-icon class="ml-2 icon" @click="toggleEdit('name')">mdi-pencil</v-icon>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                id="description"
                v-model="localProject.description"
                :readonly="!isEditing.description"
                label="Description"
                variant="outlined"
                ref="descriptionField"
              >
                <template v-slot:append>
                  <v-icon class="ml-2 icon" @click="toggleEdit('description')">mdi-pencil</v-icon>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" class="text-right">
              <v-btn type="submit" color="primary">Save</v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-btn v-if="localProject.is_enabled === true || localProject.is_enabled === 1" @click="$emit('disable', localProject.id)">
          <v-icon class="icon">mdi-eye-off</v-icon>
        </v-btn>
        <v-btn v-else @click="$emit('enable', localProject.id)">
          <v-icon class="icon">mdi-eye</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.icon {
  cursor: pointer;
}
</style>
