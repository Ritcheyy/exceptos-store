import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

//Auth
import Login from './views/auth/Login'

//Store
import Store from './views/Store'
import productDetails from './views/ProductDetails'

//Cart
import Cart from './views/Cart'

// Middlewares
import Auth from './middlewares/Auth'
import RegisterIfAuth from './middlewares/RedirectIfAuth'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/index.html',
            name: 'index',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: (to, from, next) => {
                RegisterIfAuth(to, next);
            }
        },
        {
            path: '/store',
            name: 'store',
            component: Store,
            beforeEnter: (to, from, next) => {
                Auth(to, next);
            }
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart,
            beforeEnter: (to, from, next) => {
                Auth(to, next);
            }
        },
        {
            path: '/product/:id',
            name: 'productDetails',
            component: productDetails,
            beforeEnter: (to, from, next) => {
                Auth(to, next);
            }
        }
    ]
})
