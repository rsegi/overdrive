<template>
  <div class="page-product section">
    <div class="columns is-multiline">
      <div class="column is-9 p-6">
        <figure class="image mb-6">
          <img v-bind:src="require('@/assets/images/' + product.image)" />
        </figure>

        <h1 class="title">{{ product.name }}</h1>

        <p>{{ product.description }}</p>
      </div>

      <div class="column is-3">
        <h2 class="subtitle">Information</h2>

        <p><strong>Price: </strong>{{ product.price }} €</p>

        <div class="field has-addons mt-6">
          <div class="control">
            <input type="number" class="input" min="1" v-model="quantity" />
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
import productService from '@/services/productService';
import { IProduct } from '@/models/product';
import { defineComponent } from 'vue';
import { toast } from 'bulma-toast';

interface Data {
  product: IProduct;
  quantity: number;
}

export default defineComponent({
  name: 'Product',
  data(): Data {
    return {
      product: { id: '', name: '', image: '', price: 0, description: '' },
      quantity: 1,
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    async getProduct(): Promise<void> {
      this.$store.commit('setIsLoading', true);

      const productId = this.$route.params.productId as string;
      await productService
        .getProduct(productId)
        .then((response) => {
          this.product = response.data;

          document.title = this.product.name + ' | Overdrive';
        })
        .catch((error: Error) => console.log(error));

      this.$store.commit('setIsLoading', false);
    },

    addToCart() {
      if (!this.$store.state.isAuthenticated) {
        toast({
          message: 'You need to be logged in to add items to your cart.',
          type: 'is-danger',
          duration: 3000,
          position: 'bottom-right',
        });
        return;
      }

      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1;
      }
      const item = {
        product: this.product,
        quantity: this.quantity,
      };

      this.$store.commit('addToCart', item);

      toast({
        message: 'The product was added to the cart',
        type: 'is-success',
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: 'bottom-right',
      });
    },
  },
});
</script>
