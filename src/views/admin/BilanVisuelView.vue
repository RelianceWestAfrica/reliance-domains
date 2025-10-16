<template>
  <div class="bilan-visuel-page">
    <div v-if="!hasAccess" class="access-denied">
      <div class="access-denied-card">
        <ShieldX class="access-icon" />
        <h2>Accès Refusé</h2>
        <p>Vous n'avez pas la permission d'accéder à cette page. Rôle Admin ou Superadmin requis.</p>
        <AppButton @click="router.push('/residences')">
          Retour aux Résidences
        </AppButton>
      </div>
    </div>

    <div v-else-if="!selectedResidence" class="no-residence">
      <div class="no-residence-card">
        <AlertCircle class="alert-icon" />
        <h2>Aucune Résidence Sélectionnée</h2>
        <p>Veuillez d'abord sélectionner une résidence pour voir le rapport visuel.</p>
        <AppButton @click="router.push('/residences')">
          Sélectionner une Résidence
        </AppButton>
      </div>
    </div>

    <div v-else class="bilan-content">
      <header class="bilan-header">
        <div class="header-logo">
          <Building2 class="logo-icon" />
          <h1 class="logo-text">DIAMOND HOUSE</h1>
        </div>

        <nav class="header-nav">
          <button
            class="nav-btn"
            :class="{ active: statusFilter === 'Disponible' }"
            @click="statusFilter = 'Disponible'"
          >
            Disponible
          </button>
          <button
            class="nav-btn"
            :class="{ active: statusFilter === 'En discussion' }"
            @click="statusFilter = 'En discussion'"
          >
            En discussion
          </button>
          <button
            class="nav-btn"
            :class="{ active: statusFilter === 'Vendu' }"
            @click="statusFilter = 'Vendu'"
          >
            Vendu
          </button>
          <button class="nav-btn" @click="router.push('/dashboard')">
            Tableau de bord
          </button>
          <button class="icon-btn">
            <User class="w-5 h-5" />
          </button>
        </nav>
      </header>

      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">
            {{ selectedResidence.title }}
          </h1>
          <p class="hero-description">
            Découvrez notre sélection exclusive de propriétés dans cette résidence prestigieuse.
            Profitez d'un cadre de vie exceptionnel avec des équipements haut de gamme.
          </p>

          <div class="property-type-tabs">
            <button
              v-for="status in ['Disponible', 'En discussion', 'Vendu']"
              :key="status"
              class="type-tab"
              :class="{ active: statusFilter === status }"
              @click="statusFilter = status"
            >
              {{ status }}
            </button>
          </div>

          <div class="search-section">
            <div class="search-bar">
              <div class="search-dropdown">
                <select class="dropdown-select" v-model="propertyTypeFilter">
                  <option value="">Tous les types</option>
                  <option value="appartement">Appartements</option>
                  <option value="villa">Villas</option>
                  <option value="magasin">Magasins</option>
                </select>
              </div>

              <div class="search-input-container">
                <input
                  type="text"
                  class="search-input"
                  placeholder="Rechercher"
                  v-model="searchQuery"
                />
              </div>

              <button class="search-btn">
                <Search class="w-5 h-5" />
              </button>

              <div class="palier-filter">
                <select class="palier-select" v-model="palierFilter">
                  <option value="">Tous les paliers</option>
                  <option
                    v-for="palier in residencePaliers"
                    :key="palier.id"
                    :value="palier.id"
                  >
                    {{ palier.title }}
                  </option>
                </select>
                <ChevronDown class="w-4 h-4 palier-icon" />
              </div>
            </div>
          </div>
        </div>

        <div class="hero-image">
          <div class="house-container">
            <img
              :src="selectedResidence.photoUrl || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800'"
              :alt="selectedResidence.title"
              class="house-img"
            />
          </div>
        </div>
      </div>

      <div class="residence-info-section">
        <div class="residence-card">
          <div class="card-header">
            <Building class="w-6 h-6 text-primary-600" />
            <h3>Informations de la Résidence</h3>
          </div>
          <div class="card-body">
            <div class="info-row">
              <span class="info-label">Nom:</span>
              <span class="info-value">{{ selectedResidence.title }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Projet:</span>
              <span class="info-value">{{ getProjectName(selectedResidence.projectId) }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Total Propriétés:</span>
              <span class="info-value">{{ residenceProperties.length }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Disponible:</span>
              <span class="info-value available">{{ availableCount }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Vendu:</span>
              <span class="info-value sold">{{ soldCount }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="properties-grid-section">
        <h2 class="section-title">Propriétés {{ statusFilter || 'Disponibles' }}</h2>
        <div class="properties-grid">
          <div
            v-for="property in filteredProperties"
            :key="property.id"
            class="property-card"
          >
            <div class="property-image">
              <img
                :src="property.photos?.[0]?.photoUrl || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400'"
                :alt="property.title"
              />
              <div class="property-badge" :class="getStatusClass(property.status)">
                {{ property.status }}
              </div>
            </div>
            <div class="property-details">
              <h4 class="property-title">{{ property.title }}</h4>
              <p class="property-type">{{ property.propertyType }}</p>
              <div class="property-specs">
                <div class="spec-item">
                  <Home class="w-4 h-4" />
                  <span>{{ property.surfaceM2 }} m²</span>
                </div>
                <div class="spec-item">
                  <Users class="w-4 h-4" />
                  <span>{{ property.rooms }} pièces</span>
                </div>
              </div>
              <div class="property-price">
                {{ formatPrice(property.price) }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="filteredProperties.length === 0" class="empty-state">
          <div class="empty-icon">
            <Home class="w-16 h-16" />
          </div>
          <h3 class="empty-title">Aucune propriété trouvée</h3>
          <p class="empty-description">
            Aucune propriété ne correspond à vos critères de recherche.
          </p>
        </div>
      </div>

      <button class="back-button" @click="router.push('/residences')">
        <ArrowLeft class="w-5 h-5" />
        Retour aux Résidences
      </button>

      <footer class="bilan-footer">
        <div class="footer-content">
          <div class="footer-section">
            <div class="footer-logo">
              <Building2 class="w-6 h-6" />
              <span class="footer-brand">DIAMOND HOUSE</span>
            </div>
            <p class="footer-description">
              Votre partenaire de confiance pour l'immobilier de prestige.
            </p>
          </div>

          <div class="footer-section">
            <h4 class="footer-title">Contact</h4>
            <p class="footer-text">Email: contact@diamondhouse.com</p>
            <p class="footer-text">Tél: +1 234 567 890</p>
          </div>

          <div class="footer-section">
            <h4 class="footer-title">Liens Rapides</h4>
            <button @click="router.push('/dashboard')" class="footer-link">Tableau de bord</button>
            <button @click="router.push('/residences')" class="footer-link">Résidences</button>
            <button @click="router.push('/properties')" class="footer-link">Propriétés</button>
          </div>

          <div class="footer-section">
            <h4 class="footer-title">Suivez-nous</h4>
            <div class="footer-social">
              <a href="#" class="social-link">Facebook</a>
              <a href="#" class="social-link">Twitter</a>
              <a href="#" class="social-link">LinkedIn</a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2024 Diamond House. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Building2, Building, User, Search, ChevronDown, Hop as Home, Users, ArrowLeft, ShieldX, CircleAlert as AlertCircle } from 'lucide-vue-next'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const authStore = useAuthStore()

const searchQuery = ref('')
const selectedResidenceId = ref<string | null>(null)
const statusFilter = ref('Disponible')
const propertyTypeFilter = ref('')
const palierFilter = ref('')

const hasAccess = computed(() => {
  const role = authStore.user?.role?.toLowerCase()
  return role === 'admin' || role === 'superadmin'
})

const selectedResidence = computed(() => {
  if (!selectedResidenceId.value) return null
  return appStore.residences.find(r => r.id === selectedResidenceId.value)
})

const residenceProperties = computed(() => {
  if (!selectedResidenceId.value) return []
  return appStore.properties.filter(p => p.residenceId === selectedResidenceId.value)
})

const residencePaliers = computed(() => {
  if (!selectedResidenceId.value) return []
  return appStore.paliers.filter(p => p.residenceId === selectedResidenceId.value)
})

const filteredProperties = computed(() => {
  let filtered = residenceProperties.value

  if (statusFilter.value) {
    const statusMap: Record<string, string> = {
      'Disponible': 'Disponible',
      'En discussion': 'Sous discussion cliente',
      'Vendu': 'Soldé(e)'
    }
    const targetStatus = statusMap[statusFilter.value]
    if (targetStatus) {
      filtered = filtered.filter(p => p.status === targetStatus)
    }
  }

  if (propertyTypeFilter.value) {
    filtered = filtered.filter(p => p.propertyType === propertyTypeFilter.value)
  }

  if (palierFilter.value) {
    filtered = filtered.filter(p => p.palierId === palierFilter.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.propertyType.toLowerCase().includes(query)
    )
  }

  return filtered
})

const availableCount = computed(() => {
  return residenceProperties.value.filter(p => p.status === 'Disponible').length
})

const soldCount = computed(() => {
  return residenceProperties.value.filter(p => p.status === 'Soldé(e)').length
})

function getProjectName(projectId: string): string {
  const project = appStore.projects.find(p => p.id === projectId)
  return project?.title || 'N/A'
}

function getStatusClass(status: string): string {
  const statusMap: Record<string, string> = {
    'Disponible': 'badge-available',
    'Réservé(e)': 'badge-reserved',
    'Soldé(e)': 'badge-sold',
    'Sous discussion cliente': 'badge-discussion',
    'Offre surclassée': 'badge-inactive'
  }
  return statusMap[status] || 'badge-default'
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  }).format(price)
}

onMounted(() => {
  const residenceId = route.query.residenceId as string
  if (residenceId) {
    selectedResidenceId.value = residenceId
  }
})
</script>

<style scoped>
.bilan-visuel-page {
  @apply min-h-screen bg-gradient-to-br from-gray-100 to-blue-50;
}

.access-denied,
.no-residence {
  @apply min-h-screen flex items-center justify-center p-6;
}

.access-denied-card,
.no-residence-card {
  @apply bg-white rounded-2xl shadow-xl p-12 text-center max-w-md;
}

.access-icon,
.alert-icon {
  @apply w-16 h-16 mx-auto mb-6 text-red-500;
}

.alert-icon {
  @apply text-yellow-500;
}

.access-denied-card h2,
.no-residence-card h2 {
  @apply text-2xl font-bold text-gray-900 mb-4;
}

.access-denied-card p,
.no-residence-card p {
  @apply text-gray-600 mb-8;
}

.bilan-content {
  @apply relative;
}

.bilan-header {
  @apply bg-white shadow-sm px-8 py-6 flex items-center justify-between;
}

.header-logo {
  @apply flex items-center gap-3;
}

.logo-icon {
  @apply w-8 h-8 text-gray-900;
}

.logo-text {
  @apply text-2xl font-black tracking-wider text-gray-900;
  font-family: 'Courier New', monospace;
}

.header-nav {
  @apply flex items-center gap-3;
}

.nav-btn {
  @apply px-6 py-2.5 rounded-full text-sm font-medium transition-all;
  @apply bg-gray-100 text-gray-700 hover:bg-gray-200;
}

.nav-btn.active {
  @apply bg-gray-200 text-gray-900;
}

.icon-btn {
  @apply w-10 h-10 rounded-full flex items-center justify-center;
  @apply bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all;
}

.hero-section {
  @apply relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-16 py-20;
  @apply flex items-center justify-between gap-12;
}

.hero-content {
  @apply flex-1 max-w-2xl;
}

.hero-title {
  @apply text-7xl font-black mb-6 text-gray-900 leading-tight;
  font-family: 'Courier New', monospace;
  letter-spacing: -0.02em;
}

.hero-description {
  @apply text-lg text-gray-700 mb-8 leading-relaxed;
}

.property-type-tabs {
  @apply flex gap-4 mb-8;
}

.type-tab {
  @apply px-8 py-3 rounded-full text-sm font-semibold transition-all;
  @apply bg-white text-gray-700 hover:bg-gray-50;
}

.type-tab.active {
  @apply bg-gray-900 text-white;
}

.search-section {
  @apply bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg;
}

.search-bar {
  @apply flex items-center gap-4;
}

.search-dropdown {
  @apply flex-shrink-0;
}

.dropdown-select {
  @apply bg-gray-50 border-0 rounded-2xl px-6 py-4 text-gray-900 font-medium;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.search-input-container {
  @apply flex-1;
}

.search-input {
  @apply w-full bg-transparent border-0 px-4 py-4 text-gray-900 placeholder-gray-500;
  @apply focus:outline-none text-lg;
}

.search-btn {
  @apply w-14 h-14 rounded-full bg-navy-900 text-white flex items-center justify-center;
  @apply hover:bg-navy-800 transition-all;
}

.palier-filter {
  @apply relative flex items-center;
}

.palier-select {
  @apply bg-gray-50 border-0 rounded-2xl px-6 py-4 pr-12 text-gray-700 font-medium;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none;
}

.palier-icon {
  @apply absolute right-4 pointer-events-none text-gray-500;
}

.hero-image {
  @apply flex-shrink-0;
}

.house-container {
  @apply relative w-96 h-96 rounded-3xl overflow-hidden;
  @apply bg-gradient-to-br from-purple-600 to-purple-900 shadow-2xl;
  @apply transform hover:scale-105 transition-transform duration-500;
}

.house-img {
  @apply w-full h-full object-cover;
}

.residence-info-section {
  @apply px-16 py-12;
}

.residence-card {
  @apply bg-white rounded-2xl shadow-lg overflow-hidden max-w-2xl;
}

.card-header {
  @apply bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4;
  @apply flex items-center gap-3 text-white;
}

.card-header h3 {
  @apply text-xl font-bold;
}

.card-body {
  @apply p-6 space-y-4;
}

.info-row {
  @apply flex items-center justify-between py-3 border-b border-gray-100;
}

.info-label {
  @apply text-gray-600 font-medium;
}

.info-value {
  @apply text-gray-900 font-semibold;
}

.info-value.available {
  @apply text-green-600;
}

.info-value.sold {
  @apply text-red-600;
}

.properties-grid-section {
  @apply px-16 pb-20;
}

.section-title {
  @apply text-3xl font-bold text-gray-900 mb-8;
}

.properties-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8;
}

.property-card {
  @apply bg-white rounded-2xl shadow-lg overflow-hidden;
  @apply transform hover:scale-105 hover:shadow-xl transition-all duration-300;
}

.property-image {
  @apply relative h-64 overflow-hidden;
}

.property-image img {
  @apply w-full h-full object-cover;
}

.property-badge {
  @apply absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-bold;
}

.badge-available {
  @apply bg-green-500 text-white;
}

.badge-reserved {
  @apply bg-blue-500 text-white;
}

.badge-sold {
  @apply bg-red-500 text-white;
}

.badge-discussion {
  @apply bg-yellow-500 text-white;
}

.badge-inactive {
  @apply bg-gray-400 text-white;
}

.badge-default {
  @apply bg-gray-500 text-white;
}

.property-details {
  @apply p-6;
}

.property-title {
  @apply text-xl font-bold text-gray-900 mb-2;
}

.property-type {
  @apply text-sm text-gray-600 mb-4 capitalize;
}

.property-specs {
  @apply flex items-center gap-4 mb-4;
}

.spec-item {
  @apply flex items-center gap-2 text-gray-600;
}

.property-price {
  @apply text-2xl font-bold text-primary-600;
}

.empty-state {
  @apply text-center py-16;
}

.empty-icon {
  @apply mx-auto mb-6 text-gray-300;
}

.empty-title {
  @apply text-2xl font-bold text-gray-900 mb-4;
}

.empty-description {
  @apply text-gray-600 max-w-md mx-auto;
}

.back-button {
  @apply fixed bottom-8 left-8 px-6 py-3 rounded-full;
  @apply bg-navy-900 text-white shadow-xl;
  @apply flex items-center gap-2 font-semibold;
  @apply hover:bg-navy-800 transition-all z-50;
}

.bilan-footer {
  @apply bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 px-16;
}

.footer-content {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8;
}

.footer-section {
  @apply space-y-4;
}

.footer-logo {
  @apply flex items-center gap-3 mb-4;
}

.footer-brand {
  @apply text-xl font-black tracking-wider;
  font-family: 'Courier New', monospace;
}

.footer-description {
  @apply text-gray-400 text-sm;
}

.footer-title {
  @apply text-lg font-bold mb-4;
}

.footer-text {
  @apply text-gray-400 text-sm;
}

.footer-link {
  @apply block text-gray-400 text-sm hover:text-white transition-colors;
}

.footer-social {
  @apply flex flex-col gap-2;
}

.social-link {
  @apply text-gray-400 text-sm hover:text-white transition-colors;
}

.footer-bottom {
  @apply pt-8 border-t border-gray-700 text-center text-gray-400 text-sm;
}

@media (max-width: 1024px) {
  .hero-section {
    @apply flex-col px-8 py-12;
  }

  .hero-title {
    @apply text-5xl;
  }

  .house-container {
    @apply w-80 h-80;
  }

  .properties-grid {
    @apply grid-cols-1 md:grid-cols-2;
  }

  .properties-grid-section {
    @apply px-8;
  }

  .residence-info-section {
    @apply px-8;
  }

  .footer-content {
    @apply grid-cols-1 md:grid-cols-2;
  }

  .bilan-footer {
    @apply px-8;
  }
}

@media (max-width: 768px) {
  .bilan-header {
    @apply flex-col gap-4 px-4 py-4;
  }

  .header-nav {
    @apply flex-wrap justify-center;
  }

  .hero-title {
    @apply text-4xl;
  }

  .search-bar {
    @apply flex-col;
  }

  .properties-grid {
    @apply grid-cols-1;
  }

  .footer-content {
    @apply grid-cols-1;
  }
}
</style>
