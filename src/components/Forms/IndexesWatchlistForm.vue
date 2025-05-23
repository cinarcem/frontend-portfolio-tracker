<template>
  <v-sheet class="mx-4" min-width="250px">
    <v-row>
      <v-col>
        <v-form ref="form">
          <v-combobox
            v-model="indexSymbol"
            class="mb-2 mt-4"
            :rules="[rules.isValidIndexSymbol]"
            density="compact"
            label="Endeks"
            :items="indexSymbols"
          >
          </v-combobox>
        </v-form>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-evenly mb-6">
      <v-btn
        @click="indexesWatchlistStore.addIndexToWatchlist(indexSymbol)"
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
      v-model="indexesWatchlistStore.snackbar"
      :timeout="indexesWatchlistStore.snackbarTimeout"
      :color="indexesWatchlistStore.snackbarColor"
    >
      {{ indexesWatchlistStore.snackbarText }}

      <template v-slot:actions>
        <v-btn
          color="black"
          variant="text"
          @click="indexesWatchlistStore.snackbar = false"
        >
          Kapat
        </v-btn>
      </template>
    </v-snackbar>
  </v-sheet>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useIndexesWatchlistStore } from '@/stores/IndexesWatchlistStore';

const props = defineProps({
  indexSymbols: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['toggle-is-active']);

const indexesWatchlistStore = useIndexesWatchlistStore();
const indexSymbol = ref('');
const form = ref('');

const resetForm = () => {
  form.value.reset();
};

const rules = {
  isValidIndexSymbol: (value) =>
    props.indexSymbols.includes(value) || 'Geçerli senet giriniz',
};

const isFormValid = computed(() => {
  return rules.isValidIndexSymbol(indexSymbol.value) === true;
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
