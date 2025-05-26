import { defineStore } from 'pinia';
import {
  API_URL_USER_PORTFOLIO,
  API_URL_PORTFOLIO_ADD_TRANSACTION,
} from '../configs/config.js';
import { AJAX } from '@/helpers/apiHelper.js';
import { formatNumberToLocal } from '@/helpers/formatNumber.js';
import keycloak from '@/keycloak.js';

export const usePortfolioStore = defineStore('portfolioStore', {
  state: () => ({
    loading: false,
    error: false,
    openStocksDialog: false,
    enableActionsCol: false,
    limitHeight: true,
    snackbar: false,
    snackbarText: '',
    snackbarTimeout: 3000,
    snackbarColor: '',
    noTableDataText: '',
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
      { title: 'Son', key: 'latestPrice', align: 'end' },
      {
        title: '% Değişim',
        key: 'dailyChangePct',
        align: 'end',
      },
      {
        title: 'Değişim TL',
        key: 'dailyChangeInTL',
        align: 'end',
      },
      {
        title: 'Ort. Maliyet',
        key: 'averageCost',
        align: 'end',
      },
      {
        title: '% Kar/Zarar',
        key: 'profitLossPct',
        align: 'end',
      },
      {
        title: 'Kar/Zarar TL',
        key: 'profitLossInTL',
        align: 'end',
      },
      { title: 'Adet', key: 'quantity', align: 'end' },
      {
        title: 'Sil',
        key: 'actions',
        align: 'center',
        sortable: false,
      },
    ],
    portfolio: {
      rows: [],
    },
  }),
  actions: {
    reloadPortfolio({ page, itemsPerPage, sortBy }) {
      if (sortBy.length > 0) {
        this.sortBy = sortBy[0].key;
        sortBy[0].order == 'desc'
          ? (this.isDescending = true)
          : (this.isDescending = false);
      }
      this.pageNumber = itemsPerPage == -1 ? -1 : page;
      this.itemsPerPage = itemsPerPage;
      if (keycloak.authenticated) {
        this.getUserPortfolio();
      } else {
        this.portfolio.rows = [];
      }
    },
    async getUserPortfolio() {
      this.loading = true;
      this.error = false;

      try {
        let portfolio = [];
        let res, data;
        let stock;

        const queryParams = new URLSearchParams({
          page: this.pageNumber - 1,
          size: this.itemsPerPage,
          sortBy: this.sortBy,
          descending: this.isDescending,
        });

        const urlWithParams = `${API_URL_USER_PORTFOLIO}?${queryParams.toString()}`;

        if (keycloak.authenticated) {
          ({ res, data } = await AJAX(
            'GET',
            urlWithParams,
            undefined,
            keycloak.token
          ));

          if (res.ok && data != null) {
            this.portfolio.rows = [];
            this.itemsLength = data.data.size;
            this.totalElements = data.data.totalElements;
            Object.entries(data.data.content).forEach(([key, value]) => {
              let stock = {
                stockSymbol: value['stockSymbol'],
                latestPrice: formatNumberToLocal(value['latestPrice'], 2, 2),
                dailyChangePct: formatNumberToLocal(
                  value['dailyChangePct'],
                  2,
                  2
                ),
                dailyChangeInTL: formatNumberToLocal(
                  value['dailyChangeInTL'],
                  2,
                  2
                ),
                averageCost: formatNumberToLocal(value['averageCost'], 2, 2),
                profitLossPct: formatNumberToLocal(
                  value['profitLossPct'],
                  2,
                  2
                ),
                profitLossInTL: formatNumberToLocal(
                  value['profitLossInTL'],
                  2,
                  2
                ),
                quantity: formatNumberToLocal(value['quantity'], 0, 2),
              };
              portfolio.push(stock);
            });

            this.loading = false;
          } else if (res.status == 204) {
            this.loading = false;
          } else {
            this.loading = false;
            this.error = true;
          }
        } else {
          this.loading = false;
        }
        this.portfolio.rows = [];
        this.portfolio.rows = portfolio;
      } catch (err) {
        this.error = true;
        console.error(err);
        this.portfolio.rows = [];
        this.loading = false;
      }
    },
    async addStock(stockSymbol, price, quantity, date) {
      try {
        let res, data;
        const uploadData = {
          date: date,
          stockSymbol: stockSymbol,
          quantity: this.convertNumberFormat(quantity),
          price: this.convertNumberFormat(price),
        };

        if (keycloak.authenticated) {
          ({ res, data } = await AJAX(
            'POST',
            API_URL_PORTFOLIO_ADD_TRANSACTION,
            uploadData,
            keycloak.token
          ));

          if (res.status == 201) {
            this.snackbarColor = 'success';
            this.snackbar = true;
            this.snackbarText = 'Hisse portföye eklendi.';
            this.getUserPortfolio();
            return true;
          } else {
            console.error('Stock can not be added to portfolio.');
            this.snackbarColor = 'error';
            this.snackbar = true;
            this.snackbarText = 'HATA! - Hisse portföye eklenemedi.';
            return false;
          }
        }
      } catch (e) {
        console.error(e);
        this.snackbarColor = 'error';
        this.snackbar = true;
        this.snackbarText = 'HATA! - Hisse portföye eklenemedi.';
        return false;
      }
    },
    convertNumberFormat(value) {
      if (typeof value !== 'string') {
        value = value.toString();
      }
      const dotsRemoved = value.replace(/\./g, '');
      const formattedValue = dotsRemoved.replace(',', '.');
      return parseFloat(formattedValue);
    },
    toggleActionsCol() {
      this.enableActionsCol = !this.enableActionsCol;
    },
    closeActionsCol() {
      this.enableActionsCol = false;
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
    isPortfolioEmpty(state) {
      return state.portfolio.rows.length == 0;
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
        ? 'Portföyünüzde hisse bulunmamaktadır.'
        : 'Portföyünüzü görmek için giriş yapınız...';
    },
  },
});
