<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import FloorPlan from './FloorPlan.vue';
import StatusModal from './StatusModal.vue';
import { useApartmentStore } from '@/stores/apartmentStore';
import type { Apartment } from '@/types/apartment';

const props = defineProps<{
  residenceId: string;
  canEdit?: boolean;
}>();

const apartmentStore = useApartmentStore();

const isLoading = ref(false);
const error = ref<string | null>(null);
const selectedApartment = ref<Apartment | null>(null);
const isModalOpen = ref(false);

const residence = computed(() => apartmentStore.getResidenceById(props.residenceId));

const floors = computed(() => apartmentStore.getFloorsByResidence(props.residenceId));

const isEmpty = computed(() => floors.value.length === 0 && !isLoading.value);

const loadFloors = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    await apartmentStore.fetchResidenceFloors(props.residenceId);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load floors';
  } finally {
    isLoading.value = false;
  }
};

const handleApartmentClick = (apartment: Apartment) => {
  if (props.canEdit) {
    selectedApartment.value = apartment;
    isModalOpen.value = true;
  }
};

const handleStatusUpdate = async (apartmentId: string, newStatus: any) => {
  try {
    await apartmentStore.updateApartmentStatus(apartmentId, newStatus);
  } catch (err) {
    console.error('Failed to update status:', err);
  }
};

const handleModalClose = () => {
  isModalOpen.value = false;
  selectedApartment.value = null;
};

onMounted(() => {
  loadFloors();
});
</script>

<template>
  <div class="visual-summary-panel">
    <div class="panel-header">
      <div class="header-content">
        <h2 class="panel-title">Bilan Visuel</h2>
        <p v-if="residence" class="residence-name">{{ residence.title }}</p>
      </div>
      <button v-if="!isLoading" class="refresh-button" @click="loadFloors" title="Actualiser">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
      </button>
    </div>

    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Chargement des plans d'étages...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <p class="error-message">{{ error }}</p>
      <button class="retry-button" @click="loadFloors">Réessayer</button>
    </div>

    <div v-else-if="isEmpty" class="empty-state">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
      <p>Aucun plan d'étage disponible pour cette résidence</p>
    </div>

    <div v-else class="floors-container">
      <FloorPlan
        v-for="floor in floors"
        :key="floor.floorNumber"
        :floor="floor"
        :can-edit="canEdit"
        @apartment-click="handleApartmentClick"
      />
    </div>

    <StatusModal
      :apartment="selectedApartment"
      :is-open="isModalOpen"
      @close="handleModalClose"
      @update="handleStatusUpdate"
    />
  </div>
</template>

<style scoped>
.visual-summary-panel {
  background: #F9FAFB;
  border-radius: 16px;
  padding: 32px;
  margin: 24px 0;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.header-content {
  flex: 1;
}

.panel-title {
  font-size: 28px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 4px 0;
  letter-spacing: -0.5px;
}

.residence-name {
  font-size: 16px;
  color: #6B7280;
  margin: 0;
  font-weight: 500;
}

.refresh-button {
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #6B7280;
}

.refresh-button:hover {
  background: #F3F4F6;
  color: #111827;
  border-color: #D1D5DB;
}

.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 32px;
  text-align: center;
  color: #6B7280;
}

.loading-state p,
.empty-state p {
  margin-top: 16px;
  font-size: 16px;
  font-weight: 500;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #E5E7EB;
  border-top-color: #3B82F6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-state {
  color: #DC2626;
}

.error-message {
  margin-top: 16px;
  font-size: 16px;
  font-weight: 500;
}

.retry-button {
  margin-top: 16px;
  padding: 10px 24px;
  background: #3B82F6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.retry-button:hover {
  background: #2563EB;
}

.floors-container {
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .visual-summary-panel {
    padding: 16px;
    border-radius: 12px;
  }

  .panel-header {
    margin-bottom: 24px;
  }

  .panel-title {
    font-size: 22px;
  }

  .loading-state,
  .error-state,
  .empty-state {
    padding: 48px 16px;
  }
}
</style>
