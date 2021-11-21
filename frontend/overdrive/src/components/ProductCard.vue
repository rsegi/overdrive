<template>
    <div class="column is-3">
      <router-link v-bind:to="'/products/' + product.id">
        <div class="box">
          <figure class="image mb-4">
              <img v-bind:src="product.image">
          </figure>

          <h3 class="is-size-4">{{ product.name }}</h3>
          <p class="is-size-6 has-text-grey">${{ product.price }}</p>

          </div>
      </router-link> 
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: Object
  }
});
</script>