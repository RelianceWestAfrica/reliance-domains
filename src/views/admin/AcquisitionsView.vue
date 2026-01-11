<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="luxury-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="header-title text-white">Acquisition Management</h1>
          <p class="header-subtitle text-light">Manage property acquisitions and transactions</p>
        </div>
        <div class="header-actions">
          <button
            v-if="authStore.canAccess.acquisitions"
            @click="showCreateModal = true"
            class="luxury-add-btn"
          >
            <div class="btn-icon">
              <Plus class="w-5 h-5" />
            </div>
            <span>New Acquisition</span>
            <div class="btn-shine"></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Acquisitions Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Propriété
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Commercial
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('common.actions') }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="acquisition in acquisitions" :key="acquisition.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img
                    :src="acquisition.property.imageUrl"
                    :alt="acquisition.property.type"
                    class="w-10 h-10 rounded-lg object-cover mr-3"
                  />
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ acquisition.property.title }}</div>
                    <div class="text-sm text-gray-500">{{ acquisition.property.type }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="text-sm text-gray-900">{{ acquisition.client.firstName }} {{ acquisition.client.lastName }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ acquisition.commercialName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ formatPrice(acquisition.amount) }} FCFA</div>
                <div class="text-sm text-gray-500">{{ acquisition.amountType }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getStatusClasses(acquisition.status)"
                >
                  {{ acquisition.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(acquisition.dateAcquisition) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <AppButton
                    v-if="acquisition.status === 'Réservée' || acquisition.status === 'Soldée'"
                    @click="generateContract(acquisition)"
                    variant="gold"
                    size="sm"
                  >
                    Contrat
                  </AppButton>
                  <AppButton
                    @click="viewAcquisition(acquisition)"
                    variant="ghost"
                    size="sm"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </AppButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="acquisitions.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
        <p class="text-lg text-gray-500">{{ $t('common.noData') }}</p>
      </div>
    </div>
  </div>

  <!-- Create/Edit Sale Modal -->
  <div v-if="showCreateModal || showEditModal" class="modal-overlay" @click="closeModals">
    <div class="modal-container" @click.stop>

      <div class="modal-header">
        <h3 class="modal-title">
          {{ showCreateModal ? 'Nouveau Contrat' : 'Modifier le Contrat' }}
        </h3>
        <button @click="closeModals" class="modal-close">✕</button>
      </div>

      <form @submit.prevent="submitForm" class="modal-form">

        <div class="form-row">
        <!-- Propriété -->
        <div class="form-group">
          <label class="form-label">Propriété *</label>
          <select v-model="formData.property_id" class="form-input" required>
            <option value="">Choisir une propriété</option>
            <option v-for="p in properties" :key="p.id" :value="p.id">
              {{ p.title }} - {{ p.type }}
            </option>
          </select>
        </div>

        <!-- Client -->
        <div class="form-group">
          <label class="form-label">Client *</label>
          <select v-model="formData.client_id" class="form-input" required>
            <option value="">Choisir un client</option>
            <option v-for="c in clients" :key="c.id" :value="c.id">
              {{ c.firstName }} {{ c.lastName }}
            </option>
          </select>
        </div>
        </div>

        <!-- Commercial -->
        <div class="form-group">
          <label class="form-label">Commercial *</label>

          <input v-model="formData.agent" type="text" class="form-input" required />
        </div>

        <!-- Montant -->
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Montant (FCFA) *</label>
            <input v-model="formData.amount" type="number" class="form-input" required />
          </div>

          <div class="form-group">
            <label class="form-label">Paiement *</label>
            <select v-model="formData.payment_type" class="form-input">
              <option value="TOTAL">Total</option>
              <option value="ADVANCE">Avance</option>
            </select>
          </div>
        </div>


        <div class="form-row">
        <!-- Statut -->
        <div class="form-group">
          <label class="form-label">Statut *</label>
          <select v-model="formData.status" class="form-input">
            <option value="RESERVED">Réservée</option>
            <option value="UNDER_DISCUSSION">Sous discussion</option>
            <option value="SOLD">Soldée</option>
          </select>
        </div>

        <!-- Date -->
        <div class="form-group">
          <label class="form-label">Date *</label>
          <input v-model="formData.date" type="date" class="form-input" required />
        </div>
        </div>

        <!-- Contrat -->
        <div class="form-group">
          <label class="form-label">Contrat (PDF/Image)</label>
          <input
              v-model="formData.contract"
              type="url"
              class="form-input"
              placeholder="https://example.com/image.jpg"
          />
        </div>

        <div class="modal-actions">
          <button type="button" @click="closeModals" class="btn-secondary">Annuler</button>
          <button type="submit" class="btn-primary">Enregistrer</button>
        </div>

      </form>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { Plus } from 'lucide-vue-next'
import AppButton from '@/components/ui/AppButton.vue'
import { AcquisitionService } from "@/services/acquisition.service.ts";
import {ClientService} from "@/services/client.service.ts";
import {PropertiesService} from "@/services/properties.service.ts";

const authStore = useAuthStore()
const showCreateModal = ref(false)
const showEditModal = ref(false)
const acquisitions = ref<any[]>([])

// Formulaire
const formData = ref({
  property_id: '',
  client_id: '',
  agent: '',
  amount: 0,
  payment_type: 'TOTAL',
  status: 'RESERVED',
  date: '',
  contract: null
})

// 👀 Options pour select
const properties = ref<any[]>([])
const clients = ref<any[]>([])

// ⚡ Récupération des acquisitions
const loadAcquisitions = async () => {
  try {
    const { data } = await AcquisitionService.all()
    acquisitions.value = data
  } catch (err) {
    console.error('Erreur lors du chargement des acquisitions', err)
  }
}

// 📝 Soumission du formulaire
const submitForm = async () => {
  try {
    const payload = new FormData()
    payload.append('property_id', formData.value.property_id)
    payload.append('client_id', formData.value.client_id)
    payload.append('agent', formData.value.agent)
    payload.append('amount', formData.value.amount.toString())
    payload.append('payment_type', formData.value.payment_type)
    payload.append('status', formData.value.status)
    payload.append('date', formData.value.date)
    if (formData.value.contract) {
      payload.append('contract', formData.value.contract)
    }

    // if (formData.value.id) {
    //   await AcquisitionService.update(formData.value.id, payload)
    // } else {
      await AcquisitionService.create(payload)
    // }

    closeModals()
    loadAcquisitions()
  } catch (err) {
    console.error('Erreur lors de la sauvegarde', err)
  }
}

// 📂 Gestion upload contrat
const handleContractUpload = (e: any) => {
  formData.value.contract = e.target.files[0]
}

// 🟢 Formatage
const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR').format(price)
const formatDate = (date: string) => new Date(date).toLocaleDateString('fr-FR')
const getStatusClasses = (status: string) => {
  const classes: Record<string, string> = {
    'Sous discussion': 'bg-yellow-100 text-yellow-800',
    'Réservée': 'bg-blue-100 text-blue-800',
    'Soldée': 'bg-green-100 text-green-800',
    'Offre surclassée': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

// 🔎 Voir acquisition
const viewAcquisition = (acq: any) => {
  console.log('View acquisition:', acq)
}

// 📄 Générer contrat
const generateContract = (acq: any) => {
  console.log('Generate contract for:', acq)
}

// ❌ Fermer modals et reset
const closeModals = () => {
  showCreateModal.value = false
  formData.value = {
    property_id: '',
    client_id: '',
    agent: '',
    amount: 0,
    payment_type: 'TOTAL',
    status: 'RESERVED',
    date: '',
    contract: null
  }
}
const loadProperties = async () => {
  try {
    const { data } = await PropertiesService.all()
    properties.value = data
  } catch (err) {
    console.error('Erreur chargement propriétés:', err)
  }
}

const loadClients = async () => {
  try {
    const { data } = await ClientService.all()
    clients.value = data
  } catch (err) {
    console.error('Erreur chargement clients:', err)
  }
}



// 🔥 Initialisation
onMounted(() => {
  loadAcquisitions()
  loadProperties()
  loadClients()
  // TODO: charger properties, clients, agents depuis API si besoin
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