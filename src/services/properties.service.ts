import api from './api'

export const PropertiesService = {
    all(params?: any) {
        return api.get('/properties', { params })
    },

    get(id: number) {
        return api.get(`/properties/${id}`)
    },

    create(data: any) {
        return api.post('/properties', data)
    },

    update(id: number, data: any) {
        return api.put(`/properties/${id}`, data)
    },

    delete(id: number) {
        return api.delete(`/properties/${id}`)
    },
}
