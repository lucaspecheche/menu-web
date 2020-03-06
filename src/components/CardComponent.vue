<template>
  <div class="card">
    <header v-if="title" class="card-header">
      <p class="card-header-title">
        <b-icon v-if="icon" :icon="icon" custom-size="default"/>
        {{ title }}
      </p>
      <a v-if="header" href="#" class="card-header-icon">
        <router-link :to="header.to">
          <b-button type="is-link" :icon-left="header.icon">{{header.name}}</b-button>
        </router-link>
      </a>
    </header>
    <div class="card-content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    header: {
      type: Object,
      default: null
    },
  }
}
</script>
