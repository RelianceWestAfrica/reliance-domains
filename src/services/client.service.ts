import api from './api'

export const ClientService = {
    all(params?: any) {
        return api.get('/clients', { params })
    },

    get(id: number) {
        return api.get(`/clients/${id}`)
    },

    create(data: any) {
        return api.post('/clients', data)
    },

    update(id: number, data: any) {
        return api.put(`/clients/${id}`, data)
    },

    delete(id: number) {
        return api.delete(`/clients/${id}`)
    },

    // 🖼 Images
    uploadImages(projectId: number, formData: FormData) {
        return api.post(`/clients/${projectId}/images`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    },

    images(projectId: number) {
        return api.get(`/clients/${projectId}/images`)
    },

    deleteImage(imageId: number) {
        return api.delete(`/clients/images/${imageId}`)
    },
}
