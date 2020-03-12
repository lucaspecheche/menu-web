<template>
  <div id="app">
    <nav-bar/>
    <aside-menu :menu="menu"/>
    <router-view/>
  </div>
</template>

<script>

  import NavBar from './components/NavBar'
  import AsideMenu from './components/AsideMenu'

export default {
  name: 'home',
  components: {
    AsideMenu,
    NavBar
  },
  computed: {
    menu () {
      return [
        'Geral',
        [
          {
            to: '/',
            icon: 'desktop-mac',
            label: 'Dashboard'
          },
          {
            to: '/customers',
            label: 'Clientes',
            icon: 'account'
          },
          {
            to: '/orders',
            label: 'Pedidos',
            icon: 'cart-minus',
            updateMark: true
          },
        ]
      ]
    }
  }
}
</script>
