<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="luxury-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="header-title">Contract Management</h1>
          <p class="header-subtitle">Manage reservation and rental management contracts</p>
        </div>
        <div class="header-actions">
          <button
            v-if="authStore.canAccess.contracts"
            @click="showCreateModal = true"
            class="luxury-add-btn"
          >
            <div class="btn-icon">
              <Plus class="w-5 h-5" />
            </div>
            <span>Generate Contract</span>
            <div class="btn-shine"></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Contract Types Tabs -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8 px-6">
          <button
            v-for="tab in contractTabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            class="py-4 px-1 border-b-2 font-medium text-sm transition-colors"
            :class="activeTab === tab.key
              ? 'border-accent-500 text-accent-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            {{ tab.label }}
          </button>
        </nav>
      </div>

      <!-- Contracts Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contrat
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Propriété
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Émis par
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('common.actions') }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="contract in filteredContracts" :key="contract.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ contract.contractNumber }}</div>
                    <div class="text-sm text-gray-500">{{ contract.contractType }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ contract.propertyTitle }}</div>
                <div class="text-sm text-gray-500">{{ contract.propertyType }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img
                    :src="contract.clientAvatar"
                    :alt="contract.clientName"
                    class="w-8 h-8 rounded-full object-cover mr-2"
                  />
                  <div class="text-sm text-gray-900">{{ contract.clientName }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ contract.issuedBy }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(contract.issuedAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getStatusClasses(contract.status)"
                >
                  {{ contract.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <AppButton
                    @click="downloadContract(contract)"
                    variant="ghost"
                    size="sm"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </AppButton>
                  <AppButton
                    @click="viewContract(contract)"
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
      <div v-if="filteredContracts.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <p class="text-lg text-gray-500">{{ $t('common.noData') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { Plus } from 'lucide-vue-next'
import AppButton from '@/components/ui/AppButton.vue'

const authStore = useAuthStore()

const showCreateModal = ref(false)

const activeTab = ref('reservation')

const contractTabs = computed(() => {
  const tabs = [
    { key: 'reservation', label: 'Contrats de Réservation' }
  ]
  
  if (authStore.userRole === 'SUPERADMIN') {
    tabs.push(
      { key: 'rental', label: 'Gestion Locative' },
      { key: 'sale', label: 'Contrats de Vente' }
    )
  } else if (authStore.canAccess.contracts) {
    tabs.push({ key: 'rental', label: 'Gestion Locative' })
  }
  
  return tabs
})

// Mock data
const contracts = ref([
  {
    id: '1',
    contractNumber: 'CTR-2024-001',
    contractType: 'Réservation',
    propertyTitle: 'Appartement 3P - A101',
    propertyType: 'Appartement',
    clientName: 'Marie Dupont',
    clientAvatar: 'https://ui-avatars.com/api/?name=Marie+Dupont&background=3b82f6&color=fff',
    issuedBy: 'John Doe',
    issuedAt: '2024-01-15',
    status: 'Signé',
    type: 'reservation'
  },
  {
    id: '2',
    contractNumber: 'CTL-2024-001',
    contractType: 'Gestion Locative',
    propertyTitle: 'Villa Premium - V001',
    propertyType: 'Villa',
    clientName: 'Jean Martin',
    clientAvatar: 'https://ui-avatars.com/api/?name=Jean+Martin&background=10b981&color=fff',
    issuedBy: 'Admin User',
    issuedAt: '2024-01-20',
    status: 'En attente',
    type: 'rental'
  },
  {
    id: '3',
    contractNumber: 'CTV-2024-001',
    contractType: 'Vente Finale',
    propertyTitle: 'Appartement 2P - B205',
    propertyType: 'Appartement',
    clientName: 'Sophie Dubois',
    clientAvatar: 'https://ui-avatars.com/api/?name=Sophie+Dubois&background=f59e0b&color=fff',
    issuedBy: 'Super Admin',
    issuedAt: '2024-01-10',
    status: 'Signé',
    type: 'sale'
  }
])

const filteredContracts = computed(() => {
  return contracts.value.filter(contract => {
    if (activeTab.value === 'reservation') return contract.type === 'reservation'
    if (activeTab.value === 'rental') return contract.type === 'rental'
    if (activeTab.value === 'sale') return contract.type === 'sale'
    return true
  })
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR')
}

const getStatusClasses = (status: string) => {
  const classes = {
    'Signé': 'bg-green-100 text-green-800',
    'En attente': 'bg-yellow-100 text-yellow-800',
    'Brouillon': 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const viewContract = (contract: any) => {
  console.log('View contract:', contract)
  // Open contract viewer
}

const downloadContract = (contract: any) => {
  console.log('Download contract:', contract)
  // Download PDF
}
</script>