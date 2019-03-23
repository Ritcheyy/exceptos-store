<template>
      <div>
            <v-layout column>
                  <v-img :src="product[0].imgUrl" height="350">
                  </v-img>
                  <v-card class="main-details">
                        <transition name="zoom" :duration="1000">
                              <v-btn v-show="showFab" color="primary" dark absolute top right fab
                                     @click="addCart(product[0])">
                                    <v-icon>add</v-icon>
                              </v-btn>
                        </transition>

                        <h3>{{ product[0].name }}</h3>
                        <p class="grey--text text--lighten-3">{{ product[0].storeName }}</p>
                        <h2 class="right">${{ product[0].price }}</h2>
                  </v-card>

                  <div class="desc">
                        <v-icon>info</v-icon>
                        <h3>Description</h3>
                        <transition name="slideDown" :duration="1000">
                              <p v-show="showDesc">{{ product[0].description }}</p>
                        </transition>
                  </div>

            </v-layout>
      </div>
</template>

<script>
    import notify from '../notify';

    export default {
        data() {
            return {
                showDesc: false,
                showFab: false,
            }
        },

        mounted() {
            this.showDesc = true;
            this.showFab = true;
        },

        methods: {
            addCart(item) {
                //Check if cart isn't empty
                if (this.cartItems.length != 0) {
                    // Check if item isn't in the cart already...
                    let product = this.cartItems.filter(function (product) {
                        return (product.id == item.id);
                    });

                    if (product.length == 0) {
                        this.$store.commit("ADD_CART", item);
                        return notify(item.name + " has been added to your cart.", "info");
                    } else {
                        return notify(item.name + " is already in your cart.", "error");
                    }
                } else {
                    this.$store.commit("ADD_CART", item);
                    return notify(item.name + " has been added to your cart.", "info");
                }
            }
        },

        computed: {
            product() {
                let id = this.$route.params.id;
                let products = this.$store.getters.getProducts
                if (products.length != 0) {
                    return products.filter(function (product) {
                        return (product.id == id);
                    });
                } else {
                    return this.$router.replace('/store');
                }
            },

            cartItems() {
                return this.$store.getters.getCartItems;
            },
        }
    }
</script>

<style scoped>
      .desc h3 {
            text-transform: uppercase;
            display: inline;
            margin-left: 20px;
      }

      .desc p {
            margin-top: 20px;
            margin-left: 40px;
      }

      .main-details {
            min-height: 110px;
            padding: 20px;
            background-color: #000;
      }

      .desc {
            margin: 30px 20px;
      }

      .v-image {
            background-color: #fff;
      }
</style>
