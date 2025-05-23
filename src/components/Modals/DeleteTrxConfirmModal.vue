<template>
  <BaseModal
    :isActive="transactionsStore.openDeleteTrxDialog"
    @toggle-is-active="transactionsStore.toggleDeleteTrxDialog()"
  >
    <template v-slot:header>
      <span>Onay</span>
    </template>
    <DeleteTrxConfirmMessage
      @toggle-is-active="transactionsStore.toggleDeleteTrxDialog()"
      @delete-transaction="transactionsStore.deleteTransaction()"
    ></DeleteTrxConfirmMessage>
  </BaseModal>
</template>

<script setup>
import BaseModal from '@/components/Modals/BaseModal.vue';
import DeleteTrxConfirmMessage from '@/components/Modals/DeleteTrxConfirmMessage.vue';
import { useTransactionsStore } from '@/stores/TransactionsStore';
const transactionsStore = useTransactionsStore();
</script>
