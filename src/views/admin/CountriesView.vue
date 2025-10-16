<template>
  <div class="countries-management">
    <!-- Header Section -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="page-title">Gestion des Pays</h1>
          <p class="page-subtitle">Administrez les pays disponibles dans le système</p>
        </div>
        <div class="header-actions">
          <button
            @click="showCreateModal = true"
            class="btn-primary"
            v-if="authStore.canAccess.countries"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Nouveau Pays
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
            placeholder="Rechercher un pays..."
            class="search-input"
          />
        </div>
      </div>
    </div>

    <!-- Countries Table -->
    <div class="data-table-container">
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th class="table-header">Pays</th>
              <th class="table-header">Code ISO</th>
              <th class="table-header">Indicatif</th>
              <th class="table-header">Projets</th>
              <th class="table-header text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="country in filteredCountries"
              :key="country.id"
              class="table-row"
            >
              <td class="table-cell">
                <div class="country-info">
                  <span class="country-flag">{{ country.flag }}</span>
                  <div class="country-details">
                    <div class="country-name">{{ country.name }}</div>
                    <div class="country-code">{{ country.iso2 }}</div>
                  </div>
                </div>
              </td>
              <td class="table-cell">
                <span class="iso-code">{{ country.iso2 }}</span>
              </td>
              <td class="table-cell">
                <span class="dial-code">{{ country.dialCode }}</span>
              </td>
              <td class="table-cell">
                <div class="projects-count">
                  <span class="count-badge">{{ country.projectsCount }}</span>
                  <span class="count-label">projets</span>
                </div>
              </td>
              <td class="table-cell text-right">
                <div class="action-buttons">
                  <button
                    @click="viewCountry(country)"
                    class="btn-action btn-view"
                    title="Voir les détails"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                  <button
                    @click="editCountry(country)"
                    class="btn-action btn-edit"
                    title="Modifier"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button
                    @click="deleteCountry(country)"
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
      <div v-if="filteredCountries.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 class="empty-title">Aucun pays trouvé</h3>
        <p class="empty-description">
          {{ searchQuery ? 'Aucun pays ne correspond à votre recherche.' : 'Commencez par ajouter votre premier pays.' }}
        </p>
        <button
          v-if="!searchQuery"
          @click="showCreateModal = true"
          class="btn-primary"
        >
          Ajouter un pays
        </button>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="modal-overlay" @click="closeModals">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">
            {{ showCreateModal ? 'Nouveau Pays' : 'Modifier le Pays' }}
          </h3>
          <button @click="closeModals" class="modal-close">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="submitForm" class="modal-form">
          <div class="form-group">
            <label class="form-label">Nom du pays *</label>
            <input
              v-model="formData.name"
              type="text"
              class="form-input"
              placeholder="Ex: Côte d'Ivoire"
              required
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Code ISO2 *</label>
              <input
                v-model="formData.iso2"
                type="text"
                class="form-input"
                placeholder="Ex: CI"
                maxlength="2"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">Indicatif téléphonique *</label>
              <input
                v-model="formData.dialCode"
                type="text"
                class="form-input"
                placeholder="Ex: +225"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Emoji drapeau</label>
            <input
              v-model="formData.flag"
              type="text"
              class="form-input"
              placeholder="🇨🇮"
              maxlength="4"
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
    <div v-if="showViewModal && selectedCountry" class="modal-overlay" @click="closeModals">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Détails du Pays</h3>
          <button @click="closeModals" class="modal-close">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="view-content">
          <div class="country-header">
            <span class="country-flag-large">{{ selectedCountry.flag }}</span>
            <div>
              <h4 class="country-name-large">{{ selectedCountry.name }}</h4>
              <p class="country-code-large">{{ selectedCountry.iso2 }} • {{ selectedCountry.dialCode }}</p>
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">{{ selectedCountry.projectsCount }}</div>
              <div class="stat-label">Projets</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ getPropertiesCount(selectedCountry.id) }}</div>
              <div class="stat-label">Propriétés</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ getClientsCount(selectedCountry.id) }}</div>
              <div class="stat-label">Clients</div>
            </div>
          </div>
        </div>

        <div class="modal-actions">
          <button @click="editCountry(selectedCountry)" class="btn-primary">
            Modifier
          </button>
          <button @click="closeModals" class="btn-secondary">
            Fermer
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal && selectedCountry" class="modal-overlay" @click="closeModals">
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
              Êtes-vous sûr de vouloir supprimer le pays
              <strong>{{ selectedCountry.name }}</strong> ?
            </p>
            <p class="text-center text-sm text-red-600 mt-2">
              Cette action est irréversible et supprimera tous les projets associés.
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
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Reactive data
const searchQuery = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showDeleteModal = ref(false)
const selectedCountry = ref(null)
const isSubmitting = ref(false)
const isDeleting = ref(false)

