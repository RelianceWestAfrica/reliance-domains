<script setup lang="ts">
import type { Residence } from '@/types/apartment';

defineProps<{
  residence: Residence;
}>();

const emit = defineEmits<{
  viewDetails: [residenceId: string];
}>();

const handleViewDetails = (residenceId: string) => {
  emit('viewDetails', residenceId);
};
</script>

<template>
  <div class="residence-card">
    <div class="card-image">
      <img :src="residence.image" :alt="residence.name" />
      <div class="card-badge">{{ residence.totalApartments }} appartements</div>
    </div>

    <div class="card-content">
      <h3 class="residence-name">{{ residence.name }}</h3>

      <div class="residence-location">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span>{{ residence.address }}, {{ residence.city }}</span>
      </div>

      <p class="residence-description">{{ residence.description }}</p>

      <div class="residence-stats">
        <div class="stat-item">
          <span class="stat-value">{{ residence.availableCount }}</span>
          <span class="stat-label">Disponibles</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ residence.reservedCount }}</span>
          <span class="stat-label">Réservés</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ residence.soldCount }}</span>
          <span class="stat-label">Vendus</span>
        </div>
      </div>

      <button class="view-button" @click="handleViewDetails(residence.id)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        Bilan Visuel
      </button>
    </div>
  </div>
</template>

<style scoped>
.residence-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.residence-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

.card-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.residence-card:hover .card-image img {
  transform: scale(1.05);
}

.card-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(4px);
}

.card-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.residence-name {
  font-size: 22px;
  font-weight: 800;
  color: #111827;
  margin: 0 0 12px 0;
  letter-spacing: -0.3px;
}

.residence-location {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 12px;
}

.residence-location svg {
  flex-shrink: 0;
}

.residence-description {
  color: #4B5563;
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 20px 0;
  flex: 1;
}

.residence-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 16px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-bottom: 16px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 800;
  color: #111827;
}

.stat-label {
  font-size: 12px;
  color: #6B7280;
  font-weight: 500;
}

.view-button {
  width: 100%;
  padding: 12px 20px;
  background: #3B82F6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.view-button:hover {
  background: #2563EB;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.view-button:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .card-image {
    height: 180px;
  }

  .residence-name {
    font-size: 18px;
  }

  .residence-stats {
    gap: 12px;
    padding: 12px;
  }

  .stat-value {
    font-size: 20px;
  }
}
</style>

