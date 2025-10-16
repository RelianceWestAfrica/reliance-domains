<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Apartment } from '@/types/apartment';
import { ApartmentStatus, STATUS_COLORS } from '@/types/apartment';

const props = defineProps<{
  apartment: Apartment | null;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
  update: [apartmentId: string, newStatus: ApartmentStatus];
}>();

const selectedStatus = ref<ApartmentStatus | null>(null);
const isUpdating = ref(false);

const statusOptions = computed(() => {
  return Object.entries(STATUS_COLORS).map(([key, value]) => ({
    value: key as ApartmentStatus,
    ...value
  }));
});

const handleClose = () => {
  selectedStatus.value = null;
  emit('close');
};

const handleUpdate = async () => {
  if (!props.apartment || !selectedStatus.value) return;

  isUpdating.value = true;

  try {
    emit('update', props.apartment.id, selectedStatus.value);
    handleClose();
  } finally {
    isUpdating.value = false;
  }
};

const selectStatus = (status: ApartmentStatus) => {
  selectedStatus.value = status;
};
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen && apartment" class="modal-overlay" @click="handleClose">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h2 class="modal-title">Update Status - {{ apartment.code }}</h2>
            <button class="close-button" @click="handleClose" aria-label="Close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div class="modal-body">
            <div class="current-status">
              <span class="label">Current Status:</span>
              <div class="status-badge" :style="{ backgroundColor: STATUS_COLORS[apartment.status].color }">
                {{ STATUS_COLORS[apartment.status].label }}
              </div>
            </div>

            <div class="status-options">
              <div
                v-for="option in statusOptions"
                :key="option.value"
                class="status-option"
                :class="{ selected: selectedStatus === option.value }"
                @click="selectStatus(option.value)"
              >
                <div class="status-option-header">
                  <span class="status-dot" :style="{ backgroundColor: option.color }"></span>
                  <span class="status-label">{{ option.label }}</span>
                  <svg
                    v-if="selectedStatus === option.value"
                    class="check-icon"
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
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div class="status-description">{{ option.description }}</div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="button button-secondary" @click="handleClose" :disabled="isUpdating">
              Cancel
            </button>
            <button
              class="button button-primary"
              @click="handleUpdate"
              :disabled="!selectedStatus || isUpdating"
            >
              <span v-if="isUpdating">Updating...</span>
              <span v-else>Update Status</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;
}

.modal-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 540px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid #E5E7EB;
}

.modal-title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: #F3F4F6;
  color: #111827;
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

.current-status {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding: 16px;
  background: #F9FAFB;
  border-radius: 8px;
}

.label {
  font-weight: 600;
  color: #374151;
  font-size: 14px;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #1F2937;
}

.status-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.status-option {
  border: 2px solid #E5E7EB;
  border-radius: 10px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.status-option:hover {
  border-color: #9CA3AF;
  background: #F9FAFB;
}

.status-option.selected {
  border-color: #3B82F6;
  background: #EFF6FF;
}

.status-option-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.status-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-label {
  font-weight: 600;
  color: #111827;
  font-size: 15px;
  flex: 1;
}

.check-icon {
  color: #3B82F6;
  flex-shrink: 0;
}

.status-description {
  font-size: 13px;
  color: #6B7280;
  margin-left: 26px;
}

.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #E5E7EB;
}

.button {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button-secondary {
  background: white;
  color: #374151;
  border: 1px solid #D1D5DB;
}

.button-secondary:hover:not(:disabled) {
  background: #F9FAFB;
  border-color: #9CA3AF;
}

.button-primary {
  background: #3B82F6;
  color: white;
}

.button-primary:hover:not(:disabled) {
  background: #2563EB;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.2s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.95);
}

@media (max-width: 640px) {
  .modal-container {
    max-height: 95vh;
  }

  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 16px;
  }

  .modal-title {
    font-size: 18px;
  }
}
</style>
