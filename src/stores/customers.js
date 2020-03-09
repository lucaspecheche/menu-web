import api from '../http/api'
const url = 'customers';

export default {
    namespaced: true,
    state: {
        data: {
            id: null,
            name: '',
            firstName: '',
            lastName: '',
            email: ''
        },
        available: []
    },
    mutations: {
        SET_AVAILABLE(state, payload) {
            state.available = payload
        }
    },
    actions: {
        available(context) {
            api.get('customers').then(response => {
                 const map =  response.data.data.map(customer => {
                    customer.name = `${customer.firstName} ${customer.lastName}`
                    return customer;
                });

                context.commit('SET_AVAILABLE', map)
            })
        },
        save(context, payload) {
            return api.post(url, payload);
        }
    }
}
