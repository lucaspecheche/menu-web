<template>
    <form @submit.prevent="save">
        <b-field grouped>

            <autocomplete :current="currentCustomer" label="Cliente" :form="customersAvailable" field="name" @selected="customerSelected"/>

            <b-field label="Valor" expanded>
                <b-input v-model="currentOrder.value" icon="currency-brl" type="number" step="any" placeholder="00,00" name="name" required></b-input>
            </b-field>
        </b-field>

        <b-field grouped>
            <autocomplete :current="currentStatus" label="Status" :form="statusAvailable" field="name" @selected="statusSelected"/>

            <b-field label="Data do Pedido" expanded required>
                <b-datepicker
                        v-model="currentOrder.date"
                        placeholder="Selecione..."
                        icon="calendar-today"
                        >
                    <b-button class="button is-primary"
                            @click="currentOrder.date = new Date()" expanded>
                        <b-icon icon="calendar-today"></b-icon>
                        <span>Hoje</span>
                    </b-button>
                </b-datepicker>
            </b-field>
        </b-field>

        <hr>
        <b-field grouped position="is-right">
            <div class="control">
                <b-button tag="router-link" to="/customers" type="is-light" icon-left="cart-off" >
                    Cancelar
                </b-button>
            </div>
            <div class="control">
                <b-button native-type="submit" type="is-link" icon-left="content-save" :disabled="!canSave">
                    Salvar
                </b-button>
            </div>
        </b-field>
    </form>
</template>

<script>
    import Autocomplete from '../components/Autocomplete'
    import {mapState} from "vuex";

    export default {
        name: "OrderForm",
        components: {
            Autocomplete
        },
        data () {
            return {
                order: {
                    value: null,
                    status: null,
                    customerId: null,
                    date: null
                }
            }
        },
        computed: {
            ...mapState({
                customersAvailable: state => state.customers.available,
                statusAvailable: state => state.orders.statusAvailable,
                currentOrder: state => state.orders.current
            }),
            currentStatus () {
                return this.statusAvailable.find(({ value }) => value == this.currentOrder?.status)
            },
            currentCustomer () {
                return this.customersAvailable.find(({ id }) => id == this.currentOrder?.customerId)
            },
            canSave() {
                const order = this.currentOrder;
                return order.date && order.customerId &&  order.value && order.status;
            }
        },
        methods: {
            save() {
                this.$emit('save', this.currentOrder)
            },
            customerSelected(customer) {
                this.currentOrder.customerId = customer.id
            },
            statusSelected(status) {
                this.currentOrder.status = status.value
            }
        },
        beforeDestroy() {
            this.$store.dispatch('orders/reset')
        }
    }
</script>
