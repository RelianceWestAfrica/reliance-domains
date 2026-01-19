<template>
  <div v-if="isLoading" class="text-center py-12 text-gray-500">
    Chargement des domaines...
  </div>

  <div class="domains-management">
    <!-- Header Section -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="page-title">Domaines</h1>
          <p class="page-subtitle">Administrez les domaines immobiliers</p>
        </div>
        <div class="header-actions">
          <button
            @click="showCreateModal = true"
            class="btn-primary"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Nouveau Domaine
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
            placeholder="Rechercher un domaine..."
            class="search-input"
          />
        </div>
        <select v-model="projectFilter" class="filter-select">
          <option value="">Tous les projets</option>

          <option
              v-for="project in projects"
              :key="project.id"
              :value="project.id"
          >
            {{ project.name }}
          </option>
        </select>

        <select v-model="typeFilter" class="filter-select">
          <option value="">Tous les types</option>
          <option value="residential">Résidentiel</option>
          <option value="hospital">Hôpital</option>
          <option value="commercial">Commercial</option>
          <option value="mixed">Mixte</option>
          <option value="villa">Villa</option>
        </select>
      </div>
    </div>

    <!-- Domains Grid -->
    <div class="domains-grid">
      <div
        v-for="domain in domains"
        :key="domain.id"
        class="domain-card"
        @click="viewDomain(domain)"
      >
        <div class="domain-image">
          <img
            :src="domain.imageUrl"
            :alt="domain.title"
            class="domain-img"
          />
          <div class="domain-status">
            <span
              class="status-badge"
              :class="domain.published ? 'status-published' : 'status-draft'"
            >
              {{ domain.published ? 'Publié' : 'Brouillon' }}
            </span>
          </div>
          <div class="domain-type">
            <span class="type-badge">{{ getDomainTypeLabel(domain.domainType) }}</span>
          </div>
        </div>

        <div class="domain-content">
          <div class="domain-header">
            <h3 class="domain-title">{{ domain.title }}</h3>
          </div>

          <p class="domain-description">{{ domain.description }}</p>

          <div class="domain-project">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <span>{{ domain.projectTitle }}</span>
          </div>

          <div class="domain-stats">
            <div class="stat-item">
              <span class="stat-value">{{ domain.residencesCount }}</span>
              <span class="stat-label">résidences</span>
            </div>
          </div>

          <div class="domain-actions">
            <button
              @click.stop="editDomain(domain)"
              class="btn-action btn-edit"
              title="Modifier"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button
              @click.stop="deleteDomain(domain)"
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
    <div v-if="domains.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
      </div>
      <h3 class="empty-title">Aucun domaine trouvé</h3>
      <p class="empty-description">
        {{ searchQuery ? 'Aucun domaine ne correspond à votre recherche.' : 'Commencez par ajouter votre premier domaine.' }}
      </p>
      <button
        v-if="!searchQuery"
        @click="showCreateModal = true"
        class="btn-primary"
      >
        Ajouter un domaine
      </button>
    </div>

    <!-- Create/Edit Modal -->
    <DomainModal
        v-if="showCreateModal || showEditModal"
        :domain="selectedDomain"
        :projects="projects"
        :is-edit="showEditModal"
        @close="closeModals"
        @submit="submitForm"
    />

    <!-- View Modal -->
    <div v-if="showViewModal && selectedDomain" class="modal-overlay" @click="closeModals">
      <div class="modal-container modal-lg" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Détails du Domaine</h3>
          <button @click="closeModals" class="modal-close">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="view-content">
          <div class="domain-view-header">
            <img :src="selectedDomain.imageUrl" :alt="selectedDomain.title" class="domain-image-large"/>
            <div class="domain-info-large">
              <h4 class="domain-title-large">{{ selectedDomain.title }}</h4>
              <p class="domain-type-large">{{ getDomainTypeLabel(selectedDomain.domainType) }}</p>
              <p class="domain-project-large">{{ selectedDomain.projectTitle }}</p>
              <div class="domain-status-large">
                <span
                  class="status-badge-large"
                  :class="selectedDomain.published ? 'status-published' : 'status-draft'"
                >
                  {{ selectedDomain.published ? 'Publié' : 'Brouillon' }}
                </span>
              </div>
            </div>
          </div>

          <div class="domain-details-grid">
            <div class="detail-section">
              <h5 class="detail-title">Informations</h5>
              <div class="detail-grid">
                <div class="detail-item">
                  <label>Type</label>
                  <span>{{ getDomainTypeLabel(selectedDomain.domainType) }}</span>
                </div>
                <div class="detail-item">
                  <label>Projet</label>
                  <span>{{ selectedDomain.projectTitle }}</span>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <h5 class="detail-title">Statistiques</h5>
              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-value">{{ selectedDomain.residencesCount }}</div>
                  <div class="stat-label">Résidences</div>
                </div>
              </div>
            </div>
          </div>

          <div class="domain-description-section">
            <h5 class="detail-title">Description</h5>
            <p class="domain-description-full">{{ selectedDomain.description }}</p>
          </div>
        </div>

        <div class="modal-actions">
          <button @click="editDomain(selectedDomain)" class="btn-primary">
            Modifier
          </button>
          <button @click="closeModals" class="btn-secondary">
            Fermer
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal && selectedDomain" class="modal-overlay" @click="closeModals">
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
              Êtes-vous sûr de vouloir supprimer le domaine
              <strong>{{ selectedDomain.title }}</strong> ?
            </p>
            <p class="text-center text-sm text-red-600 mt-2">
              Cette action est irréversible et supprimera toutes les résidences associées.
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
import { ref, computed, onMounted, watch } from 'vue'
import DomainModal from '@/components/modals/DomainModal.vue'
import { DomainsService } from '@/services/domains.service.ts'
import { ProjectsService } from '@/services/projects.service.ts'



