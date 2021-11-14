import { createStore, Store } from 'vuex';
import { ICartItem } from '@/models/cartItem';

interface State {
  cart: {
    items: ICartItem[]
  },
  isAuthenticated: boolean,
  token: string,
  isLoading: boolean,
}


export default createStore<State>({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false,
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('cart')){
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        state.cart = JSON.parse(localStorage.getItem('cart')!);
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
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
    }
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