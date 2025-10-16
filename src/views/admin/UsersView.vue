<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">{{ $t('nav.users') }}</h1>
        <p class="text-gray-600">Gérez les utilisateurs et leurs permissions</p>
      </div>
      <AppButton
        v-if="authStore.userRole === 'SUPERADMIN'"
        @click="showCreateModal = true"
        variant="primary"
        class="flex items-center space-x-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        <span>{{ $t('common.add') }}</span>
      </AppButton>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Utilisateur
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rôle
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dernière connexion
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('common.actions') }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img
                    :src="user.avatar"
                    :alt="user.fullname"
                    class="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ user.fullname }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getRoleClasses(user.role)"
                >
                  {{ getRoleLabel(user.role) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(user.lastLogin) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                >
                  {{ user.active ? 'Actif' : 'Inactif' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <AppButton
                    @click="editUser(user)"
                    variant="ghost"
                    size="sm"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </AppButton>
                  <AppButton
                    v-if="user.id !== authStore.user?.id"
                    @click="toggleUserStatus(user)"
                    variant="ghost"
                    size="sm"
                    :class="user.active ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'"
                  >
                    <svg v-if="user.active" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"/>
                    </svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </AppButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="users.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
        </svg>
        <p class="text-lg text-gray-500">{{ $t('common.noData') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AppButton from '@/components/ui/AppButton.vue'

const authStore = useAuthStore()

const showCreateModal = ref(false)

// Mock data
const users = ref([
  {
    id: '1',
    fullname: 'John Doe',
    email: 'john.doe@reliancewestafrica.com',
    role: 'SUPERADMIN',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff',
    lastLogin: '2024-01-25T10:30:00Z',
    active: true
  },
  {
    id: '2',
    fullname: 'Marie Kouassi',
    email: 'marie.kouassi@reliancewestafrica.com',
    role: 'ADMIN',
    avatar: 'https://ui-avatars.com/api/?name=Marie+Kouassi&background=10b981&color=fff',
    lastLogin: '2024-01-24T15:45:00Z',
    active: true
  },
  {
    id: '3',
    fullname: 'Pierre Mensah',
    email: 'pierre.mensah@reliancewestafrica.com',
    role: 'COMMERCIAL',
    avatar: 'https://ui-avatars.com/api/?name=Pierre+Mensah&background=f59e0b&color=fff',
    lastLogin: '2024-01-23T09:15:00Z',
    active: true
  },
  {
    id: '4',
    fullname: 'Fatou Diallo',
    email: 'fatou.diallo@reliancewestafrica.com',
    role: 'COMMERCIAL',
    avatar: 'https://ui-avatars.com/api/?name=Fatou+Diallo&background=ef4444&color=fff',
    lastLogin: '2024-01-20T14:20:00Z',
    active: false
  }
])

const getRoleLabel = (role: string) => {
  const labels = {
    'SUPERADMIN': 'Super Admin',
    'ADMIN': 'Administrateur',
    'COMMERCIAL': 'Commercial'
  }
  return labels[role] || role
}

const getRoleClasses = (role: string) => {
  const classes = {
    'SUPERADMIN': 'bg-purple-100 text-purple-800',
    'ADMIN': 'bg-blue-100 text-blue-800',
    'COMMERCIAL': 'bg-green-100 text-green-800'
  }
  return classes[role] || 'bg-gray-100 text-gray-800'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const editUser = (user: any) => {
  console.log('Edit user:', user)
  // Open edit modal
}

const toggleUserStatus = (user: any) => {
  user.active = !user.active
  console.log('Toggle user status:', user)
  // Update user status
}
</script>