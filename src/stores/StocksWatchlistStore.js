import { defineStore } from 'pinia';
import router from '@/router';
import {
  API_URL_STOCKS_WATHCLIST,
  API_URL_SAMPLE_STOCKS,
} from '../configs/config.js';
import { AJAX } from '@/helpers/apiHelper.js';
import { formatNumberToLocal } from '@/helpers/formatNumber.js';
import keycloak from '@/keycloak.js';

export const useStocksWatchlistStore = defineStore('stocksWatchlistStore', {
  state: () => ({
    loading: false,
    error: false,
    enableActionsCol: false,
    openStocksDialog: false,
    openDeleteStockDialog: false,
    stockToBeDeleted: '',
    snackbar: false,
    snackbarText: '',
    snackbarTimeout: 3000,
    snackbarColor: '',
    sortBy: 'stockSymbol',
    isDescending: true,
    itemsPerPage: 5,
    totalElements: 0,
    pageNumber: 0,
    headers: [
      {
        title: 'Sembol',
        align: 'start',
        key: 'stockSymbol',
      },
      { title: 'Son', key: 'latestValue', align: 'end' },
      {
        title: '% Değişim',
        key: 'dailyChangePct',
        align: 'end',
      },
      { title: 'Sil', key: 'actions', sortable: false },
    ],
    stocks: {
      rows: [],
      /* rows: [
        {
          "stockSymbol": "PGSUS",
          "latestValue": 222.9,
          "dailyChangePct": -2.19
        },
        {
          "stockSymbol": "SASA",
          "latestValue": 4.23,
          "dailyChangePct": 2.42
        }
      ], */
    },
  }),
  actions: {
    reloadWatchlist({ page, itemsPerPage, sortBy }) {
      if (sortBy.length > 0) {
        this.sortBy = sortBy[0].key;
        sortBy[0].order == 'desc'
          ? (this.isDescending = true)
          : (this.isDescending = false);
      }
      this.pageNumber = itemsPerPage == -1 ? -1 : page;
      this.itemsPerPage = itemsPerPage;
      keycloak.authenticated
        ? this.getUserWatchlist()
        : this.getSampleWatchlist();
    },
    async getUserWatchlist() {
      this.loading = true;
      this.error = false;

      try {
        let stocks = [];
        let res, data;

        const queryParams = new URLSearchParams({
          page: this.pageNumber - 1,
          size: this.itemsPerPage,
          sortBy: this.sortBy,
          descending: this.isDescending,
        });

        const urlWithParams = `${API_URL_STOCKS_WATHCLIST}?${queryParams.toString()}`;

        ({ res, data } = await AJAX(
          'GET',
          urlWithParams,
          undefined,
          keycloak.token
        ));

        if (res.ok && data !== null) {
          this.itemsLength = data.data.size;
          this.totalElements = data.data.totalElements;

          Object.entries(data.data.content).forEach(([key, value]) => {
            let stock = {
              stockSymbol: value['stockSymbol'],
              latestValue: formatNumberToLocal(value['latestValue'], 0, 2),
              dailyChangePct: formatNumberToLocal(
                value['dailyChangePct'],
                2,
                2
              ),
            };
            stocks.push(stock);
          });
          this.stocks.rows = [];
          this.stocks.rows = stocks;
          this.loading = false;
        } else if (res.status == 204) {
          this.stocks.rows = [];
          this.itemsLength = 0;
          this.totalElements = 0;
          this.loading = false;
        } else if (res.status == 401) {
          this.stocks.rows = [];
          this.itemsLength = 0;
          this.totalElements = 0;
          this.loading = false;
        } else {
          this.stocks.rows = [];
          this.loading = false;
          this.error = true;
        }
      } catch (err) {
        this.error = true;
        console.error(err);
        this.stocks.rows = [];
        this.loading = false;
      }
    },
    async getSampleWatchlist() {
      this.loading = true;
      this.error = false;

      try {
        let stocks = [];
        let res, data;

        const queryParams = new URLSearchParams({
          page: this.pageNumber - 1,
          size: this.itemsPerPage,
          sortBy: this.sortBy,
          descending: this.isDescending,
        });

        const urlWithParams = `${API_URL_SAMPLE_STOCKS}?${queryParams.toString()}`;

        ({ res, data } = await AJAX('GET', urlWithParams));

        if (res.ok && data !== null) {
          this.itemsLength = data.data.size;
          this.totalElements = data.data.totalElements;

          Object.entries(data.data.content).forEach(([key, value]) => {
            let stock = {
              stockSymbol: value['stockSymbol'],
              latestValue: formatNumberToLocal(value['latestValue'], 2, 2),
              dailyChangePct: formatNumberToLocal(
                value['dailyChangePct'],
                2,
                2
              ),
            };
            stocks.push(stock);
          });
          this.stocks.rows = [];
          this.stocks.rows = stocks;
          this.loading = false;
        } else if (res.status == 204) {
          this.stocks.rows = [];
          this.itemsLength = 0;
          this.totalElements = 0;
          this.loading = false;
        } else {
          this.stocks.rows = [];
          this.loading = false;
          this.error = true;
        }
      } catch (err) {
        this.error = true;
        console.error(err);
        this.stocks.rows = [];
        this.loading = false;
      }
    },
    async addStockToWatchlist(stockSymbol) {
      try {
        let res, data;

        if (keycloak.authenticated) {
          ({ res, data } = await AJAX(
            'POST',
            API_URL_STOCKS_WATHCLIST + '?symbols=' + stockSymbol,
            undefined,
            keycloak.token
          ));
        }

        if (res.ok) {
          this.snackbarColor = 'success';
          this.snackbar = true;
          this.snackbarText = 'Hisse takip listesine eklendi.';
          this.getUserWatchlist();
          return true;
        } else {
          console.error('Stock symbol can not be added to watchlist.');
          this.snackbarColor = 'error';
          this.snackbar = true;
          this.snackbarText = 'HATA! - Hisse takip listesine eklenemedi.';
          return false;
        }
      } catch (e) {
        console.error(e);
        this.snackbarColor = 'error';
        this.snackbar = true;
        this.snackbarText = 'HATA! - Hisse takip listesine eklenemedi.';
        return false;
      }
    },
    async deleteStockFromWatchlist(stockSymbol) {
      try {
        let res, data;

        this.stockToBeDeleted = stockSymbol;

        if (keycloak.authenticated) {
          this.openDeleteStocksDialog = false;
          ({ res, data } = await AJAX(
            'DELETE',
            API_URL_STOCKS_WATHCLIST + '?symbols=' + this.stockToBeDeleted,
            undefined,
            keycloak.token
          ));
        }

        if (res.ok) {
          this.snackbarColor = 'success';
          this.snackbar = true;
          this.snackbarText =
            this.stockToBeDeleted + '  hissesi takip listesinden silindi.';
          this.stockToBeDeleted = '';
          this.getUserWatchlist();
          return true;
        } else {
          console.error('Stock can not be deleted from watchlist.');
          this.snackbarColor = 'error';
          this.snackbar = true;
          this.snackbarText =
            'HATA! -' +
            this.stockToBeDeleted +
            ' hissesi takip listesinden silinemedi.';
          this.stockToBeDeleted = '';
          return false;
        }
      } catch (e) {
        console.error(e);
        this.snackbarColor = 'error';
        this.snackbar = true;
        this.snackbarText =
          'HATA! - +' +
          this.stockToBeDeleted +
          ' hissesi takip listesinden silinemedi.';
        this.stockToBeDeleted = '';
        return false;
      }
    },
    toggleActionsCol() {
      this.enableActionsCol = !this.enableActionsCol;
    },
    toggleDeleteExchangeDialog(stockToBeDeleted) {
      this.stockToBeDeleted = stockToBeDeleted;
      this.openDeleteStocksDialog = !this.openDeleteStocksDialog;
    },
    toggleStocksDialog() {
      this.openStocksDialog = !this.openStocksDialog;
      this.snackbar = false;
    },
    getChipColor(dailyChangePct) {
      const dotsRemoved = dailyChangePct.replace(/\./g, '');
      const formattedValue = dotsRemoved.replace(',', '.');
      if (formattedValue > 0) return 'success';
      else if (formattedValue < 0) return 'error';
      else return '#78909C';
    },
  },
  getters: {
    isWatchlistEmpty(state) {
      return state.stocks.rows.length == 0;
    },
    filteredHeaders(state) {
      return state.enableActionsCol
        ? state.headers
        : state.headers.filter((header) => header.key !== 'actions');
    },
    tableNoDataText(state) {
      if (state.loading) {
        return 'Yükleniyor...';
      }
      return keycloak.authenticated
        ? 'Takip edilen hisse bulunmamaktadır.'
        : 'Takip listenizi görmek için giriş yapınız';
    },
  },
});
