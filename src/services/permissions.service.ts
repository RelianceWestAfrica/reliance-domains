import api from './api'

export const PermissionsService = {
  getEligibleUsers: () => api.get('/permissions/eligible-users'),

  getAllPermissions: () => api.get('/permissions'),

  getUserPermissions: (userId: string) => api.get(`/permissions/user/${userId}`),

  assignProjects: (data: { userId: string; projectIds: string[] }) =>
    api.post('/permissions/assign', data),

  removeProject: (userId: string, projectId: string) =>
    api.delete(`/permissions/user/${userId}/project/${projectId}`)
}
