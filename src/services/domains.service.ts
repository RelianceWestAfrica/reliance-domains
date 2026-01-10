import api from './api'

export const DomainsService = {
    all(params?: any) {
        return api.get('/domains', { params })
    },

    get(id: number) {
        return api.get(`/domains/${id}`)
    },

    create(data: any) {
        return api.post('/domains', data)
    },

    update(id: number, data: any) {
        return api.put(`/domains/${id}`, data)
    },

    delete(id: number) {
        return api.delete(`/domains/${id}`)
    },
}
