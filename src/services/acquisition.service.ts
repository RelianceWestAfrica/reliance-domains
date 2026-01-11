import api from './api'

export const AcquisitionService = {
    all(params?: any) {
        return api.get('/acquisition', { params })
    },

    get(id: number) {
        return api.get(`/acquisition/${id}`)
    },

    create(data: any) {
        return api.post('/acquisition', data)
    },

    update(id: number, data: any) {
        return api.put(`/acquisition/${id}`, data)
    },

    delete(id: number) {
        return api.delete(`/acquisition/${id}`)
    },

    // 🖼 Images
    uploadImages(projectId: number, formData: FormData) {
        return api.post(`/acquisition/${projectId}/images`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    },

    images(projectId: number) {
        return api.get(`/acquisition/${projectId}/images`)
    },

    deleteImage(imageId: number) {
        return api.delete(`/acquisition/images/${imageId}`)
    },
}
