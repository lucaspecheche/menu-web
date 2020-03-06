<template>
  <div>
    <section class="section is-main-section">

      <card-component class="has-table has-mobile-sort-spaced" title="Clientes" icon="account-multiple" :header="cardHeader">
        <clients-table-sample data-url="/data-sources/clients.json" :checkable="true"/>
      </card-component>

    </section>
  </div>

</template>

<script>
import ClientsTableSample from '../components/ClientsTableSample'
import CardComponent from '../components/CardComponent'
export default {
  name: 'Tables',
  components: {CardComponent, ClientsTableSample},
  data () {
    return {
      cardHeader: {
        to: '/customer/new',
        icon: 'account-plus',
        name: 'Novo'
      }
    }
  }
}
</script>