const searchQuery = ref('')
const projectFilter = ref('')
const typeFilter = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showDeleteModal = ref(false)
const selectedDomain = ref(null)
const isDeleting = ref(false)

const domains = ref<any[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

const projects = ref<any[]>([])
const isProjectsLoading = ref(false)


const viewDomain = async (domain: any) => {
  try {
    const { data } = await DomainsService.get(domain.id)
    selectedDomain.value = data
    showViewModal.value = true
  } catch (e) {
    console.error(e)
  }
}

const fetchProjects = async () => {
  isProjectsLoading.value = true

  try {
    const { data } = await ProjectsService.all()
    // ⚠️ adapte si backend retourne data.data
    projects.value = data
  } catch (error) {
    console.error('Erreur chargement projets', error)
  } finally {
    isProjectsLoading.value = false
  }
}

const filteredDomains = computed(() => {
  let filtered = domains.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(domain =>
      domain.title.toLowerCase().includes(query) ||
      domain.description.toLowerCase().includes(query) ||
      domain.projectTitle.toLowerCase().includes(query)
    )
  }

  if (projectFilter.value) {
    filtered = filtered.filter(domain => domain.projectId === projectFilter.value)
  }

  if (typeFilter.value) {
    filtered = filtered.filter(domain => domain.domainType === typeFilter.value)
  }

  return filtered
})

const fetchDomains = async () => {
  isLoading.value = true
  error.value = null

  try {
    const params: any = {}

    if (searchQuery.value) params.search = searchQuery.value
    if (projectFilter.value) params.projectId = projectFilter.value
    if (typeFilter.value) params.domainType = typeFilter.value

    const { data } = await DomainsService.all(params)

    // ⚠️ adapte si ton backend enveloppe la réponse (ex: data.data)
    domains.value = data
  } catch (err: any) {
    console.error(err)
    error.value = 'Erreur lors du chargement des domaines'
  } finally {
    isLoading.value = false
  }
}


const getDomainTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    'residential': 'Résidentiel',
    'hospital': 'Hôpital',
    'commercial': 'Commercial',
    'mixed': 'Mixte',
    'villa': 'Villa',
    'industrial': 'Industriel',
    'office': 'Bureau'
  }
  return labels[type] || type
}

