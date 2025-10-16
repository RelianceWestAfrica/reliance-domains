<template>
  <div class="clients-management">
    <!-- Header Section -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="page-title">Gestion des Clients</h1>
          <p class="page-subtitle">Administrez la base de données clients</p>
        </div>
        <div class="header-actions">
          <button
            @click="showCreateModal = true"
            class="btn-primary"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Nouveau Client
          </button>
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="filters-section">
      <div class="search-container">
        <div class="search-input-wrapper">
          <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher un client..."
            class="search-input"
          />
        </div>
        <select v-model="genderFilter" class="filter-select">
          <option value="">Tous les genres</option>
          <option value="M">Homme</option>
          <option value="F">Femme</option>
        </select>
      </div>
    </div>

    <!-- Clients Table -->
    <div class="data-table-container">
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th class="table-header">Client</th>
              <th class="table-header">Contact</th>
              <th class="table-header">Nationalité</th>
              <th class="table-header">Acquisitions</th>
              <th class="table-header text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="client in filteredClients"
              :key="client.id"
              class="table-row"
            >
              <td class="table-cell">
                <div class="client-info">
                  <img
                    :src="client.avatar"
                    :alt="client.fullName"
                    class="client-avatar"
                  />
                  <div class="client-details">
                    <div class="client-name">{{ client.fullName }}</div>
                    <div class="client-gender">{{ client.gender === 'M' ? 'Homme' : 'Femme' }}</div>
                  </div>
                </div>
              </td>
              <td class="table-cell">
                <div class="contact-info">
                  <div class="phone">{{ client.phone }}</div>
                  <div class="email">{{ client.email }}</div>
                </div>
              </td>
              <td class="table-cell">
                <span class="nationality">{{ client.nationality }}</span>
              </td>
              <td class="table-cell">
                <span class="acquisitions-count">{{ client.acquisitionsCount }}</span>
              </td>
              <td class="table-cell text-right">
                <div class="action-buttons">
                  <button
                    @click="viewClient(client)"
                    class="btn-action btn-view"
                    title="Voir les détails"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button
                    @click="editClient(client)"
                    class="btn-action btn-edit"
                    title="Modifier"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button
                    @click="deleteClient(client)"
                    class="btn-action btn-delete"
                    title="Supprimer"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredClients.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
          </svg>
        </div>
        <h3 class="empty-title">Aucun client trouvé</h3>
        <p class="empty-description">
          {{ searchQuery ? 'Aucun client ne correspond à votre recherche.' : 'Commencez par ajouter votre premier client.' }}
        </p>
        <button
          v-if="!searchQuery"
          @click="showCreateModal = true"
          class="btn-primary"
        >
          Ajouter un client
        </button>
      </div>
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
                placeholder="Ex: Marie"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">Nom *</label>
              <input
                v-model="formData.lastName"
                type="text"
                class="form-input"
                placeholder="Ex: Dupont"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Genre *</label>
            <select v-model="formData.gender" class="form-input" required>
              <option value="">Sélectionner un genre</option>
              <option value="M">Homme</option>
              <option value="F">Femme</option>
            </select>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Téléphone *</label>
              <input
                v-model="formData.phone"
                type="tel"
                class="form-input"
                placeholder="Ex: +225 07 12 34 56 78"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">Email *</label>
              <input
                v-model="formData.email"
                type="email"
                class="form-input"
                placeholder="Ex: marie.dupont@email.com"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Adresse *</label>
            <textarea
              v-model="formData.address"
              class="form-input"
              rows="3"
              placeholder="Ex: Abidjan, Cocody"
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Nationalité *</label>
            <input
            <FileUpload
              v-model="formData.profileImage"
              label="Photo de profil"
              accept="image/*"
              :max-size="2"
              upload-text="Upload profile photo"
            />
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

    <!-- View Modal -->
    <div v-if="showViewModal && selectedClient" class="modal-overlay" @click="closeModals">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Détails du Client</h3>
          <button @click="closeModals" class="modal-close">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="view-content">
          <div class="client-header">
            <img :src="selectedClient.avatar" :alt="selectedClient.fullName" class="client-avatar-large"/>
            <div>
              <h4 class="client-name-large">{{ selectedClient.fullName }}</h4>
              <p class="client-info-large">{{ selectedClient.gender === 'M' ? 'Homme' : 'Femme' }} • {{ selectedClient.nationality }}</p>
            </div>
          </div>

          <div class="client-details-grid">
            <div class="detail-item">
              <label>Téléphone</label>
              <span>{{ selectedClient.phone }}</span>
            </div>
            <div class="detail-item">
              <label>Email</label>
              <span>{{ selectedClient.email }}</span>
            </div>
            <div class="detail-item">
              <label>Adresse</label>
              <span>{{ selectedClient.address }}</span>
            </div>
            <div class="detail-item">
              <label>Acquisitions</label>
              <span>{{ selectedClient.acquisitionsCount }}</span>
            </div>
          </div>
        </div>

        <div class="modal-actions">
          <button @click="editClient(selectedClient)" class="btn-primary">
            Modifier
          </button>
          <button @click="closeModals" class="btn-secondary">
            Fermer
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal && selectedClient" class="modal-overlay" @click="closeModals">
      <div class="modal-container modal-sm" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title text-red-600">Confirmer la suppression</h3>
          <button @click="closeModals" class="modal-close">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="modal-content">
          <div class="delete-warning">
            <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            <p class="text-center text-gray-700">
              Êtes-vous sûr de vouloir supprimer le client
              <strong>{{ selectedClient.fullName }}</strong> ?
            </p>
            <p class="text-center text-sm text-red-600 mt-2">
              Cette action est irréversible et supprimera toutes les acquisitions associées.
            </p>
          </div>
        </div>

        <div class="modal-actions">
          <button @click="closeModals" class="btn-secondary">
            Annuler
          </button>
          <button @click="confirmDelete" class="btn-danger" :disabled="isDeleting">
            <span v-if="isDeleting" class="loading-spinner"></span>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import FileUpload from '@/components/ui/FileUpload.vue'

