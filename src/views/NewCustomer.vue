<template>
    <div>
        <section class="section is-main-section">
            <tiles>
            <card-component title="Novo Cliente" icon="account-plus" class="tile is-child">
                <form >
                    <b-field horizontal label="Nome" message="Required. Your name">
                        <b-input name="name" required/>
                    </b-field>
                    <b-field horizontal label="Sobrenome" message="Required. Your name">
                        <b-input name="name" required/>
                    </b-field>
                    <b-field horizontal label="E-mail" message="Required. Your e-mail">
                        <b-input  name="email" type="email" required/>
                    </b-field>
                    <hr>
                    <b-field horizontal>
                        <div class="control">
                            <button type="submit" class="button is-primary" :class="{'is-loading':isLoading}">
                                Submit
                            </button>
                        </div>
                    </b-field>
                </form>
            </card-component>

            </tiles>
        </section>
    </div>
</template>

<script>
    import CardComponent from '../components/CardComponent'
    import Tiles from '../components/Tiles'

    export default {
        name: "NewCustomer",
        components: {
            CardComponent,
            Tiles
        },
        data () {
            return {

            }
        }
    }
</script>
