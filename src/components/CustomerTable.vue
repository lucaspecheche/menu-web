<template>
  <div>
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="true"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="customer">

      <template slot-scope="props">
        <b-table-column label="Nome" field="firstName" sortable>
          {{ props.row.firstName }}
        </b-table-column>
        <b-table-column label="Sobrenome" field="lastName" sortable>
          {{ props.row.lastName }}
        </b-table-column>
        <b-table-column label="E-mail" field="email" sortable>
          {{ props.row.email }}
        </b-table-column>
        <b-table-column label="Cadastrado">
          {{ format(new Date(props.row.createdAt), "dd MMM yy - HH'h'mm", {locale: locale}) }}
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <router-link :to="{name:'customer.edit', params: {id: props.row.id}}" class="button is-small is-primary">
              <b-icon icon="account-edit" size="is-small"/>
            </router-link>
            <b-button class="button is-small is-danger" type="button" :loading="isDeleting === props.row.id" @click.prevent="deleteCustomer(props.row.id)">
              <b-icon icon="trash-can" size="is-small"/>
            </b-button>
          </div>
        </b-table-column>
      </template>

      <section class="section" slot="empty">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large"/>
            </p>
            <p>Carregando Informações...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large"/>
            </p>
            <p>Nenhuma informação disponível&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
  import { format } from 'date-fns'
  import locale from 'date-fns/locale/pt-BR';
  import api from "../http/api";

export default {
  name: 'CustomerTable',
  data () {
    return {
      format,
      locale,
      customers: [],
      isLoading: false,
      isDeleting: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
      data: []
    }
  },
  computed: {
    customer () {
      return this.customers
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      api.get('customers').then(response => {
          this.isLoading = false;

          if (response.data && response.data.data) {
            if (response.data.data.length > this.perPage) {
              this.paginated = true
            }
            this.customers = response.data.data
          }

        })
        .catch(e => {
          this.isLoading = false;
          this.toastError(e.response?.data.message ?? 'Não foi possivel conectar com a API')
        })
    },
    deleteCustomer(id) {
      this.isDeleting = id;

      api.delete(`customers/${id}`).then(response => {
        const index = this.customers.findIndex(customer => customer.id === id)
        this.customers.splice(index, 1);
        this.toastSucces(response.data?.message)
      }).catch(error => {
        this.toastError(error.response?.data.message)
      }).finally(() => {
        this.isDeleting = false;
      })
    }
  }
}
</script>
