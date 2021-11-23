<template>
  <div class="page-cart">
    <div class="columns is-multiline">
      <div class="column is-12">
          <h1 class="title">Cart</h1>
      </div>

      <div class="column is-12 box">
        <table class="table is-fullwidth" v-if="cartTotalLength">
            <thead>
                <tr  class="has-text-centered">
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <CartItem
                    v-for="item in cart.items"
                    v-bind:key="item.product.id"
                    v-bind:initialItem="item"
                    v-on:removeFromCart="removeFromCart" />
            </tbody>
        </table>

        <p v-else>You don't have any products in your cart...</p>

        <div class="column is-12 box">
            <h2 class="subtitle">Summary</h2>

            <strong>{{ cartTotalPrice.toFixed(2)}} €</strong>, {{ cartTotalLength }} items

            <hr>

            <router-link to="/cart/checkout" class="button is-dark">Proceed to checkout</router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import CartItem from '@/components/CartItem.vue';
import { ICartItem } from "@/models/cartItem";

interface Data {
  cart: {
    items: ICartItem[]
  }
}

export default defineComponent({
  name: 'Cart',
  components: {
    CartItem
  },
  data(): Data {
    return {
      cart: {
        items: []
      }
    }
  },
  mounted() {
    this.cart = this.$store.state.cart
  },
  methods: {
    removeFromCart(item: ICartItem) {
        this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id)
    }
  },
  computed: {
    cartTotalLength(): number {
      return this.cart.items.reduce((acc: number, currentValue: ICartItem) => {
        return acc += currentValue.quantity
      }, 0);
    },
    cartTotalPrice(): number {
      return this.cart.items.reduce((acc: number, currentValue: ICartItem) => {
        return acc += currentValue.product.price * currentValue.quantity
      }, 0);
    }
  },
});
</script>