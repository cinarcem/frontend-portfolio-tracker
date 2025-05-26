<template>
  <base-layout>
    <v-container max-width="1370" width="100%" fluid>
      <v-sheet :elevation="8">
        <v-col>
          <v-row class="d-flex mt-6 justify-center">
            <div class="text-h4">Cem Çınar</div>
          </v-row>
          <v-row class="d-flex mt-3 mb-1 justify-center">
            <!-- <div class="opacity-70 text-h5">Java Developer</div> -->
          </v-row>
          <v-row
            class="button-link d-flex mb-6 justify-center align-start"
            no-gutters
          >
            <a class="d-flex" href="mailto:cemcinarhub@gmail.com">
              <v-icon
                class="mt-1 mr-2"
                icon="mdi-email-outline"
                color="light-blue-darken-1"
                size="large"
              ></v-icon>
            </a>
            <div class="text-lowercase text-h6 opacity-70">
              cemcinarhub@gmail.com
            </div>
          </v-row>
          <v-divider
            class="border-opacity-25"
            color="green-lighten-2"
          ></v-divider>
          <v-row class="mx-2 my-4">
            <div class="opacity-90 text-h5">Backend</div>
          </v-row>
          <v-row class="mx-2 my-4">
            <div
              class="text-justify text-body-1 text-sm-h6"
              style="letter-spacing: 0.05em"
            >
              Backend API'si, RESTful olarak hazırlanmıştır. Spring Gateway
              üzerinden yönlendirme ve yük dengeleme, Eureka ile
              mikroservislerin dinamik kaydı ve keşfi, Config Server ile merkezi
              yapılandırma yönetimi sağlar. Yetkilendirme için ise Keycloak
              kullanılarak erişim sunulmaktadır.
            </div>
          </v-row>

          <v-container class="d-flex flex-wrap justify-center">
            <v-row class="justify-center">
              <v-col
                v-for="stack in mainStore.backendTechStacks"
                cols="1"
                class="tech-image d-flex flex-column align-center pa-0 ma-1"
              >
                <v-img
                  class="mt-1"
                  :width="60"
                  :max-height="60"
                  :src="stack.source"
                  :alt="stack.name"
                ></v-img>
                <div class="text-center text-caption opacity-90 my-0">
                  {{ stack.name }}
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-row class="justify-center mx-2 my-4">
            <a
              target="_blank"
              href="https://github.com/cinarcem/backend-portfolio-tracker-app/"
            >
              <v-btn rounded="xl" prepend-icon="mdi-github" :min-width="230">
                <template v-slot:prepend>
                  <v-icon size="x-large"></v-icon>
                </template>
                <span class="text-capitalize text-body-1 text-sm-h6"
                  >Arkayüz Kaynak Kodları</span
                >
              </v-btn>
            </a>
          </v-row>
          <v-row class="button-link justify-center mx-2 my-4">
            <a
              target="_blank"
              href="https://portfolio-tracker-app.up.railway.app/webjars/swagger-ui/index.html"
            >
              <v-btn class="d-flex align-center" rounded="xl" :min-width="230">
                <img
                  src="/img/swagger.png"
                  alt="icon"
                  class="mr-2"
                  style="width: 2.4rem; height: 1.8rem"
                />
                <span class="text-capitalize text-body-1 text-sm-h6"
                  >Swagger İle İncele</span
                >
              </v-btn>
            </a>
          </v-row>

          <v-divider
            class="border-opacity-25"
            color="green-lighten-2"
          ></v-divider>
          <v-row class="mx-2 my-4">
            <div class="opacity-90 text-h5">Frontend</div>
          </v-row>
          <v-row class="mx-2 my-4">
            <div
              class="text-justify text-body-1 text-sm-h6"
              style="letter-spacing: 0.05em"
            >
              Portföy Takip Uygulaması, kullanıcıların hisse senedi
              portföylerini kolayca takip edebilmeleri için tasarlanmış bir
              uygulama örneğidir. Ayrıca, hisse senetleri ve endeksler için özel
              takip listeleri oluşturma imkanı sunarak kullanıcıların ilgi
              alanlarını pratik bir şekilde izlemelerine olanak tanır.
            </div>
          </v-row>

          <v-container class="d-flex flex-wrap justify-center">
            <v-row class="justify-center">
              <v-col
                v-for="stack in mainStore.frontendTechStacks"
                cols="1"
                class="tech-image d-flex flex-column align-center pa-0 ma-1"
              >
                <v-img
                  class="mt-1"
                  :width="60"
                  :max-height="60"
                  :src="stack.source"
                  :alt="stack.name"
                ></v-img>
                <div class="text-center text-caption opacity-90 my-0">
                  {{ stack.name }}
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-row class="justify-center mx-2 my-4">
            <a
              target="_blank"
              href="https://github.com/cinarcem/frontend-portfolio-tracker"
            >
              <v-btn rounded="xl" prepend-icon="mdi-github" :min-width="230">
                <template v-slot:prepend>
                  <v-icon size="x-large"></v-icon>
                </template>
                <span class="text-capitalize text-body-1 text-sm-h6"
                  >Önyüz Kaynak Kodları</span
                >
              </v-btn>
            </a>
          </v-row>
          <v-divider
            class="border-opacity-25"
            color="green-lighten-2"
          ></v-divider>
          <v-row class="mx-2 my-4">
            <div class="opacity-90 text-h5">Mimari</div>
          </v-row>

          <v-row class="justify-center mx-2 my-4">
            <img
              v-if="mainStore.theme === 'light'"
              class="architecture aspect-ratio cover"
              src="/img/architecture-light.svg"
            />
            <img
              v-else
              class="architecture aspect-ratio cover"
              src="/img/architecture-dark.svg"
            />
          </v-row>
        </v-col>
      </v-sheet>
    </v-container>
  </base-layout>
</template>
<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue';
import { useMainStore } from '../stores/MainStore';
const mainStore = useMainStore();
</script>

<style>
.architecture {
  min-width: 300px;
  max-width: 640px;
}

.tech-image {
  max-height: 120px;
  min-width: 40px;
}

.button-link a:link {
  color: black;
  background-color: transparent;
  text-decoration: none;
}

.button-link a:visited {
  color: black;
  background-color: transparent;
  text-decoration: none;
}

.button-link a:hover {
  color: black;
  background-color: transparent;
  text-decoration: none;
}

.button-link a:active {
  color: black;
  background-color: transparent;
  text-decoration: none;
}
</style>
