import api from '../http/api'
const url = 'orders';

const initialState = () => {
    return {
        isLoading: false,
        current: {
            value: null,
            customerId: null,
            status: null,
            date: null
        },
        statusAvailable: [
            {
                'name': 'Pendente',
                'value': 'PENDING'
            },
            {
                'name': 'Aprovado',
                'value': 'APPROVED'
            },
            {
                'name': 'Cancelado',
                'value': 'CANCELLED'
            }
        ]
    }
};

export default {
    namespaced: true,
    state: initialState(),
    mutations: {
        SET_CURRENT(state, data) {
            state.current = data
            state.current.date = new Date(data.createdAt)
        },
        RESET (state) {
            Object.assign(state, initialState())
        }
    },
    actions: {
        reset (context) {
            context.commit('RESET')
        },
        current(context, id) {
            api.get(`orders/${id}`).then(response => {
                context.commit('SET_CURRENT', response.data.data)
            })
        },
        save(context, payload) {
            return api.post(url, payload);
        },
        update(context, data) {
            return new Promise((resolve, reject) => {
                api.put(`${url}/${data.id}`, data).then(response => {
                    resolve(response.data)
                }).catch(error => {
                    reject(error.response.data)
                })
            })

        }
    }
}
