<template>
    <form @submit.prevent="save">
        <b-field grouped>
            <b-field label="Nome" expanded>
                <b-input v-model="data.firstName" icon="account" type="text" placeholder="Lucas" name="name" required />
            </b-field>

            <b-field label="Sobrenome" expanded>
                <b-input v-model="data.lastName" icon="account" type="text" placeholder="Lima" name="email" required />
            </b-field>

        </b-field>

        <b-field label="E-mail" expanded>
            <b-input v-model="data.email" icon="email" type="email" placeholder="menu@mail.com" name="email" required />
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
</template>

<script>
    export default {
        name: "CustomerForm",
        props: {
            data: {
                type: Object,
                default: () => {
                    return {
                        firstName: null,
                        lastName: null,
                        email: null,
                    }
                }
            }
        },
        data () {
          return {
              initialEmail: null
          }
        },
        methods: {
            save() {
                if(this.initialEmail === this.data.email) {
                    delete this.data.email
                }

                this.$emit('save', this.data)
            }
        },
        created() {
            setTimeout(() => {
                this.initialEmail = this.data.email
            }, 500)

        }
    }
</script>
