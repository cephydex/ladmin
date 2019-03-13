import Vue from 'vue';
// import VueRouter from 'vue-router';
import Router from 'vue-router'
Vue.use(Router);

import Profile from "./components/Profile.vue";
import Dashboard from "./components/Dashboard.vue";
import Users from "./components/Users.vue";

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));


let routes = [
    {
        path: '/dashboard',
        component: Dashboard,
        // component: require('./components/Dashboard.vue'),
    },
    {
        path: '/profile',
        component: Profile,
        name: 'profile',
    },
    {
        path: '/users',
        component: Users,
        name: 'users',
    },
]

export default new Router({
    routes: routes,
    mode: 'history'
});

// const router = VueRouter({ routes });
// export default new VueRouter({
//     mode: 'history',
//     linkActiveClass: 'active',
//     routes
// });