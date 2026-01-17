<template>
  <div class="projects-management">
    <!-- Header Section -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="page-title">Gestion des Projets</h1>
          <p class="page-subtitle">Administrez les projets immobiliers</p>
        </div>
        <div class="header-actions">
          <button
            @click="showCreateModal = true"
            class="btn-primary"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Nouveau Projet
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
            placeholder="Rechercher un projet..."
            class="search-input"
          />
        </div>
        <select v-model="countryFilter" class="filter-select">
          <option value="">Tous les pays</option>
          <option
              v-for="country in countries"
              :key="country.id"
              :value="country.id"
          >
            {{ country.name }}
          </option>
        </select>
        <select v-model="statusFilter" class="filter-select">
          <option value="">Tous les statuts</option>
          <option value="DRAFT">Publié</option>
          <option value="DRAFTs">Brouillon</option>
        </select>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="projects-grid">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="project-card"
        @click="viewProject(project)"
      >
        <div class="project-image">
          <img
            :src="project.heroImageUrl"
            :alt="project.title"
            class="project-img"
          />
          <div class="project-status">
            <span
              class="status-badge"
              :class="project.published ? 'status-published' : 'status-draft'"
            >
              {{ project.published ? 'Publié' : 'Brouillon' }}
            </span>
          </div>
          <div class="project-country">
            <span class="country-flag">{{ project.countryFlag }}</span>
          </div>
        </div>
        
        <div class="project-content">
          <div class="project-header">
            <h3 class="project-title">{{ project.name }}</h3>
            <div class="project-type">{{ project.type }}</div>
          </div>
          
          <p class="project-description">{{ project.description }}</p>
          
          <div class="project-location">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>{{ project.city }}</span>
          </div>
          
          <div class="project-stats">
            <div class="stat-item">
              <span class="stat-value">{{ project.residencesCount }}</span>
              <span class="stat-label">résidences</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ project.propertiesCount }}</span>
              <span class="stat-label">propriétés</span>
            </div>
          </div>

          <div class="project-actions">
            <button
              @click.stop="editProject(project)"
              class="btn-action btn-edit"
              title="Modifier"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button
              @click.stop="deleteProject(project)"
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
    <div v-if="filteredProjects.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
      </div>
      <h3 class="empty-title">Aucun projet trouvé</h3>
      <p class="empty-description">
        {{ searchQuery ? 'Aucun projet ne correspond à votre recherche.' : 'Commencez par ajouter votre premier projet.' }}
      </p>
      <button
        v-if="!searchQuery"
        @click="showCreateModal = true"
        class="btn-primary"
      >
        Ajouter un projet
      </button>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="modal-overlay" @click="closeModals">
      <div class="modal-container modal-lg" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">
            {{ showCreateModal ? 'Nouveau Projet' : 'Modifier le Projet' }}
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
              <label class="form-label">Titre du projet *</label>
              <input
                v-model="formData.name"
                type="text"
                class="form-input"
                placeholder="Ex: Résidence Étoile"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">Type *</label>
              <select v-model="formData.type" class="form-input" required>
                <option value="">Sélectionner un type</option>
                <option value="RESIDENTIEL">RESIDENTIEL</option>
                <option value="VILLA">VILLA</option>
                <option value="MIXTE">MIXTE</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Pays *</label>
              <select v-model="formData.countryId" class="form-input" required>
                <option value="">Sélectionner un pays</option>
                <option
                    v-for="country in countries"
                    :key="country.id"
                    :value="country.id"
                >
                  {{ country.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Ville *</label>
              <input
                v-model="formData.city"
                type="text"
                class="form-input"
                placeholder="Ex: Abidjan"
                required
              />
            </div>
          </div>

            <div class="form-group">
              <label class="form-label">Entreprise *</label>
              <input
                v-model="formData.company"
                type="text"
                class="form-input"
                placeholder="Ex: RELIANCE WEST AFRICA"
                required
              />
            </div>


          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Description *</label>
              <textarea
                  v-model="formData.description"
                  class="form-input"
                  rows="6"
                  placeholder="Description détaillée du projet..."
                  required
              ></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">URL de l'image</label>
              <Upload @uploaded="handleUploaded" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-checkbox">
              <input
                v-model="formData.published"
                type="checkbox"
                class="checkbox-input"
              />
              <span class="checkbox-label w-100">Publier le projet</span>
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
    <div v-if="showViewModal && selectedProject" class="modal-overlay" @click="closeModals">
      <div class="modal-container modal-lg" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Détails du Projet</h3>
          <button @click="closeModals" class="modal-close">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="view-content">
          <div class="project-view-header">
            <img :src="selectedProject.heroImageUrl" :alt="selectedProject.title" class="project-image-large"/>
            <div class="project-info-large">
              <h4 class="project-title-large">{{ selectedProject.name }}</h4>
              <p class="project-location-large">
                <span class="country-flag-large">{{ selectedProject.pay }}</span>
                {{ selectedProject.city }}
              </p>
              <div class="project-status-large">
                <span
                  class="status-badge-large"
                  :class="selectedProject.published ? 'status-published' : 'status-draft'"
                >
                  {{ selectedProject.published ? 'Publié' : 'Brouillon' }}
                </span>
              </div>
            </div>
          </div>

          <div class="project-details-grid">
            <div class="detail-section">
              <h5 class="detail-title">Informations générales</h5>
              <div class="detail-grid">
                <div class="detail-item">
                  <label>Type</label>
                  <span>{{ selectedProject.type }}</span>
                </div>
                <div class="detail-item">
                  <label>Entreprise</label>
                  <span>{{ selectedProject.company }}</span>
                </div>
                <div class="detail-item">
                  <label>Adresse</label>
                  <span>{{ selectedProject.locationAddress }}</span>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <h5 class="detail-title">Statistiques</h5>
              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-value">{{ selectedProject.residencesCount }}</div>
                  <div class="stat-label">Résidences</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">{{ selectedProject.propertiesCount }}</div>
                  <div class="stat-label">Propriétés</div>
                </div>
              </div>
            </div>
          </div>

          <div class="project-description-section">
            <h5 class="detail-title">Description</h5>
            <p class="project-description-full">{{ selectedProject.description }}</p>
          </div>
        </div>

        <div class="modal-actions">
          <button @click="editProject(selectedProject)" class="btn-primary">
            Modifier
          </button>
          <button @click="closeModals" class="btn-secondary">
            Fermer
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal && selectedProject" class="modal-overlay" @click="closeModals">
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
              Êtes-vous sûr de vouloir supprimer le projet
              <strong>{{ selectedProject.title }}</strong> ?
            </p>
            <p class="text-center text-sm text-red-600 mt-2">
              Cette action est irréversible et supprimera toutes les résidences et propriétés associées.
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
import {ProjectsService} from "@/services/projects.service.ts";
import {CountriesService} from "@/services/countries.service.ts";
import Upload from "@/components/Upload.vue";

// Reactive data
const searchQuery = ref('')
const countryFilter = ref('')
const statusFilter = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showDeleteModal = ref(false)
const selectedProject = ref(null)
const isSubmitting = ref(false)
const isDeleting = ref(false)

// Form data
const formData = ref({
  name: '',
  type: '',
  countryId: '',
  city: '',
  locationAddress: '',
  description: '',
  company: 'RELIANCE WEST AFRICA',
  heroImageUrl: '',
  published: false
})

const countries = ref<{id: string, name: string, iso2: string}[]>([])

const fetchCountries = async () => {
  try {
    const response = await CountriesService.all()
    countries.value = response.data
  } catch (error) {
    console.error('Erreur lors du chargement des pays', error)
  }
}

const handleUploaded = (url: string) => {
  console.log('Fichier uploadé :', url);
  formData.value.heroImageUrl = url;
};

// Mock data
const projects = ref<any[]>([])

const fetchProjects = async () => {
  try {
    const response = await ProjectsService.all()
    projects.value = response.data.map((p: any) => ({
      ...p,
      countryFlag: getCountryFlag(p.countryId)
    }))
  } catch (error) {
    console.error('Erreur lors du chargement des projets', error)
  }
}

// Computed properties
const filteredProjects = computed(() => {
  let filtered = projects.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()

    filtered = filtered.filter(project =>
        project.name?.toLowerCase().includes(query) ||
        project.city?.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query)
    )
  }

  if (countryFilter.value) {
    filtered = filtered.filter(
        project => project.countryId === countryFilter.value
    )
  }

  if (statusFilter.value !== '') {
    filtered = filtered.filter(
        project =>  project.status === statusFilter.value
    )
  }

  return filtered
})


