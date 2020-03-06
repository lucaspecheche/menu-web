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
      :data="clients">

      <template slot-scope="props">
        <b-table-column class="has-no-head-mobile is-image-cell">
          <div class="image">
            <img :src="props.row.file" class="is-rounded">
          </div>
        </b-table-column>
        <b-table-column label="Name" field="name" sortable>
          {{ props.row.name }}
        </b-table-column>
        <b-table-column label="Company" field="company" sortable>
          {{ props.row.company }}
        </b-table-column>
        <b-table-column label="City" field="city" sortable>
          {{ props.row.city }}
        </b-table-column>
        <b-table-column class="is-progress-col" label="Progress" field="progress" sortable>
          <progress class="progress is-small is-primary" :value="props.row.progress" max="100">{{ props.row.progress }}</progress>
        </b-table-column>
        <b-table-column label="Created">
          <small class="has-text-grey is-abbr-like" :title="props.row.created">{{ props.row.created }}</small>
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <router-link :to="{name:'client.edit', params: {id: props.row.id}}" class="button is-small is-primary">
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
import axios from 'axios'
import ModalBox from '@/components/ModalBox'

export default {
  name: 'ClientsTableSample',
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
      clients: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
      data: [
          {
            "id":19,
            "file":"/data-sources/avatars/nicolas-horn-689011-unsplash.jpg",
            "login":"ywuckert",
            "name":"Barry Weber",
            "company":"Schulist, Mosciski and Heidenreich",
            "city":"East Violettestad",
            "progress":42,
            "created":"Jul 24, 2019",
            "created_mm_dd_yyyy":"07-24-2019"
          },
        {
          "id":19,
          "file":"/data-sources/avatars/nicolas-horn-689011-unsplash.jpg",
          "login":"ywuckert",
          "name":"Barry Weber",
          "company":"Schulist, Mosciski and Heidenreich",
          "city":"East Violettestad",
          "progress":42,
          "created":"Jul 24, 2019",
          "created_mm_dd_yyyy":"07-24-2019"
        }
        ]
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
    this.isLoading = true

    setTimeout(() => {
      this.clients = this.data
      this.isLoading = false
    }, 2000);


    if (this.dataUrl === false) {
      this.isLoading = true
      axios
        .get(this.dataUrl)
        .then(r => {
          this.isLoading = false
          if (r.data && r.data.data) {
            if (r.data.data.length > this.perPage) {
              this.paginated = true
            }
            this.clients = r.data.data
          }
        })
        .catch(e => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    }
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
    }
  }
}
</script>
