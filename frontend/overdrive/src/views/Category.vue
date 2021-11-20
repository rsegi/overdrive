<template>
  <div class="page-category">
     <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered">{{ categoryName }}</h2>
            </div>

    <ProductCard 
      v-for="product in products"
      v-bind:key="product.id"
      v-bind:product="product" />
     </div>
  </div>
</template>


<script lang="ts">
import { IProduct } from "@/models/product";
import categoryService from "@/services/categoryService";
import ProductCard from '@/components/ProductCard.vue'
import { defineComponent } from "vue";
import productService from "@/services/productService";

interface Data {
  categoryName: string,
  products: IProduct[]
}

export default defineComponent({
  name: 'Category',
  components:{
    ProductCard,
  },
  data():Data { 
    return {
      categoryName: '',
      products:[]
    }
  },
  mounted() {
    this.getCategory();
  },
  watch: { 
      $route(to) {
          if (to.name === 'Category') {
              this.getCategory();
          }
      }
  },
  methods: {
     getCategory() {

      const categoryId = this.$route.params.categoryId as string;
      categoryService.getCategory(categoryId)
      .then((response) => {
          this.categoryName = response.data.name;

          document.title = this.categoryName + ' | Overdrive';
        })
      .catch((error: Error) => console.log(error));

    },
    
    async getProducts(): Promise<void> {
      this.$store.commit('setIsLoading', true);

      const category = this.$route.params.category as string;
      await productService.getProductsByCategory(category)
      .then((response) => {
          this.products = response.data;

        })
      .catch((error: Error) => console.log(error));

      this.$store.commit('setIsLoading', false);
    },

  },


  
});
</script>