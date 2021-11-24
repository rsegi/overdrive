<template>
  <div class="box mb-4">
    <h3 class="is-size-4 mb-6">Order #{{ order.id }}</h3>

    <h4 class="is-size-5">Products</h4>

    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in order.items" v-bind:key="item.product.id">
          <td>{{ item.product.name }}</td>
          <td>{{ item.product.price }} €</td>
          <td>{{ item.quantity }}</td>
          <td>{{ getItemTotal(item).toFixed(2) }} €</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { ICartItem } from "@/models/cartItem";
import { IOrder } from "@/models/order";
import { IOrderProduct } from "@/models/orderProduct";
import { defineComponent } from "vue";

export default defineComponent({
  name: "OrderSummary",
  props: {
    order: Object,
  },
  methods: {
    getItemTotal(item: ICartItem): number {
      return item.quantity * item.product.price;
    },
    orderTotalLength(order: IOrder) {
      return order.products.reduce(
        (acc: number, currentValue: IOrderProduct) => {
          return (acc += currentValue.quantity);
        },
        0
      );
    },
  },
});
</script>
