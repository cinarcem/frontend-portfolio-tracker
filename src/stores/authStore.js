import { defineStore } from 'pinia';
import keycloak from '../keycloak';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    token: null,
    refreshToken: null,
    userName: null,
    firstName: null,
    lastName: null,
    email: null,
  }),
  actions: {
    async login() {
      await keycloak.login();
    },
    async logout() {
      await keycloak.logout();
      this.authenticated = false;
      this.token = null;
      this.userName = null;
      this.firstName = null;
      this.lastName = null;
      this.email = null;
    },
    async refreshToken() {
      try {
        await keycloak.updateToken(-1);
        this.setTokens();
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    },
    async setTokens() {
      this.token = keycloak.token;
      this.refreshToken = keycloak.refreshToken;
      this.authenticated = true;
      this.setKeycloakUserAttr();
    },
    setKeycloakUserAttr() {
      const tokenParsed = keycloak.tokenParsed;
      if (tokenParsed) {
        this.userName = tokenParsed.preferred_username;
        this.firstName = tokenParsed.given_name;
        this.lastName = tokenParsed.family_name;
        this.email = tokenParsed.email;
      }
    },
  },
  getters: {
    getDecodedToken: (state) => {
      if (state.token) {
        try {
          const tokenParts = state.token.split('.');
          const payload = tokenParts[1];
          const decodedPayload = JSON.parse(atob(payload));

          return JSON.stringify(decodedPayload, null, 2);
        } catch (error) {
          console.error('Failed to decode token:', error);
          return null;
        }
      } else {
        return null;
      }
    },
  },
});
