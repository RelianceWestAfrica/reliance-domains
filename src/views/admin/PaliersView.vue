<template>
  <div class="palier-management">
    <!-- Header -->
    <div class="luxury-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="header-title text-white">Paliers</h1>
          <p class="header-subtitle text-light">Manage building floors and levels across all residences</p>
        </div>
        <div class="header-actions">
          <button
            v-if="authStore.canAccess.paliers"
            @click="showCreateModal = true"
            class="luxury-add-btn"
          >
            <div class="btn-icon">
              <Plus class="w-5 h-5" />
            </div>
            <span>Ajouter les paliers</span>
            <div class="btn-shine"></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Paliers Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Palier
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Résidence
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unités
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Disponibles
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('common.actions') }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="palier in paliers" :key="palier.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ palier.title }}</div>
                    <div class="text-sm text-gray-500">{{ palier.description }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ palier.residenceTitle }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ palier.unitCount }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {{ palier.availableUnits }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <AppButton
                    @click="editPalier(palier)"
                    variant="ghost"
                    size="sm"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </AppButton>
                  <AppButton
                    @click="deletePalier(palier)"
                    variant="ghost"
                    size="sm"
                    class="text-red-600 hover:text-red-700"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </AppButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="paliers.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
        </svg>
        <p class="text-lg text-gray-500">{{ $t('common.noData') }}</p>
      </div>
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
<!--          <div class="form-row">-->
<!--            <div class="form-group">-->
<!--              <label class="form-label">Titre de la résidence *</label>-->
<!--              <input-->
<!--                  v-model="formData.title"-->
<!--                  type="text"-->
<!--                  class="form-input"-->
<!--                  placeholder="Ex: Tour A - Résidence Étoile"-->
<!--                  required-->
<!--              />-->
<!--            </div>-->
<!--            <div class="form-group">-->
<!--              <label class="form-label">Type de résidence *</label>-->
<!--              <select v-model="formData.type" class="form-input" required>-->
<!--                <option value="">Sélectionner un type</option>-->
<!--                <option value="IMMEUBLE">IMMEUBLE</option>-->
<!--                <option value="VILLAS">VILLAS</option>-->
<!--                <option value="AUTRE">AUTRE</option>-->
<!--              </select>-->
<!--            </div>-->
<!--          </div>-->

<!--          <div class="form-group">-->
<!--            <label class="form-label">Projet *</label>-->
<!--            &lt;!&ndash;            <select v-model="formData.projectId" class="form-input" required>&ndash;&gt;-->
<!--            &lt;!&ndash;              <option value="">Sélectionner un projet</option>&ndash;&gt;-->
<!--            &lt;!&ndash;              <option value="1">Résidence Étoile</option>&ndash;&gt;-->
<!--            &lt;!&ndash;              <option value="2">Villa Paradise</option>&ndash;&gt;-->
<!--            &lt;!&ndash;              <option value="3">Golden Heights</option>&ndash;&gt;-->
<!--            &lt;!&ndash;            </select>&ndash;&gt;-->
<!--            <select-->
<!--                v-model="formData.projectId"-->
<!--                class="tw-w-full tw-border form-input tw-rounded tw-px-3 tw-py-2"-->
<!--                :disabled="isLoadingProjects"-->
<!--            >-->
<!--              <option value="" disabled>-->
<!--                {{ isLoadingProjects ? 'Chargement...' : 'Sélectionner un projet' }}-->
<!--              </option>-->

<!--              <option-->
<!--                  v-for="project in projects"-->
<!--                  :key="project.id"-->
<!--                  :value="project.id"-->
<!--              >-->
<!--                {{ project.name }}-->
<!--              </option>-->
<!--            </select>-->
<!--          </div>-->

<!--          <div class="form-group">-->
<!--            <label class="form-label">Description *</label>-->
<!--            <textarea-->
<!--                v-model="formData.description"-->
<!--                class="form-input"-->
<!--                rows="4"-->
<!--                placeholder="Description détaillée de la résidence..."-->
<!--                required-->
<!--            ></textarea>-->
<!--          </div>-->

<!--          <div class="form-row">-->
<!--            <div class="form-group">-->
<!--              <label class="form-label">Nombre d'étages *</label>-->
<!--              <input-->
<!--                  v-model.number="formData.floorsCount"-->
<!--                  type="number"-->
<!--                  class="form-input"-->
<!--                  placeholder="Ex: 15"-->
<!--                  min="1"-->
<!--                  required-->
<!--              />-->
<!--            </div>-->
<!--            <div class="form-group">-->
<!--              <label class="form-label">Nombre d'unités *</label>-->
<!--              <input-->
<!--                  v-model.number="formData.unitsCount"-->
<!--                  type="number"-->
<!--                  class="form-input"-->
<!--                  placeholder="Ex: 32"-->
<!--                  min="1"-->
<!--                  required-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->

<!--          <div class="form-group">-->
<!--            <label class="form-label">URL de l'image</label>-->
<!--            <input-->
<!--                v-model="formData.imageUrl"-->
<!--                type="url"-->
<!--                class="form-input"-->
<!--                placeholder="https://example.com/image.jpg"-->
<!--            />-->
<!--          </div>-->

<!--          <div class="form-group">-->
<!--            <label class="form-checkbox">-->
<!--              <input-->
<!--                  v-model="formData.published"-->
<!--                  type="checkbox"-->
<!--                  class="checkbox-input"-->
<!--              />-->
<!--              <span class="checkbox-label">Publier la résidence</span>-->
<!--            </label>-->
<!--          </div>-->

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

  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { Plus } from 'lucide-vue-next'
  import { FloorsService } from '@/services/floors.service'
  import type { Floor, CreateFloorPayload } from '@/types/floor'

  const authStore = useAuthStore()

  /* =======================
     State
  ======================= */
  const paliers = ref<Floor[]>([])
  const selectedPalier = ref<Floor | null>(null)

  const showCreateModal = ref(false)
  const showEditModal = ref(false)
  const showDeleteModal = ref(false)

  const isSubmitting = ref(false)
  const isDeleting = ref(false)

  /* =======================
     Form
  ======================= */
  const formData = ref<CreateFloorPayload>({
    title: '',
    description: '',
    residenceId: 0
  })

  /* =======================
     API Calls
  ======================= */
  const fetchPaliers = async () => {
    try {
      const { data } = await FloorsService.all()
      paliers.value = data
    } catch (error) {
      console.error('Erreur chargement paliers', error)
    }
  }

  /* =======================
     CRUD Actions
  ======================= */
  const openCreateModal = () => {
    resetForm()
    showCreateModal.value = true
  }

  const editPalier = (palier: Floor) => {
    selectedPalier.value = palier
    formData.value = {
      title: palier.title,
      description: palier.description,
      residenceId: palier.residenceId
    }
    showEditModal.value = true
  }

  const submitForm = async () => {
    isSubmitting.value = true
    try {
      if (showCreateModal.value) {
        await FloorsService.create(formData.value)
      } else if (selectedPalier.value) {
        await FloorsService.update(selectedPalier.value.id, formData.value)
      }

      await fetchPaliers()
      closeModals()
    } catch (error) {
      console.error('Erreur sauvegarde palier', error)
    } finally {
      isSubmitting.value = false
    }
  }

  const deletePalier = (palier: Floor) => {
    selectedPalier.value = palier
    showDeleteModal.value = true
  }

  const confirmDelete = async () => {
    if (!selectedPalier.value) return

    isDeleting.value = true
    try {
      await FloorsService.delete(selectedPalier.value.id)
      await fetchPaliers()
      closeModals()
    } catch (error) {
      console.error('Erreur suppression palier', error)
    } finally {
      isDeleting.value = false
    }
  }

  /* =======================
     Utils
  ======================= */
  const resetForm = () => {
    formData.value = {
      title: '',
      description: '',
      residenceId: 0
    }
  }

  const closeModals = () => {
    showCreateModal.value = false
    showEditModal.value = false
    showDeleteModal.value = false
    selectedPalier.value = null
    resetForm()
  }

  /* =======================
     Lifecycle
  ======================= */
  onMounted(() => {
    fetchPaliers()
  })
</script>


<style scoped>
/* Import shared admin styles */
@import '../../style.css';

/* Page Layout */
.palier-management {
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
  .palier-management {
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