const editDomain = (domain: any) => {
  selectedDomain.value = domain
  showViewModal.value = false
  showEditModal.value = true
}

const deleteDomain = (domain: any) => {
  selectedDomain.value = domain
  showDeleteModal.value = true
}

const submitForm = async (payload: any) => {
  try {
    if (showEditModal.value && selectedDomain.value) {
      await DomainsService.update(selectedDomain.value.id, payload)
    } else {
      await DomainsService.create(payload)
    }

    await fetchDomains()
    closeModals()
  } catch (e) {
    console.error('Erreur sauvegarde domaine', e)
  }
}


const confirmDelete = async () => {
  isDeleting.value = true

  try {
    await DomainsService.delete(selectedDomain.value.id)
    closeModals()
    fetchDomains()
  } catch (error) {
    console.error('Error deleting domain:', error)
  } finally {
    isDeleting.value = false
  }
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  showDeleteModal.value = false
  selectedDomain.value = null
}

onMounted(() => {
  fetchDomains()
  fetchProjects()
})

watch([searchQuery, projectFilter, typeFilter], () => {
  fetchDomains();
})
</script>

<style scoped>
@import '../../style.css';

.domains-management {
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

.domains-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8;
}

.domain-card {
  @apply bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer;
}

.domain-image {
  @apply relative h-48 overflow-hidden;
}

.domain-img {
  @apply w-full h-full object-cover transition-transform duration-300;
}

.domain-card:hover .domain-img {
  @apply scale-110;
}

.domain-status {
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

.domain-type {
  @apply absolute top-4 right-4;
}

.type-badge {
  @apply px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded;
}

.domain-content {
  @apply p-6;
}

.domain-header {
  @apply mb-3;
}

.domain-title {
  @apply text-lg font-semibold text-navy-900;
}

.domain-description {
  @apply text-gray-600 text-sm mb-4 line-clamp-2;
}

.domain-project {
  @apply flex items-center space-x-2 text-sm text-gray-500 mb-4;
}

.domain-stats {
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

.domain-actions {
  @apply flex items-center justify-end space-x-2;
}

.btn-action {
  @apply p-2 rounded-lg transition-all duration-200 hover:scale-105;
}

.btn-edit {
  @apply text-gold-600 hover:bg-gold-50;
}

.btn-delete {
  @apply text-red-600 hover:bg-red-50;
}

.btn-primary {
  @apply inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg;
}

.btn-secondary {
  @apply inline-flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300;
}

.btn-danger {
  @apply inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg;
}

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

.modal-content {
  @apply p-6;
}

.modal-actions {
  @apply flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50;
}

.view-content {
  @apply p-6 space-y-6 max-h-[70vh] overflow-y-auto;
}

.domain-view-header {
  @apply flex items-start space-x-6 p-6 bg-gray-50 rounded-xl;
}

.domain-image-large {
  @apply w-32 h-32 rounded-xl object-cover;
}

.domain-info-large {
  @apply flex-1;
}

.domain-title-large {
  @apply text-2xl font-bold text-navy-900 mb-2;
}

.domain-type-large {
  @apply text-lg text-blue-600 font-medium mb-1;
}

.domain-project-large {
  @apply text-gray-600 mb-3;
}

.domain-status-large {
  @apply flex items-center space-x-2;
}

.status-badge-large {
  @apply px-3 py-1 text-sm font-semibold rounded-full;
}

.domain-details-grid {
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
  @apply grid grid-cols-1 gap-4;
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

.domain-description-section {
  @apply space-y-4;
}

.domain-description-full {
  @apply text-gray-700 leading-relaxed;
}

.delete-warning {
  @apply text-center py-4;
}

.loading-spinner {
  @apply inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .domains-management {
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

  .domains-grid {
    @apply grid-cols-1;
  }

  .domain-view-header {
    @apply flex-col space-y-4 space-x-0;
  }

  .domain-image-large {
    @apply w-full h-48;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    @apply transition-none;
  }
}

button:focus-visible,
input:focus-visible,
select:focus-visible {
  @apply outline-none ring-2 ring-blue-500 ring-offset-2;
}
</style>