// Reactive data
const searchQuery = ref('')
const genderFilter = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showDeleteModal = ref(false)
const selectedClient = ref(null)
const isSubmitting = ref(false)
const isDeleting = ref(false)

// Form data
const formData = ref({
  firstName: '',
  lastName: '',
  gender: '',
  phone: '',
  email: '',
  address: '',
  nationality: '',
  profileImage: ''
})

// Mock data
const clients = ref([
  {
    id: '1',
    firstName: 'Marie',
    lastName: 'Dupont',
    fullName: 'Marie Dupont',
    gender: 'F',
    phone: '+225 07 12 34 56 78',
    email: 'marie.dupont@email.com',
    address: 'Abidjan, Cocody',
    nationality: 'Française',
    avatar: 'https://ui-avatars.com/api/?name=Marie+Dupont&background=3b82f6&color=fff',
    acquisitionsCount: 2,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    firstName: 'Jean',
    lastName: 'Martin',
    fullName: 'Jean Martin',
    gender: 'M',
    phone: '+233 24 123 4567',
    email: 'jean.martin@email.com',
    address: 'Accra, East Legon',
    nationality: 'Ghanéenne',
    avatar: 'https://ui-avatars.com/api/?name=Jean+Martin&background=10b981&color=fff',
    acquisitionsCount: 1,
    createdAt: new Date('2024-01-20')
  },
  {
    id: '3',
    firstName: 'Sophie',
    lastName: 'Dubois',
    fullName: 'Sophie Dubois',
    gender: 'F',
    phone: '+221 77 123 45 67',
    email: 'sophie.dubois@email.com',
    address: 'Dakar, Almadies',
    nationality: 'Sénégalaise',
    avatar: 'https://ui-avatars.com/api/?name=Sophie+Dubois&background=f59e0b&color=fff',
    acquisitionsCount: 3,
    createdAt: new Date('2024-01-25')
  }
])

// Computed properties
const filteredClients = computed(() => {
  let filtered = clients.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(client =>
      client.fullName.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query) ||
      client.phone.includes(query)
    )
  }

  if (genderFilter.value) {
    filtered = filtered.filter(client => client.gender === genderFilter.value)
  }

  return filtered
})

// Methods
const viewClient = (client: any) => {
  selectedClient.value = client
  showViewModal.value = true
}

const editClient = (client: any) => {
  selectedClient.value = client
  formData.value = {
    firstName: client.firstName,
    lastName: client.lastName,
    gender: client.gender,
    phone: client.phone,
    email: client.email,
    address: client.address,
    nationality: client.nationality,
    profileImage: client.profileImage || ''
  }
  showEditModal.value = true
}

const deleteClient = (client: any) => {
  selectedClient.value = client
  showDeleteModal.value = true
}

const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (showCreateModal.value) {
      // Create new client
      const newClient = {
        id: Date.now().toString(),
        ...formData.value,
        fullName: `${formData.value.firstName} ${formData.value.lastName}`,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.value.firstName + '+' + formData.value.lastName)}&background=3b82f6&color=fff`,
        acquisitionsCount: 0,
        createdAt: new Date()
      }
      clients.value.push(newClient)
    } else {
      // Update existing client
      const index = clients.value.findIndex(c => c.id === selectedClient.value.id)
      if (index !== -1) {
        clients.value[index] = {
          ...clients.value[index],
          ...formData.value,
          fullName: `${formData.value.firstName} ${formData.value.lastName}`,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.value.firstName + '+' + formData.value.lastName)}&background=3b82f6&color=fff`
        }
      }
    }
    
    closeModals()
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    isSubmitting.value = false
  }
}

const confirmDelete = async () => {
  isDeleting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const index = clients.value.findIndex(c => c.id === selectedClient.value.id)
    if (index !== -1) {
      clients.value.splice(index, 1)
    }
    
    closeModals()
  } catch (error) {
    console.error('Error deleting client:', error)
  } finally {
    isDeleting.value = false
  }
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  showDeleteModal.value = false
  selectedClient.value = null
  formData.value = {
    firstName: '',
    lastName: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    nationality: '',
    profileImage: ''
  }
}

// Lifecycle
onMounted(() => {
  // Initialize component
})
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