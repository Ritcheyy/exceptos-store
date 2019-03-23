<template>
      <div class="text-xs-center">

            <v-dialog
                    v-model="isLoading"
                    persistent
                    width="300">
                  <v-layout justify-center>
                        <v-progress-circular
                                :size="60"
                                color="primary"
                                indeterminate>
                        </v-progress-circular>
                  </v-layout>
            </v-dialog>

      </div>
</template>

<script>
    export default {
        data() {
            return {
                // dialog: false,
            }
        },

        computed: {
            isLoading() {
                return this.$store.getters.isLoading;
            }
        },

        watch: {
            /*isLoading(val) {
                if (!val) return

                setTimeout(() => (this.$store.dispatch("SET_LOADING", false)), 10000)
            }*/
        }
    }
</script>

<style>
      .v-dialog {
            overflow: hidden !important;
            box-shadow: none !important;
            -webkit-box-shadow: none !important;
            -moz-box-shadow: none !important;
            -o-box-shadow: none !important;
      }
</style>
