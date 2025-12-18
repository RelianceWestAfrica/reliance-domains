import api from './api'

export const CountriesService = {
    all() {
        return api.get('/countries')
    },

    get(id: number) {
        return api.get(`/countries/${id}`)
    },

    create(data: any) {
        return api.post('/countries', data)
    },

    update(id: number, data: any) {
        return api.put(`/countries/${id}`, data)
    },

    delete(id: number) {
        return api.delete(`/countries/${id}`)
    },
}
