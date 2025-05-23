import { defineStore } from 'pinia';
import {
  API_URL_INDEXES_WATHCLIST,
  API_URL_SAMPLE_INDEXES,
} from '../configs/config.js';
import { AJAX } from '../helpers/apiHelper.js';
import { formatNumberToLocal } from '@/helpers/formatNumber.js';
import keycloak from '@/keycloak.js';

export const useIndexesWatchlistStore = defineStore('indexesWatchlistStore', {
  state: () => ({
    loading: false,
    error: false,
    enableActionsCol: false,
    openIndexesDialog: false,
    openDeleteIndexDialog: false,
    indexToBeDeleted: '',
    snackbar: false,
    snackbarText: '',
    snackbarTimeout: 3000,
    snackbarColor: '',
    sortBy: 'indexSymbol',
    isDescending: true,
    itemsPerPage: 5,
    totalElements: 0,
    pageNumber: 0,
    headers: [
      {
        title: 'Sembol',
        align: 'start',
        key: 'indexSymbol',
      },
      { title: 'Son', key: 'latestValue', align: 'end' },
      { title: '% Değişim', key: 'dailyChangePct', align: 'end' },
      { title: 'Sil', key: 'actions', sortable: false },
    ],
    indexes: {
      rows: [],
      /* rows: [
        {
          indexSymbol: 'XU050',
          latestValue: 7.933,
          pctChange: 0.36,
        },
        {
          indexSymbol: 'XU030',
          latestValue: 9.911,
          pctChange: 0.35,
        },
      ], */
    },
  }),
  actions: {
    async addIndexToWatchlist(indexSymbol) {
      try {
        let res, data;

        if (keycloak.authenticated) {
          ({ res, data } = await AJAX(
            'POST',
            API_URL_INDEXES_WATHCLIST + '?symbols=' + indexSymbol,
            undefined,
            keycloak.token
          ));
        }

        if (res.ok) {
          this.snackbarColor = 'success';
          this.snackbar = true;
          this.snackbarText = 'Endeks takip listesine eklendi.';
          this.getUserWatchlist();
          return true;
        } else {
          console.error('Index can not be added to watchlist.');
          this.snackbarColor = 'error';
          this.snackbar = true;
          this.snackbarText = 'HATA! - Endeks takip listesine eklenemedi.';
          return false;
        }
      } catch (e) {
        console.error(e);
        this.snackbarColor = 'error';
        this.snackbar = true;
        this.snackbarText = 'HATA! - Endeks takip listesine eklenemedi.';
        return false;
      }
    },
    async deleteIndexFromWatchlist(indexSymbol) {
      try {
        let res, data;
        this.indexToBeDeleted = indexSymbol;
        if (keycloak.authenticated) {
          this.openDeleteIndexDialog = false;
          ({ res, data } = await AJAX(
            'DELETE',
            API_URL_INDEXES_WATHCLIST + '?symbols=' + this.indexToBeDeleted,
            undefined,
            keycloak.token
          ));
        }

        if (res.ok) {
          this.snackbarColor = 'success';
          this.snackbar = true;
          this.snackbarText =
            this.indexToBeDeleted + ' endeksi takip listesinden silindi.';
          this.indexToBeDeleted = '';
          this.getUserWatchlist();
          return true;
        } else {
          console.error('Index can not be deleted from watchlist.');
          this.snackbarColor = 'error';
          this.snackbar = true;
          this.snackbarText =
            'HATA! -' +
            this.indexToBeDeleted +
            ' endeks takip listesinden silinemedi.';
          this.indexToBeDeleted = '';
          return false;
        }
      } catch (e) {
        console.error(e);
        this.snackbarColor = 'error';
        this.snackbar = true;
        this.snackbarText =
          'HATA! - +' +
          this.indexToBeDeleted +
          ' endeks takip listesinden silinemedi.';
        this.indexToBeDeleted = '';
        return false;
      }
    },
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
        let indexes = [];
        let res, data;

        const queryParams = new URLSearchParams({
          page: this.pageNumber - 1,
          size: this.itemsPerPage,
          sortBy: this.sortBy,
          descending: this.isDescending,
        });

        const urlWithParams = `${API_URL_INDEXES_WATHCLIST}?${queryParams.toString()}`;

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
            let index = {
              indexSymbol: value['indexSymbol'],
              latestValue: formatNumberToLocal(value['latestValue'], 0, 2),
              dailyChangePct: formatNumberToLocal(
                value['dailyChangePct'],
                2,
                2
              ),
            };
            indexes.push(index);
          });
          this.indexes.rows = [];
          this.indexes.rows = indexes;
          this.loading = false;
        } else if (res.status == 204) {
          this.indexes.rows = [];
          this.itemsLength = 0;
          this.totalElements = 0;
          this.loading = false;
        } else {
          this.indexes.rows = [];
          this.loading = false;
          this.error = true;
        }
      } catch (err) {
        this.error = true;
        console.error(err);
        this.indexes.rows = [];
        this.loading = false;
      }
    },
    async getSampleWatchlist() {
      this.loading = true;
      this.error = false;

      try {
        let indexes = [];
        let res, data;

        const queryParams = new URLSearchParams({
          page: this.pageNumber - 1,
          size: this.itemsPerPage,
          sortBy: this.sortBy,
          descending: this.isDescending,
        });

        const urlWithParams = `${API_URL_SAMPLE_INDEXES}?${queryParams.toString()}`;

        ({ res, data } = await AJAX('GET', urlWithParams));

        if (res.ok && data !== null) {
          this.itemsLength = data.data.size;
          this.totalElements = data.data.totalElements;

          Object.entries(data.data.content).forEach(([key, value]) => {
            let index = {
              indexSymbol: value['indexSymbol'],
              latestValue: formatNumberToLocal(value['latestValue'], 0, 2),
              dailyChangePct: formatNumberToLocal(
                value['dailyChangePct'],
                2,
                2
              ),
            };
            indexes.push(index);
          });
          this.indexes.rows = [];
          this.indexes.rows = indexes;
          this.loading = false;
        } else if (res.status == 204) {
          this.indexes.rows = [];
          this.itemsLength = 0;
          this.totalElements = 0;
          this.loading = false;
        } else {
          this.indexes.rows = [];
          this.loading = false;
          this.error = true;
        }
      } catch (err) {
        this.error = true;
        console.error(err);
        this.indexes.rows = [];
        this.loading = false;
      }
    },
    toggleActionsCol(id) {
      this.enableActionsCol = !this.enableActionsCol;
    },
    closeActionsCol(id) {
      this.enableActionsCol = false;
    },
    toggleIndexesDialog() {
      this.openIndexesDialog = !this.openIndexesDialog;
      this.snackbar = false;
    },
    toggleDeleteIndexDialog(indexToBeDeleted) {
      this.indexToBeDeleted = indexToBeDeleted;
      this.openDeleteIndexDialog = !this.openDeleteIndexDialog;
    },
    getChipColor(dailyChangePct) {
      const formattedValue = dailyChangePct.replace(',', '.');
      if (formattedValue > 0) return 'success';
      else if (formattedValue < 0) return 'error';
      else return 'black';
    },
  },
  getters: {
    isWatchlistEmpty(state) {
      return state.indexes.rows.length == 0;
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
        ? 'Takip edilen endeks bulunmamaktadır.'
        : 'Takip listenizi görmek için giriş yapınız';
    },
  },
});
