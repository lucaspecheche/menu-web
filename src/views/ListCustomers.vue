<template>
  <div>
    <section class="section is-main-section">

      <card-component class="has-table has-mobile-sort-spaced" title="Clientes" icon="account-multiple" :header="buttonHeader">
        <customer-table data-url="customers" :checkable="true"/>
      </card-component>

    </section>
  </div>

</template>

<script>
import CustomerTable from '../components/CustomerTable'
import CardComponent from '../components/CardComponent'

export default {
  name: 'Tables',
  components: {
    CardComponent,
    CustomerTable
  },
  data () {
    return {
      buttonHeader: {
        to: '/customer/new',
        icon: 'account-plus',
        name: 'Novo'
      }
    }
  }
}
</script>
