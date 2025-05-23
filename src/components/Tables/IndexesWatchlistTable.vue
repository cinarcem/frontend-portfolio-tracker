<template>
  <v-data-table-server
    class="indexes-watchlist-table"
    density="compact"
    v-model:items-per-page="indexesWatchlistStore.itemsPerPage"
    :headers="indexesWatchlistStore.filteredHeaders"
    :items="indexesWatchlistStore.indexes.rows"
    :items-length="indexesWatchlistStore.totalElements"
    :loading="indexesWatchlistStore.loading"
    @update:options="indexesWatchlistStore.reloadWatchlist"
    :no-data-text="indexesWatchlistStore.tableNoDataText"
    :items-per-page-text="''"
    :items-per-page-options="[5, 10, 25, { value: -1, title: 'Tümü' }]"
    :page-text="'{0}-{1} / {2}'"
  >
    <template v-slot:item.dailyChangePct="{ value }">
      <div class="text-end">
        <v-chip
          :color="indexesWatchlistStore.getChipColor(value)"
          :text="value"
          label
        ></v-chip>
      </div>
    </template>
    <template v-slot:item.actions="{ item }">
      <div class="d-flex ga-2 justify-center">
        <v-icon
          class="delete-icon-indexes-watchlist"
          color="red"
          icon="mdi-trash-can-outline"
          size="large"
          @click="
            indexesWatchlistStore.deleteIndexFromWatchlist(item.indexSymbol)
          "
        ></v-icon>
      </div>
    </template>
  </v-data-table-server>
</template>

<script setup>
import { useIndexesWatchlistStore } from '@/stores/IndexesWatchlistStore';
const indexesWatchlistStore = useIndexesWatchlistStore();
</script>

<style>
.indexes-watchlist-table th {
  font-weight: 700 !important;
  opacity: 0.7;
}
.indexes-watchlist-table td,
v-chip__content {
  font-size: 0.875em;
}
.delete-icon-indexes-watchlist {
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
