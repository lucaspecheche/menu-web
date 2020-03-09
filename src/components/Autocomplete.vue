<template>
    <b-field :label="label" expanded :type="{ 'is-danger': hasError}"
             :message="{'Selecione uma das opcoes.': hasError}">
        <b-autocomplete
                v-model="search"
                placeholder="Buscar"
                :keep-first="true"
                :open-on-focus="true"
                :data="filter"
                :field="field"
                @blur="blurControl"
                @select="select">
            <template slot="empty">Sem resultados</template>
        </b-autocomplete>
    </b-field>
</template>

<script>
    export default {
        name: "Autocomplete",
        props: {
            form: Array,
            field: String,
            label: String,
            current: {}
        },
        data() {
            return {
                search: '',
                hasError: false,
            }
        },
        watch: {
            current: {
                handler(value) {
                    if (value && Object.keys(value).length) {
                        this.select(value)
                    }
                },
                immediate: true //Chamar ao menos uma vez
            }
        },
        methods: {
            select(option) {
                if (option === null) {
                    this.search = '';
                    this.hasError = true;
                } else {
                    this.search = option[this.field];
                    this.hasError = false;

                    this.$emit('selected', option)
                }
            },
            blurControl() {
                setTimeout(() => {
                    if(this.current) {
                        const value = this.current[this.field];
                        if(this.search !== value){
                            this.search = value;
                            this.$emit('selected', value)
                        }
                    }
                }, 300)
            },
        },
        computed: {
            filter() {
                return this.form?.filter((option) => {
                    return option[this.field]
                        .toString()
                        .toLowerCase()
                        .indexOf(this.search?.toLowerCase()) >= 0
                })
            }
        }
    }
</script>
