<template>
  <v-data-table-server
    class="transactions-table"
    v-model:items-per-page="transactionsStore.itemsPerPage"
    :headers="transactionsStore.filteredHeaders"
    :items="transactionsStore.transactions.rows"
    :items-length="transactionsStore.totalElements"
    :loading="transactionsStore.loading"
    @update:options="transactionsStore.reloadTransactions"
    :no-data-text="transactionsStore.tableNoDataText"
    :items-per-page-text="''"
    :items-per-page-options="[5, 10, 25, { value: -1, title: 'Tümü' }]"
    :page-text="'{0}-{1} / {2}'"
  >
    <template v-slot:item.actions="{ item }">
      <div class="d-flex ga-2 justify-center">
        <v-icon
          class="delete-icon-transactions"
          color="red"
          icon="mdi-trash-can-outline"
          size="large"
          @click="transactionsStore.toggleDeleteTrxDialog(item.id)"
        ></v-icon>
      </div>
    </template>
  </v-data-table-server>
</template>

<script setup>
import { useTransactionsStore } from '@/stores/TransactionsStore';
const transactionsStore = useTransactionsStore();
</script>

<style>
.transactions-table th {
  font-weight: 700 !important;
  opacity: 0.7;
}

.delete-icon-transactions {
  opacity: 0.9;
}
</style>
