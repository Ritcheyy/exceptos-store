<template>
      <div>
            <cart-item v-for="(item,index) in items" :key="index" :item="item"/>


            <div class="text-xs-center">
                  <v-dialog
                          v-model="dialog"
                          width="500"
                  >
                        <template v-slot:activator="{ on }" v-if="items.length > 0">
                              <v-container>
                                    <v-btn block color="primary" v-on="on" class="mt-3">Checkout</v-btn>
                              </v-container>
                        </template>
      
                        <template v-slot:activator="{ on }" v-else>
                              <v-container>
                                    <h2>You haven't added anything to your cart!<br>
                                          <router-link to="/store">Wanna go back to store?</router-link></h2>
                              </v-container>
                        </template>

                        <v-card>
                              <v-card-title
                                      class="headline"
                                      primary-title
                              >
                                    Thank You!
                              </v-card-title>

                              <v-card-text>
                                    You've checked out!<br>
                                    Thank you for using Swags store...<br>
                                    You can check back later for more features.👌
                                    <br>
                                    <br>
                                    <a href="https://github.com/Ritcheyy/exceptos-store" target="_blank">Github: https://github.com/Ritcheyy/exceptos-store</a><br>
                                    Star, Fork, Pull and Contribute<br>
                                    <span class="text-right">- Ritchey✌</span>
                                    <br>
                              </v-card-text>

                              <v-divider></v-divider>

                              <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                            color="primary"
                                            flat
                                            @click="dialog = false"
                                    >
                                          Close
                                    </v-btn>
                              </v-card-actions>
                        </v-card>
                  </v-dialog>
            </div>
      </div>
</template>

<script>
    import CartItem from '../components/Cart/CartItem'

    export default {
        components: {
            'cart-item': CartItem,
        },

        data() {
            return {
                'dialog': false
            }
        },

        computed: {
            items() {
                return this.$store.getters.getCartItems;
            }
        }
    }
</script>

<style scoped>
      .cart-item {
            margin-bottom: 20px !important;
      }

      .text-right{
            float: right;
      }

</style>