// Methods
const viewProject = (project: any) => {
  selectedProject.value = project
  showViewModal.value = true
}

const editProject = (project: any) => {
  selectedProject.value = project
  formData.value = {
    name: project.name,
    type: project.type,
    countryId: project.countryId,
    city: project.city,
    locationAddress: project.locationAddress,
    description: project.description,
    company: project.company,
    heroImageUrl: project.heroImageUrl,
    published: project.published
  }
  showEditModal.value = true
}

const deleteProject = (project: any) => {
  selectedProject.value = project
  showDeleteModal.value = true
}
const submitForm = async () => {
  isSubmitting.value = true
  try {
    const payload = { ...formData.value }

    if (showCreateModal.value) {
      const response = await ProjectsService.create(payload)
      projects.value.push({
        ...response.data,
        countryFlag: getCountryFlag(response.data.countryId)
      })
    } else if (showEditModal.value) {
      const response = await ProjectsService.update(selectedProject.value.id, payload)
      const index = projects.value.findIndex(p => p.id === selectedProject.value.id)
      projects.value[index] = {
        ...response.data,
        countryFlag: getCountryFlag(response.data.countryId)
      }
    }

    closeModals()
  } catch (error) {
    console.error('Erreur lors de la soumission du formulaire', error)
  } finally {
    isSubmitting.value = false
  }
}

