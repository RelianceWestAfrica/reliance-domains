<template>
  <div class="residences-management">
    <!-- Header Section -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="page-title">Gestion des Résidences</h1>
          <p class="page-subtitle">Administrez les résidences et immeubles</p>
        </div>
        <div class="header-actions">
          <button
            @click="showCreateModal = true"
            class="btn-primary"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Nouvelle Résidence
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
            placeholder="Rechercher une résidence..."
            class="search-input"
          />
        </div>
        <select v-model="domainFilter" class="filter-select">
          <option value="">Tous les domaines</option>
          <option
              v-for="domain in domains"
              :key="domain.id"
              :value="domain.id"
          >
            {{ domain.title }}
          </option>
        </select>

        <select v-model="typeFilter" class="filter-select">
          <option value="">Tous les types</option>
          <option value="IMMEUBLE">IMMEUBLE</option>
          <option value="VILLAS">VILLAS</option>
          <option value="AUTRE">AUTRE</option>
        </select>
      </div>
    </div>

    <!-- Residences Grid -->
    <div class="residences-grid">
      <div
        v-for="residence in filteredResidences"
        :key="residence.id"
        class="residence-card"
        @click="viewResidence(residence)"
      >
        <div class="residence-image">
          <img
            :src="residence.imageUrl"
            :alt="residence.title"
            class="residence-img"
          />
          <div class="residence-status">
            <span
              class="status-badge"
              :class="residence.published ? 'status-published' : 'status-draft'"
            >
              {{ residence.published ? 'Publié' : 'Brouillon' }}
            </span>
          </div>
          <div class="residence-type">
            <span class="type-badge">{{ residence.type }}</span>
          </div>
        </div>
        
        <div class="residence-content">
          <div class="residence-header">
            <h3 class="residence-title">{{ residence.title }}</h3>
          </div>
          
          <p class="residence-description">{{ residence.description }}</p>
          
          <div class="residence-project">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <span>{{ residence.projectTitle }}</span>
          </div>
          
          <div class="residence-stats">
            <div class="stat-item">
              <span class="stat-value">{{ residence.floorsCount }}</span>
              <span class="stat-label">étages</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ residence.unitsCount }}</span>
              <span class="stat-label">unités</span>
            </div>
          </div>

          <div class="residence-actions">
            <button
              v-if="canAccessBilanVisuel"
              @click.stop="viewBilanVisuel(residence)"
              class="btn-action btn-bilan"
              title="Bilan visuel"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </button>
            <button
              @click.stop="editResidence(residence)"
              class="btn-action btn-edit"
              title="Modifier"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button
              @click.stop="deleteResidence(residence)"
              class="btn-action btn-delete"
              title="Supprimer"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredResidences.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
        </svg>
      </div>
      <h3 class="empty-title">Aucune résidence trouvée</h3>
      <p class="empty-description">
        {{ searchQuery ? 'Aucune résidence ne correspond à votre recherche.' : 'Commencez par ajouter votre première résidence.' }}
      </p>
      <button
        v-if="!searchQuery"
        @click="showCreateModal = true"
        class="btn-primary"
      >
        Ajouter une résidence
      </button>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="modal-overlay" @click="closeModals">
      <div class="modal-container modal-lg" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">
            {{ showCreateModal ? 'Nouvelle Résidence' : 'Modifier la Résidence' }}
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
              <label class="form-label">Titre de la résidence *</label>
              <input
                v-model="formData.title"
                type="text"
                class="form-input"
                placeholder="Ex: Tour A - Résidence Étoile"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">Type de résidence *</label>
              <select v-model="formData.type" class="form-input" required>
                <option value="">Sélectionner un type</option>
                <option value="IMMEUBLE">IMMEUBLE</option>
                <option value="VILLAS">VILLAS</option>
                <option value="AUTRE">AUTRE</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Domaines *</label>
