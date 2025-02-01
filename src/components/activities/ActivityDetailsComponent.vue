<script setup>
import SettingsHeaderComponent from "@/components/settings/SettingsHeaderComponent.vue";
import { defineEmits, defineProps, nextTick, ref, watch } from "vue";
import { VBtn, VCard, VCardText, VCardTitle, VCol, VRow, VTextField, VColorPicker, VIcon } from "vuetify/components";

const props = defineProps({
  activity: Object,
});
const emit = defineEmits(['enable', 'disable', 'update']);

const isEditing = ref({
  name: false,
});

const localActivity = ref({ ...props.activity });

watch(() => props.activity, (newActivity) => {
  localActivity.value = { ...newActivity };
});

const nameField = ref(null);

const toggleEdit = async (field) => {
  isEditing.value[field] = !isEditing.value[field];
  await nextTick();
  if (isEditing.value[field]) {
    if (field === 'name') {
      nameField.value.focus();
    }
  }
};

const save = () => {
  emit('update', localActivity.value.id, localActivity.value.name, localActivity.value.color);
  isEditing.value.name = false;
};
</script>

<template>
  <v-container>
    <SettingsHeaderComponent />
    <v-card class="mx-auto my-5 pa-5" max-width="600">
      <v-card-title>
        <h2 class="text-h5">Activity Details</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="save">
          <v-row>
            <v-col cols="12" class="d-flex align-center">
              <v-text-field
                id="name"
                v-model="localActivity.name"
                :readonly="!isEditing.name"
                label="Name"
                variant="outlined"
                ref="nameField"
                class="flex-grow-1"
              >
                <template v-slot:append>
                  <v-icon @click="toggleEdit('name')" class="edit-icon">mdi-pencil</v-icon>
                </template>
              </v-text-field>

            </v-col>
            <v-col cols="12" class="d-flex align-center">
              <v-color-picker
                v-model="localActivity.color"
                hide-canvas
                mode="hexa"
                ref="colorField"
                class="flex-grow-1"
                hide-inputs
              />
            </v-col>
            <v-col cols="12" class="text-right">
              <v-btn type="submit" color="primary">Save</v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-btn v-if="localActivity.is_enabled === true || localActivity.is_enabled === 1"
               @click="$emit('disable', localActivity.id)">
          <v-icon class="icon">mdi-eye-off</v-icon>
        </v-btn>
        <v-btn v-else @click="$emit('enable', localActivity.id)">
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

.flex-grow-1 {
  flex-grow: 1;
}

.edit-icon {
  align-self: center;
}
</style>
