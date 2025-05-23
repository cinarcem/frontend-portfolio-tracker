<template>
  <base-layout>
    <v-container v-if="display.width.value > 1800" fluid>
      <v-row no-gutters justify="center">
        <v-col class="watchlist" cols="2"
          ><IndexesWatchlist class="watchlist__indexes"></IndexesWatchlist
        ></v-col>
        <v-col class="portfolio"><Portfolio></Portfolio></v-col>
        <v-col class="watchlist" cols="2"
          ><StocksWatchlist></StocksWatchlist
        ></v-col>
      </v-row>
    </v-container>
    <v-container v-else-if="display.width.value > 1250" fluid>
      <v-row no-gutters justify="center">
        <v-col>
          <Portfolio></Portfolio>
        </v-col>
        <v-col class="watchlist" cols="2">
          <IndexesWatchlist></IndexesWatchlist>
          <StocksWatchlist></StocksWatchlist>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else-if="display.width.value > 750" fluid>
      <v-row no-gutters>
        <v-col>
          <Portfolio></Portfolio>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <IndexesWatchlist></IndexesWatchlist>
        </v-col>
        <v-col>
          <StocksWatchlist></StocksWatchlist>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else-if="display.width.value > 200" class="pa-0" fluid>
      <v-row no-gutters>
        <v-col>
          <Portfolio></Portfolio>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <IndexesWatchlist></IndexesWatchlist>
        </v-col>
        <v-col>
          <StocksWatchlist></StocksWatchlist>
        </v-col>
      </v-row>
    </v-container>
  </base-layout>

  <AddStockModal></AddStockModal>
  <AddIndexModal></AddIndexModal>
  <AddExchangeModal></AddExchangeModal>
  <DeleteTrxConfirmModal></DeleteTrxConfirmModal>
  <DeleteStockConfirmModal></DeleteStockConfirmModal>
  <DeleteIndexConfirmModal></DeleteIndexConfirmModal>
  <DeleteExchangeConfirmModal></DeleteExchangeConfirmModal>
</template>

<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue';
import IndexesWatchlist from '@/components/IndexesWatchlist.vue';
import Portfolio from '@/components/Portfolio.vue';
import StocksWatchlist from '@/components/StocksWatchlist.vue';
import AddStockModal from '@/components/Modals/AddStockToPortfolioModal.vue';
import DeleteTrxConfirmModal from '@/components/Modals/DeleteTrxConfirmModal.vue';
import DeleteStockConfirmModal from '@/components/Modals/DeleteStockFromPortfolioConfirmModal.vue';
import AddIndexModal from '@/components/Modals/AddIndexModal.vue';
import DeleteIndexConfirmModal from '@/components/Modals/DeleteIndexWatchlistConfirmModal.vue';
import AddExchangeModal from '@/components/Modals/AddStocksWatchlistModal.vue';
import DeleteExchangeConfirmModal from '@/components/Modals/DeleteStocksWatchlistConfirmModal.vue';

import { useDisplay } from 'vuetify';

const display = useDisplay();
</script>

<style>
.portfolio {
  max-width: 1200px !important;
}

.watchlist {
  min-width: 360px !important;
}
</style>
