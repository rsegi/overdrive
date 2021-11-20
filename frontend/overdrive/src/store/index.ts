/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createStore, Store } from 'vuex';
import { ICartItem } from '@/models/cartItem';

interface State {
  cart: {
    items: ICartItem[]
  },
  isAuthenticated: boolean,
  // token: string,
  isLoading: boolean,
}


export default createStore<State>({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    // token: '',
    isLoading: false,
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('cart')){
        state.cart = JSON.parse(localStorage.getItem('cart')!);
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }

      // if (localStorage.getItem('token')) {
      //   state.token = localStorage.getItem('token')!;
      //   state.isAuthenticated = true;
      // } else {
      //   state.token = '';
      //   state.isAuthenticated = false;
      // }
    },
    addToCart(state, item){
      const existingItems = state.cart.items.filter(i => i.product.id === item.product.id);
      if (existingItems.length) {
        existingItems[0].quantity = existingItems[0].quantity + parseInt(item.quantity);
      } else {
        state.cart.items.push(item);
      }
    },
    setIsLoading(state, status){
      state.isLoading = status;
    },
    // setToken(state, token) {
    //   state.token = token;
    //   state.isAuthenticated = true;
    // },
    // removeToken(state) {
    //   state.token = '';
    //   state.isAuthenticated = false ;
    // },
    setAuthentication(state) {
      state.isAuthenticated = true;
    },
    removeAuthentication(state) {
      state.isAuthenticated = false ;
    },
  },
  actions: {
  },
  modules: {
  }
})


declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}