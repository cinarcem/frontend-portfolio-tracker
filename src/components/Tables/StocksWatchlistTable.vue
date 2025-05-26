<template>
  <v-data-table-server
    class="stocks-watchlist-table"
    density="compact"
    v-model:items-per-page="stocksWatchlistStore.itemsPerPage"
    :headers="stocksWatchlistStore.filteredHeaders"
    :items="stocksWatchlistStore.stocks.rows"
    :items-length="stocksWatchlistStore.totalElements"
    :loading="stocksWatchlistStore.loading"
    @update:options="stocksWatchlistStore.reloadWatchlist"
    :no-data-text="stocksWatchlistStore.tableNoDataText"
    :items-per-page-text="''"
    :items-per-page-options="[5, 10, 25, { value: -1, title: 'Tümü' }]"
    :page-text="'{0}-{1} / {2}'"
  >
    <template v-slot:item.dailyChangePct="{ value }">
      <div class="text-end">
        <v-chip
          :color="stocksWatchlistStore.getChipColor(value)"
          :text="value"
          label
        ></v-chip>
      </div>
    </template>

    <template v-slot:item.actions="{ item }">
      <div class="d-flex ga-2 justify-center">
        <v-icon
          class="delete-icon-stocks-watchlist"
          color="red"
          icon="mdi-trash-can-outline"
          size="large"
          @click="
            stocksWatchlistStore.deleteStockFromWatchlist(item.stockSymbol)
          "
        ></v-icon>
      </div>
    </template>
  </v-data-table-server>
  <v-snackbar
    v-model="stocksWatchlistStore.snackbar"
    :timeout="stocksWatchlistStore.snackbarTimeout"
    :color="stocksWatchlistStore.snackbarColor"
  >
    {{ stocksWatchlistStore.snackbarText }}

    <template v-slot:actions>
      <v-btn
        color="black"
        variant="text"
        @click="stocksWatchlistStore.snackbar = false"
      >
        Kapat
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { useStocksWatchlistStore } from '@/stores/StocksWatchlistStore';
const stocksWatchlistStore = useStocksWatchlistStore();
</script>

<style>
.stocks-watchlist-table th {
  font-weight: 700 !important;
  opacity: 0.7;
  white-space: nowrap;
}

.delete-icon-stocks-watchlist {
  opacity: 0.9;
}

.v-data-table-rows-no-data {
  color: #2979ff;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.425;
  letter-spacing: 0.0178571429em;
}
</style>
