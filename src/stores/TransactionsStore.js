import { defineStore } from 'pinia';
import {
  API_URL_PORTFOLIO_TRANSACTIONS,
  API_URL_DELETE_STOCK_TRANSACTIONS,
} from '@/configs/config.js';
import { AJAX } from '@/helpers/apiHelper.js';
import { formatNumberToLocal } from '@/helpers/formatNumber.js';
import { convertLocalDate } from '@/helpers/formatLocalDate';
import keycloak from '@/keycloak.js';
import { usePortfolioStore } from '@/stores/PortfolioStore';

export const useTransactionsStore = defineStore('transactionsStore', {
  state: () => ({
    loading: false,
    error: false,
    enableActionsCol: false,
    openDeleteTrxDialog: false,
    openDeleteStockDialog: false,
    snackbar: false,
    snackbarText: '',
    snackbarTimeout: 3000,
    snackbarColor: '',
    trxIdToBeDeleted: '',
    stockSymbolToBeDeleted: '',
    sortBy: 'stockSymbol',
    isDescending: true,
    itemsPerPage: 5,
    totalElements: 0,
    pageNumber: 0,
    headers: [
      {
        title: 'Id',
        align: 'start d-none',
        key: 'id',
      },
      { title: 'Tarih', key: 'date', align: 'start' },
      {
        title: 'Sembol',
        align: 'start',
        key: 'stockSymbol',
      },
      { title: 'Adet', key: 'quantity', align: 'end' },
      { title: 'Fiyat', key: 'price', align: 'end' },
      { title: 'Sil', key: 'actions', align: 'center', sortable: false },
    ],
    transactions: {
      rows: [],
    },
  }),
  actions: {
    reloadTransactions({ page, itemsPerPage, sortBy }) {
      if (sortBy.length > 0) {
        this.sortBy = sortBy[0].key;
        sortBy[0].order == 'desc'
          ? (this.isDescending = true)
          : (this.isDescending = false);
      }
      this.pageNumber = itemsPerPage == -1 ? -1 : page;
      this.itemsPerPage = itemsPerPage;
      if (keycloak.authenticated) {
        this.getUserTransactions();
      } else {
        this.transactions.rows = [];
      }
    },
    async getUserTransactions() {
      this.loading = true;
      this.error = false;

      try {
        let transactions = [];
        let res, data;
        let transaction;
        if (keycloak.authenticated) {
          const queryParams = new URLSearchParams({
            page: this.pageNumber - 1,
            size: this.itemsPerPage,
            sortBy: this.sortBy,
            descending: this.isDescending,
          });

          const urlWithParams = `${API_URL_PORTFOLIO_TRANSACTIONS}?${queryParams.toString()}`;

          ({ res, data } = await AJAX(
            'GET',
            urlWithParams,
            undefined,
            keycloak.token
          ));

          if (res.ok && data != null) {
            this.transactions.rows = [];
            this.itemsLength = data.data.size;
            this.totalElements = data.data.totalElements;
            Object.entries(data.data.content).forEach(([key, value]) => {
              transaction = {
                id: value['id'],
                date: convertLocalDate(value['date']),
                stockSymbol: value['stockSymbol'],
                quantity: formatNumberToLocal(value['quantity'], 2, 2),
                price: formatNumberToLocal(value['price'], 2, 2),
              };
              transactions.push(transaction);
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

        this.transactions.rows = [];
        this.transactions.rows = transactions;
      } catch (err) {
        this.error = true;
        console.error(err);
        this.transactions.rows = [];
        this.loading = false;
      }
    },
    async deleteTransaction() {
      try {
        const portfolioStore = usePortfolioStore();
        let res, data;
        if (keycloak.authenticated) {
          const uri =
            API_URL_PORTFOLIO_TRANSACTIONS + '/' + this.trxIdToBeDeleted;

          ({ res, data } = await AJAX(
            'DELETE',
            uri,
            undefined,
            keycloak.token
          ));
          console.log(res.status);

          if (res.status == 204) {
            this.snackbarColor = 'success';
            this.snackbar = true;
            this.snackbarText = 'İşlem silindi.';
            this.trxIdToBeDeleted = '';
            this.openDeleteTrxDialog = false;
            this.getUserTransactions();
            portfolioStore.getUserPortfolio();
            return true;
          } else {
            this.snackbarColor = 'error';
            this.snackbar = true;
            this.snackbarText = 'HATA! - İşlem silinemedi.';
            this.trxIdToBeDeleted = '';
            this.openDeleteTrxDialog = false;
            return false;
          }
        }
      } catch (e) {
        console.error(e);
        this.snackbarColor = 'error';
        this.snackbar = true;
        this.snackbarText = 'HATA! - İşlem silinemedi.';
        this.trxIdToBeDeleted = '';
        this.openDeleteTrxDialog = false;
        return false;
      }
    },
    async deleteAllStockTransactions() {
      try {
        const portfolioStore = usePortfolioStore();
        let res, data;
        if (keycloak.authenticated) {
          const uri =
            API_URL_DELETE_STOCK_TRANSACTIONS +
            '/' +
            this.stockSymbolToBeDeleted +
            '/transactions';

          ({ res, data } = await AJAX(
            'DELETE',
            uri,
            undefined,
            keycloak.token
          ));
          console.log(res.status);

          if (res.status == 204) {
            this.snackbarColor = 'success';
            this.snackbar = true;
            this.snackbarText =
              this.stockSymbolToBeDeleted + ' hissesinin işlemleri silindi.';
            this.openDeleteStockDialog = false;
            this.stockSymbolToBeDeleted = '';
            this.getUserTransactions();
            portfolioStore.getUserPortfolio();
            return true;
          } else {
            this.snackbarColor = 'error';
            this.snackbar = true;
            this.snackbarText =
              'HATA! - ' +
              this.stockSymbolToBeDeleted +
              ' hissesinin işlemleri silinirken hata alındı.';
            this.openDeleteStockDialog = false;
            this.stockSymbolToBeDeleted = '';
            return false;
          }
        }
      } catch (e) {
        console.error(e);
        this.snackbarColor = 'error';
        this.snackbar = true;
        this.snackbarText =
          'HATA! - ' +
          this.stockSymbolToBeDeleted +
          ' hissesinin işlemleri silinirken hata alındı.';
        this.openDeleteStockDialog = false;
        this.stockSymbolToBeDeleted = '';
        return false;
      }
    },
    toggleActionsCol(id) {
      this.enableActionsCol = !this.enableActionsCol;
    },
    closeActionsCol(id) {
      this.enableActionsCol = false;
    },
    toggleDeleteTrxDialog(trxIdToBeDeleted) {
      this.trxIdToBeDeleted = trxIdToBeDeleted;
      this.openDeleteTrxDialog = !this.openDeleteTrxDialog;
    },
    toggleDeleteStockDialog(stockSymbolToBeDeleted) {
      this.stockSymbolToBeDeleted = stockSymbolToBeDeleted;
      this.openDeleteStockDialog = !this.openDeleteStockDialog;
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
    isTransactionsEmpty(state) {
      return state.transactions.rows.length == 0;
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
        ? 'İşleminiz bulunmamaktadır.'
        : 'İşlemlerinizi görmek için giriş yapınız...';
    },
  },
});
