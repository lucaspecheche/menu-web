import api from '../http/api'
const url = 'customers';

export default {
    namespaced: true,
    state: {
        isLoading: false,
        data: {
            firstName: null,
            lastName: null,
            email: null
        }
    },
    mutations: {
        SET_LOADING_STATUS(state) {
            state.isLoading = state
        },

        SET_DATA(state, payload) {
            state.data = payload
        }
    },
    actions: {
        fetch(context) {
            context.commit('SET_LOADING_STATUS')
            alert('VALeu')
        },
        save(context, payload) {
            return api.post(url, payload);
        }
    }
}
