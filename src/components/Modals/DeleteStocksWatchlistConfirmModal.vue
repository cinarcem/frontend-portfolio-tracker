<template>
  <BaseModal
    :isActive="stocksWatchlistStore.openDeleteStockDialog"
    @toggle-is-active="stocksWatchlistStore.toggleDeleteExchangeDialog()"
  >
    <template v-slot:header>
      <span>Onay</span>
    </template>
    <DeleteExchangeConfirmMessage
      @toggle-is-active="stocksWatchlistStore.toggleDeleteExchangeDialog()"
      @delete-index="stocksWatchlistStore.deleteExchangeFromWatchlist()"
    ></DeleteExchangeConfirmMessage>
  </BaseModal>
</template>

<script setup>
import BaseModal from '@/components/Modals/BaseModal.vue';
import { useStocksWatchlistStore } from '@/stores/StocksWatchlistStore';
import DeleteExchangeConfirmMessage from '@/components/Modals/DeleteStocksWatchlistConfirmMessage.vue';
const stocksWatchlistStore = useStocksWatchlistStore();
</script>
