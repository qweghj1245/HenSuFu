import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import 'bootstrap';
import Vuex from 'vuex';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VeeValidate from 'vee-validate';
import zhtwValidate from 'vee-validate/dist/locale/zh_TW';
import store from './store';
import router from './router';
import App from './App.vue';

// component
import page from './components/Pagination.vue';
import Alert from './components/AlertMessage.vue';
import Footer from './components/Footer.vue';
import HomeNavbar from './components/HomeNavbar.vue';

// bus
import './bus';

// filters
import currencyFilter from './filters/currency';
import getDate from './filters/getDate';

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

Vue.filter('currency', currencyFilter);
Vue.filter('getdate', getDate);

Vue.component('Loading', Loading);
Vue.component('page', page);
Vue.component('Alert', Alert);
Vue.component('HomeNavbar', HomeNavbar);
Vue.component('Footer', Footer);

// use
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_TW', zhtwValidate);
Vue.use(Vuex);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_PATH}/api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
