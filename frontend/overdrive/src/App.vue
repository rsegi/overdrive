<template>
  <div>
    <nav class="navbar pl-5 pr-5">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item is-size-3 brand-name">
          Overdrive
        </router-link>

        <a
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-menu"
          @click="showMobileMenu = !showMobileMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        class="navbar-menu"
        id="navbar-menu"
        v-bind:class="{ 'is-active': showMobileMenu }"
      >
        <div class="navbar-end">
          <template v-if="$store.state.isAuthenticated">
            <div class="navbar-item">
              <router-link to="/my-account" exact-active-class="exact-active">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <path
                    d="M16 29a21 21 0 01-6.4-.9c-2.8-1-3.4-2.4-3.4-3.4 0-5 4.4-9.1 9.8-9.1s9.8 4 9.8 9c0 3.3-5.3 4.4-9.8 4.4zm0-11.4c-4.3 0-7.8 3.2-7.8 7 0 1.2 3.2 2.4 7.8 2.4s7.8-1.2 7.8-2.3c0-4-3.5-7.1-7.8-7.1zm0-3.8a5.4 5.4 0 115.5-5.4 5.4 5.4 0 01-5.4 5.4zM16 5a3.4 3.4 0 103.5 3.4A3.4 3.4 0 0016 5z"
                  ></path>
                </svg>
              </router-link>
            </div>

            <div class="navbar-item">
              <router-link to="/cart">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <path
                    d="M27.3 18.8H11.2l-.8-3.6h17a1 1 0 001-.9l1-6.8a1 1 0 00-1-1.1h-20L8 3.8A1 1 0 007 3H3.7a1 1 0 000 2H6l3.3 15a1 1 0 001 .8h17a1 1 0 000-2zm0-10.4l-.8 4.7H9.9L9 8.4zm-3.4 20.4a2.7 2.7 0 112.7-2.8 2.7 2.7 0 01-2.7 2.8zm0-4A1.2 1.2 0 1025 26a1.2 1.2 0 00-1.2-1.2zm-10.8 4a2.7 2.7 0 112.7-2.8 2.7 2.7 0 01-2.7 2.8zm0-4a1.2 1.2 0 101.2 1.2 1.2 1.2 0 00-1.2-1.2z"
                  ></path>
                </svg>
              </router-link>
            </div>
          </template>

          <template v-else>
            <div class="navbar-item">
              <router-link to="/log-in" exact-active-class="exact-active">
                <svg
                  width="40"
                  height="40"
                  viewBox="-5 -3 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMinYMin"
                  class="jam jam-log-in"
                >
                  <path
                    d="M6.641 9.828H1a1 1 0 1 1 0-2h5.641l-1.12-1.12a1 1 0 0 1 1.413-1.415L9.763 8.12a.997.997 0 0 1 0 1.415l-2.829 2.828A1 1 0 0 1 5.52 10.95l1.121-1.122zM13 0a1 1 0 0 1 1 1v16a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1z"
                  />
                </svg>
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </nav>

    <div
      class="is-loading-bar has-text-centered"
      v-bind:class="{ 'is-loading': $store.state.isLoading }"
    >
      <div class="lds-dual-ring"></div>
    </div>

    <router-view />

    <footer class="footer">
      <p class="has-text-centered">© 2021 Overdrive</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ICartItem } from '@/models/cartItem';

interface Data {
  showMobileMenu: boolean;
  cart: {
    items: ICartItem[];
  };
}

export default defineComponent({
  data(): Data {
    return {
      showMobileMenu: false,
      cart: {
        items: [],
      },
    };
  },
  beforeCreate() {
    this.$store.commit('initializeStore');
  },
  mounted() {
    this.cart = this.$store.state.cart;
  },
  computed: {
    cartTotalLength(): number {
      let totalLength = 0;

      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity;
      }

      return totalLength;
    },
  },
});
</script>

<style lang="scss">
@import '../node_modules/bulma';

.brand-name {
  font-family: 'Copperplate';
  font-weight: 500;
  color: black;
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.is-loading-bar {
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  &.is-loading {
    height: 80px;
  }
}
</style>
