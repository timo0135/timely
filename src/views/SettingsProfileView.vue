<script setup>
import {ref, nextTick} from 'vue';
import SettingsHeaderComponent from '@/components/settings/SettingsHeaderComponent.vue';
import {useAuthStore} from '@/stores/authentification';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

const store = useAuthStore();
const isEditing = ref({
  name: false,
  email: false,
});

const values = {
  name: store.user.name,
  email: store.user.email,
};

const nameField = ref(null);
const emailField = ref(null);

const toggleEdit = async (field) => {
  isEditing.value[field] = !isEditing.value[field];
  await nextTick();
  if (isEditing.value[field]) {
    if (field === 'name') {
      nameField.value.focus();
    } else if (field === 'email') {
      emailField.value.focus();
    }
  }
};

const save = () => {
  try {
    store.update(values.email, values.name);
    isEditing.value.name = false;
    isEditing.value.email = false;
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <v-container>
    <SettingsHeaderComponent/>
    <v-card class="mx-auto my-5 pa-5" max-width="600">
      <v-card-title>
        <h2 class="text-h5">Profile</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="save">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                id="name"
                v-model="values.name"
                :readonly="!isEditing.name"
                type="text"
                label="Name"
                variant="outlined"
                ref="nameField"
              >
                <template v-slot:append>
                  <v-icon class="icon" @click="toggleEdit('name')">mdi-pencil</v-icon>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                id="email"
                v-model="values.email"
                :readonly="!isEditing.email"
                type="email"
                label="Email"
                variant="outlined"
                ref="emailField"
              >
                <template v-slot:append>
                  <v-icon class="icon" @click="toggleEdit('email')">mdi-pencil</v-icon>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                id="apikey"
                v-model="store.user.apikey"
                readonly
                type="text"
                label="Api Key"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" class="text-right">
              <v-btn type="submit" color="primary">Save</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.icon {
  cursor: pointer;
}
</style>
