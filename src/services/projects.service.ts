import api from './api'

export const ProjectsService = {
    all(params?: any) {
        return api.get('/projects', { params })
    },

    get(id: number) {
        return api.get(`/projects/${id}`)
    },

    create(data: any) {
        return api.post('/projects', data)
    },

    update(id: number, data: any) {
        return api.put(`/projects/${id}`, data)
    },

    delete(id: number) {
        return api.delete(`/projects/${id}`)
    },

    // 🖼 Images
    uploadImages(projectId: number, formData: FormData) {
        return api.post(`/projects/${projectId}/images`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    },

    images(projectId: number) {
        return api.get(`/projects/${projectId}/images`)
    },

    deleteImage(imageId: number) {
        return api.delete(`/projects/images/${imageId}`)
    },
}
