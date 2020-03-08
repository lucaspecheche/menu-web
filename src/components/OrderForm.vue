<template>
    <form @submit.prevent="save">
        <b-field grouped>
            <autocomplete label="Cliente" :data="customersAvailable" field="name" @selected="customerSelected"/>

            <b-field label="Valor" expanded>
                <b-input v-model="data.value" icon="currency-brl" type="number" step="any" placeholder="00,00" name="name" required />
            </b-field>
        </b-field>

        <b-field grouped>
            <autocomplete label="Status" :data="statusAvailable" field="name" @selected="statusSelected"/>

            <b-field label="Data do Pedido" expanded required>
                <b-datepicker
                        v-model="data.date"
                        placeholder="Selecione..."
                        icon="calendar-today"
                        >
                    <b-button class="button is-primary"
                            @click="data.date = new Date()" expanded>
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
    import BField from "buefy/src/components/field/Field";
    import Autocomplete from '../components/Autocomplete'

    export default {
        name: "OrderForm",
        components: {BField, Autocomplete},
        props: {
            data: {
                type: Object,
                default: () => {
                    return {
                        value: null,
                        status: null,
                        customerId: null,
                        date: null
                    }
                }
            },
            customersAvailable: Array,
            statusAvailable: Array
        },
        data () {
            return {
                initialEmail: null,
            }
        },
        computed: {
            canSave() {
                for(const key in this.data) {
                    if(this.data[key] === null) {
                        return false;
                    }
                }
                return true;
            }
        },
        methods: {
            save() {
                this.$emit('save', this.data)
            },
            customerSelected(customer) {
                this.data.customerId = customer.id
            },
            statusSelected(status) {
                this.data.status = status.value
            }
        }
    }
</script>
