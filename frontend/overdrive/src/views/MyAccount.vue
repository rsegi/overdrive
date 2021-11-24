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
import authenticationService from "@/services/authenticationService";
import { defineComponent } from "vue";
import { IOrder } from "@/models/order";
import OrderSummary from "@/components/OrderSummary.vue";
import userService from "@/services/userService";

interface Data {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  orders: IOrder[];
}

export default defineComponent({
  name: "MyAccount",
  components: {
    OrderSummary,
  },
  data(): Data {
    return {
      id: "",
      firstname: "",
      lastname: "",
      email: "",
      orders: [],
    };
  },
  created() {
    document.title = "My account | Overdrive";
    this.getOrders();
  },
  methods: {
    logout() {
      authenticationService.logOut().then(() => {
        this.$store.commit("removeAuthentication");
        this.$router.push("/");
      });
    },

    getOrders() {
      userService
        .getOrders(this.$store.state.user_id)
        .then((response) => {
          this.orders = response.data.Order;
          this.id = response.data.id;
          this.firstname = response.data.firstname;
          this.lastname = response.data.lastname;
          this.email = response.data.email;
        })
        .catch((error: Error) => {
          console.log(error);
        });
    },
  },
});
</script>
