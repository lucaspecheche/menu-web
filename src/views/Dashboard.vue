<template>
    <div id="chart">
        <section class="section is-main-section">
            <card-component title="Filtros" icon="magnify">
                <b-field grouped>
                    <b-field label="Datas" label-position="on-border" expanded>
                        <b-datepicker
                                v-model="dates"
                                placeholder="Clique para selecionar"
                                range>

                            <button class="button is-danger"
                                    @click="dates = []">
                                <b-icon icon="close"></b-icon>
                                <span>Limpar</span>
                            </button>
                        </b-datepicker>
                    </b-field>

                    <b-field label="Status" label-position="on-border" expanded>
                        <b-autocomplete
                                placeholder="Selecione..."
                                :keep-first="true"
                                :open-on-focus="true"
                                field="user.first_name">
                        </b-autocomplete>
                    </b-field>
                    <p class="control">
                        <button class="button is-primary">Aplicar</button>
                    </p>
                </b-field>
            </card-component>

            <tiles>
                <card-widget class="tile is-child" type="is-primary" icon="account-multiple" :number="totalCustomers" label="Clientes"/>
                <card-widget class="tile is-child" type="is-info" icon="cart-outline" :number="totalOrders" label="Pedidos"/>
            </tiles>

            <card-component title="Performance" icon="chart-bell-curve">
                <orders-by-day :day-series="daySeries" :day-categories="dayCategories"/>
            </card-component>

            <tiles>
                <card-component title="Produtos" icon="chart-pie" class="tile is-child">
                    <orders-by-status :status-labels="statusLabels" :status-series="statusSeries"/>
                </card-component>
                <card-component title="Status" icon="chart-pie" class="tile is-child">
                    <orders-by-status/>
                </card-component>
            </tiles>
        </section>
    </div>
</template>

<script>
    import OrdersByDay from '../components/charts/OrdersByDay'
    import OrdersByStatus from '../components/charts/OrderByStatus'
    import CardComponent from '../components/CardComponent'
    import CardWidget from '../components/CardWidget'
    import Tiles from '../components/Tiles'
    import {mapState} from "vuex";
    import BField from "buefy/src/components/field/Field";

    export default {
        name: 'Dashboard',
        components: {
            BField,
            OrdersByDay,
            OrdersByStatus,
            CardComponent,
            CardWidget,
            Tiles,
        },
        data () {
            return {
                dates: [],
                filters: []
            }
        },
        created() {
            this.fetch()
        },
        computed: {
            ...mapState('reports', {
                totalCustomers: state => state.total.customers,
                totalOrders: state => state.total.orders,
                statusSeries: state => state.ordersByStatus.series,
                statusLabels: state => state.ordersByStatus.labels,
                daySeries: state => state.ordersByDay.series,
                dayCategories: state => state.ordersByDay.categories
            })
        },
        methods: {
              fetch() {
                  this.$store.dispatch('reports/ordersByDay');
                  this.$store.dispatch('reports/ordersByStatus');
                  this.$store.dispatch('reports/total');
              }
        },
        watch: {
            dates (newValue) {
                if(newValue.length) {
                    this.$store.dispatch('reports/total', {
                        startDate: newValue[0],
                        endDate: newValue[1]
                    });
                }else {
                    this.$store.dispatch('reports/total');
                }
            }
        }
    }
</script>
