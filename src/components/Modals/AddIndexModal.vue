<template>
  <BaseModal
    :isActive="indexesWatchlistStore.openIndexesDialog"
    @toggle-is-active="indexesWatchlistStore.toggleIndexesDialog()"
  >
    <template v-if="keycloak.authenticated" v-slot:header>
      <span>Endeks Ekle</span>
    </template>
    <template v-else v-slot:header>
      <span>Giriş</span>
    </template>

    <IndexesForm
      v-if="keycloak.authenticated"
      :indexSymbols="mainStore.indexSymbols"
    ></IndexesForm>
    <LoginMessage v-else></LoginMessage>
  </BaseModal>
</template>

<script setup>
import BaseModal from '@/components/Modals/BaseModal.vue';
import IndexesForm from '@/components/Forms/IndexesWatchlistForm.vue';
import LoginMessage from '@/components/Modals/LoginMessage.vue';

import { useMainStore } from '@/stores/MainStore';
import keycloak from '@/keycloak';
const mainStore = useMainStore();

import { useIndexesWatchlistStore } from '@/stores/IndexesWatchlistStore';
const indexesWatchlistStore = useIndexesWatchlistStore();
</script>
