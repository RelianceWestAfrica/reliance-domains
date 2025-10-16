<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <!-- Header -->
    <div class="p-6 border-b border-gray-200">
      <div class="flex items-start justify-between">
        <div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ property.title }}</h3>
          <div class="flex items-center gap-4 text-sm text-gray-600">
            <span class="flex items-center gap-1">
              <MapPin class="w-4 h-4" />
              {{ propertyLocation }}
            </span>
            <span class="flex items-center gap-1">
              <Home class="w-4 h-4" />
              {{ property.propertyType }}
            </span>
            <span 
              class="px-2 py-1 rounded-full text-xs font-medium"
              :class="getStatusBadgeClass(property.status)"
            >
              {{ property.status }}
            </span>
          </div>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold text-primary-600">
            {{ formatPrice(property.price) }}
          </div>
          <div class="text-sm text-gray-500">Prix de vente</div>
        </div>
      </div>
    </div>

    <!-- Image Gallery -->
    <div v-if="property.photos.length" class="relative">
      <div class="aspect-video bg-gray-200">
        <img 
          :src="property.photos[currentPhotoIndex]?.photoUrl" 
          :alt="property.title"
          class="w-full h-full object-cover"
        />
      </div>
      
      <!-- Photo Navigation -->
      <div v-if="property.photos.length > 1" class="absolute inset-0 flex items-center justify-between p-4">
        <button
          @click="previousPhoto"
          class="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          <ChevronLeft class="w-5 h-5" />
        </button>
        <button
          @click="nextPhoto"
          class="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
        >
          <ChevronRight class="w-5 h-5" />
        </button>
      </div>
      
      <!-- Photo Indicators -->
      <div v-if="property.photos.length > 1" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button
          v-for="(photo, index) in property.photos"
          :key="photo.id"
          @click="currentPhotoIndex = index"
          class="w-2 h-2 rounded-full transition-all duration-200"
          :class="index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'"
        ></button>
      </div>
    </div>

    <!-- Property Details -->
    <div class="p-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Left Column -->
        <div class="space-y-6">
          <!-- Key Features -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Caractéristiques principales</h4>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Bed class="w-5 h-5 text-gray-600" />
                <div>
                  <div class="font-medium text-gray-900">{{ property.rooms }}</div>
                  <div class="text-sm text-gray-600">Chambres</div>
                </div>
              </div>
              
              <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <ChefHat class="w-5 h-5 text-gray-600" />
                <div>
                  <div class="font-medium text-gray-900">{{ property.kitchens }}</div>
                  <div class="text-sm text-gray-600">Cuisines</div>
                </div>
              </div>
              
              <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Maximize class="w-5 h-5 text-gray-600" />
                <div>
                  <div class="font-medium text-gray-900">{{ property.surfaceM2 }}m²</div>
                  <div class="text-sm text-gray-600">Surface</div>
                </div>
              </div>
              
              <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Building class="w-5 h-5 text-gray-600" />
                <div>
                  <div class="font-medium text-gray-900">{{ palierName || 'N/A' }}</div>
                  <div class="text-sm text-gray-600">Étage</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Amenities -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Équipements</h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-if="property.balcony"
                class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                <TreePine class="w-4 h-4" />
                Balcon
              </span>
              <span 
                v-if="property.furnished"
                class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                <Sofa class="w-4 h-4" />
                Meublé
              </span>
              <span 
                v-if="!property.furnished"
                class="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
              >
                <Package class="w-4 h-4" />
                Non meublé
              </span>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Project Information -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Informations du projet</h4>
            <div class="space-y-3">
              <div>
                <span class="text-sm font-medium text-gray-500">Projet</span>
                <p class="text-gray-900">{{ projectName }}</p>
              </div>
              <div v-if="residenceName">
                <span class="text-sm font-medium text-gray-500">Résidence</span>
                <p class="text-gray-900">{{ residenceName }}</p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">Type de propriété</span>
                <p class="text-gray-900 capitalize">{{ property.propertyType }}</p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">Date d'ajout</span>
                <p class="text-gray-900">{{ formatDate(property.createdAt) }}</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div v-if="canCreateAcquisition" class="space-y-3">
            <h4 class="text-lg font-semibold text-gray-900">Actions</h4>
            <div class="space-y-2">
              <AppButton
                v-if="property.status === 'Disponible' || property.status === 'Sous discussion cliente'"
                variant="primary"
                class="w-full"
                @click="$emit('create-acquisition', property)"
              >
                <Plus class="w-4 h-4 mr-2" />
                Créer une acquisition
              </AppButton>
              
              <AppButton
                variant="outline"
                class="w-full"
                @click="$emit('view-acquisitions', property)"
              >
                <Eye class="w-4 h-4 mr-2" />
                Voir les acquisitions
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MapPin, Hop as Home, Bed, ChefHat, Maximize, Building, TreePine, Sofa, Package, ChevronLeft, ChevronRight, Plus, Eye } from 'lucide-vue-next';
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';
import type { Property } from '@/types';
import AppButton from '@/components/ui/AppButton.vue';

const props = defineProps<{
  property: Property;
}>();

defineEmits<{
  'create-acquisition': [property: Property];
  'view-acquisitions': [property: Property];
}>();

const appStore = useAppStore();
const authStore = useAuthStore();

const currentPhotoIndex = ref(0);

// Computed properties
const projectName = computed(() => {
  const project = appStore.projects.find(p => p.id === props.property.projectId);
  return project?.title || 'Projet inconnu';
});

const residenceName = computed(() => {
  if (!props.property.residenceId) return null;
  const residence = appStore.residences.find(r => r.id === props.property.residenceId);
  return residence?.title || 'Résidence inconnue';
});

const palierName = computed(() => {
  if (!props.property.palierId) return null;
  const palier = appStore.paliers.find(p => p.id === props.property.palierId);
  return palier?.title || 'Palier inconnu';
});

const propertyLocation = computed(() => {
  const project = appStore.projects.find(p => p.id === props.property.projectId);
  return project ? `${project.locationAddress}, ${project.city}` : 'Localisation inconnue';
});

const canCreateAcquisition = computed(() => {
  return authStore.canAccess.acquisitions;
});

// Methods
function nextPhoto() {
  if (props.property.photos.length > 1) {
    currentPhotoIndex.value = (currentPhotoIndex.value + 1) % props.property.photos.length;
  }
}

function previousPhoto() {
  if (props.property.photos.length > 1) {
    currentPhotoIndex.value = currentPhotoIndex.value === 0 
      ? props.property.photos.length - 1 
      : currentPhotoIndex.value - 1;
  }
}

function getStatusBadgeClass(status: string): string {
  const classes = {
    'Disponible': 'bg-green-100 text-green-800',
    'Sous discussion cliente': 'bg-yellow-100 text-yellow-800',
    'Réservé(e)': 'bg-blue-100 text-blue-800',
    'Soldé(e)': 'bg-purple-100 text-purple-800',
    'Sous mandat de gestion locative': 'bg-indigo-100 text-indigo-800',
    'Offre surclassée': 'bg-red-100 text-red-800'
  };
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800';
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0
  }).format(price);
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}
</script>