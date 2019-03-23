import Vue from 'vue'
import firebase from 'firebase'
import './plugins/vuetify'
import App from './App.vue'
import {store} from './store'


import 'vuetify/dist/vuetify.min.css'
import router from './router'

require('vue2-animate/dist/vue2-animate.min.css');

Vue.config.productionTip = false;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDzan4zJjW0xravZ1tkI-lHYID7y4XVtAw",
    authDomain: "exceptos-store.firebaseapp.com",
    databaseURL: "https://exceptos-store.firebaseio.com",
    projectId: "exceptos-store",
    storageBucket: "exceptos-store.appspot.com",
    messagingSenderId: "808832599911"
};
firebase.initializeApp(config);

Vue.mixin({
    methods: {
        // Global Method

        loader() {
            return {
                show: function () {
                    store.dispatch("SET_LOADING", true);
                },

                hide: function () {
                    store.dispatch("SET_LOADING", false);
                }
            }
        },
    }
});

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');

const prod = process.env.NODE_ENV === 'production'
const shouldSW = 'serviceWorker' in navigator && prod
if (shouldSW) {
    navigator.serviceWorker.register('/service-worker.js').then(() => {
        console.log("Service Worker Registered!")
    })
}
