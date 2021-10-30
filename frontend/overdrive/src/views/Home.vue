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
          <h2 class="is-size-2 has-text-centered">Latest products</h2>
      </div>

      <div 
        class="column is-3"
        v-for="product in latestProducts"
        v-bind:key="product.id"
      >
    </div>
</template>

<script lang="ts">
import axios from 'axios';
// @ is an alias to /src

export default {
  name: 'Home',
  data():string[] {
    return {
      latestProducts: []
    }
  },
  components: {
  },
  mounted(): void {
    this.getLatestProducts()
  },
  methods: {
    getLatestProducts(){
      axios.get('api/v1/latest-products/')
      .then(response => {
        this.latestProducts = response.data
      })
      .catch(error => {
          console.log(error)
        })
    }
  }
  }
</script>
