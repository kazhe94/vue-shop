const TOKEN_KEY = 'jwt-token'
import axios from "axios";

export default {
    namespaced: true,
    state() {
        return {

        }
    },
    mutations: {

    },
    actions: {
        async signUp({commit}, payload) {
            const {data} = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`,
                {...payload, returnSecureToken: true}
            )
            console.log(data)
        }
    },
    getters: {

    }
}