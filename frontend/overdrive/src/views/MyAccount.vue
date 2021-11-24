<template>
  <div class="page-my-account section">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">My account</h1>
      </div>

      <div class="column is-12">
        <h2 class="subtitle">My orders</h2>

        <OrderSummary
          v-for="order in orders"
          v-bind:key="order.id"
          v-bind:order="order"
        />
      </div>

      <hr />

      <div class="column is-12">
        <button @click="logout()" class="button is-danger">Log out</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import authenticationService from '@/services/authenticationService';
import { defineComponent } from 'vue';
import { IOrder } from '@/models/order';
import OrderSummary from '@/components/OrderSummary.vue';
import orderService from '@/services/orderService';

interface Data {
  orders: IOrder[];
}

export default defineComponent({
  name: 'MyAccount',
  components: {
    OrderSummary,
  },
  data(): Data {
    return {
      orders: [],
    };
  },
  mounted() {
    document.title = 'My account | Overdrive';
  },
  methods: {
    logout() {
      authenticationService.logOut().then(() => {
        this.$store.commit('removeAuthentication');
        this.$router.push('/');
      });
    },

    async getOrders() {
      await orderService
        .getOrders()
        .then((response) => {
          this.orders = response.data;
        })
        .catch((error: Error) => {
          console.log(error);
        });
    },
  },
});
</script>
