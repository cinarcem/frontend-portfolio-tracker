<template>
  <v-sheet class="ma-4">
    <v-row class="d-flex mt-2 mb-2">
      <v-col class="d-flex flex-column align-center">
        <p>İşlem yapmak için lütfen giriş yapınız.</p>
        <v-btn
          @click="authStore.login()"
          class="text-capitalize mt-4"
          color="green-lighten-2"
          width="110px"
        >
          Giriş
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore.js';
const authStore = useAuthStore();
</script>
