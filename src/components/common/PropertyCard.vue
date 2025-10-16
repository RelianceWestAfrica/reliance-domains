<template>
  <div
    class="card-premium cursor-pointer group overflow-hidden"
    @click="$emit('click', item)"
  >
    <!-- Image -->
    <div class="relative h-48 overflow-hidden">
      <img
        :src="item.image || defaultImage"
        :alt="item.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      
      <!-- Status Badge -->
      <div class="absolute top-4 left-4">
        <span
          class="px-3 py-1 text-xs font-semibold rounded-full"
          :class="statusClasses"
        >
          {{ statusText }}
        </span>
      </div>

      <!-- Type Badge -->
      <div class="absolute top-4 right-4">
        <span class="px-2 py-1 text-xs font-medium bg-black/50 text-white rounded">
          {{ typeDisplay }}
        </span>
      </div>

      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-accent-600 transition-colors">
        {{ item.title }}
      </h3>

      <!-- Property Details -->
      <div v-if="item.rooms" class="flex items-center space-x-4 text-sm text-gray-600 mb-3">
        <div class="flex items-center space-x-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
          </svg>
          <span>{{ item.rooms }} pièces</span>
        </div>
        <div v-if="item.surface" class="flex items-center space-x-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
          </svg>
          <span>{{ item.surface }}m²</span>
        </div>
      </div>

      <!-- Price -->
      <div v-if="item.price" class="flex items-center justify-between">
        <div>
          <span class="text-2xl font-bold text-gray-900">{{ formattedPrice }}</span>
          <span class="text-sm text-gray-500 ml-1">FCFA</span>
        </div>
        
        <!-- Action Buttons (Admin/SuperAdmin only) -->
        <div v-if="canCreateAcquisition" class="opacity-0 group-hover:opacity-100 transition-opacity">
          <AppButton
            variant="gold"
            size="sm"
            @click.stop="handleAcquisitionClick"
          >
            Acquérir
          </AppButton>
        </div>
      </div>

      <!-- Project/Residence Count -->
      <div v-else class="text-sm text-gray-500">
        <span v-if="item.type === 'project'">{{ getProjectStats(item) }}</span>
        <span v-else-if="item.type === 'residence'">{{ getResidenceStats(item) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import AppButton from '@/components/ui/AppButton.vue'

interface Props {
  item: any
}

const props = defineProps<Props>()

defineEmits<{
  click: [item: any]
}>()

const authStore = useAuthStore()
const { t } = useI18n()

const defaultImage = 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800'

const canCreateAcquisition = computed(() => {
  return authStore.canAccess.acquisitions && props.item.price
})

const typeDisplay = computed(() => {
  const types = {
    'project': 'Projet',
    'residence': 'Résidence', 
    'property': 'Propriété'
  }
  return types[props.item.type] || 'Propriété'
})

const statusClasses = computed(() => {
  const classes = {
    'available': 'bg-green-100 text-green-800',
    'discussion': 'bg-yellow-100 text-yellow-800',
    'reserved': 'bg-blue-100 text-blue-800',
    'sold': 'bg-gray-100 text-gray-800',
    'rental': 'bg-purple-100 text-purple-800',
    'surpassed': 'bg-red-100 text-red-800'
  }
  return classes[props.item.status] || 'bg-gray-100 text-gray-800'
})

const statusText = computed(() => {
  const statuses = {
    'available': t('status.available'),
    'discussion': t('status.discussion'),
    'reserved': t('status.reserved'),
    'sold': t('status.sold'),
    'rental': t('status.rental'),
    'surpassed': t('status.surpassed')
  }
  return statuses[props.item.status] || t('status.available')
})

const formattedPrice = computed(() => {
  if (!props.item.price) return ''
  return new Intl.NumberFormat('fr-FR').format(parseInt(props.item.price.replace(/,/g, '')))
})

const getProjectStats = (project: any) => {
  // Mock implementation - should fetch real stats
  return '3 résidences • 24 propriétés'
}

const getResidenceStats = (residence: any) => {
  // Mock implementation - should fetch real stats  
  return '8 propriétés disponibles'
}

const handleAcquisitionClick = () => {
  console.log('Create acquisition for:', props.item)
  // Open acquisition modal
}
</script>