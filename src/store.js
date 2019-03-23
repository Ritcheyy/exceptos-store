import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loading: false,
        snackbar: {
            text: 'Welcome to Swags Store',
            color: 'red',
            show: false,
        },
        user: {},
        products: [],
        cart: [],
    },

    getters: {
        isLoading: state => {
            return state.loading;
        },

        snackBar: state => {
            return state.snackbar;
        },

        getUser(state) {
            return state.user;
        },

        isAuth: state => {
            // return localStorage.getItem('user') !== null;
            return Object.entries(state.user).length !== 0;
        },

        getProducts(state) {
            return state.products;
        },

        getCartItems(state) {
            return state.cart.reverse();
        },

        getCartCount(state) {
            return state.cart.length;
        },
    },

    mutations: {
        SET_LOADING(state, loading) {
            state.loading = loading;
        },

        SET_SNACKBAR(state, snackbar) {
            state.snackbar = snackbar;
        },

        SET_USER(state, user) {
            state.user = user;
        },

        SET_PRODUCTS(state, products) {
            state.products = products;
        },

        ADD_CART(state, product) {
            state.cart.push(product);
        },

        OUT_CART(state, id) {
            let index = state.cart.findIndex(x => x.id === id);
            return state.cart.splice(index, 1);
        }
    },

    actions: {
        SET_LOADING(context, loading) {
            context.commit("SET_LOADING", loading);
        },

        SET_SNACKBAR(context, snackbar) {
            context.commit("SET_SNACKBAR", snackbar);
        },

        SET_USER(context, user) {
            context.commit("SET_USER", user);
        },

        //products
        GET_PRODUCTS: async (context, payload) => {
            let products = [];
            await firebase.database().ref('/store/products').once('value')
                .then(function (snapshot) {
                    // products = snapshot.val();
                    snapshot.forEach((child) => {
                        products.push(child.val());
                    })
                });
            context.commit("SET_PRODUCTS", products);
        },
    },
})
