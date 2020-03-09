<template>
    <div>
        <section class="section is-main-section">
            <card-component title="Novo Pedido" icon="cart-plus" class="tile is-child">
                <order-form @save="save"/>
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
        mounted () {
            this.$store.dispatch('customers/available');
        },
        methods: {
            save(data) {
                api.post('orders', data).then(response => {
                    this.toastSucces(response.data?.message);
                    this.$router.push('/orders')
                }).catch(error => {
                    this.toastError(error.response?.data?.message)
                })
            }
        }
    }
</script>
