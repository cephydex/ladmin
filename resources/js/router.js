import Vue from 'vue';
// import VueRouter from 'vue-router';
import Router from 'vue-router'
Vue.use(Router);

import Profile from "./components/Profile.vue";
import Dashboard from "./components/Dashboard.vue";

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