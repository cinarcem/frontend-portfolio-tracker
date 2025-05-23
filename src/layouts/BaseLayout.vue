<template>
  <v-layout>
    <v-app-bar prominent>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="menuStore.drawer = !menuStore.drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Portföy Takip</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn @click="toggleTheme()" icon="mdi-theme-light-dark"></v-btn>
      <v-btn
        @click="authStore.login()"
        v-if="!authStore.authenticated"
        class="btn-titlecase mx-4"
        variant="flat"
        color="green-lighten-2"
        >Giriş</v-btn
      >
      <v-btn
        v-else
        @click="authStore.logout()"
        class="btn-titlecase mx-4"
        variant="flat"
        color="red-lighten-2"
        >Çıkış</v-btn
      >
    </v-app-bar>

    <v-navigation-drawer
      v-model="menuStore.drawer"
      :location="$vuetify.display.smAndDown ? 'bottom' : undefined"
      temporary
    >
      <v-list>
        <v-list-item
          v-for="item in menuStore.items"
          :key="item.value"
          :value="item.value"
          :to="item.path"
        >
          {{ item.title }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex flex-column" style="min-height: 100vh">
      <v-container fluid class="d-flex flex-column flex-grow-1 pa-0">
        <v-col class="d-flex flex-column justify-space-between">
          <v-row>
            <slot></slot>
          </v-row>
          <v-row class="align-end">
            <v-footer
              class="text-center d-flex flex-column opacity-80 pt-0"
              color="green-lighten-4"
            >
              <div class="contact-section d-flex ga-3 align-end">
                <a
                  v-for="icon in mainStore.footerIcons"
                  density="comfortable"
                  variant="text"
                  :href="icon.link"
                  target="_blank"
                  ><v-btn
                    :key="icon"
                    :icon="icon.symbol"
                    density="comfortable"
                    size="x-large"
                    variant="text"
                  >
                  </v-btn
                ></a>
              </div>

              <div
                class="text-start text-subtitle-1 font-weight-regular align-end"
              >
                <span class="font-weight-bold">Yasal Uyarı:</span> Bu web sitesi
                yalnızca geliştiricinin kodlama yeteneklerini göstermek için
                tanıtım amaçlı olarak hazırlanmıştır. Veriler gecikmeli olarak
                yansıtılmaktadır. Ticari veya kişisel kullanım için değildir.
              </div>
            </v-footer>
          </v-row>
        </v-col>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import { useMenuStore } from '../stores/MenuStore';
const menuStore = useMenuStore();

import { useTheme } from 'vuetify';
const theme = useTheme();

import { useMainStore } from '../stores/MainStore';
const mainStore = useMainStore();

import { useAuthStore } from '@/stores/authStore.js';
const authStore = useAuthStore();

import { usePortfolioStore } from '../stores/PortfolioStore';
const portfolioStore = usePortfolioStore();

setInitialTheme();

function setInitialTheme() {
  const savedTheme = localStorage.getItem('theme');
  const isUserPrefersDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
    theme.global.name.value = savedTheme;
  } else {
    if (isUserPrefersDark) {
      theme.global.name.value = 'dark';
    } else {
      theme.global.name.value = 'light';
    }
  }
  mainStore.theme = theme.global.name.value;
}

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  localStorage.setItem('theme', theme.global.name.value);
  mainStore.theme = theme.global.name.value;
}
</script>

<style>
.drawer-link {
  color: inherit;
  text-decoration: none !important;
}

.btn-titlecase {
  text-transform: none;
}

.contact-section a:link {
  color: black;
  background-color: transparent;
  text-decoration: none;
}

.contact-section a:visited {
  color: black;
  background-color: transparent;
  text-decoration: none;
}

.contact-section a:hover {
  color: black;
  background-color: transparent;
  text-decoration: underline;
}

.contact-section a:active {
  color: black;
  background-color: transparent;
  text-decoration: underline;
}
</style>
