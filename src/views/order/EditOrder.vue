<template>
    <div>
        <section class="section is-main-section">
            <card-component title="Novo Cliente" icon="account-plus" class="tile is-child">
                <order-form @save="update"/>
            </card-component>
        </section>
    </div>
</template>

<script>
    import CardComponent from '../../components/CardComponent'
    import OrderForm from '../../components/OrderForm'

    export default {
        name: "EditOrder",
        props: ['id'],
        components: {
            CardComponent,
            OrderForm
        },
        computed: {
            order() {
                return this.$store.state.orders.current
            },
        },
        mounted () {
            this.$store.dispatch('customers/available');
            this.$store.dispatch('orders/current', this.id);
        },
        methods: {
            update(data) {
                this.$store.dispatch('orders/update', data).then(({message}) => {
                    this.toastSucces(message)
                    this.$router.push('/orders')
                }).catch(({message}) => {
                    this.toastError(message)
                })
            }
        }
    }
</script>
