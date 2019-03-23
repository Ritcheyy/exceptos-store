<template>
      <v-container grid-list-md class="store">
                  <v-layout row wrap>
                        <v-flex xs6 md3 v-for="(product, index) in products" :key="index">
                              <product-item :product='product'/>
                        </v-flex>
                  </v-layout>
      </v-container>
</template>

<script>
    import ProductItem from '../components/Store/ProductItem'

    export default {
        components: {
            'product-item': ProductItem
        },

        mounted() {
            if (this.products.length == 0) {
                this.loader().show();
                return this.$store.dispatch('GET_PRODUCTS');
            }
        },

        computed: {
            products() {
                return this.$store.getters.getProducts;
            }
        },

        watch: {
            products(val){
                if (val) this.loader().hide();
            }
        }

    }
</script>

<style>
      .store {
            padding: 8px;
      }

      .v-list__tile__title {
            height: 16px;
            line-height: 16px;
      }

      .v-list__tile {
            height: 40px !important;
      }
</style>
