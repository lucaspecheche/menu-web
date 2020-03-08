const mixin = {
    methods: {
        toastSucces(message) {
            this.$buefy.toast.open({
                message: message,
                type: 'is-success',
                position: 'is-bottom',
                duration: 3000
            });
        },
        'toastError' (message) {
            this.$buefy.toast.open({
                message: message,
                type: 'is-danger',
                position: 'is-bottom',
                duration: 3000
            })
        }
    }
};

export default {
    install (Vue) {
        Vue.mixin(mixin)
    }
};
