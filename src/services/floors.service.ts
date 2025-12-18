import api from './api'

export const FloorsService = {
    all(params?: any) {
        return api.get('/floors', { params })
    },

    get(id: number) {
        return api.get(`/floors/${id}`)
    },

    create(data: any) {
        return api.post('/floors', data)
    },

    update(id: number, data: any) {
        return api.put(`/floors/${id}`, data)
    },

    delete(id: number) {
        return api.delete(`/floors/${id}`)
    },
}