<!--            <select v-model="formData.projectId" class="form-input" required>-->
<!--              <option value="">Sélectionner un projet</option>-->
<!--              <option value="1">Résidence Étoile</option>-->
<!--              <option value="2">Villa Paradise</option>-->
<!--              <option value="3">Golden Heights</option>-->
<!--            </select>-->
            <select
                v-model="formData.domainId"
                class="form-input"
                :disabled="isLoadingDomains"
                required
            >
              <option value="" disabled>
                {{ isLoadingDomains ? 'Chargement...' : 'Sélectionner un domaine' }}
              </option>

              <option
                  v-for="domain in domains"
                  :key="domain.id"
                  :value="domain.id"
              >
                {{ domain.title }}
              </option>
            </select>

          </div>

          <div class="form-group">
            <label class="form-label">Description *</label>
            <textarea
              v-model="formData.description"
              class="form-input"
              rows="4"
              placeholder="Description détaillée de la résidence..."
              required
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nombre d'étages *</label>
              <input
                v-model.number="formData.floorsCount"
                type="number"
                class="form-input"
                placeholder="Ex: 15"
                min="1"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">Nombre d'unités *</label>
              <input
                v-model.number="formData.unitsCount"
                type="number"
                class="form-input"
                placeholder="Ex: 32"
                min="1"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">URL de l'image</label>
