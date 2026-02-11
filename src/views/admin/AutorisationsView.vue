<template>
  <div class="space-y-4 sm:space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Autorisations</h1>
        <p class="text-sm sm:text-base text-gray-600">Gérez les autorisations d'accès aux projets pour les utilisateurs</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <h2 class="text-base sm:text-lg font-semibold text-gray-900 mb-4">Sélectionner un utilisateur</h2>

        <div class="space-y-4">
          <div class="form-group">
            <label class="form-label">Utilisateur</label>
            <select v-model="selectedUserId" @change="loadUserPermissions" class="form-input">
              <option value="">-- Sélectionner un utilisateur --</option>
              <option v-for="user in filteredUsers" :key="user.id" :value="user.id">
                {{ user.lastName }} {{ user.firstName }} ({{ user.role }})
              </option>
            </select>
          </div>

          <div v-if="selectedUser" class="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div class="min-w-0 flex-1">
                <p class="font-medium text-gray-900 truncate">{{ selectedUser.fullname }}</p>
                <p class="text-sm text-gray-600 truncate">{{ selectedUser.email }}</p>
                <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                  {{ selectedUser.role }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <h2 class="text-base sm:text-lg font-semibold text-gray-900 mb-4">Projets autorisés</h2>

        <div v-if="!selectedUserId" class="text-center py-8 text-gray-500">
          <svg class="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          <p class="text-sm sm:text-base">Sélectionnez un utilisateur pour gérer ses autorisations</p>
        </div>

        <div v-else class="space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <span class="text-sm text-gray-600">{{ selectedProjects.length }} projet(s) sélectionné(s)</span>
            <button
              @click="selectAllProjects"
              class="text-sm text-primary-600 hover:text-primary-700 font-medium text-left sm:text-right"
            >
              {{ selectedProjects.length === projects.length ? 'Tout désélectionner' : 'Tout sélectionner' }}
            </button>
          </div>

          <div class="max-h-64 sm:max-h-96 overflow-y-auto space-y-2">
            <label
              v-for="project in availableProjects"
              :key="project.id"
              class="flex items-start sm:items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              :class="{ 'bg-primary-50 border-primary-300': selectedProjects.includes(project.id) }"
            >
              <input
                type="checkbox"
                :value="project.id"
                v-model="selectedProjects"
                class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-0.5 sm:mt-0 flex-shrink-0"
              />
              <div class="ml-3 flex-1 min-w-0">
                <p class="font-medium text-gray-900 text-sm sm:text-base truncate">{{ project.name }}</p>
                <p class="text-xs sm:text-sm text-gray-500 truncate"><strong>{{ project.description }}</strong>
                   <br> {{ project.city }} - {{ project.entreprise }}</p>
              </div>
            </label>
          </div>

          <div class="pt-4 border-t border-gray-200">
            <button
              @click="savePermissions"
              :disabled="loading"
              class="w-full bg-primary-600 text-white px-4 py-2.5 sm:py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
            >
              <span v-if="loading">Enregistrement...</span>
              <span v-else>Enregistrer les autorisations</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedUserId" class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-4 sm:px-6 py-4 border-b border-gray-200">
        <h2 class="text-base sm:text-lg font-semibold text-gray-900">Historique des autorisations</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Projet
              </th>
              <th class="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ville
              </th>
              <th class="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entreprise
              </th>
              <th class="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th class="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="userAuthorizedProjects.length === 0">
              <td colspan="5" class="px-4 sm:px-6 py-8 text-center text-sm text-gray-500">
                Aucun projet autorisé pour cet utilisateur
              </td>
            </tr>
            <tr v-for="project in userAuthorizedProjects" :key="project.id" class="hover:bg-gray-50">
              <td class="px-4 sm:px-6 py-4">
                <div class="text-sm font-medium text-gray-900 truncate max-w-xs">{{ project.name }}</div>
                <div class="text-xs text-gray-500 sm:hidden">{{ project.city }}</div>
              </td>
              <td class="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ project.city }}</div>
              </td>
              <td class="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ project.entreprise }}</div>
              </td>
              <td class="px-4 sm:px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Autorisé
                </span>
              </td>
              <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="removeProjectPermission(project.id)"
                  class="text-red-600 hover:text-red-900 transition-colors"
                  title="Retirer l'autorisation"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { PermissionsService } from '@/services/permissions.service'
import { ProjectsService } from '@/services/projects.service'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const toast = useToast()

const userAuthorizedProjects = ref<any[]>([])

const users = ref<any[]>([])
const projects = ref<any[]>([])
const selectedUserId = ref('')
const selectedProjects = ref<string[]>([])
const loading = ref(false)

const filteredUsers = computed(() => {
  return users.value
})

const selectedUser = computed(() => {
  return users.value.find(user => user.id === selectedUserId.value)
})

const authorizedProjects = computed(() => {
  return projects.value.filter(project => selectedProjects.value.includes(project.id))
})


const availableProjects = computed(() => {
  if (!selectedUser.value) return projects.value

  const allowedIds = userAuthorizedProjects.value.map((p: any) => p.id) || []

  return projects.value.filter(project => !allowedIds.includes(project.id))
})


const loadUsers = async () => {
  try {
    const response = await PermissionsService.getEligibleUsers()
    users.value = response.data
    console.log(users.value)
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs:', error)
    toast.error('Erreur lors du chargement des utilisateurs')
  }
}

const loadProjects = async () => {
  try {
    const response = await ProjectsService.all()
    projects.value = response.data
    console.log(projects.value)
  } catch (error) {
    console.error('Erreur lors du chargement des projets:', error)
    toast.error('Erreur lors du chargement des projets')
  }
}

const loadUserPermissions = async () => {
  if (!selectedUserId.value) {
    selectedProjects.value = []
    userAuthorizedProjects.value = []
    return
  }

  try {
    const response = await PermissionsService.getUserPermissions(selectedUserId.value)
    console.log(response.data)
    // projets autorisés réels
    userAuthorizedProjects.value = response.data.allowedProjects || []

    // IDs pour les checkboxes
    selectedProjects.value = response.data.allowedProjects.map((p: any) => p.id)

  } catch (error) {
    console.error('Erreur lors du chargement des permissions:', error)
    selectedProjects.value = []
    userAuthorizedProjects.value = []
  }
}

const selectAllProjects = () => {
  if (selectedProjects.value.length === availableProjects.value.length) {
    selectedProjects.value = []
  } else {
    selectedProjects.value = availableProjects.value.map(p => p.id)
  }
}

const savePermissions = async () => {
  if (!selectedUserId.value) return

  loading.value = true
  try {
    await PermissionsService.assignProjects({
      userId: selectedUserId.value,
      projectIds: selectedProjects.value
    })
    toast.success('Autorisations enregistrées avec succès')
    await loadUserPermissions()
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des permissions:', error)
    toast.error('Erreur lors de l\'enregistrement des autorisations')
  } finally {
    loading.value = false
  }
}

const removeProjectPermission = async (projectId: string) => {
  if (!selectedUserId.value) return

  if (!confirm('Êtes-vous sûr de vouloir retirer cette autorisation ?')) {
    return
  }

  try {
    console.log(projectId)
    await PermissionsService.removeProject(selectedUserId.value, projectId)
    toast.success('Autorisation retirée avec succès')
    userAuthorizedProjects.value = userAuthorizedProjects.value.filter(project => project.id !== projectId)
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'autorisation:', error)
    toast.error('Erreur lors de la suppression de l\'autorisation')
  }
}

onMounted(() => {
  loadUsers()
  loadProjects()
})
</script>

<style scoped>
.form-group {
  @apply mb-4;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}

.form-input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500;
}
</style>
