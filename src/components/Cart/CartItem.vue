<template>
      <v-container>
            <v-card>
                  <v-layout row>
                        <v-flex xs-10 class="text-side">
                              <h4>{{ item.name }}</h4>
                              <p>${{ item.price }}</p>
                              <v-btn icon ripple @click="removeItem(item.id)">
                                    <v-icon color="primary">delete</v-icon>
                              </v-btn>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs-2 align-self-end shrink>
                              <v-img :src="item.imgUrl" height="116" width="100">
                              </v-img>
                        </v-flex>
                  </v-layout>
            </v-card>
      </v-container>
</template>

<script>
    export default {
        props: ['item'],

        methods: {
            removeItem(id){
                return this.$store.commit("OUT_CART", id);
            }
        }
    }
</script>

<style scoped>
      p {
            margin-bottom: 8px;
      }

      .text-side {
            padding: 15px !important;
      }

      .v-btn {
            margin: 0 !important;
      }

      .container {
            padding-bottom: 0 !important;
      }

      .v-image {
            background-color: #fff;
      }
</style>
