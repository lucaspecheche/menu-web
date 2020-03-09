<template>
    <div>
        <section class="section is-main-section">
            <card-component class="has-table has-mobile-sort-spaced" title="Pedidos" icon="cart" :header="buttonHeader">
                <order-table/>
            </card-component>
        </section>
    </div>

</template>

<script>
    import OrderTable from '../../components/OrderTable'
    import CardComponent from '@/components/CardComponent'

    export default {
        name: 'ListOrders',
        components: {
            CardComponent,
            OrderTable
        },
        data () {
            return {
                buttonHeader: {
                    to: '/order/new',
                    icon: 'cart-plus',
                    name: 'Novo'
                }
            }
        }
    }
</script>
