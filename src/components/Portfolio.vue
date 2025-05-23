<template>
  <v-card class="pa-2 mx-2 mb-2" elevation="8">
    <v-tabs v-model="tab">
      <v-tab
        value="portfolio"
        @click="portfolioStore.getUserPortfolio()"
        class="text-capitalize"
        >Portföyüm</v-tab
      >
      <v-tab
        value="transactions"
        @click="transactionsStore.getUserTransactions()"
        class="text-capitalize"
        >İşlemlerim</v-tab
      >

      <v-spacer></v-spacer>

      <div v-if="tab == 'portfolio'" class="d-flex align-center mt-2">
        <div class="mx-2">
          <v-btn
            density="comfortable"
            icon="mdi-plus"
            @click="portfolioStore.toggleStocksDialog()"
          ></v-btn>
        </div>
        <div class="mr-6 ml-2">
          <v-btn
            v-if="authStore.authenticated"
            class="d-flex align-center"
            density="comfortable"
            :icon="
              portfolioStore.enableActionsCol
                ? 'mdi-pencil'
                : 'mdi-pencil-outline'
            "
            @click="portfolioStore.toggleActionsCol()"
          ></v-btn>
        </div>
      </div>

      <div v-if="tab == 'transactions'" class="d-flex align-center mt-2">
        <div class="mx-2">
          <v-btn
            density="comfortable"
            icon="mdi-plus"
            @click="portfolioStore.toggleStocksDialog()"
          ></v-btn>
        </div>
        <div class="d-flex align-center mr-6 ml-2 my-6">
          <v-btn
            v-if="authStore.authenticated"
            class="d-flex align-center"
            density="comfortable"
            :icon="
              transactionsStore.enableActionsCol
                ? 'mdi-pencil'
                : 'mdi-pencil-outline'
            "
            @click="transactionsStore.toggleActionsCol()"
          ></v-btn>
        </div>
      </div>
    </v-tabs>

    <v-card-text no-gutters class="pa-0">
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="portfolio">
          <portfolio-table></portfolio-table>
        </v-tabs-window-item>
        <v-tabs-window-item value="transactions">
          <TransactionTable></TransactionTable>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
  <v-snackbar
    v-model="transactionsStore.snackbar"
    :timeout="transactionsStore.snackbarTimeout"
    :color="transactionsStore.snackbarColor"
  >
    {{ transactionsStore.snackbarText }}

    <template v-slot:actions>
      <v-btn
        color="black"
        variant="text"
        @click="transactionsStore.snackbar = false"
      >
        Kapat
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import TransactionTable from './Tables/TransactionTable.vue';
import PortfolioTable from '@/components/Tables/PortfolioTable.vue';
import { usePortfolioStore } from '@/stores/PortfolioStore';
const portfolioStore = usePortfolioStore();
import { useTransactionsStore } from '@/stores/TransactionsStore';
const transactionsStore = useTransactionsStore();
import { useAuthStore } from '@/stores/authStore.js';
const authStore = useAuthStore();
import { useMainStore } from '@/stores/MainStore';
const mainStore = useMainStore();

import { ref } from 'vue';
const tab = ref(null);
</script>

<style>
.v-data-table-rows-no-data {
  color: #2979ff;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.425;
  letter-spacing: 0.0178571429em;
}
</style>
