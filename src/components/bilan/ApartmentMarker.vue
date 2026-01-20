<script setup lang="ts">
import { computed } from 'vue';
import type { Apartment } from '@/types/apartment';
// import { STATUS_COLORS } from '../types/apartment';
import { STATUS_COLORS } from '@/types/apartment';


const props = defineProps<{
  apartment: any;
  canEdit?: boolean;
}>();

const emit = defineEmits<{
  click: [apartment: Apartment];
}>();

const statusInfo = computed(() => STATUS_COLORS[props.apartment.status]);

const backgroundColor = computed(() => statusInfo.value?.color);

const handleClick = () => {
  if (props.canEdit) {
    emit('click', props.apartment);
  }
};

const floorPlanImage = computed(() => {
  return `/public/plan.png`;
});

</script>

<template>
  <div class="apartment-container">
    <div
      class="apartment-badge"
      :class="{ 'can-edit': canEdit }"
      :style="{ backgroundColor }"
      @click="handleClick"
      :title="`${apartment.title} - ${statusInfo?.label}`"
    >
      <div class="apartment-code">{{ apartment.title }}</div>

      <div class="tooltip-content">
        <div class="tooltip-header">
          <strong>{{ apartment.title }}</strong>
        </div>
        <div class="tooltip-status">
          <span class="status-dot" :style="{ backgroundColor }"></span>
          {{ apartment.type }}
        </div>
        <div class="tooltip-description">{{ apartment.description }}</div>
        <div v-if="apartment.client" class="tooltip-client">
          <div><strong>Client:</strong> {{ apartment.client.name }}</div>
          <div v-if="apartment.client.phone">Tél: {{ apartment.client.phone }}</div>
          <div v-if="apartment.client.email">Email: {{ apartment.client.email }}</div>
        </div>
        <div v-else class="tooltip-available">
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
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          Aucun client assigné
        </div>
      </div>
    </div>

    <div class="apartment-plan">
      <img
        :src="apartment?.imagePlan"
        :alt="`Plan appartement ${apartment.title}`"
        class="plan-image"
        loading="lazy"
      />
      <div class="plan-overlay">
        <span class="plan-label">{{ apartment.surface }} m²</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.apartment-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 100%;
}

.apartment-badge {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  border-radius: 10px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(0, 0, 0, 0.15);
}

.apartment-badge.can-edit {
  cursor: pointer;
}

.apartment-badge.can-edit:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  border-color: rgba(0, 0, 0, 0.25);
}

.apartment-code {
  font-weight: 900;
  font-size: 16px;
  color: #000000;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
}

.apartment-plan {
  position: relative;
  flex: 1;
  background: #F9FAFB;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  overflow: hidden;
  min-height: 200px;
  transition: all 0.3s ease;
}

.apartment-plan:hover {
  border-color: #3B82F6;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.plan-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.apartment-plan:hover .plan-image {
  transform: scale(1.05);
}

.plan-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.apartment-plan:hover .plan-overlay {
  opacity: 1;
}

.plan-label {
  color: white;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.5px;
}

.tooltip-content {
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  padding: 14px;
  min-width: 260px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 1000;
  transform: translateX(-50%) translateY(-5px);
}

.apartment-badge:hover .tooltip-content {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.tooltip-content::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 10px solid transparent;
  border-top-color: white;
}

.tooltip-header {
  font-size: 17px;
  margin-bottom: 10px;
  color: #111827;
  font-weight: 700;
}

.tooltip-status {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.status-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

.tooltip-description {
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 12px;
  line-height: 1.5;
}

.tooltip-client {
  padding-top: 12px;
  border-top: 1px solid #E5E7EB;
  font-size: 12px;
  color: #374151;
}

.tooltip-client > div {
  margin-bottom: 5px;
}

.tooltip-available {
  padding-top: 12px;
  border-top: 1px solid #E5E7EB;
  font-size: 12px;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  gap: 8px;
  font-style: italic;
}

@media (max-width: 1200px) {
  .apartment-plan {
    min-height: 180px;
  }
}

@media (max-width: 768px) {
  .apartment-badge {
    height: 42px;
  }

  .apartment-code {
    font-size: 14px;
  }

  .apartment-plan {
    min-height: 150px;
  }

  .tooltip-content {
    min-width: 220px;
    padding: 12px;
  }

  .tooltip-header {
    font-size: 15px;
  }
}

@media (max-width: 576px) {
  .apartment-badge {
    height: 38px;
  }

  .apartment-code {
    font-size: 13px;
  }

  .apartment-plan {
    min-height: 120px;
  }
}
</style>
