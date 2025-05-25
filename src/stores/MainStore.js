import { defineStore } from 'pinia';
import { AJAX } from '@/helpers/apiHelper.js';
import {
  API_URL_ALL_STOCK_SYMBOLS,
  API_URL_ALL_INDEX_SYMBOLS,
} from '@/configs/config.js';
import keycloak from '@/keycloak';

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    theme: '',
    stockSymbols: [],
    indexSymbols: [],
    footerIcons: [
      {
        symbol: 'mdi-github',
        link: 'https://github.com/cinarcem?tab=repositories',
      },
      { symbol: 'mdi-email-outline', link: 'mailto:cemcinarhub@gmail.com' },
    ],
    frontendTechStacks: [
      {
        name: 'Vue.js',
        source: '/img/vue-js.svg',
      },
      {
        name: 'Vuetify',
        source: '/img/vuetify.svg',
      },
      {
        name: 'JavaScript',
        source: '/img/js.png',
      },
      {
        name: 'Pinia',
        source: '/img/pinia.png',
      },
      {
        name: 'Html',
        source: '/img/html.png',
      },
      {
        name: 'Css',
        source: '/img/css.png',
      },
    ],
    backendTechStacks: [
      {
        name: 'Java',
        source: '/img/java.png',
      },
      {
        name: 'Spring Boot',
        source: '/img/spring-boot.svg',
      },
      {
        name: 'Spring Gateway',
        source: '/img/spring-gateway.png',
      },
      {
        name: 'Eureka Discovery',
        source: '/img/eureka.webp',
      },
      {
        name: 'Config Server',
        source: '/img/config-server.webp',
      },
      {
        name: 'PostgreSQL',
        source: '/img/PostgreSQL.svg',
      },
      {
        name: 'Keycloak',
        source: '/img/keycloak.svg',
      },
      {
        name: 'Docker',
        source: '/img/docker.webp',
      },
      {
        name: 'Swagger',
        source: '/img/swagger.svg',
      },
      {
        name: 'Restful',
        source: '/img/restful.png',
      },
    ],
  }),
  actions: {
    toggleTheme() {
      theme.global.name = theme.global.name === 'dark' ? 'light' : 'dark';
    },
    async getStockSymbols() {
      try {
        let res, data;
        let stockSymbols = [];

        ({ res, data } = await AJAX(
          'GET',
          API_URL_ALL_STOCK_SYMBOLS,
          undefined,
          keycloak.token
        ));

        if (res.ok) {
          this.stockSymbols = [];

          data.data.forEach(function (s, index) {
            stockSymbols.push(s);
          });

          this.stockSymbols = stockSymbols.sort();
        } else {
          console.warn('Stock Symbols for add stock couldnt be loaded.');
        }
      } catch (e) {
        console.warn(
          'Error occured. Stock Symbols for add stock couldnt be loaded.'
        );
        console.error(err);
      }
    },
    async getIndexSymbols() {
      try {
        let res, data;
        let indexSymbols = [];

        ({ res, data } = await AJAX(
          'GET',
          API_URL_ALL_INDEX_SYMBOLS,
          undefined,
          keycloak.token
        ));

        if (res.ok) {
          this.indexSymbols = [];

          Object.entries(data.data).forEach(([key, value]) => {
            indexSymbols.push(key);
          });

          this.indexSymbols = indexSymbols.sort();
        } else {
          console.warn('Index Symbols for add stock couldnt be loaded.');
        }
      } catch (e) {
        console.warn(
          'Error occured. Index Symbols for add stock couldnt be loaded.'
        );
        console.error(err);
      }
    },
  },
  getters: {
    layoutColor: (state) => {
      return state.theme === 'dark' ? 'grey-darken-3' : 'white';
    },
  },
});
