<template>
  <div class="column">
    <router-link v-bind:to="'/categories/' + category.id">
      <div class="card">
        <figure class="image mb-4 is-4by3">
          <img v-bind:src="require('@/assets/images/' + category.image)" />
        </figure>
        <h3 class="card-content is-size-4 has-text-centered">
          {{ category.name }}
        </h3>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CategoryCard',
  props: {
    category: Object,
  },
});
</script>
