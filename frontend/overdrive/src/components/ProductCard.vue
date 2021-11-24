<template>
  <div class="column">
    <router-link v-bind:to="'/products/' + product.id">
      <div class="card p-4">
        <figure class="image is-4by3">
          <img v-bind:src="require('@/assets/images/' + product.image)" />
        </figure>

        <div class="card-content has-text-centered">
          <h3 class="is-size-4">{{ product.name }}</h3>
          <p class="is-size-6 has-text-grey">{{ product.price }} €</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: Object,
  },
});
</script>
