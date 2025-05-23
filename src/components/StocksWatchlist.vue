<template>
  <v-card class="px-4 py-2 mx-2 mb-4" elevation="8">
    <v-tabs align-tabs="center">
      <div class="d-flex pl-4 align-center text-capitalize">Hisseler</div>
      <v-spacer></v-spacer>
      <div class="d-flex align-center mb-2">
        <div class="mx-2">
          <v-btn
            density="compact"
            icon="mdi-plus"
            @click="stocksWatchlistStore.toggleStocksDialog()"
          ></v-btn>
        </div>
        <div class="ml-2">
          <v-btn
            v-if="authStore.authenticated"
            class="d-flex align-center"
            density="compact"
            :icon="
              stocksWatchlistStore.enableActionsCol
                ? 'mdi-pencil'
                : 'mdi-pencil-outline'
            "
            @click="stocksWatchlistStore.toggleActionsCol()"
          ></v-btn>
        </div>
      </div>
    </v-tabs>
    <v-divider class="border-opacity-40"></v-divider>
    <StocksWatchlistTable></StocksWatchlistTable>
  </v-card>
</template>

<script setup>
import StocksWatchlistTable from '@/components/Tables/StocksWatchlistTable.vue';
import { useStocksWatchlistStore } from '@/stores/StocksWatchlistStore';
const stocksWatchlistStore = useStocksWatchlistStore();
import { useAuthStore } from '@/stores/authStore.js';
const authStore = useAuthStore();
</script>

<style>
.v-data-table-rows-no-data {
  color: #2979ff;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.425;
  letter-spacing: 0.0178571429em;
}
</style>
