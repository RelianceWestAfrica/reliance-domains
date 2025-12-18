import api from './api'

export const ResidencesService = {
    all(params?: any) {
        return api.get('/residences', { params })
    },

    get(id: number) {
        return api.get(`/residences/${id}`)
    },

    create(data: any) {
        return api.post('/residences', data)
    },

    update(id: number, data: any) {
        return api.put(`/residences/${id}`, data)
    },

    delete(id: number) {
        return api.delete(`/residences/${id}`)
    },
}
