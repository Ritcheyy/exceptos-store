<template>
      <v-app id="inspire" dark>
            <nav-bar/>
            <v-content class="content">
                  <loader/>
                  <router-view/>
            </v-content>
            <snack-bar/>
            <v-footer app fixed>
                  <v-layout justify-end row>
                        <v-flex xs5 sm3 md2>
                              <span>With <v-icon small color="#FFC107">favorite</v-icon> By Ritchey</span>
                        </v-flex>
                  </v-layout>
            </v-footer>
      </v-app>
</template>

<script>
    import NavBar from './components/ui/NavBar'
    import SnackBar from './components/utils/Snackbar'
    import Loader from './components/utils/Loader'
    import firebase from 'firebase'

    export default {
        name: 'App',
        components: {
            'nav-bar': NavBar,
            'snack-bar': SnackBar,
            'loader': Loader,
        },
        mounted(){
            //If User is already signedIn
            if (localStorage.getItem('user')){
                let user = JSON.parse(localStorage.getItem('user'));
                this.$store.dispatch("SET_USER", user);
            }
        },

    }
</script>

<style>
      .application {
            font-family: 'Ubuntu', sans-serif !important;
      }

      .content {
            margin: 20px;
      }

      .text-center {
            text-align: center;
      }

      a {
            text-decoration: none;
      }

      main {
            margin: 0 !important;
      }
</style>
