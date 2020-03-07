<template>
    <div>
        <section class="section is-main-section">
            <card-component title="Novo Cliente" icon="account-plus" class="tile is-child">
                <customer-form :form="form" @save="update"></customer-form>
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
                form: {
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
            async getCustomer() {
               await api.get(`customers/${this.id}`).then(response => {
                   this.form = response.data.data
               }).catch(error => {
                   this.$buefy.toast.open({
                       message: error.response.data.message,
                       type: 'is-danger',
                       position: 'is-bottom',
                       duration: 3000
                   })
               })
            },
            async update(attr) {
                await api.put(`customers/${this.id}`, attr).then(response => {
                    this.$buefy.toast.open({
                        message: response.data.message,
                        type: 'is-success',
                        position: 'is-bottom',
                        duration: 3000
                    });
                    this.$router.push('/customers')
                }).catch(error => {
                    this.$buefy.toast.open({
                        message: error.response.data.message,
                        type: 'is-danger',
                        position: 'is-bottom',
                        duration: 3000
                    })
                })
            }
        }
    }
</script>
