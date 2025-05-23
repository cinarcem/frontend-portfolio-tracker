<template>
  <BaseModal
    :isActive="transactionsStore.openDeleteStockDialog"
    @toggle-is-active="transactionsStore.toggleDeleteStockDialog()"
  >
    <template v-slot:header>
      <span>Onay</span>
    </template>
    <DeleteStockConfirmMessage
      @toggle-is-active="transactionsStore.toggleDeleteStockDialog()"
      @delete-stock-transactions="
        transactionsStore.deleteAllStockTransactions()
      "
    ></DeleteStockConfirmMessage>
  </BaseModal>
</template>

<script setup>
import BaseModal from '@/components/Modals/BaseModal.vue';
import DeleteStockConfirmMessage from '@/components/Modals/DeleteStockFromPortfolioConfirmMessage.vue';
import { useTransactionsStore } from '@/stores/TransactionsStore';
const transactionsStore = useTransactionsStore();
</script>
