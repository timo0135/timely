import axios from "axios"
import { defineStore } from "pinia"
import { ref, reactive } from "vue"

export const useAuthStore = defineStore('auth', () => {
    const user = reactive({
        id: null,
        apikey: null,
        email: null,
        name: null
    })
    const errors = ref(null)

    const isAuthenticated = ref(false)

    const login = (apikey) => {
        axios.get('https://timely.edu.netlor.fr/api/profile', {
            headers: {
                Authorization: `key=${apikey}`,
                "Content-Type": "application/json"
            }
        }).then(response => {
            user.id = response.data.id
            user.apikey = apikey
            user.email = response.data.email
            user.name = response.data.name
            isAuthenticated.value = true
        }).catch((error => {
            errors.value = error
            console.error(error);
        }))
    }

    const register = (email, name) => {
        axios.post('https://timely.edu.netlor.fr/api/apikeys',{
            email: email,
            name: name
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            user.id = response.data.id
            user.apikey = response.data.key
            user.email = response.data.email
            user.name = response.data.name
            isAuthenticated.value = true
        }).catch((error => {
            errors.value = error
            console.error(error);
        }))
    }

    const logout = () => {
        user.id = null
        user.apikey = null
        user.email = null
        user.name = null
        isAuthenticated.value = false
    }

    return {
        user,
        isAuthenticated,
        register,
        login,
        logout
    }
})