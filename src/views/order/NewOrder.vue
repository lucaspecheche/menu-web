<template>
    <div>
        <section class="section is-main-section">
            <card-component title="Novo Pedido" icon="cart-plus" class="tile is-child">
                <order-form :statusAvailable="statusAvailable" :customers-available="customersAvailable" @save="save">

                </order-form>
            </card-component>
        </section>
    </div>
</template>

<script>
    import CardComponent from '@/components/CardComponent'
    import OrderForm from '../../components/OrderForm'
    import api from '@/http/api'

    export default {
        name: "NewOrder",
        components: {
            CardComponent,
            OrderForm
        },
        data () {
            return {
                statusAvailable: [
                    {
                        'name': 'Pendente',
                        'value': 'PENDING'
                    },
                    {
                        'name': 'Aprovado',
                        'value': 'APPROVED'
                    },
                    {
                        'name': 'Cancelado',
                        'value': 'CANCELLED'
                    }
                ],
                customersAvailable: []
            }
        },
        created () {
          this.fetchCustomer()
        },
        methods: {
            save(data) {
                api.post('orders', data).then(response => {
                    this.toastSucces(response.data?.message);
                    this.$router.push('/orders')
                }).catch(error => {
                    this.toastError(error.response?.data?.message)
                })
            },
            fetchCustomer() {
                api.get('customers').then(response => {
                    this.customersAvailable = response.data.data.map(customer => {
                        customer.name = `${customer.firstName} ${customer.lastName}`
                        return customer;
                    });

                }).catch(error => {
                    this.toastError(error.response.data.message)
                })
            }
        }
    }
</script>
