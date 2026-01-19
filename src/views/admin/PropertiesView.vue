<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="luxury-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="header-title">Property Management</h1>
          <p class="header-subtitle">Manage apartments, villas, and commercial properties</p>
        </div>
        <div class="header-actions">
          <button
            @click="showCreateModal = true"
            class="luxury-add-btn"
          >
            <div class="btn-icon">
              <Plus class="w-5 h-5" />
            </div>
            <span>Add New Property</span>
            <div class="btn-shine"></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="search-input-wrapper">
          <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher une propriété..."
            class="search-input"
          />
        </div>
        <select v-model="typeFilter" class="filter-select">
          <option value="">Tous les types</option>
          <option value="APARTMENT">APARTMENT</option>
          <option value="VILLA">VILLA</option>
          <option value="SHOP">SHOP</option>
          <option value="OFFICE">OFFICE</option>
          <option value="OTHER">OTHER</option>
        </select>
        <select v-model="statusFilter" class="filter-select">
          <option value="">Tous les statuts</option>
          <option value="AVAILABLE">Disponible</option>
          <option value="UNDER_DISCUSSION">Sous discussion</option>
          <option value="RESERVED">Réservé</option>
          <option value="SOLD">Vendu</option>
        </select>
        <select v-model="residenceFilter" class="filter-select">
          <option value="">Toutes les résidences</option>
          <option
              v-for="residence in residences"
              :key="residence.id"
              :value="residence.id"
          >
            {{ residence.title }}
          </option>
        </select>
      </div>
    </div>

    <!-- Properties Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="property in filteredProperties"
        :key="property.id"
        class="property-card"
        @click="viewProperty(property)"
      >
        <div class="property-image">
          <img
            :src="property.imageUrl"
            :alt="property.title"
            class="property-img"
          />
          <div class="property-status">
            <span
              class="status-badge"
              :class="getStatusClasses(property.status)"
            >
              {{ property.status }}
            </span>
          </div>
          <div class="property-type">
            <span class="type-badge">{{ property.type }}</span>
          </div>
        </div>
        
        <div class="property-content">
          <h3 class="property-title">{{ property.title }}</h3>
          
          <div class="property-details">
            <div class="detail-item">
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
              </svg>
              <span>{{ property.roomsCount }} pièces</span>
            </div>
            <div class="detail-item">
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
              </svg>
              <span>{{ property.surface }}m²</span>
            </div>
          </div>
          
          <div class="property-price">
            <span class="price-value">{{ formatPrice(property.price) }}</span>
            <span class="price-currency">FCFA</span>
          </div>

          <div class="property-actions">
            <button
              @click.stop="editProperty(property)"
              class="btn-action btn-edit"
              title="Modifier"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button
              @click.stop="deleteProperty(property)"
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
    <div v-if="filteredProperties.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
      <h3 class="text-2xl font-semibold text-navy-900 mb-4">Aucune propriété trouvée</h3>
      <p class="text-gray-600 mb-8">
        {{ searchQuery ? 'Aucune propriété ne correspond à votre recherche.' : 'Commencez par ajouter votre première propriété.' }}
      </p>
      <button
        v-if="!searchQuery"
        @click="showCreateModal = true"
        class="btn-primary"
      >
        Ajouter une propriété
      </button>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="modal-overlay" @click="closeModals">
      <div class="modal-container modal-lg" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">
            {{ showCreateModal ? 'Nouvelle Propriété' : 'Modifier la Propriété' }}
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
              <label class="form-label">Titre de la propriété *</label>
              <input
                v-model="formData.title"
                type="text"
                class="form-input"
                placeholder="Ex: Appartement 3P - A101"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">Type de propriété *</label>
              <select v-model="formData.type" class="form-input" required>
                <option value="" disabled>Sélectionner un type</option>
                <option value="APARTMENT">APARTMENT</option>
                <option value="VILLA">VILLA</option>
                <option value="SHOP">SHOP</option>
                <option value="OFFICE">OFFICE</option>
                <option value="OTHER">OTHER</option>
              </select>
            </div>
          </div>

          <div class="form-row">

            <!-- Projet -->
            <div class="form-group">
              <label class="form-label">Projet *</label>
              <select
                  v-model="formData.projectId"
                  class="form-input"
                  :disabled="isLoadingProjects"
                  required
              >
                <option value="" disabled>Sélectionner un projet</option>
                <option v-if="isLoadingProjects" disabled>
                  Chargement des projets...
                </option>
                <option
                    v-for="project in projects"
                    :key="project.id"
                    :value="project.id"
                >
                  {{ project.title || project.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Résidence *</label>
              <select
                  v-model="formData.residenceId"
                  class="form-input"
                  :disabled="isVilla || isLoadingResidences"
                  @change="residenceSelected()"
                  required
              >
                <option value="" disabled>Sélectionner une résidence</option>
                <option v-if="isLoadingResidences" disabled>
                  Chargement des résidences...
                </option>
                <option
                    v-for="residence in residences"
                    :key="residence.id"
                    :value="residence.id"
                >
                  {{ residence.title }}
                </option>
              </select>
            </div>
          </div>


          <div class="form-row">
            <!-- Palier / Étage -->
            <div class="form-group">
              <label class="form-label">Palier / Étage *</label>
              <select
                  v-model="formData.residenceFloorId"
                  class="form-input"
                  :disabled="isVilla || isLoadingFloors"
                  required
              >
                <option value="" disabled>Sélectionner un palier</option>
                <option v-if="isLoadingFloors" disabled>
                  Chargement des paliers...
                </option>
                <option
                    v-for="floor in floors"
                    :key="floor.id"
                    :value="floor.id"
                >
                  {{ floor.title || floor.name || floor.level }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Statut *</label>
              <select v-model="formData.status" class="form-input" required>
                <option value="" disabled>Sélectionner un statut</option>
                <option value="AVAILABLE">Disponible</option>
                <option value="UNDER_DISCUSSION">Sous discussion</option>
                <option value="RESERVED">Réservé</option>
                <option value="SOLD">Vendu</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Nombre de pièces *</label>
              <input
                v-model.number="formData.roomsCount"
                type="number"
                class="form-input"
                placeholder="Ex: 3"
                min="1"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">Nombre de cuisines *</label>
              <input
                v-model.number="formData.kitchensCount"
                type="number"
                class="form-input"
                placeholder="Ex: 1"
                min="1"
                required
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Surface (m²) *</label>
              <input
                v-model.number="formData.surface"
                type="number"
                class="form-input"
                placeholder="Ex: 85"
                min="1"
                required
              />
            </div>
            <div class="form-group">
              <label class="form-label">Prix (FCFA) *</label>
              <input
                v-model.number="formData.price"
                type="number"
                class="form-input"
                placeholder="Ex: 45000000"
                min="0"
                required
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Image de la propriété</label>
              <Upload @uploaded="handleUploaded" />
            </div>

            <div class="form-group">
              <label class="form-label">Image plan</label>
              <Upload @uploaded="handleUploadedPlan" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-checkbox">
                <input
                  v-model="formData.hasBalcony"
                  type="checkbox"
                  class="checkbox-input"
                />
                <span class="checkbox-label">Balcon</span>
              </label>
            </div>
            <div class="form-group">
              <label class="form-checkbox">
                <input
                  v-model="formData.isFurnished"
                  type="checkbox"
                  class="checkbox-input"
                />
                <span class="checkbox-label">Meublé</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label class="form-checkbox">
              <input
                v-model="formData.isPublished"
                type="checkbox"
                class="checkbox-input"
              />
              <span class="checkbox-label">Publier la propriété</span>
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
    <div v-if="showViewModal && selectedProperty" class="modal-overlay" @click="closeModals">
      <div class="modal-container modal-lg" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Détails de la Propriété</h3>
          <button @click="closeModals" class="modal-close">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="view-content">
          <div class="property-view-header">
            <img :src="selectedProperty.imageUrl" :alt="selectedProperty.title" class="property-image-large"/>
            <div class="property-info-large">
              <h4 class="property-title-large">{{ selectedProperty.title }}</h4>
              <p class="property-type-large">{{ selectedProperty.type }}</p>
              <div class="property-status-large">
                <span
                  class="status-badge-large"
                  :class="getStatusClasses(selectedProperty.status)"
                >
                  {{ selectedProperty.status }}
                </span>
              </div>
              <div class="property-price-large">
                <span class="price-value-large">{{ formatPrice(selectedProperty.price) }}</span>
                <span class="price-currency-large">FCFA</span>
              </div>
            </div>
          </div>

          <div class="property-details-grid">
            <div class="detail-section">
              <h5 class="detail-title">Caractéristiques</h5>
              <div class="detail-grid">
                <div class="detail-item">
                  <label>Pièces</label>
                  <span>{{ selectedProperty.roomsCount }}</span>
                </div>
                <div class="detail-item">
                  <label>Cuisines</label>
                  <span>{{ selectedProperty.kitchensCount }}</span>
                </div>
                <div class="detail-item">
                  <label>Surface</label>
                  <span>{{ selectedProperty.surface }}m²</span>
                </div>
                <div class="detail-item">
                  <label>Balcon</label>
                  <span>{{ selectedProperty.hasBalcony ? 'Oui' : 'Non' }}</span>
                </div>
                <div class="detail-item">
                  <label>Meublé</label>
                  <span>{{ selectedProperty.isFurnished ? 'Oui' : 'Non' }}</span>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <h5 class="detail-title">Informations</h5>
              <div class="detail-grid">
                <div class="detail-item">
                  <label>Type</label>
                  <span class="capitalize">{{ selectedProperty.type }}</span>
                </div>
                <div class="detail-item">
                  <label>Statut</label>
                  <span>{{ selectedProperty.status }}</span>
                </div>
                <div class="detail-item">
                  <label>Publié</label>
                  <span>{{ selectedProperty.isPublished ? 'Oui' : 'Non' }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-actions">
          <button @click="editProperty(selectedProperty)" class="btn-primary">
            Modifier
          </button>
          <button @click="closeModals" class="btn-secondary">
            Fermer
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal && selectedProperty" class="modal-overlay" @click="closeModals">
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
              Êtes-vous sûr de vouloir supprimer la propriété
              <strong>{{ selectedProperty.title }}</strong> ?
            </p>
            <p class="text-center text-sm text-red-600 mt-2">
              Cette action est irréversible.
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
import {ref, computed, watch} from 'vue'
import { Plus } from 'lucide-vue-next'
import FileUpload from '@/components/ui/FileUpload.vue'
import { onMounted } from 'vue'
import { PropertiesService } from '@/services/properties.service'
import type { Property, CreatePropertyPayload } from '@/types/properties.ts'
import {ResidencesService} from "@/services/residences.service.ts";
import Upload from "@/components/Upload.vue";

import { FloorsService } from '@/services/floors.service'
import { ProjectsService } from '@/services/projects.service'

// Reactive data
const searchQuery = ref('')
const typeFilter = ref('')
const statusFilter = ref('')
const residenceFilter = ref('')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showDeleteModal = ref(false)
const isSubmitting = ref(false)
const isDeleting = ref(false)
const selectedProperty = ref<any | null>(null)
const residences = ref<any[]>([])
const isLoadingResidences = ref(false)

const floors = ref<any[]>([])
const floors_d = ref<any[]>([])
const projects = ref<any[]>([])

const isLoadingFloors = ref(false)
const isLoadingProjects = ref(false)

// Form data
const formData = ref<any>({
  title: '',
  type: '',
  residenceId: 0,
  floorId: 0,
  projectId: 0,
  status: '',
  roomsCount: 1,
  kitchensCount: 1,
  surface: 1,
  price: 0,
  imageUrl: '',
  imagePlan: '',
  hasBalcony: false,
  isFurnished: false,
  isPublished: false
})

// Mock data
const properties = ref<Property[]>([])


const filteredProperties = computed(() => {
  let filtered = properties.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(property =>
      property.title.toLowerCase().includes(query)
    )
  }

  if (typeFilter.value) {
    filtered = filtered.filter(p => p.type === typeFilter.value)
  }

  if (statusFilter.value) {
    filtered = filtered.filter(p => p.status === statusFilter.value)
  }

  if (residenceFilter.value) {
    // filtered = filtered.filter(p => residenceFilter.value === p.residenceId)
  }

  return filtered
})

const residenceSelected = () => {
  floors.value = floors_d.value.filter(it => it.residenceId === formData.value.residenceId)
}

const loadFloors = async () => {
  isLoadingFloors.value = true
  try {
    const { data } = await FloorsService.all()
    floors.value = data.data || data
    floors_d.value = data.data || data
  } catch (e) {
    console.error('Erreur API floors', e)
  } finally {
    isLoadingFloors.value = false
  }
}

const loadProjects = async () => {
  isLoadingProjects.value = true
  try {
    const { data } = await ProjectsService.all()
    projects.value = data.data || data
  } catch (e) {
    console.error('Erreur API projects', e)
  } finally {
    isLoadingProjects.value = false
  }
}


const fetchProperties = async () => {
  try {
    const { data } = await PropertiesService.all({
      search: searchQuery.value || null,
      type: typeFilter.value || null,
      status: statusFilter.value || null,
      residenceId: residenceFilter.value || null
    })

    properties.value = data.data || data   // support backend paginé ou non
  } catch (e) {
    console.error("Erreur API properties", e)
  }
}

const handleUploaded = (url: string) => {
  console.log('Fichier uploadé :', url);
  formData.value.imageUrl = url;
};

const handleUploadedPlan = (url: string) => {
  console.log('Fichier uploadé :', url);
  formData.value.imagePlan = url;
};

const loadResidences = async () => {
  isLoadingResidences.value = true
  try {
    const { data } = await ResidencesService.all()
    residences.value = data.data || data
  } catch (e) {
    console.error("Erreur API residences", e)
  } finally {
    isLoadingResidences.value = false
  }
}


// Methods
const viewProperty = (property: any) => {
  selectedProperty.value = property
  showViewModal.value = true
}

const editProperty = (property: Property) => {
  selectedProperty.value = property

  formData.value = {
    title: property.title,
    type: property.type,
    residenceId: property.residenceId,
    status: property.status,
    roomsCount: property.roomsCount,
    kitchensCount: property.kitchensCount,
    surface: property.surface,
    price: property.price,
    imageUrl: property.imageUrl || '',
    balcony: property.balcony,
    furnished: property.furnished,
    published: property.published
  }

  showEditModal.value = true
}


const deleteProperty = (property: any) => {
  selectedProperty.value = property
  showDeleteModal.value = true
}

const submitForm = async () => {
  isSubmitting.value = true
  try {
    if (showCreateModal.value) {
      await PropertiesService.create(formData.value)
    } else if (selectedProperty.value) {
      await PropertiesService.update(selectedProperty.value.id, formData.value)
    }

    await fetchProperties()
    closeModals()
  } catch (e) {
    console.error("Erreur API save property", e)
  } finally {
    isSubmitting.value = false
  }
}


const confirmDelete = async () => {
  if (!selectedProperty.value) return
  isDeleting.value = true

  try {
    await PropertiesService.delete(selectedProperty.value.id)
    await fetchProperties()
    closeModals()
  } catch (e) {
    console.error("Erreur API delete", e)
  } finally {
    isDeleting.value = false
  }
}


const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  showDeleteModal.value = false
  selectedProperty.value = null
  formData.value = {
    title: '',
    type: '',
    residenceId: null,
    status: '',
    roomsCount: 1,
    kitchensCount: 1,
    surface: 1,
    price: 0,
    imageUrl: '',
    balcony: false,
    furnished: false,
    published: false
  }
}

const getStatusClasses = (status: string) => {
  const classes = {
    'Disponible': 'bg-green-100 text-green-800',
    'Sous discussion cliente': 'bg-yellow-100 text-yellow-800',
    'Réservé': 'bg-blue-100 text-blue-800',
    'Soldé': 'bg-purple-100 text-purple-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR').format(price)
}

const isVilla = computed(() => formData.value.type === 'VILLA')

onMounted(() => {
  fetchProperties()
  loadResidences()
  loadFloors()
  loadProjects()
})


watch([searchQuery, typeFilter, statusFilter, residenceFilter], fetchProperties)
</script>

<style scoped>
/* Import shared admin styles */
@import '../../style.css';

/* Search and Filters */
.search-input-wrapper {
  @apply relative;
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

/* Property Cards */
.property-card {
  @apply bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer;
}

.property-image {
  @apply relative h-48 overflow-hidden;
}

.property-img {
  @apply w-full h-full object-cover transition-transform duration-300;
}

.property-card:hover .property-img {
  @apply scale-110;
}

.property-status {
  @apply absolute top-4 left-4;
}

.status-badge {
  @apply px-3 py-1 text-xs font-semibold rounded-full;
}

.property-type {
  @apply absolute top-4 right-4;
}

.type-badge {
  @apply px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded capitalize;
}

.property-content {
  @apply p-6;
}

.property-title {
  @apply text-lg font-semibold text-navy-900 mb-3;
}

.property-details {
  @apply flex items-center space-x-4 text-sm text-gray-600 mb-4;
}

.detail-item {
  @apply flex items-center space-x-1;
}

.property-price {
  @apply flex items-baseline space-x-2 mb-4;
}

.price-value {
  @apply text-2xl font-bold text-blue-600;
}

.price-currency {
  @apply text-sm text-gray-500;
}

.property-actions {
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

.property-view-header {
  @apply flex items-start space-x-6 p-6 bg-gray-50 rounded-xl;
}

.property-image-large {
  @apply w-32 h-32 rounded-xl object-cover;
}

.property-info-large {
  @apply flex-1;
}

.property-title-large {
  @apply text-2xl font-bold text-navy-900 mb-2;
}

.property-type-large {
  @apply text-lg text-blue-600 font-medium mb-2 capitalize;
}

.property-status-large {
  @apply mb-3;
}

.status-badge-large {
  @apply px-3 py-1 text-sm font-semibold rounded-full;
}

.property-price-large {
  @apply flex items-baseline space-x-2;
}

.price-value-large {
  @apply text-3xl font-bold text-blue-600;
}

.price-currency-large {
  @apply text-lg text-gray-500;
}

.property-details-grid {
  @apply grid grid-cols-1 lg:grid-cols-2 gap-6;
}

.detail-section {
  @apply space-y-4;
}

.detail-title {
  @apply text-lg font-semibold text-navy-900;
}

.detail-grid {
  @apply grid grid-cols-1 gap-3;
}

.detail-item {
  @apply p-4 bg-white border border-gray-200 rounded-xl flex justify-between items-center;
}

.detail-item label {
  @apply text-sm font-medium text-gray-500;
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
  .property-view-header {
    @apply flex-col space-y-4 space-x-0;
  }
  
  .property-image-large {
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