// Form data
const formData = ref({
  name: '',
  iso2: '',
  dialCode: '',
  flag: ''
})

// Mock data
const countries = ref([
  {
    id: '1',
    name: 'Côte d\'Ivoire',
    iso2: 'CI',
    dialCode: '+225',
    flag: '🇨🇮',
    projectsCount: 5,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Ghana',
    iso2: 'GH',
    dialCode: '+233',
    flag: '🇬🇭',
    projectsCount: 3,
    createdAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'Sénégal',
    iso2: 'SN',
    dialCode: '+221',
    flag: '🇸🇳',
    projectsCount: 2,
    createdAt: new Date('2024-01-25')
  },
  {
    id: '4',
    name: 'Nigeria',
    iso2: 'NG',
    dialCode: '+234',
    flag: '🇳🇬',
    projectsCount: 4,
    createdAt: new Date('2024-02-01')
  }
])

// Computed properties
const filteredCountries = computed(() => {
  if (!searchQuery.value) return countries.value
  
  const query = searchQuery.value.toLowerCase()
  return countries.value.filter(country =>
    country.name.toLowerCase().includes(query) ||
    country.iso2.toLowerCase().includes(query) ||
    country.dialCode.includes(query)
  )
})

// Methods
const viewCountry = (country: any) => {
  selectedCountry.value = country
  showViewModal.value = true
}

const editCountry = (country: any) => {
  selectedCountry.value = country
  formData.value = {
    name: country.name,
    iso2: country.iso2,
    dialCode: country.dialCode,
    flag: country.flag
  }
  showEditModal.value = true
}

const deleteCountry = (country: any) => {
  selectedCountry.value = country
  showDeleteModal.value = true
}

const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (showCreateModal.value) {
      // Create new country
      const newCountry = {
        id: Date.now().toString(),
        ...formData.value,
        projectsCount: 0,
        createdAt: new Date()
      }
      countries.value.push(newCountry)
    } else {
      // Update existing country
      const index = countries.value.findIndex(c => c.id === selectedCountry.value.id)
      if (index !== -1) {
        countries.value[index] = {
          ...countries.value[index],
          ...formData.value
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
    
    const index = countries.value.findIndex(c => c.id === selectedCountry.value.id)
    if (index !== -1) {
      countries.value.splice(index, 1)
    }
    
    closeModals()
  } catch (error) {
    console.error('Error deleting country:', error)
  } finally {
    isDeleting.value = false
  }
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  showDeleteModal.value = false
  selectedCountry.value = null
  formData.value = {
    name: '',
    iso2: '',
    dialCode: '',
    flag: ''
  }
}

const getPropertiesCount = (countryId: string) => {
  // Mock implementation
  const counts = { '1': 24, '2': 18, '3': 12, '4': 30 }
  return counts[countryId] || 0
}

const getClientsCount = (countryId: string) => {
  // Mock implementation
  const counts = { '1': 45, '2': 32, '3': 28, '4': 52 }
  return counts[countryId] || 0
}

// Lifecycle
onMounted(() => {
  // Initialize component
})
</script>

<style scoped>
/* Page Layout */
.countries-management {
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

/* Country Info */
.country-info {
  @apply flex items-center space-x-3;
}

.country-flag {
  @apply text-2xl;
}

.country-details {
  @apply flex flex-col;
}

.country-name {
  @apply font-semibold text-navy-900;
}

.country-code {
  @apply text-sm text-gray-500;
}

.iso-code {
  @apply font-mono text-sm bg-gray-100 px-2 py-1 rounded;
}

.dial-code {
  @apply font-mono text-sm text-gray-700;
}

.projects-count {
  @apply flex items-center space-x-2;
}

.count-badge {
  @apply bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold;
}

.count-label {
  @apply text-sm text-gray-500;
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

.country-header {
  @apply flex items-center space-x-4 p-4 bg-gray-50 rounded-xl;
}

.country-flag-large {
  @apply text-4xl;
}

.country-name-large {
  @apply text-2xl font-bold text-navy-900;
}

.country-code-large {
  @apply text-gray-600;
}

.stats-grid {
  @apply grid grid-cols-3 gap-4;
}

.stat-card {
  @apply text-center p-4 bg-white border border-gray-200 rounded-xl;
}

.stat-value {
  @apply text-2xl font-bold text-blue-600;
}

.stat-label {
  @apply text-sm text-gray-600 mt-1;
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
  .countries-management {
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