const confirmDelete = async () => {
  isDeleting.value = true
  try {
    await ProjectsService.delete(selectedProject.value.id)
    projects.value = projects.value.filter(p => p.id !== selectedProject.value.id)
    closeModals()
  } catch (error) {
    console.error('Erreur lors de la suppression', error)
  } finally {
    isDeleting.value = false
  }
}

const uploadImage = async (file: File) => {
  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await ProjectsService.uploadImages(selectedProject.value.id, formData)
    // réponse = nouvelle image, tu peux mettre à jour ton projet
    selectedProject.value.image = response.data.url
  } catch (error) {
    console.error('Erreur lors de l\'upload', error)
  }
}

const getCountryFlag = (countryId: string) => {
  const flags: Record<string, string> = {
    '1': '🇨🇮',
    '2': '🇬🇭',
    '3': '🇸🇳'
  }
  return flags[countryId] || '🏳️'
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  showDeleteModal.value = false
  selectedProject.value = null
  formData.value = {
    name: '',
    type: '',
    countryId: '',
    city: '',
    locationAddress: '',
    description: '',
    company: 'RELIANCE WEST AFRICA',
    heroImageUrl: '',
    published: false
  }
}

// Lifecycle
onMounted(() => {
  // Initialize component
  fetchProjects();
  fetchCountries();
})
</script>

<style scoped>
/* Import shared admin styles */
@import '../../style.css';

/* Page Layout */
.projects-management {
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

/* Projects Grid */
.projects-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8;
}

.project-card {
  @apply bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer;
}

.project-image {
  @apply relative h-48 overflow-hidden;
}

.project-img {
  @apply w-full h-full object-cover transition-transform duration-300;
}

.project-card:hover .project-img {
  @apply scale-110;
}

.project-status {
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

.project-country {
  @apply absolute top-4 right-4;
}

.country-flag {
  @apply text-2xl;
}

.project-content {
  @apply p-6;
}

.project-header {
  @apply flex items-start justify-between mb-3;
}

.project-title {
  @apply text-lg font-semibold text-navy-900 flex-1;
}

.project-type {
  @apply text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded;
}

.project-description {
  @apply text-gray-600 text-sm mb-4 line-clamp-2;
}

.project-location {
  @apply flex items-center space-x-2 text-sm text-gray-500 mb-4;
}

.project-stats {
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

.project-actions {
  @apply flex items-center justify-end space-x-2;
}

/* Action Buttons */
.btn-action {
  @apply p-2 rounded-lg transition-all duration-200 hover:scale-105;
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

.project-view-header {
  @apply flex items-start space-x-6 p-6 bg-gray-50 rounded-xl;
}

.project-image-large {
  @apply w-32 h-32 rounded-xl object-cover;
}

.project-info-large {
  @apply flex-1;
}

.project-title-large {
  @apply text-2xl font-bold text-navy-900 mb-2;
}

.project-location-large {
  @apply flex items-center space-x-2 text-gray-600 mb-3;
}

.country-flag-large {
  @apply text-xl;
}

.project-status-large {
  @apply flex items-center space-x-2;
}

.status-badge-large {
  @apply px-3 py-1 text-sm font-semibold rounded-full;
}

.project-details-grid {
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

.project-description-section {
  @apply space-y-4;
}

.project-description-full {
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
  .projects-management {
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
  
  .projects-grid {
    @apply grid-cols-1;
  }
  
  .project-view-header {
    @apply flex-col space-y-4 space-x-0;
  }
  
  .project-image-large {
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