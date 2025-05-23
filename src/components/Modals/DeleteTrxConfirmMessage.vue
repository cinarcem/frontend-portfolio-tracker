<template>
  <v-sheet class="ma-4">
    <v-row class="d-flex mb-6">
      <v-col class="d-flex flex-column align-center">
        <p class="mb-4">İşlemi silmek istiyor musunuz?</p>
        <v-row>
          <v-btn
            @click="deleteTransaction()"
            class="text-capitalize mt-4 mx-2"
            color="green-lighten-2"
            width="110px"
          >
            Evet
          </v-btn>
          <v-btn
            @click="toggleIsActive()"
            class="text-capitalize mt-4 mx-2"
            color="red-lighten-2"
            width="110px"
          >
            Vazgeç
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['toggle-is-active', 'delete-transaction']);

const toggleIsActive = () => {
  emit('toggle-is-active');
};

const deleteTransaction = () => {
  emit('delete-transaction');
};
</script>
