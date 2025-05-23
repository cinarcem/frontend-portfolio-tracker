<template>
  <BaseModal
    :isActive="indexesWatchlistStore.openDeleteIndexDialog"
    @toggle-is-active="indexesWatchlistStore.toggleDeleteIndexDialog()"
  >
    <template v-slot:header>
      <span>Onay</span>
    </template>
    <DeleteIndexConfirmMessage
      @toggle-is-active="indexesWatchlistStore.toggleDeleteIndexDialog()"
      @delete-index="indexesWatchlistStore.deleteIndexFromWatchlist()"
    ></DeleteIndexConfirmMessage>
  </BaseModal>
</template>

<script setup>
import BaseModal from '@/components/Modals/BaseModal.vue';
import { useIndexesWatchlistStore } from '@/stores/IndexesWatchlistStore';
import DeleteIndexConfirmMessage from '@/components/Modals/DeleteIndexWatchlistConfirmMessage.vue';
const indexesWatchlistStore = useIndexesWatchlistStore();
</script>
