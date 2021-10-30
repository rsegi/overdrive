import { createStore } from 'vuex';
import { Product } from "@/models/product";

export interface State {
  cart: {
    items: Product[]
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
      const existingItems = state.cart.items.filter(i => i.id === item.product.id)
      if (existingItems.length) {
        existingItems[0].quantity = existingItems[0].quantity + parseInt(item.quantity)
      } else {
        state.cart.items.push(item)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
