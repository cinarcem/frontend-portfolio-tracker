<template>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';

import keycloak from './keycloak.js';
import { useAuthStore } from './stores/authStore.js';
const authStore = useAuthStore();

import { usePortfolioStore } from '@/stores/PortfolioStore';
const portfolioStore = usePortfolioStore();

import { useTransactionsStore } from '@/stores/TransactionsStore';
const transactionsStore = useTransactionsStore();

import { useIndexesWatchlistStore } from './stores/IndexesWatchlistStore.js';
const indexesWatchlistStore = useIndexesWatchlistStore();

import { useStocksWatchlistStore } from './stores/StocksWatchlistStore.js';
const stocksWatchlistStore = useStocksWatchlistStore();

import { useMainStore } from '@/stores/MainStore';
const mainStore = useMainStore();

keycloak
  .init({ onLoad: 'check-sso' })
  .then((authenticated) => {
    /* if (!authenticated) {
    } */
  })
  .catch((error) => {
    console.error('Keycloak initialization failed:', error);
  });

keycloak.onAuthSuccess = () => {
  authStore.authenticated = true;
  authStore.setTokens();
  setupTokenRefresh();
  refreshTables();
  portfolioStore.getUserPortfolio();
  transactionsStore.getUserTransactions();
  indexesWatchlistStore.getUserWatchlist();
  stocksWatchlistStore.getUserWatchlist();
  mainStore.getStockSymbols();
  mainStore.getIndexSymbols();
};

function setupTokenRefresh() {
  const refreshInterval = setInterval(() => {
    keycloak
      .updateToken(60)
      .then((refreshed) => {
        if (refreshed) {
          authStore.setTokens();
        }
      })
      .catch(() => {
        console.error('Token yenileme başarısız oldu. Oturum kapatılıyor.');
        clearInterval(refreshInterval);
        keycloak.logout({
          redirectUri: window.location.origin,
        });
      });
  }, 30000);
}

function refreshTables() {
  const refreshInterval = setInterval(() => {
    if (keycloak.authenticated) {
      portfolioStore.getUserPortfolio();
      transactionsStore.getUserTransactions();
      indexesWatchlistStore.getUserWatchlist();
      stocksWatchlistStore.getUserWatchlist();
    } else {
      indexesWatchlistStore.getSampleWatchlist();
      stocksWatchlistStore.getSampleWatchlist();
    }
  }, 150000);
}
</script>
