<template>
      <transition name="slideRight">
            <v-card>
                  <v-card ripple elevation="0" @click="showProduct">
                        <v-img :src="product.imgUrl"
                               height="170px">
                        </v-img>
                  </v-card>

                  <v-card-title primary-title>
                        <v-layout row>
                              <v-layout column @click="showProduct">
                                    <v-flex class="headline">{{ product.name }}</v-flex>
                                    <v-flex>
                                          <span class="item-price">${{ product.price }}</span>
                                    </v-flex>
                              </v-layout>
                              <!--<v-spacer></v-spacer>-->
                              <v-flex class="option-flex" align-self-end shrink>
                                    <v-menu transition="slide-y-transition" bottom left>
                                          <template v-slot:activator="{ on }">
                                                <v-btn flat icon large v-on="on" class="options">
                                                      <v-icon size="20">more_vert</v-icon>
                                                </v-btn>
                                          </template>

                                          <v-list>
                                                <v-list-tile>
                                                      <v-list-tile-title v-ripple :key="0" @click="addCart(product)">
                                                            Add to cart
                                                      </v-list-tile-title>
                                                </v-list-tile>
                                                <v-list-tile>
                                                      <v-list-tile-title v-ripple :key="1" @click="details(product.id)">
                                                            Details
                                                      </v-list-tile-title>
                                                </v-list-tile>
                                          </v-list>
                                    </v-menu>
                              </v-flex>
                        </v-layout>
                  </v-card-title>
            </v-card>
      </transition>
</template>

<script>
    import notify from '../../notify'

    export default {
        name: 'ProductItem',
        props: ['product'],
        data() {
            return {
                url: '/product/' + this.product.id,
                show: false,
            }
        },

        methods: {
            showProduct() {
                return this.$router.push(this.url);
            },
            details(id) {
                return this.$router.push(this.url);
            },
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
                } else{
                    this.$store.commit("ADD_CART", item);
                    return notify(item.name + " has been added to your cart.", "info");
                }
            }
        },

        computed: {
            cartItems() {
                return this.$store.getters.getCartItems;
            }
        }
    }
</script>

<style scoped>
      .v-image {
            background-color: #fff;
      }

      .headline {
            font-size: 16px !important;
            line-height: 18px !important;
            font-family: Ubuntu !important;
      }

      .v-card__title--primary {
            padding-top: 10px;
      }

      .v-card__title {
            padding: 10px;
      }

      .options {
            padding: 0 !important;
            margin: 0 !important;
      }

      .option-flex {
            margin: 0 !important;
            padding: 0 !important;
      }

      .v-card__title {
            padding-right: 2px;
      }

      .item-price {
            color: #FFC107;
            font-weight: bold;
      }
</style>
