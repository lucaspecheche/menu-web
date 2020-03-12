<template>
    <div>
        <b-table
                :data="orders"
                :checked-rows.sync="checkedRows"
                :checkable="true"
                :loading="isLoading"
                :striped="true"
                :hoverable="true"

                :paginated="true"
                :backend-pagination="true"
                :total="total"
                :per-page="perPage"
                @page-change="onPageChange">

            <template slot-scope="props">
                <b-table-column label="Status" field="firstName" sortable>
                    {{ translateStatus(props.row.status) }}
                </b-table-column>
                <b-table-column label="Valor" field="lastName" sortable>
                    {{ props.row.value }}
                </b-table-column>
                <b-table-column label="Nome" field="email" sortable>
                    {{ props.row.customer.firstName }} {{props.row.customer.lastName}}
                </b-table-column>
                <b-table-column label="Data">
                   {{ format(new Date(props.row.createdAt), "dd MMM yy - HH'h'mm", {locale: locale})}}
                </b-table-column>
                <b-table-column custom-key="actions" class="is-actions-cell">
                    <div class="buttons is-right">
                        <router-link :to="{name:'orders.edit', params: {id: props.row.id}}" class="button is-small is-primary">
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
    import api from "../http/api";
    import { format } from 'date-fns'
    import locale from 'date-fns/locale/pt-BR';

    export default {
        name: 'OrderTable',
        props: {
        },
        data () {
            return {
                format,
                locale,
                orders: [],
                isLoading: false,
                isDeleting: false,
                perPage: 10,
                total: 0,
                page: 1,
                checkedRows: []
            }
        },
        mounted () {
            this.loadAsyncData()
        },
        computed: {
            availableStatus() {
                return this.$store.state.orders.statusAvailable
            }
        },
        methods: {
            loadAsyncData() {
                this.isLoading = true;
                api.get(`orders?page=${this.page}`).then(response => {
                    const data   = response.data?.data;
                    this.orders  = data.data;
                    this.perPage = data.per_page;
                    this.total   = data.total;

                }).catch(e => {
                    this.toastError(e.response?.data.message ?? 'Não foi possivel conectar com a API')
                }).finally(() => {
                    this.isLoading = false;
                })
            },
            deleteCustomer(id) {
                this.isDeleting = id;

                api.delete(`orders/${id}`).then(response => {
                    const index = this.orders.findIndex(orders => orders.id === id)
                    this.orders.splice(index, 1);
                    this.toastSucces(response.data?.message)
                }).catch(error => {
                    this.toastError(error.response?.data.message)
                }).finally(() => {
                    this.isDeleting = false;
                })
            },
            onPageChange (page) {
                this.page = page;
                this.loadAsyncData()
            },
            translateStatus(value) {
                return this.availableStatus.find(status => status.value === value)['name']
            }
        }
    }
</script>
