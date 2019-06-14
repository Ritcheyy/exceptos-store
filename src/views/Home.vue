<template>
      <v-container fluid fill-height>
            <v-layout align-center justify-center>
                  <v-container style="text-align: center">
                  <v-flex shrink>
                        <img alt="Vue logo" src="../assets/logo.png">
                        <h2 class="text-center">Exceptos Swags Store</h2>
                  </v-flex>
                  <br>Exceptos Swag store is a basic opensource e-commerce PWA,<br>
                  Built with VueJS, Vuetify, VueX and Firebase...<br>
                  <br>
                  Please note that all products, prices and pictures are dummies...<br>
                  <br>
                        <h4><router-link to="/login">Login</router-link> to see all products...</h4>
                  <br>
                  <br>
                  </v-container>
            </v-layout>
      </v-container>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'home',
        components: {}
    }
</script>

<style>

</style>
