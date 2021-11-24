/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createStore, Store } from "vuex";
import { ICartItem } from "@/models/cartItem";

interface State {
  cart: {
    items: ICartItem[];
  };
  isAuthenticated: boolean;
  isLoading: boolean;
  user_id: string;
}

export default createStore<State>({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    isLoading: false,
    user_id: "",
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("cart")) {
        state.cart = JSON.parse(localStorage.getItem("cart")!);
      } else {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    addToCart(state, item) {
      const existingItems = state.cart.items.filter(
        (i) => i.product.id === item.product.id
      );
      if (existingItems.length) {
        existingItems[0].quantity =
          existingItems[0].quantity + parseInt(item.quantity);
      } else {
        state.cart.items.push(item);
      }
    },
    setIsLoading(state, status) {
      state.isLoading = status;
    },
    setAuthentication(state, user_id) {
      state.isAuthenticated = true;
      state.user_id = user_id;
    },
    removeAuthentication(state) {
      state.isAuthenticated = false;
      state.user_id = "";
    },
    clearCart(state) {
      state.cart = { items: [] };

      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
  actions: {},
  modules: {},
});

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
