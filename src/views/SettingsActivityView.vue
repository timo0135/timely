<script setup>
import SettingsHeaderComponent from '@/components/settings/SettingsHeaderComponent.vue';
import ActivityListComponent from "@/components/activities/ActivityListComponent.vue";
import { getCurrentInstance, onMounted, ref, watch, computed } from "vue";
import { VCol, VContainer, VRow, VTextField, VCard, VCardTitle, VCardText, VPagination } from "vuetify/components";

const activities = ref([]);
const search = ref('');
const page = ref(1);
const itemsPerPage = ref(5);

const api = getCurrentInstance().appContext.config.globalProperties.$api();

const fetchProjects = (searchQuery) => {
  api.get('/api/activities', {
    params: {
      keywords: searchQuery,
    },
  })
    .then((response) => {
      activities.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

onMounted(() => {
  fetchProjects(search.value);
});

watch(search, (newSearch) => {
  fetchProjects(newSearch);
});

const paginatedActivities = computed(() => {
  const start = (page.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;

  return activities.value.slice(start, end);
});

const totalActivities = computed(() => activities.value.length);
const numberOfPages = computed(() => Math.ceil(totalActivities.value / itemsPerPage.value));
</script>

<template>
  <v-container>
    <SettingsHeaderComponent />
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h2>Activités</h2>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="search"
              label="Search activities"
              variant="outlined"
              clearable
            />
            <v-list>
              <ActivityListComponent :activities="paginatedActivities" />
            </v-list>
            <v-pagination
              v-model="page"
              :length="numberOfPages"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>
