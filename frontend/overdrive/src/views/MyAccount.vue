<template>
    <div class="page-my-account">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">My account</h1>
            </div>

            <div class="column is-12">
                <button @click="logout()" class="button is-danger">Log out</button>
            </div>

            <hr>

            <div class="column is-12">
                <h2 class="subtitle">My orders</h2>

                <OrderSummary
                    v-for="order in orders"
                    v-bind:key="order.id"
                    v-bind:order="order" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import authenticationService from "@/services/authenticationService";
import { defineComponent } from "vue";
import { IOrder } from "@/models/order";

// import axios from "axios";

interface Data {
   orders: IOrder[];
}

export default defineComponent({
    name: 'MyAccount',
    data(): Data { 
    return {
     orders: []
    }
  },
  mounted() {
    document.title = 'My account | Overdrive';
  },
  methods: {
    logout() {
      authenticationService.logOut().then(() => {
        // axios.defaults.headers.common["Authorization"] = ""
        //     localStorage.removeItem("token")
            // localStorage.removeItem("username")
            // localStorage.removeItem("userid")
            this.$store.commit('removeAuthentication');
            this.$router.push('/');
      })
    },
  },
});
</script>