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
        ordersByDay(context) {
            api.get('reports/orders-by-day').then(response => {
                context.commit('SET_ORDERS_BY_DAY', response.data.data)
            })
        },
        ordersByStatus(context) {
            api.get('reports/orders-by-status').then(response => {
                context.commit('SET_ORDERS_BY_STATUS', response.data.data)
            })
        },
        total(context, payload) {
            api.get('reports/total', {params: payload}).then(response => {
                context.commit('SET_TOTAL', response.data.data)
            })
        }
    }
}
