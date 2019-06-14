<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
      <div>
            <v-navigation-drawer
                    v-model="drawer"
                    clipped
                    fixed
                    app>
                  <v-list dense>
                        <v-list-tile @click="goto('/')">
                              <v-list-tile-action>
                                    <v-icon>dashboard</v-icon>
                              </v-list-tile-action>
                              <v-list-tile-content>
                                    <v-list-tile-title>Home</v-list-tile-title>
                              </v-list-tile-content>
                        </v-list-tile>

                        <v-dialog
                                v-model="dialog"
                                width="500">
                              <template v-slot:activator="{ on }">
                                    <v-list-tile v-on="on">
                                          <v-list-tile-action>
                                                <v-icon>info</v-icon>
                                          </v-list-tile-action>
                                          <v-list-tile-content>
                                                <v-list-tile-title>About</v-list-tile-title>
                                          </v-list-tile-content>
                                    </v-list-tile>
                              </template>

                              <v-card>
                                    <v-card-title
                                            class="headline"
                                            primary-title
                                    >
                                          About
                                    </v-card-title>

                                    <v-card-text>
                                          Exceptos Swag store is a basic opensource e-commerce PWA,<br>
                                          Built with VueJS, Vuetify, VueX and Firebase...<br>
                                          <br>
                                          Please note that all products, prices and pictures are dummies...<br>
                                          <br>
                                          <br>
                                          <a href="https://github.com/Ritcheyy/exceptos-store" target="_blank">Github:
                                                https://github.com/Ritcheyy/exceptos-store</a><br>
                                          Star, Fork, pull and contribute<br>
                                          <br>
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

                        <v-list-tile @click="goto('/login')" v-show="!this.$store.getters.isAuth">
                              <v-list-tile-action>
                                    <v-icon>input</v-icon>
                              </v-list-tile-action>
                              <v-list-tile-content>
                                    <v-list-tile-title>Login</v-list-tile-title>
                              </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile @click="goto('/store')" v-show="this.$store.getters.isAuth">
                              <v-list-tile-action>
                                    <v-icon>store</v-icon>
                              </v-list-tile-action>
                              <v-list-tile-content>
                                    <v-list-tile-title>Store</v-list-tile-title>
                              </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile @click="signOut" v-show="this.$store.getters.isAuth">
                              <v-list-tile-action>
                                    <v-icon>logout</v-icon>
                              </v-list-tile-action>
                              <v-list-tile-content>
                                    <v-list-tile-title>Logout</v-list-tile-title>
                              </v-list-tile-content>
                        </v-list-tile>
                  </v-list>
            </v-navigation-drawer>
            <v-toolbar app fixed clipped-left>
                  <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                  <v-toolbar-title>Exceptos Store</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn flat icon to="/cart" v-show="this.$store.getters.isAuth" class="cart">
                        <v-icon>shopping_cart</v-icon>
                        <span class="count">{{ this.cartCount }}</span>
                  </v-btn>
            </v-toolbar>
      </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: 'NavBar',
        data: () => ({
            drawer: null,
            dialog: false
        }),
        props: {
            source: String
        },

        methods: {
            goto(url) {
                this.$router.push(url);
            },
            signOut() {
                firebase.auth().signOut()
                    .then(_ => {
                        this.loader().show();
                        localStorage.removeItem('user');
                        this.$store.dispatch("SET_USER", {});
                        // this.$store.getters.isAuth = false;

                        setTimeout(() => {
                            this.loader().hide();
                            this.$router.push('/login');
                        }, 3000)
                    })
            }
        },

        computed: {
            cartCount() {
                return this.$store.getters.getCartCount;
            }
        }
    }
</script>

<style>
      .cart .count {
            position: absolute;
            top: 10px;
            left: 20px;
            height: 20px;
            line-height: 20px;
            background-color: #FFC107;
            border-radius: 50%;
            padding: 0 5px;
      }
</style>
