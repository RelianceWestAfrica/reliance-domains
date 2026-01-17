<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Utilisateurs</h1>
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
                Nom & Prénoms
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Utilisateur
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rôle
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date de création
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
<!--              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">-->
<!--                {{ $t('common.actions') }}-->
<!--              </th>-->
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ user.firstName }} {{ user.lastName }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
<!--                  <img-->
<!--                    :src="user.avatar"-->
<!--                    :alt="user.fullname"-->
<!--                    class="w-10 h-10 rounded-full object-cover mr-3"-->
<!--                  />-->
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
                {{ formatDate(user.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                >
                  {{ user.isActive ? 'Actif' : 'Inactif' }}
                </span>
              </td>
<!--              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">-->
<!--                <div class="flex items-center justify-end space-x-2">-->
<!--                  <AppButton-->
<!--                    @click="editUser(user)"-->
<!--                    variant="ghost"-->
<!--                    size="sm"-->
<!--                  >-->
<!--                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>-->
<!--                    </svg>-->
<!--                  </AppButton>-->
<!--                  <AppButton-->
<!--                    v-if="user.id !== authStore.user?.id"-->
<!--                    @click="toggleUserStatus(user)"-->
<!--                    variant="ghost"-->
<!--                    size="sm"-->
<!--                    :class="user.active ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'"-->
<!--                  >-->
<!--                    <svg v-if="user.active" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"/>-->
<!--                    </svg>-->
<!--                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
<!--                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>-->
<!--                    </svg>-->
<!--                  </AppButton>-->
<!--                </div>-->
<!--              </td>-->
            </tr>
          </tbody>
        </table>
      </div>


      <!-- Create/Edit Modal -->
      <div v-if="showCreateModal || showEditModal" class="modal-overlay" @click="closeModals">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">
              {{ showCreateModal ? 'Nouveau Client' : 'Modifier le Client' }}
            </h3>
            <button @click="closeModals" class="modal-close">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <form @submit.prevent="submitForm" class="modal-form">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Prénom *</label>
                <input
                    v-model="formData.firstName"
                    type="text"
                    class="form-input"
                    placeholder="Ex: Admin"
                    required
                />
              </div>
              <div class="form-group">
                <label class="form-label">Nom *</label>
                <input
                    v-model="formData.lastName"
                    type="text"
                    class="form-input"
                    placeholder="Ex: Principal"
                    required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Email *</label>
                <input
                    v-model="formData.email"
                    type="email"
                    class="form-input"
                    placeholder="Ex: admin@example.com"
                    required
                />
              </div>
              <div class="form-group">
                <label class="form-label">Mot de passe *</label>
                <input
                    v-if="showCreateModal"
                    v-model="formData.password"
                    type="password"
                    class="form-input"
                    placeholder="Mot de passe"
                    required
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Role *</label>
              <select v-model="formData.role" class="form-input">
                <option value="SUPERADMIN">Super Admin</option>
                <option value="ADMIN">Administrateur</option>
                <option value="COMMERCIAL">Commercial</option>
              </select>
            </div>


            <div class="form-group">
              <label class="form-label">Status *</label>
              <select v-model="formData.is_active" class="form-input">
                <option :value="true">Actif</option>
                <option :value="false">Inactif</option>
              </select>
            </div>

            <div class="modal-actions">
              <button type="button" @click="closeModals" class="btn-secondary">
                Annuler
              </button>
              <button type="submit" class="btn-primary" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="loading-spinner"></span>
                {{ showCreateModal ? 'Créer' : 'Modifier' }}
              </button>
            </div>
          </form>
        </div>
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
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AppButton from '@/components/ui/AppButton.vue'
import { AuthService } from '@/services/auth.service.ts'

const authStore = useAuthStore()

const access = ref([])

const showCreateModal = ref(false)
const showEditModal = ref(false)
const isSubmitting = ref(false)
const selectedClient = ref<any>(null)
const users = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)


// Form data
const formData = ref({
  email: '',
  password: '', // uniquement pour la création
  firstName: '',
  lastName: '',
  role: 'COMMERCIAL' as 'SUPERADMIN' | 'ADMIN' | 'COMMERCIAL',
  is_active: true
})


/* =============================
   FETCH USERS
============================= */
const fetchUsers = async () => {
  loading.value = true
  error.value = null

  try {
    const { data } = await AuthService.userList()
    users.value = data.data ?? data // selon ton backend
  } catch (err: any) {
    console.error(err)
    error.value = 'Impossible de charger les utilisateurs'
  } finally {
    loading.value = false
  }
}

const fetchAccessCodes = async () => {
  loading.value = true
  error.value = null

  try {
    const { data } = await AuthService.listAccessCode()
    access.value = data.data ?? data // selon ton backend
  } catch (err: any) {
    console.error(err)
    error.value = 'Impossible de charger les acess'
  } finally {
    loading.value = false
  }
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  formData.value = {
    email: '',
    password: '', // uniquement pour la création
    firstName: '',
    lastName: '',
    role: null,
    is_active: false
  }
}

const submitForm = async () => {
  isSubmitting.value = true
  try {
    const payload = { ...formData.value }

    console.log(payload)
    if (showCreateModal) {
      await AuthService.register(payload)
    } else if (showEditModal && selectedClient.value) {
      // await AuthService.update(selectedClient.value.id, payload)
    }

    await fetchUsers()
    closeModals()
  } catch (error) {
    console.error('Erreur lors de la soumission:', error)
  } finally {
    isSubmitting.value = false
  }
}


onMounted(() => {
  fetchUsers()
  fetchAccessCodes()
})

/* =============================
   UI HELPERS
============================= */
const getRoleLabel = (role: string) => {
  const labels: Record<string, string> = {
    SUPERADMIN: 'Super Admin',
    ADMIN: 'Administrateur',
    COMMERCIAL: 'Commercial',
  }
  return labels[role] || role
}

const getRoleClasses = (role: string) => {
  const classes: Record<string, string> = {
    SUPERADMIN: 'bg-purple-100 text-purple-800',
    ADMIN: 'bg-blue-100 text-blue-800',
    COMMERCIAL: 'bg-green-100 text-green-800',
  }
  return classes[role] || 'bg-gray-100 text-gray-800'
}

const formatDate = (date: string) =>
    date
        ? new Date(date).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
        : '-'

/* =============================
   ACTIONS
============================= */
const editUser = (user: any) => {
  console.log('Edit user:', user)
  // open edit modal
}

const toggleUserStatus = async (user: any) => {
  user.active = !user.active
  // ⚠️ ici tu appelleras plus tard une route du genre:
  // PATCH /api/auth/user/:id/status
}

/* =============================
   CREATE USER
============================= */
const createUser = async (payload: any) => {
  try {
    await AuthService.register(payload)
    await fetchUsers()
    showCreateModal.value = false
  } catch (err) {
    console.error(err)
  }
}
</script>


<style scoped>
/* Import shared admin styles */
@import '../../style.css';

/* Page Layout */
.clients-management {
  @apply min-h-screen bg-gray-50 p-6;
}

.page-header {
  @apply bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8;
}

.header-content {
  @apply flex items-center justify-between;
}

.header-text h1 {
  @apply text-3xl font-bold text-navy-900 mb-2;
}

.header-text p {
  @apply text-gray-600 text-lg;
}

.header-actions {
  @apply flex items-center space-x-4;
}

/* Filters Section */
.filters-section {
  @apply bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8;
}

.search-container {
  @apply flex items-center space-x-4;
}

.search-input-wrapper {
  @apply relative flex-1 max-w-md;
}

.search-icon {
  @apply absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400;
}

.search-input {
  @apply w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200;
}

.filter-select {
  @apply px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200;
}

/* Data Table */
.data-table-container {
  @apply bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden;
}

.table-wrapper {
  @apply overflow-x-auto;
}

.data-table {
  @apply w-full;
}

.table-header {
  @apply px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 border-b border-gray-200;
}

.table-row {
  @apply hover:bg-gray-50 transition-colors duration-200;
}

.table-cell {
  @apply px-6 py-4 whitespace-nowrap border-b border-gray-100;
}

/* Client Info */
.client-info {
  @apply flex items-center space-x-3;
}

.client-avatar {
  @apply w-10 h-10 rounded-full object-cover;
}

.client-details {
  @apply flex flex-col;
}

.client-name {
  @apply font-semibold text-navy-900;
}

.client-gender {
  @apply text-sm text-gray-500;
}

.contact-info {
  @apply flex flex-col space-y-1;
}

.phone {
  @apply font-medium text-navy-900;
}

.email {
  @apply text-sm text-gray-500;
}

.nationality {
  @apply text-sm text-gray-700;
}

.acquisitions-count {
  @apply bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold;
}

/* Action Buttons */
.action-buttons {
  @apply flex items-center space-x-2;
}

.btn-action {
  @apply p-2 rounded-lg transition-all duration-200 hover:scale-105;
}

.btn-view {
  @apply text-blue-600 hover:bg-blue-50;
}

.btn-edit {
  @apply text-gold-600 hover:bg-gold-50;
}

.btn-delete {
  @apply text-red-600 hover:bg-red-50;
}

/* Buttons */
.btn-primary {
  @apply inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg;
}

.btn-secondary {
  @apply inline-flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300;
}

.btn-danger {
  @apply inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg;
}

/* Empty State */
.empty-state {
  @apply text-center py-16 px-6;
}

.empty-icon {
  @apply w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6;
}

.empty-icon svg {
  @apply text-gray-400;
}

.empty-title {
  @apply text-2xl font-semibold text-navy-900 mb-4;
}

.empty-description {
  @apply text-gray-600 mb-8 max-w-md mx-auto;
}

/* Modal Styles */
.modal-overlay {
  @apply fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4;
}

.modal-container {
  @apply bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden;
}

.modal-sm {
  @apply max-w-md;
}

.modal-header {
  @apply flex items-center justify-between p-6 border-b border-gray-200;
}

.modal-title {
  @apply text-xl font-semibold text-navy-900;
}

.modal-close {
  @apply p-2 text-gray-400 hover:text-gray-600 transition-colors;
}

.modal-form {
  @apply p-6 space-y-6;
}

.modal-content {
  @apply p-6;
}

.form-group {
  @apply space-y-2;
}

.form-row {
  @apply grid grid-cols-1 md:grid-cols-2 gap-4;
}

.form-label {
  @apply block text-sm font-semibold text-gray-700;
}

.form-input {
  @apply w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200;
}

.modal-actions {
  @apply flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50;
}

/* View Modal Specific */
.view-content {
  @apply p-6 space-y-6;
}

.client-header {
  @apply flex items-center space-x-4 p-4 bg-gray-50 rounded-xl;
}

.client-avatar-large {
  @apply w-16 h-16 rounded-full object-cover;
}

.client-name-large {
  @apply text-2xl font-bold text-navy-900;
}

.client-info-large {
  @apply text-gray-600;
}

.client-details-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-4;
}

.detail-item {
  @apply p-4 bg-white border border-gray-200 rounded-xl;
}

.detail-item label {
  @apply block text-sm font-medium text-gray-500 mb-1;
}

.detail-item span {
  @apply text-gray-900 font-medium;
}

/* Delete Warning */
.delete-warning {
  @apply text-center py-4;
}

/* Loading Spinner */
.loading-spinner {
  @apply inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin;
}

/* Responsive Design */
@media (max-width: 768px) {
  .clients-management {
    @apply p-4;
  }

  .header-content {
    @apply flex-col items-start space-y-4;
  }

  .search-container {
    @apply flex-col space-y-4 space-x-0;
  }

  .search-input-wrapper {
    @apply max-w-none;
  }

  .action-buttons {
    @apply flex-col space-y-2 space-x-0;
  }

  .btn-action {
    @apply w-full justify-center;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    @apply transition-none;
  }
}

/* Focus States */
button:focus-visible,
input:focus-visible,
select:focus-visible {
  @apply outline-none ring-2 ring-blue-500 ring-offset-2;
}
</style>

