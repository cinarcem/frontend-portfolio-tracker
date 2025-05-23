<template>
  <BaseModal
    :isActive="portfolioStore.openStocksDialog"
    @toggle-is-active="portfolioStore.toggleStocksDialog()"
  >
    <template v-if="keycloak.authenticated" v-slot:header>
      <span>Hisse Ekle</span>
    </template>
    <template v-else v-slot:header>
      <span>Giriş</span>
    </template>

    <StocksForm
      v-if="keycloak.authenticated"
      :stockSymbols="mainStore.stockSymbols"
    ></StocksForm>
    <LoginMessage v-else></LoginMessage>
  </BaseModal>
</template>

<script setup>
import BaseModal from '@/components/Modals/BaseModal.vue';
import StocksForm from '@/components/Forms/AddToPortfolioForm.vue';
import LoginMessage from '@/components/Modals/LoginMessage.vue';

import { useMainStore } from '@/stores/MainStore';
import keycloak from '@/keycloak';
const mainStore = useMainStore();

import { usePortfolioStore } from '@/stores/PortfolioStore';
const portfolioStore = usePortfolioStore();
</script>
