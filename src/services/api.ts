import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// 🔐 Inject token automatiquement
api.interceptors.request.use((config) => {
    const authStore = useAuthStore()

    console.log(authStore.isAuthenticated)
    if (authStore.isAuthenticated) {
        config.headers.Authorization = `Bearer ${authStore.tokenValue.value!}`
    }

    return config
})

// ⚠️ Gestion erreurs globales
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const authStore = useAuthStore()
            authStore.logout()
        }

        return Promise.reject(error)
    }
)

export default api
