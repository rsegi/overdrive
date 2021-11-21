<template>
    <div class="is-dark column is-3">
      <router-link v-bind:to="'/categories/' + category.id">
        <div class="box">
              <figure class="image mb-4">
                  <img v-bind:src="category.image">
              </figure>

              <h3 class="is-size-4 has-text-centered">{{ category.name }}</h3>
              
          </div>
        </router-link>
      </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'CategoryCard',
  props: {
    category: Object
  }
})


</script>