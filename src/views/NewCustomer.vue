<template>
    <div>
        <section class="section is-main-section">
            <card-component title="Novo Cliente" icon="account-plus" class="tile is-child">
                <form @submit.prevent="save">
                    <b-field grouped>
                        <b-field label="Nome" expanded>
                            <b-input v-model="form.firstName" icon="account" type="text" placeholder="Lucas" name="name" required />
                        </b-field>

                        <b-field label="Sobrenome" expanded>
                            <b-input v-model="form.lastName" icon="account" type="text" placeholder="Lima" name="email" required />
                        </b-field>

                    </b-field>

                    <b-field label="E-mail" expanded="">
                        <b-input v-model="form.email" icon="email" type="email" placeholder="menu@mail.com" name="email" required />
                    </b-field>

                    <hr>
                    <b-field grouped position="is-right">
                        <div class="control">
                            <b-button tag="router-link" to="/customers" type="is-light" icon-left="account-cancel" >
                                Cancelar
                            </b-button>
                        </div>
                        <div class="control">
                            <b-button native-type="submit" type="is-link" icon-left="content-save" >
                                Salvar
                            </b-button>
                        </div>
                    </b-field>
                </form>
            </card-component>
        </section>
    </div>
</template>

<script>
    import CardComponent from '../components/CardComponent'
    import api from '../http/api'

    export default {
        name: "NewCustomer",
        components: {
            CardComponent
        },
        data () {
            return {
                form: {
                    lastName: null,
                    firstName: null,
                    email: null
                }
            }
        },
        methods: {
            async save() {
                await api.post('customers', this.form).then(response => {
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
