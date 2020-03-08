<template>
  <nav v-show="isNavBarVisible" id="navbar-main" class="navbar is-fixed-top">
    <div class="navbar-brand">

    <a class="navbar-item is-hidden-desktop" @click.prevent="menuToggleMobile">
        <b-icon :icon="menuToggleMobileIcon"/>
      </a>

     <div class="navbar-item is-expanded">
        <b-autocomplete
                rounded
                v-model="name"
                :data="{}"
                placeholder="Buscar"
                icon="magnify"
                :expanded="true"
                clearable
                @select="option => selected = option">
          <template slot="empty">Sem resultados</template>
        </b-autocomplete>
      </div>

    </div>

      <div class="navbar-brand is-right">
      <a class="navbar-item navbar-item-menu-toggle is-hidden-desktop" @click.prevent="menuNavBarToggle">
        <b-icon :icon="menuNavBarToggleIcon" custom-size="default"/>
      </a>
    </div>

    <div class="navbar-menu fadeIn animated faster" :class="{'is-active':isMenuNavBarActive}">
      <div class="navbar-end">

        <nav-bar-menu class="has-divider has-user-avatar">
          <user-avatar/>
          <div class="is-user-name">
            <span>{{ userName }}</span>
          </div>

          <div slot="dropdown" class="navbar-dropdown">
            <a class="navbar-item">
              <b-icon icon="account" custom-size="default"></b-icon>
              <span>Meu Perfil</span>
            </a>
            <a class="navbar-item">
              <b-icon icon="settings" custom-size="default"></b-icon>
              <span>Configurações</span>
            </a>
          </div>
        </nav-bar-menu>

      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import NavBarMenu from '../components/NavBarMenu'
import UserAvatar from '../components/UserAvatar'

export default {
  name: 'NavBar',
  components: {
    UserAvatar,
    NavBarMenu
  },
  data () {
    return {
      isMenuNavBarActive: false
    }
  },
  computed: {
    menuNavBarToggleIcon () {
      return (this.isMenuNavBarActive) ? 'close' : 'dots-vertical'
    },
    menuToggleMobileIcon () {
      return this.isAsideMobileExpanded ? 'backburger' : 'forwardburger'
    },
    ...mapState([
      'isNavBarVisible',
      'isAsideMobileExpanded',
      'userName'
    ])
  },
  methods: {
    menuToggleMobile () {
      this.$store.commit('asideMobileStateToggle')
    },
    menuNavBarToggle () {
      this.isMenuNavBarActive = (!this.isMenuNavBarActive)
    },
    logout () {
      this.$buefy.snackbar.open({
        message: 'Log out clicked',
        queue: false
      })
    }
  }
}
</script>
