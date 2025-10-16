<template>
  <div class="recent-acquisitions">
    <div class="section-header">
      <h3 class="section-title">Recent Acquisitions</h3>
      <p class="section-subtitle">Last 3 property sales</p>
    </div>

    <div v-if="acquisitions.length === 0" class="empty-state">
      <div class="empty-icon">
        <FileText class="w-12 h-12" />
      </div>
      <p class="empty-text">No recent acquisitions</p>
    </div>

    <div v-else class="acquisitions-list">
      <div
        v-for="acquisition in acquisitions"
        :key="acquisition.id"
        class="acquisition-card"
      >
        <div class="acquisition-image">
          <img
            :src="acquisition.propertyImage"
            :alt="acquisition.propertyTitle"
            class="property-img"
          />
          <div class="status-badge" :class="getStatusClass(acquisition.status)">
            {{ getStatusLabel(acquisition.status) }}
          </div>
        </div>

        <div class="acquisition-details">
          <div class="property-info">
            <h4 class="property-title">{{ acquisition.propertyTitle }}</h4>
            <p class="property-type">
              <Building class="w-4 h-4" />
              {{ getPropertyTypeLabel(acquisition.propertyType) }}
            </p>
          </div>

          <div class="client-info">
            <User class="w-4 h-4" />
            <span>{{ acquisition.clientName }}</span>
          </div>

          <div class="acquisition-meta">
            <div class="meta-item">
              <Calendar class="w-4 h-4" />
              <span>{{ formatDate(acquisition.dateAcquisition) }}</span>
            </div>
            <div class="meta-item amount">
              <DollarSign class="w-4 h-4" />
              <span class="amount-value">{{ formatCurrency(acquisition.amount) }}</span>
            </div>
          </div>

          <div class="acquisition-footer">
            <div class="commercial-info">
              <div class="commercial-avatar">
                {{ getInitials(acquisition.commercialName) }}
              </div>
              <span class="commercial-name">{{ acquisition.commercialName }}</span>
            </div>
            <button
              @click="$emit('view-details', acquisition)"
              class="view-btn"
            >
              View Details
              <ArrowRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Building, User, Calendar, DollarSign, FileText, ArrowRight } from 'lucide-vue-next'

interface Acquisition {
  id: string
  propertyId: string
  propertyTitle: string
  propertyType: string
  propertyImage: string
  clientName: string
  commercialName: string
  amount: number
  status: string
  dateAcquisition: Date
}

interface Props {
  acquisitions: Acquisition[]
}

const props = defineProps<Props>()

defineEmits<{
  'view-details': [acquisition: Acquisition]
}>()

const getStatusClass = (status: string) => {
  const statusClasses: Record<string, string> = {
    'Réservée': 'status-reserved',
    'Soldée': 'status-sold',
    'Sous discussion': 'status-discussion',
    'Offre surclassée': 'status-surpassed'
  }
  return statusClasses[status] || 'status-default'
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    'Réservée': 'Reserved',
    'Soldée': 'Sold',
    'Sous discussion': 'In Discussion',
    'Offre surclassée': 'Outbid'
  }
  return labels[status] || status
}

const getPropertyTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    'appartement': 'Apartment',
    'villa': 'Villa',
    'magasin': 'Store'
  }
  return labels[type] || type
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(amount)
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script>

<style scoped>
.recent-acquisitions {
  @apply bg-white rounded-2xl shadow-sm border border-gray-200 p-6;
}

.section-header {
  @apply mb-6;
}

.section-title {
  @apply text-xl font-bold text-gray-900 mb-1;
}

.section-subtitle {
  @apply text-sm text-gray-600;
}

.empty-state {
  @apply flex flex-col items-center justify-center py-12;
}

.empty-icon {
  @apply w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400;
}

.empty-text {
  @apply text-gray-500 text-sm;
}

.acquisitions-list {
  @apply space-y-4;
}

.acquisition-card {
  @apply bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300;
}

.acquisition-image {
  @apply relative h-40 overflow-hidden;
}

.property-img {
  @apply w-full h-full object-cover;
}

.status-badge {
  @apply absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm;
}

.status-badge.status-reserved {
  @apply bg-blue-500/90 text-white;
}

.status-badge.status-sold {
  @apply bg-red-500/90 text-white;
}

.status-badge.status-discussion {
  @apply bg-yellow-500/90 text-white;
}

.status-badge.status-surpassed {
  @apply bg-gray-500/90 text-white;
}

.acquisition-details {
  @apply p-4 space-y-3;
}

.property-info {
  @apply space-y-1;
}

.property-title {
  @apply text-lg font-bold text-gray-900;
}

.property-type {
  @apply flex items-center gap-2 text-sm text-gray-600;
}

.client-info {
  @apply flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg;
}

.acquisition-meta {
  @apply flex items-center justify-between pt-3 border-t border-gray-200;
}

.meta-item {
  @apply flex items-center gap-2 text-sm text-gray-600;
}

.meta-item.amount {
  @apply text-gray-900 font-semibold;
}

.amount-value {
  @apply text-lg font-bold text-blue-600;
}

.acquisition-footer {
  @apply flex items-center justify-between pt-3 border-t border-gray-200;
}

.commercial-info {
  @apply flex items-center gap-2;
}

.commercial-avatar {
  @apply w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold;
}

.commercial-name {
  @apply text-sm text-gray-700 font-medium;
}

.view-btn {
  @apply flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium;
}

@media (max-width: 768px) {
  .acquisition-card {
    @apply flex flex-col;
  }

  .acquisition-image {
    @apply h-32;
  }

  .acquisition-footer {
    @apply flex-col gap-3 items-stretch;
  }

  .view-btn {
    @apply w-full justify-center;
  }
}
</style>
