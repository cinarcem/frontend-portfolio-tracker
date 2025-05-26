<template>
  <v-card class="px-4 py-2 mx-2 mb-4" elevation="8">
    <v-tabs align-tabs="center">
      <div class="d-flex pl-4 align-center text-capitalize text-h6">
        Endeksler
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex align-center mb-2">
        <div class="mx-2">
          <v-btn
            density="compact"
            icon="mdi-plus"
            @click="indexesWatchlistStore.toggleIndexesDialog()"
          ></v-btn>
        </div>
        <div class="ml-2">
          <v-btn
            v-if="authStore.authenticated"
            class="d-flex align-center"
            density="compact"
            :icon="
              indexesWatchlistStore.enableActionsCol
                ? 'mdi-pencil'
                : 'mdi-pencil-outline'
            "
            @click="indexesWatchlistStore.toggleActionsCol()"
          ></v-btn>
        </div>
      </div>
    </v-tabs>
    <v-divider class="border-opacity-40"></v-divider>
    <IndexesWatchlistTable></IndexesWatchlistTable>
  </v-card>
</template>

<script setup>
import IndexesWatchlistTable from '@/components/Tables/IndexesWatchlistTable.vue';
import { useIndexesWatchlistStore } from '@/stores/IndexesWatchlistStore';
const indexesWatchlistStore = useIndexesWatchlistStore();
import { useAuthStore } from '@/stores/authStore.js';
const authStore = useAuthStore();
</script>
