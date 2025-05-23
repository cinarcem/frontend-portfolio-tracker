<template>
  <v-sheet class="mx-4" min-width="250px">
    <v-row>
      <v-col>
        <v-form ref="form">
          <v-combobox
            v-model="stockSymbol"
            class="mb-2 mt-4"
            :rules="[rules.isValidStock]"
            density="compact"
            label="Hisse"
            :items="stockSymbols"
          >
          </v-combobox>
        </v-form>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-evenly mb-6">
      <v-btn
        @click="stocksWatchlistStore.addStockToWatchlist(stockSymbol)"
        :disabled="!isFormValid"
        class="ma-1"
        color="green-lighten-2"
        width="110px"
      >
        Ekle
        <v-icon icon="mdi-checkbox-marked-circle" end></v-icon>
      </v-btn>
    </v-row>
    <v-snackbar
      v-model="stocksWatchlistStore.snackbar"
      :timeout="stocksWatchlistStore.snackbarTimeout"
      :color="stocksWatchlistStore.snackbarColor"
    >
      {{ stocksWatchlistStore.snackbarText }}

      <template v-slot:actions>
        <v-btn
          color="black"
          variant="text"
          @click="stocksWatchlistStore.snackbar = false"
        >
          Kapat
        </v-btn>
      </template>
    </v-snackbar>
  </v-sheet>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStocksWatchlistStore } from '@/stores/StocksWatchlistStore';

const props = defineProps({
  stockSymbols: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['toggle-is-active']);

const stocksWatchlistStore = useStocksWatchlistStore();
const stockSymbol = ref('');
const form = ref('');

const resetForm = () => {
  form.value.reset();
};

const rules = {
  isValidStock: (value) =>
    props.stockSymbols.includes(value) || 'Geçerli senet giriniz',
};

const isFormValid = computed(() => {
  return rules.isValidStock(stockSymbol.value) === true;
});

const toggleIsActive = () => {
  emit('toggle-is-active');
};
</script>

<style>
.v-input {
  font-size: 2.2em;
}
</style>
