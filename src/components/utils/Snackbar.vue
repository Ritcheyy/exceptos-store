<template>
      <v-snackbar
              :value="snackbar"
              :color="color"
              :timeout="4000">
            {{ text }}
            <v-btn dark flat @click="close">
                  Close
            </v-btn>
      </v-snackbar>
</template>

<script>
    export default {
        name: 'SnackBar',
        data() {
            return {

            }
        },

        methods: {
            close(){
                this.$store.dispatch("SET_SNACKBAR", {show: false});
            },

            timeout(){
                if(this.snackbar){
                    setTimeout(() => this.$store.dispatch("SET_SNACKBAR", {show: false}), 4000)
                }
            }
        },

        computed: {
            text(){
                return this.$store.getters.snackBar.text;
            },

            color(){
                return this.$store.getters.snackBar.color;
            },

            snackbar(){
                return this.$store.getters.snackBar.show;
            }
        },

        watch: {
            snackbar(val){
                if (val){
                    return setTimeout(() => this.$store.dispatch("SET_SNACKBAR", {show: false}), 4000);
                }
                // console.log(val);
                /*if (!val){
                    return setTimeout(() => this.$store.dispatch("SET_SNACKBAR", {show: false}), 2000)
                }*/
            }
        }

    }
</script>
