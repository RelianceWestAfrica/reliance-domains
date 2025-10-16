<template>
  <div class="container">
    <div class="space-y-6">
      <!-- Header -->
      <div class="luxury-header">
        <div class="header-content">
          <div class="header-text">
            <h1 class="header-title">Bilan visuel des résidences</h1>
            <p class="header-subtitle text-gold-100">Apperçu visuel des états des appartements et Propriétés</p>
          </div>
          <!-- <div class="header-actions">
            <button
              class="luxury-add-btn"
            >
              <div class="btn-icon">
                <Building2 class="w-5 h-5" />
              </div>
              <span>Résidences</span>
              <div class="btn-shine"></div>
            </button>
          </div> -->
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="search-input-wrapper">
            <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher une résidence..."
              class="search-input"
            />
          </div>
          <select v-model="nameFilter" class="filter-select">
            <option value="">Toutes les résidences</option>
            <option value="1">Bâtiment A - Sika Resort</option>
            <option value="2">Bâtiment B - Sika Resort</option>
            <option value="3">Golden Heights</option>
            <option value="4">Résidence étoile</option>
            <option value="5">Villa Paradise</option>

          </select>
          <input 
            v-model="cityFilter"
            type="text"
            placeholder="Rechercher par ville"
            class="search-input"/>
        </div>
      </div>
      <ResidenceList @select-residence="handleSelectResidence" :residences="filteredResidences"/>
    </div>

    <!-- Empty State -->
    <div v-if="filteredResidences.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
        </svg>
      </div>
      <h3 class="empty-title">Aucune résidence trouvée</h3>
      <p class="empty-description">
        {{ searchQuery ? 'Aucune résidence ne correspond à votre recherche.' : 'Commencez par ajouter votre première résidence.' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ResidenceList from '@/components/bilan/ResidenceList.vue'
import { useApartmentStore } from '@/stores/apartmentStore'
import { Building2 } from 'lucide-vue-next'

const router = useRouter()

const handleSelectResidence = (residenceId: string) => {
  router.push(`/admin/summary/${residenceId}`)
}

// Reactive data
const apartmentStore = useApartmentStore()
const searchQuery = ref('')
const nameFilter = ref('')
const cityFilter = ref('')

// Liste complète (store)
const residences = computed(() => apartmentStore.getAllResidences)

// Computed properties
const filteredResidences = computed(() => {
  let filtered = residences.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(r =>
      r.name.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query) ||
      r.city.toLowerCase().includes(query)
    )
  }

  if (nameFilter.value) {
    const query = nameFilter.value.toLowerCase()
    filtered = filtered.filter(r => r.name.toLowerCase().includes(query))
  }

  if (cityFilter.value) {
    const query = cityFilter.value.toLowerCase()
    filtered = filtered.filter(r => r.city.toLowerCase().includes(query))
  }

  return filtered
})

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

</style>
