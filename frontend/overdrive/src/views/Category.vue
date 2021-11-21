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
    this.getProductsByCategoryId();
  },
  methods: {
    async getProductsByCategoryId(): Promise<void> {
      this.$store.commit('setIsLoading', true);

      const categoryId = this.$route.params.categoryId as string;
      await categoryService.getProductsByCategoryId(categoryId)
      .then((response) => {
          this.products = response.data.products;
          this.categoryName = response.data.name;

          document.title = this.categoryName + ' | Overdrive';

        })
      .catch((error: Error) => console.log(error));

      this.$store.commit('setIsLoading', false);
    },

  }, 
});
</script>