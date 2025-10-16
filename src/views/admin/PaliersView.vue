<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="luxury-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="header-title">Floor Management</h1>
          <p class="header-subtitle">Manage building floors and levels across all residences</p>
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
            <span>Add New Floor</span>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { Plus } from 'lucide-vue-next'

const authStore = useAuthStore()

const showCreateModal = ref(false)

// Mock data
const paliers = ref([
  {
    id: '1',
    title: 'Rez-de-chaussée',
    description: 'Niveau 0 - Entrée principale',
    residenceTitle: 'Tour A - Résidence Étoile',
    unitCount: 4,
    availableUnits: 2
  },
  {
    id: '2',
    title: '1er étage',
    description: 'Niveau 1',
    residenceTitle: 'Tour A - Résidence Étoile',
    unitCount: 6,
    availableUnits: 4
  },
  {
    id: '3',
    title: '2ème étage',
    description: 'Niveau 2',
    residenceTitle: 'Tour A - Résidence Étoile',
    unitCount: 6,
    availableUnits: 6
  },
  {
    id: '4',
    title: 'Penthouse',
    description: 'Dernier étage - Vue panoramique',
    residenceTitle: 'Tour B - Résidence Étoile',
    unitCount: 2,
    availableUnits: 1
  }
])

const editPalier = (palier: any) => {
  console.log('Edit palier:', palier)
  // Open edit modal
}

const deletePalier = (palier: any) => {
  console.log('Delete palier:', palier)
  // Show confirmation dialog
}
</script>