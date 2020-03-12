import './scss/main.scss'
import '@mdi/font/css/materialdesignicons.css'

import Vue from 'vue'
import Buefy from 'buefy'

import router from './routes'
import store from './stores'
import toast from './mixins/toast'

/* Vue. Main component */
import App from './App.vue'


Vue.config.productionTip = false;

import AsideMenuList from './components/AsideMenuList'
Vue.component('AsideMenuList', AsideMenuList);

Vue.use(Buefy);
Vue.use(toast);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
