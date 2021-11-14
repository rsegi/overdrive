<template>
  <tr>
    <td><router-link :to="item.product.get_absolute_url">{{ item.product.name }}</router-link></td>
    <td>${{ item.product.price }}</td>
    <td>
        {{ item.quantity }}
        <a @click="decrementQuantity(item)">-</a>
        <a @click="incrementQuantity(item)">+</a>
    </td>
    <td>${{ getItemTotal(item).toFixed(2) }}</td>
    <td><button class="delete" @click="removeFromCart(item)"></button></td>
  </tr>
</template>


<script lang="ts">
import { ICartItem } from "@/models/cartItem";
import { defineComponent } from "vue";

export default defineComponent({
  name: 'CartItem',
  props: {
    initialItem: Object
  },
  data() {
    return {
      item: this.initialItem
    }
  },
  methods: {
    getItemTotal(item: ICartItem) {
        return item.quantity * item.product.price
    },
    decrementQuantity(item: ICartItem) {
        item.quantity -= 1
        if (item.quantity === 0) {
            this.$emit('removeFromCart', item)
        }
        this.updateCart()
    },
    incrementQuantity(item: ICartItem) {
        item.quantity += 1
        this.updateCart()
    },
    updateCart() {
        localStorage.setItem('cart', JSON.stringify(this.$store.state.cart))
    },
    removeFromCart(item: ICartItem) {
        this.$emit('removeFromCart', item)
        this.updateCart()
    },
  },
})


</script>