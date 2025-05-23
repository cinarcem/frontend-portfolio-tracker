import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menuStore', {
  state: () => ({
    drawer: false,
    group: null,
    items: [
      {
        title: 'Ana Sayfa',
        value: 'portfolio',
        path: '/home',
      },
      {
        title: 'Hakkında',
        value: 'about',
        path: '/about',
      },
    ],
  }),
});
