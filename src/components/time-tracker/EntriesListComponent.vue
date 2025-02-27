<script setup>
import {defineProps, ref} from 'vue';
import {VList, VListItem, VListItemTitle} from 'vuetify/components';
import EntryDetails from "@/components/time-tracker/EntryDetails.vue";

defineProps({
  entries: Array,
});
const currentEntry = ref(null);
const windowDetails = ref(false);

function openWindowDetails(entry) {
  currentEntry.value = entry;
  windowDetails.value = true;
}
</script>

<template>
  <v-list>
    <v-list-item
      v-for="(entry, index) in entries"
      :key="entry.id"
      @click="openWindowDetails(entry)"
    >
      <v-row class="justify-space-between">
        <v-col>
          <v-list-item-title>Entrée ({{ index + 1 }})</v-list-item-title>
        </v-col>
      </v-row>
    </v-list-item>
  </v-list>
  <v-dialog v-model="windowDetails" max-width="90em">
    <EntryDetails title="Détail de l'entrée" :current-entry="currentEntry"  @close="windowDetails = false"/>
  </v-dialog>
</template>

<style scoped>
.v-list-item {
  cursor: pointer;
  border-bottom: black 1px solid;
}

.v-list-item:hover {
  background-color: #f0f0f0;
}

.disabled-activity {
  opacity: 0.5;
}
</style>
