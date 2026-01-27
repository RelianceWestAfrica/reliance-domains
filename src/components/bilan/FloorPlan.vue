<script setup lang="ts">
import { onMounted } from 'vue'
import ApartmentMarker from './ApartmentMarker.vue';
import type { Floor, Apartment } from '@/types/apartment';

const props = defineProps<{
  floor: any;
  canEdit?: boolean;
}>();

const emit = defineEmits<{
  apartmentClick: [apartment: Apartment];
}>();

const handleApartmentClick = (apartment: Apartment) => {
  emit('apartmentClick', apartment);
};

const getColumnClass = (index: number): string => {
  if (index === 0) return 'col-lg-2 col-md-3 col-sm-4 col-6';
  if (index >= 1 && index <= 6) return 'col-lg-2 col-md-2 col-sm-4 col-6';
  if (index >= 7 && index <= 8) return 'col-lg-2 col-md-3 col-sm-4 col-6';
  return 'col-lg-1 col-md-2 col-sm-4 col-6';
};

// onMounted(() => {
//   console.log(props.floor)
// })
</script>

<template>
  <div class="floor-plan-section">
    <div class="floor-header">
      <h3 class="floor-title">{{ floor.name }}</h3>
      <div class="apartment-count-badge">{{ floor.unitsCount }} appartements</div>
    </div>

    <div class="container-fluid px-0">
      <div class="row apartments-bootstrap-grid">
        <div
          v-for="(apartment, index) in floor?.properties"
          :key="apartment.id"
          :class="getColumnClass(index)"
          class="apartment-column"
        >
          <ApartmentMarker
            :apartment="apartment"
            :can-edit="canEdit"
            @click="handleApartmentClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.floor-plan-section {
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease;
}

.floor-plan-section:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.floor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #F3F4F6;
}

.floor-title {
  font-size: 24px;
  font-weight: 800;
  color: #111827;
  margin: 0;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  position: relative;
  z-index: 0;
}

.apartment-count-badge {
  padding: 6px 14px;
  background: #EEF2FF;
  color: #4F46E5;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.apartments-bootstrap-grid {
  min-height: 250px;
}

.apartment-column {
  display: flex;
  flex-direction: column;
  padding-left: 2px;
  padding-right: 2px;
  position: relative;
  z-index: 1;
}

@media (max-width: 992px) {
  .floor-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}

@media (max-width: 768px) {
  .floor-plan-section {
    padding: 16px;
  }

  .floor-title {
    font-size: 18px;
  }

  .apartment-count-badge {
    font-size: 12px;
    padding: 5px 12px;
  }
}

@media (max-width: 576px) {
  .floor-title {
    font-size: 16px;
  }
}
</style>
