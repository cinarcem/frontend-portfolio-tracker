<template>
  <v-data-table-server
    class="portfolio-table"
    density="compact"
    v-model:items-per-page="portfolioStore.itemsPerPage"
    :headers="portfolioStore.filteredHeaders"
    :items="portfolioStore.portfolio.rows"
    :no-data-text="portfolioStore.tableNoDataText"
    :items-length="portfolioStore.totalElements"
    :loading="portfolioStore.loading"
    @update:options="portfolioStore.reloadPortfolio"
    :items-per-page-text="''"
    :items-per-page-options="[5, 10, 25, { value: -1, title: 'Tümü' }]"
    :page-text="'{0}-{1} / {2}'"
  >
    <template v-slot:item.dailyChangePct="{ value }">
      <div class="text-end">
        <v-chip
          :color="portfolioStore.getChipColor(value)"
          :text="value"
          label
        ></v-chip>
      </div>
    </template>
    <template v-slot:item.profitLossPct="{ value }">
      <div class="text-end">
        <v-chip
          :color="portfolioStore.getChipColor(value)"
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
          @click="transactionsStore.toggleDeleteStockDialog(item.stockSymbol)"
        ></v-icon>
      </div>
    </template>
  </v-data-table-server>
</template>

<script setup>
import keycloak from '@/keycloak';
import { usePortfolioStore } from '../../stores/PortfolioStore';
const portfolioStore = usePortfolioStore();
import { useTransactionsStore } from '@/stores/TransactionsStore';
const transactionsStore = useTransactionsStore();
</script>

<style>
.datatable th {
  white-space: nowrap;
}

.portfolio-table th {
  font-weight: 700 !important;
  opacity: 0.7;
  white-space: nowrap;
}

.delete-icon-indexes-watchlist {
  opacity: 0.9;
}
</style>
