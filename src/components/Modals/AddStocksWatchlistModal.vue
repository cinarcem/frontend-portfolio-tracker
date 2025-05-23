<template>
  <BaseModal
    :isActive="stocksWatchlistStore.openStocksDialog"
    @toggle-is-active="stocksWatchlistStore.toggleStocksDialog()"
  >
    <template v-if="keycloak.authenticated" v-slot:header>
      <span>Hisse Ekle</span>
    </template>
    <template v-else v-slot:header>
      <span>Giriş</span>
    </template>

    <StocksWatchlistForm
      v-if="keycloak.authenticated"
      :stockSymbols="mainStore.stockSymbols"
    ></StocksWatchlistForm>
    <LoginMessage v-else></LoginMessage>
  </BaseModal>
</template>

<script setup>
import BaseModal from '@/components/Modals/BaseModal.vue';
import LoginMessage from '@/components/Modals/LoginMessage.vue';
import StocksWatchlistForm from '@/components/Forms/StocksWatchlistForm.vue';

import { useMainStore } from '@/stores/MainStore';
import keycloak from '@/keycloak';
const mainStore = useMainStore();

import { useStocksWatchlistStore } from '@/stores/StocksWatchlistStore';
const stocksWatchlistStore = useStocksWatchlistStore();
</script>
