import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/customers',
      name: 'tables',
      component: () => import('../views/ListCustomers')
    },
    {
      path: '/customer/new',
      name: 'customer.new',
      component: () => import('../views/NewCustomer')
    },
    {
      path: '/customers/:id',
      name: 'customer.edit',
      props: true,
      component: () => import('../views/EditCustomer')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
