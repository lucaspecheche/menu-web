<template>
  <div>
    <modal-box :is-active="isModalActive" :trash-object-name="trashObjectName" @confirm="trashConfirm"
               @cancel="trashCancel"/>
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="customers">

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
          <small class="has-text-grey is-abbr-like">{{ props.row.createdAt }}</small>
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <router-link :to="{name:'customer.edit', params: {id: props.row.id}}" class="button is-small is-primary">
              <b-icon icon="account-edit" size="is-small"/>
            </router-link>
            <button class="button is-small is-danger" type="button" @click.prevent="trashModal(props.row)">
              <b-icon icon="trash-can" size="is-small"/>
            </button>
          </div>
        </b-table-column>
      </template>

      <section class="section" slot="empty">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large"/>
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large"/>
            </p>
            <p>Nothing's here&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import ModalBox from '../components/ModalBox'
import api from "../http/api";

export default {
  name: 'CustomerTable',
  components: { ModalBox },
  props: {
    dataUrl: {
      type: String,
      default: null
    },
    checkable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isModalActive: false,
      trashObject: null,
      customers: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
      data: []
      }
  },
  computed: {
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.name
      }

      return null
    }
  },
  mounted () {
    const data = this.getData()
    console.log(data)
  },
  methods: {
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    },
    async getData() {
      this.isLoading = true;

        await api.get(this.dataUrl)
        .then(response => {
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
          this.$buefy.toast.open({
            message: `Erro: ${e.message}`,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
