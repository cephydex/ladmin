
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
// import VueRouter from 'vue-router';
// Vue.use(VueRouter);

import router from "./router";
import { Form, HasError, AlertError } from "vform";
import moment from "moment";
import VueProgressBar from "vue-progressbar";
// import swal from 'sweetalert2';
import Swal from 'sweetalert2'

window.form = Form;
window.Swal = Swal;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

Vue.filter('upText', function(txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1);
});

Vue.filter('dmyDate', function(dt) {
    return moment(dt).format('MMMM Do YYYY');
});

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '5px'
});

const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});
window.toast = toast;
window.Fire = new Vue();

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
