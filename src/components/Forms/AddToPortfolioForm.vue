<template>
  <v-sheet class="mx-4" min-width="250px">
    <v-row>
      <v-col>
        <v-form ref="form">
          <v-combobox
            v-model="stockSymbol"
            class="mb-2 mt-4"
            :rules="[rules.isValidStockSymbol]"
            density="compact"
            label="Hisse"
            :items="stockSymbols"
          >
          </v-combobox>
          <v-text-field
            label="Fiyat"
            v-model="price"
            class="mb-2"
            :rules="[rules.isCurrency]"
            density="compact"
          ></v-text-field>
          <v-text-field
            label="Adet"
            v-model="quantity"
            class="mb-2"
            :rules="[rules.isPositiveInteger]"
            density="compact"
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="date"
            class="mb-2"
            density="compact"
            label="Tarih"
            type="date"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-evenly mb-6">
      <v-btn
        @click="
          portfolioStore.addStock(stockSymbol, price, quantity, date);
          resetForm();
        "
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
      v-model="portfolioStore.snackbar"
      :timeout="portfolioStore.snackbarTimeout"
      :color="portfolioStore.snackbarColor"
    >
      {{ portfolioStore.snackbarText }}

      <template v-slot:actions>
        <v-btn
          color="black"
          variant="text"
          @click="portfolioStore.snackbar = false"
        >
          Kapat
        </v-btn>
      </template>
    </v-snackbar>
  </v-sheet>
</template>

<script setup>
import { ref, computed } from 'vue';
import { usePortfolioStore } from '@/stores/PortfolioStore';

const props = defineProps({
  stockSymbols: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['toggle-is-active']);

const portfolioStore = usePortfolioStore();
const stockSymbol = ref('');
const quantity = ref('');
const price = ref('');
const date = ref('');
const form = ref('');

const resetForm = () => {
  form.value.reset();
};

const dateOfDay = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  return `${day}.${month}.${year}`;
};

const rules = {
  isValidStockSymbol: (value) =>
    props.stockSymbols.includes(value) || 'Geçerli senet giriniz',
  isPositiveInteger: (value) => {
    if (!value || value <= '0') {
      return 'Sıfırdan büyük tam sayı giriniz';
    }
    return (
      Number.isInteger(Number(value)) || 'Geçerli pozitif tam sayı giriniz'
    );
  },
  isCurrency: (value) => {
    const currencyPattern =
      /^(0|[1-9][0-9]{0,2})(\.\d{3})*(,\d{1,2})?$|^\d+(?:,\d{1,2})?$/;
    return currencyPattern.test(value) || 'Geçerli fiyat giriniz';
  },
  isDate: (value) => {
    const datePattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

    if (!datePattern.test(value)) {
      return 'Geçerli tarih formatı: gg.aa.yyyy';
    }

    const [day, month, year] = value.split('.').map(Number);
    const date = new Date(year, month - 1, day);

    return (
      (date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day) ||
      'Geçerli tarih giriniz'
    );
  },
};

const isFormValid = computed(() => {
  return (
    rules.isValidStockSymbol(stockSymbol.value) === true &&
    rules.isPositiveInteger(quantity.value) === true &&
    rules.isCurrency(price.value) === true &&
    date.value !== ''
  );
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
