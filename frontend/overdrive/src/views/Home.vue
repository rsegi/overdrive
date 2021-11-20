<template>
  <div class="home">
    <section class="hero is-medium">
        <div class="hero-body has-text-centered">
            <p class="title mb-6">
                Overdrive
            </p>
        </div>
    </section>

    <div class="columns is-multiline">

    <CategoryCard 
      v-for="category in categories"
      v-bind:key="category.id"
      v-bind:category="category" 
    />
    </div>
  </div>

</template>

<script lang="ts">
import CategoryCard from '@/components/CategoryCard.vue'
import { defineComponent } from 'vue';
import { ICategory } from '@/models/category';
import categoryService from '@/services/categoryService';


interface Data {
 categories: ICategory[]
}

export default defineComponent({
  name: 'Home',
  data(): Data {
    return {
      categories: []
      }
  },
  components: {
    CategoryCard,
  },
  mounted() {
    this.getCategories();
    document.title = 'Home | Overdrive';
  },
  methods: {
    getCategories(): void {
      categoryService.getCategories().then(response => {
        this.categories = response.data;
      }).catch((error: Error) => {
        console.log(error);
        
      })
    }
  }
  })
</script>
