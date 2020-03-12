import api from '../http/api'
export default {
    namespaced: true,
    state: {
        ordersByDay: {
            categories: [],
            series: []
        },
        ordersByStatus: {
            series: [],
            labels: []
        },
        total: {
            customers: 0,
            orders: 0
        }
    },
    mutations: {
        SET_ORDERS_BY_DAY(state, data) {
            state.ordersByDay = data
        },
        SET_ORDERS_BY_STATUS(state, data) {
            state.ordersByStatus = data
        },
        SET_TOTAL(state, data) {
            state.total = data
        }
    },
    actions: {
        ordersByDay(context, params) {
            api.get('reports/orders-by-day', {params: params}).then(response => {
                context.commit('SET_ORDERS_BY_DAY', response.data.data)
            })
        },
        ordersByStatus(context, params) {
            api.get('reports/orders-by-status', {params: params}).then(response => {
                context.commit('SET_ORDERS_BY_STATUS', response.data.data)
            }).catch(() => {
                this._vm.$buefy.toast.open({
                    message: 'Ocorreu um erro ao conectar com a API',
                    type: 'is-danger',
                    position: 'is-bottom',
                    duration: 3000
                })
            })
        },
        total(context, params) {
            api.get('reports/total', {params: params}).then(response => {
                context.commit('SET_TOTAL', response.data.data)
            })
        }
    }
}
