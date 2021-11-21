<template>
<div class="page-product">
        <div class="columns is-multiline">
            <div class="column is-9">
                <figure class="image mb-6">
                    <img v-bind:src="product.get_image">
                </figure>

                <h1 class="title">{{ product.name }}</h1>

                <p>{{ product.description }}</p>
            </div>

        <div class="column is-3">
            <h2 class="subtitle">Information</h2>

            <p><strong>Price: </strong>${{ product.price }}</p>

            <div class="field has-addons mt-6">
                <div class="control">
                    <input type="number" class="input" min="1" v-model="quantity">
                </div>

                <div class="control">
                    <a class="button is-dark" @click="addToCart()">Add to cart</a>
                </div>
            </div>
        </div>
    </div>
</div>
  
</template>

<script lang="ts">
import productService from "@/services/productService";
import { IProduct } from '@/models/product';
import { defineComponent } from "vue";

interface Data {
   product: IProduct | null,
   quantity: number,
}

export default defineComponent({
  name: 'Product',
  data():Data { 
    return{
      product: null,
      quantity: 1
    }
  },
  mounted(): void {
    this.getProduct()
  },
  methods: {
    async getProduct(): Promise<void> {
      this.$store.commit('setIsLoading', true);

      const category = this.$route.params.category as string;
      const productId = this.$route.params.product as string;
      await productService.getProduct(category, productId)
      .then((response) => {
          this.product = response.data;

          document.title = this.product.name + ' | Overdrive';
        })
      .catch((error: Error) => console.log(error));

      this.$store.commit('setIsLoading', false);
    },
    addToCart():void {
      if(isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1;
      }
      const item = {
        product: this.product,
        quantity: this.quantity,
      }

      this.$store.commit('addToCart', item);
    }
  },
});
</script>