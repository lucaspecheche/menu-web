<template>
    <div>
        <section class="section is-main-section">
            <card-component title="Novo Cliente" icon="account-plus" class="tile is-child">
                <customer-form :data="data" @save="update"></customer-form>
            </card-component>
        </section>
    </div>
</template>

<script>
    import CardComponent from '../components/CardComponent'
    import CustomerForm from '../components/CustomerForm'
    import api from '../http/api'

    export default {
        name: "EditCustomer",
        components: {
            CardComponent,
            CustomerForm
        },
        props: ['id'],
        data() {
            return {
                data: {
                    lastName: null,
                    firstName: null,
                    email: null
                }
            }
        },
        created() {
            this.getCustomer()
        },
        methods: {
            getCustomer() {
               api.get(`customers/${this.id}`).then(response => {
                   this.data = response.data.data
               }).catch(error => {
                   this.toastError(error.response?.data?.message);

               })
            },
            update(attr) {
                api.put(`customers/${this.id}`, attr).then(response => {
                    this.toastSucces(response.data?.message);
                    this.$router.push('/customers')
                }).catch(error => {
                    this.toastError(error.response?.data?.message);
                })
            }
        }
    }
</script>