<!--            <input-->
<!--              v-model="formData.imageUrl"-->
<!--              type="url"-->
<!--              class="form-input"-->
<!--              placeholder="https://example.com/image.jpg"-->
<!--            />-->

            <Upload @uploaded="handleUploaded" />
          </div>

          <div class="form-group">
            <label class="form-checkbox">
              <input
                v-model="formData.published"
                type="checkbox"
                class="checkbox-input"
              />
              <span class="checkbox-label">Publier la résidence</span>
            </label>
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
    <div v-if="showViewModal && selectedResidence" class="modal-overlay" @click="closeModals">
      <div class="modal-container modal-lg" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Détails de la Résidence</h3>
          <button @click="closeModals" class="modal-close">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="view-content">
          <div class="residence-view-header">
            <img :src="selectedResidence.image" :alt="selectedResidence.title" class="residence-image-large"/>
            <div class="residence-info-large">
              <h4 class="residence-title-large">{{ selectedResidence.title }}</h4>
              <p class="residence-type-large">{{ selectedResidence.type }}</p>
              <p class="residence-project-large">{{ selectedResidence.projectTitle }}</p>
              <div class="residence-status-large">
                <span
                  class="status-badge-large"
                  :class="selectedResidence.published ? 'status-published' : 'status-draft'"
                >
                  {{ selectedResidence.published ? 'Publié' : 'Brouillon' }}
                </span>
              </div>
            </div>
          </div>

          <div class="residence-details-grid">
            <div class="detail-section">
              <h5 class="detail-title">Caractéristiques</h5>
              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-value">{{ selectedResidence.floorsCount }}</div>
                  <div class="stat-label">Étages</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">{{ selectedResidence.unitsCount }}</div>
                  <div class="stat-label">Unités</div>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <h5 class="detail-title">Informations</h5>
              <div class="detail-grid">
                <div class="detail-item">
                  <label>Type</label>
                  <span>{{ selectedResidence.type }}</span>
                </div>
                <div class="detail-item">
                  <label>Projet</label>
                  <span>{{ selectedResidence.projectTitle }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="residence-description-section">
            <h5 class="detail-title">Description</h5>
            <p class="residence-description-full">{{ selectedResidence.description }}</p>
          </div>
        </div>

        <div class="modal-actions">
          <button @click="editResidence(selectedResidence)" class="btn-primary">
            Modifier
          </button>
          <button @click="closeModals" class="btn-secondary">
            Fermer
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal && selectedResidence" class="modal-overlay" @click="closeModals">
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
              Êtes-vous sûr de vouloir supprimer la résidence
              <strong>{{ selectedResidence.title }}</strong> ?
            </p>
            <p class="text-center text-sm text-red-600 mt-2">
              Cette action est irréversible et supprimera tous les paliers et propriétés associés.
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
import {ref, computed, onMounted, watch} from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import FileUpload from '@/components/ui/FileUpload.vue'
import {ResidencesService} from "@/services/residences.service.ts";
import { DomainsService } from '@/services/domains.service'
import Upload from "@/components/Upload.vue";


const router = useRouter()
const authStore = useAuthStore()

const domains = ref<any[]>([])
const isLoadingDomains = ref(false)

const domainFilter = ref('')


const canAccessBilanVisuel = computed(() => {
  const role = authStore.user?.role?.toLowerCase()
  return role === 'admin' || role === 'superadmin'
})

// Reactive data
const searchQuery = ref('')
const projectFilter = ref('')
const typeFilter = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showDeleteModal = ref(false)
const selectedResidence = ref(null)
const isSubmitting = ref(false)
const isDeleting = ref(false)

// Form data
const formData = ref({
  title: '',
  type: '',
  domainId: '',
  description: '',
  floorsCount: 1,
  unitsCount: 1,
  imageUrl: '',
  published: false
})


// Mock data
const residences = ref<any[]>([])

const fetchDomains = async () => {
  isLoadingDomains.value = true
  try {
    const { data } = await DomainsService.all()
    domains.value = data
  } catch (error) {
    console.error('Erreur chargement domaines', error)
  } finally {
    isLoadingDomains.value = false
  }
}

const handleUploaded = (url: string) => {
  console.log('Fichier uploadé :', url);
  formData.value.imageUrl = url;
};

const fetchResidences = async () => {
  try {
    const { data } = await ResidencesService.all({
      search: searchQuery.value || undefined,
      domainId: domainFilter.value || undefined,
      type: typeFilter.value || undefined,
    })

    residences.value = data
  } catch (error) {
    console.error('Erreur chargement résidences', error)
  }
}


// Computed properties
const filteredResidences = computed(() => {
  let result = [...residences.value]

  if (searchQuery.value?.trim()) {
    const query = searchQuery.value.toLowerCase()

    result = result.filter(r =>
        (r.title ?? '').toLowerCase().includes(query) ||
        (r.description ?? '').toLowerCase().includes(query) ||
        (r.projectTitle ?? '').toLowerCase().includes(query)
    )
  }

  if (projectFilter.value) {
    result = result.filter(r => r.projectId === projectFilter.value)
  }

  if (typeFilter.value) {
    result = result.filter(r => r.type === typeFilter.value)
  }

  return result
})

// Methods
const viewBilanVisuel = (residence: any) => {
  router.push({
    name: 'BilanVisuel',
    query: { residenceId: residence.id }
  })
}

const viewResidence = (residence: any) => {
  selectedResidence.value = residence
  showViewModal.value = true
}

const editResidence = (residence: any) => {
  selectedResidence.value = residence
  formData.value = {
    title: residence.title,
    type: residence.type,
    domainId: residence.domainId,
    description: residence.description,
    floorsCount: residence.floorsCount,
    unitsCount: residence.unitsCount,
    imageUrl: residence.imageUrl,
    published: residence.published
  }
  showEditModal.value = true
  fetchDomains()
}

const deleteResidence = (residence: any) => {
  selectedResidence.value = residence
  showDeleteModal.value = true
}

const submitForm = async () => {
  isSubmitting.value = true

  try {
    if (showCreateModal.value) {
      await ResidencesService.create(formData.value)
    } else if (selectedResidence.value) {
      await ResidencesService.update(
          selectedResidence.value.id,
          formData.value
      )
    }

    await fetchResidences()
    closeModals()
  } catch (error) {
    console.error('Erreur sauvegarde résidence', error)
  } finally {
    isSubmitting.value = false
  }
}

const confirmDelete = async () => {
  if (!selectedResidence.value) return

  isDeleting.value = true

  try {
    await ResidencesService.delete(selectedResidence.value.id)
    await fetchResidences()
    closeModals()
  } catch (error) {
    console.error('Erreur suppression', error)
  } finally {
    isDeleting.value = false
  }
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  showDeleteModal.value = false
  selectedResidence.value = null
  formData.value = {
    title: '',
    type: '',
    domainId: '',
    description: '',
    floorsCount: 1,
    unitsCount: 1,
    imageUrl: '',
    published: false
  }
}

// Lifecycle
onMounted(() => {
  // Initialize component
  fetchResidences()
  fetchDomains()
})
</script>

<style scoped>
/* Import shared admin styles */
@import '../../style.css';

/* Page Layout */
.residences-management {
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

/* Residences Grid */
.residences-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8;
}

.residence-card {
  @apply bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer;
}

.residence-image {
  @apply relative h-48 overflow-hidden;
}

.residence-img {
  @apply w-full h-full object-cover transition-transform duration-300;
}

.residence-card:hover .residence-img {
  @apply scale-110;
}

.residence-status {
  @apply absolute top-4 left-4;
}

.status-badge {
  @apply px-3 py-1 text-xs font-semibold rounded-full;
}

.status-published {
  @apply bg-green-100 text-green-800;
}

.status-draft {
  @apply bg-gray-100 text-gray-800;
}

.residence-type {
  @apply absolute top-4 right-4;
}

.type-badge {
  @apply px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded;
}

.residence-content {
  @apply p-6;
}

.residence-header {
  @apply mb-3;
}

.residence-title {
  @apply text-lg font-semibold text-navy-900;
}

.residence-description {
  @apply text-gray-600 text-sm mb-4 line-clamp-2;
}

.residence-project {
  @apply flex items-center space-x-2 text-sm text-gray-500 mb-4;
}

.residence-stats {
  @apply flex items-center space-x-4 mb-4;
}

.stat-item {
  @apply text-center;
}

.stat-value {
  @apply text-lg font-bold text-blue-600;
}

.stat-label {
  @apply text-xs text-gray-500;
}

.residence-actions {
  @apply flex items-center justify-end space-x-2;
}

/* Action Buttons */
.btn-action {
  @apply p-2 rounded-lg transition-all duration-200 hover:scale-105;
}

.btn-bilan {
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

.modal-lg {
  @apply max-w-4xl;
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
  @apply p-6 space-y-6 max-h-[70vh] overflow-y-auto;
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

.form-checkbox {
  @apply flex items-center space-x-3;
}

.checkbox-input {
  @apply w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500;
}

.checkbox-label {
  @apply text-sm font-medium text-gray-700;
}

.modal-actions {
  @apply flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50;
}

/* View Modal Specific */
.view-content {
  @apply p-6 space-y-6 max-h-[70vh] overflow-y-auto;
}

.residence-view-header {
  @apply flex items-start space-x-6 p-6 bg-gray-50 rounded-xl;
}

.residence-image-large {
  @apply w-32 h-32 rounded-xl object-cover;
}

.residence-info-large {
  @apply flex-1;
}

.residence-title-large {
  @apply text-2xl font-bold text-navy-900 mb-2;
}

.residence-type-large {
  @apply text-lg text-blue-600 font-medium mb-1;
}

.residence-project-large {
  @apply text-gray-600 mb-3;
}

.residence-status-large {
  @apply flex items-center space-x-2;
}

.status-badge-large {
  @apply px-3 py-1 text-sm font-semibold rounded-full;
}

.residence-details-grid {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-6;
}

.detail-section {
  @apply space-y-4;
}

.detail-title {
  @apply text-lg font-semibold text-navy-900;
}

.detail-grid {
  @apply space-y-3;
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

.stats-grid {
  @apply grid grid-cols-2 gap-4;
}

.stat-card {
  @apply text-center p-4 bg-white border border-gray-200 rounded-xl;
}

.stat-card .stat-value {
  @apply text-2xl font-bold text-blue-600;
}

.stat-card .stat-label {
  @apply text-sm text-gray-600 mt-1;
}

.residence-description-section {
  @apply space-y-4;
}

.residence-description-full {
  @apply text-gray-700 leading-relaxed;
}

/* Delete Warning */
.delete-warning {
  @apply text-center py-4;
}

/* Loading Spinner */
.loading-spinner {
  @apply inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Responsive Design */
@media (max-width: 768px) {
  .residences-management {
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
  
  .residences-grid {
    @apply grid-cols-1;
  }
  
  .residence-view-header {
    @apply flex-col space-y-4 space-x-0;
  }
  
  .residence-image-large {
    @apply w-full h-48;
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