<template>
  <BaseModal
    :is-open="isOpen"
    :title="title"
    size="sm"
    :close-on-overlay="false"
    @close="cancel"
  >
    <div class="confirm-dialog">
      <div class="confirm-icon" :class="typeClass">
        <component :is="iconComponent" class="w-6 h-6" />
      </div>

      <p class="confirm-message">{{ message }}</p>

      <div v-if="details" class="confirm-details">
        {{ details }}
      </div>
    </div>

    <template #footer>
      <button
        type="button"
        class="btn btn-secondary"
        @click="cancel"
        :disabled="loading"
      >
        {{ cancelText }}
      </button>
      <button
        type="button"
        class="btn"
        :class="confirmClass"
        @click="confirm"
        :disabled="loading"
      >
        <LoadingSpinner v-if="loading" class="w-4 h-4 mr-2" />
        {{ confirmText }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TriangleAlert as AlertTriangle, Info, CircleCheck as CheckCircle, Trash2 } from 'lucide-vue-next'
import BaseModal from './BaseModal.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

interface Props {
  isOpen: boolean
  title?: string
  message: string
  details?: string
  type?: 'info' | 'warning' | 'danger' | 'success'
  confirmText?: string
  cancelText?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Confirm Action',
  type: 'warning',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  loading: false
})

const emit = defineEmits<{
  confirm: []
  cancel: []
  'update:isOpen': [value: boolean]
}>()

const iconComponent = computed(() => {
  const icons = {
    info: Info,
    warning: AlertTriangle,
    danger: Trash2,
    success: CheckCircle
  }
  return icons[props.type]
})

const typeClass = computed(() => {
  const classes = {
    info: 'confirm-icon-info',
    warning: 'confirm-icon-warning',
    danger: 'confirm-icon-danger',
    success: 'confirm-icon-success'
  }
  return classes[props.type]
})

const confirmClass = computed(() => {
  const classes = {
    info: 'btn-primary',
    warning: 'btn-warning',
    danger: 'btn-danger',
    success: 'btn-success'
  }
  return classes[props.type]
})

function confirm() {
  emit('confirm')
}

function cancel() {
  emit('cancel')
  emit('update:isOpen', false)
}
</script>

<style scoped>
.confirm-dialog {
  @apply flex flex-col items-center text-center;
}

.confirm-icon {
  @apply w-16 h-16 rounded-full flex items-center justify-center mb-4;
}

.confirm-icon-info {
  @apply bg-blue-100 text-blue-600;
}

.confirm-icon-warning {
  @apply bg-amber-100 text-amber-600;
}

.confirm-icon-danger {
  @apply bg-red-100 text-red-600;
}

.confirm-icon-success {
  @apply bg-green-100 text-green-600;
}

.confirm-message {
  @apply text-lg font-semibold text-gray-900 mb-2;
}

.confirm-details {
  @apply text-sm text-gray-600;
}

.btn {
  @apply px-4 py-2 rounded-lg font-medium transition-all;
  @apply flex items-center justify-center;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-secondary {
  @apply bg-gray-100 text-gray-700 hover:bg-gray-200;
}

.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

.btn-warning {
  @apply bg-amber-600 text-white hover:bg-amber-700;
}

.btn-danger {
  @apply bg-red-600 text-white hover:bg-red-700;
}

.btn-success {
  @apply bg-green-600 text-white hover:bg-green-700;
}
</style>
