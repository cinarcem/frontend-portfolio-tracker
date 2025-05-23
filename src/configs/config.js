const BASE_URL = 'https://portfolio-tracker-app.up.railway.app';
export const TIMEOUT_SEC = 30;
//PORTFOLIO SERVICE ENDPOINT
export const API_URL_USER_PORTFOLIO = BASE_URL + '/portfolio/api/v1/stocks';
export const API_URL_PORTFOLIO_TRANSACTIONS =
  BASE_URL + '/portfolio/api/v1/transactions';
export const API_URL_PORTFOLIO_ADD_TRANSACTION =
  BASE_URL + '/portfolio/api/v1/transaction';
export const API_URL_DELETE_STOCK_TRANSACTIONS =
  BASE_URL + '/portfolio/api/v1/stocks';
//MARKETDATA SERVICE ENDPOINT
export const API_URL_ALL_STOCK_SYMBOLS =
  BASE_URL + '/market-data/api/v1/stocks/symbols';
export const API_URL_ALL_INDEX_SYMBOLS =
  BASE_URL + '/market-data/api/v1/indexes/symbols';
//WATCHLIST ENDPOINT
export const API_URL_STOCKS_WATHCLIST = BASE_URL + '/watchlist/api/v1/stocks';
export const API_URL_SAMPLE_STOCKS =
  BASE_URL + '/watchlist/api/v1/stocks/sample';
export const API_URL_INDEXES_WATHCLIST = BASE_URL + '/watchlist/api/v1/indexes';
export const API_URL_SAMPLE_INDEXES =
  BASE_URL + '/watchlist/api/v1/indexes/sample';
