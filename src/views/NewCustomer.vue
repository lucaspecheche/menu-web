<template>
    <div>
        <section class="section is-main-section">
            <card-component title="Novo Cliente" icon="account-plus" class="tile is-child">
                <customer-form @save="save"></customer-form>
            </card-component>
        </section>
    </div>
</template>

<script>
    import CardComponent from '../components/CardComponent'
    import CustomerForm from '../components/CustomerForm'

    export default {
        name: "NewCustomer",
        components: {
            CardComponent,
            CustomerForm
        },
        methods: {
            save(data) {
                this.$store.dispatch('customers/save', data).then(response => {
                    this.toastSucces(response.data?.message);
                    this.$router.push('/customers')
                }).catch(error => {
                    this.toastError(error.response?.data?.message)
                })
            }
        }
    }
</script>
