<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
        <div class="hero-body has-text-centered">
            <p class="title mb-6">
                Welcome to Overdrive
            </p>
        </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
          <h2 class="is-size-2 has-text-centered">Products</h2>
      </div>

      <div 
        class="column is-3"
        v-for="product in products"
        v-bind:key="product.id"
      >
       <div class="box">
            <figure class="image mb-4">
                <img v-bind:src="product.image">
            </figure>

            <h3 class="is-size-4">{{ product.name }}</h3>
            <p class="is-size-6 has-text-grey">${{ product.price }}</p>

            <router-link v-bind:to="product.get_absolute_url" class="button is-dark mt-4">View details</router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import productService from '@/services/productService';
import { Product } from "@/models/product";
import { defineComponent } from 'vue';


interface Data {
 products: Product[]
}

export default defineComponent({
  name: 'Home',
  data(): Data {
    return {
      products: []
      }
  },
  components: {
  },
  mounted(): void {
    this.getProducts()
  },
  methods: {
    getProducts(): void {
      productService.getProducts().then(response => {
        this.products = response.data;
      }).catch((error: Error) => {
        console.log(error);
        
      })
    }
  }
  })
</script>
