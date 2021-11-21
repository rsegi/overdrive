<template>
  <div class="home">

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
import { ICategoryListItem } from '@/models/categoryListItem';
import categoryService from '@/services/categoryService';


interface Data {
 categories: ICategoryListItem[]
}

export default defineComponent({
  name: 'Home',
  components: {
    CategoryCard,
  },
  data(): Data {
    return {
      categories: []
      }
  },
  mounted() {
    this.getCategories();
    document.title = 'Home | Overdrive';
  },
  methods: {
    getCategories() {
      categoryService.getCategories().then(response => {
        this.categories = response.data;
      }).catch((error: Error) => {
        console.log(error);
      });
    },
  },
});
</script>
