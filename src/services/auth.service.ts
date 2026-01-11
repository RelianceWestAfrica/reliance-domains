import api from './api'

export const AuthService = {
    login(data: { email: string; password: string }) {
        return api.post('/auth/login', data)
    },

    register(data: any) {
        return api.post('/auth/register', data)
    },

    me() {
        return api.get('/auth/me')
    },

    userList() {
        return api.get('/auth/user/list')
    },

    logout() {
        return api.post('/auth/logout')
    },

    loginWithAccessCode(code: string) {
        return api.post('/access-code/login', { code })
    },
}
