<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="luxury-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="header-title">Acquisition Management</h1>
          <p class="header-subtitle">Manage property acquisitions and transactions</p>
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
                    :src="acquisition.propertyImage"
                    :alt="acquisition.propertyTitle"
                    class="w-10 h-10 rounded-lg object-cover mr-3"
                  />
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ acquisition.propertyTitle }}</div>
                    <div class="text-sm text-gray-500">{{ acquisition.propertyType }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img
                    :src="acquisition.clientAvatar"
                    :alt="acquisition.clientName"
                    class="w-8 h-8 rounded-full object-cover mr-2"
                  />
                  <div class="text-sm text-gray-900">{{ acquisition.clientName }}</div>
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { Plus } from 'lucide-vue-next'
import AppButton from '@/components/ui/AppButton.vue'

const authStore = useAuthStore()

const showCreateModal = ref(false)

// Mock data
const acquisitions = ref([
  {
    id: '1',
    propertyTitle: 'Appartement 3P - A101',
    propertyType: 'Appartement',
    propertyImage: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=100',
    clientName: 'Marie Dupont',
    clientAvatar: 'https://ui-avatars.com/api/?name=Marie+Dupont&background=3b82f6&color=fff',
    commercialName: 'John Doe',
    amount: 45000000,
    amountType: 'Total',
    status: 'Réservée',
    dateAcquisition: '2024-01-15'
  },
  {
    id: '2',
    propertyTitle: 'Villa Premium - V001',
    propertyType: 'Villa',
    propertyImage: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=100',
    clientName: 'Jean Martin',
    clientAvatar: 'https://ui-avatars.com/api/?name=Jean+Martin&background=10b981&color=fff',
    commercialName: 'John Doe',
    amount: 25000000,
    amountType: 'Avance',
    status: 'Sous discussion',
    dateAcquisition: '2024-01-20'
  },
  {
    id: '3',
    propertyTitle: 'Appartement 2P - B205',
    propertyType: 'Appartement',
    propertyImage: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=100',
    clientName: 'Sophie Dubois',
    clientAvatar: 'https://ui-avatars.com/api/?name=Sophie+Dubois&background=f59e0b&color=fff',
    commercialName: 'John Doe',
    amount: 35000000,
    amountType: 'Total',
    status: 'Soldée',
    dateAcquisition: '2024-01-10'
  }
])

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR').format(price)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR')
}

const getStatusClasses = (status: string) => {
  const classes = {
    'Sous discussion': 'bg-yellow-100 text-yellow-800',
    'Réservée': 'bg-blue-100 text-blue-800',
    'Soldée': 'bg-green-100 text-green-800',
    'Offre surclassée': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const viewAcquisition = (acquisition: any) => {
  console.log('View acquisition:', acquisition)
  // Navigate to acquisition details
}

const generateContract = (acquisition: any) => {
  console.log('Generate contract for:', acquisition)
  // Open contract generation modal
}
</script>