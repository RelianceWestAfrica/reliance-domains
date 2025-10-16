<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="modal-overlay"
        @click.self="handleOverlayClick"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
      >
        <div
          class="modal-container"
          :class="[sizeClass, { 'modal-scrollable': scrollable }]"
          role="document"
        >
          <div class="modal-header">
            <h2 :id="titleId" class="modal-title">
              <slot name="title">{{ title }}</slot>
            </h2>
            <button
              v-if="showClose"
              class="modal-close"
              @click="close"
              aria-label="Close modal"
              type="button"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="modal-body">
            <slot></slot>
          </div>

          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'

interface Props {
  isOpen: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showClose?: boolean
  closeOnOverlay?: boolean
  scrollable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  size: 'md',
  showClose: true,
  closeOnOverlay: true,
  scrollable: true
})

const emit = defineEmits<{
  close: []
  'update:isOpen': [value: boolean]
}>()

const titleId = computed(() => `modal-title-${Math.random().toString(36).substr(2, 9)}`)

const sizeClass = computed(() => {
  const sizes = {
    sm: 'modal-sm',
    md: 'modal-md',
    lg: 'modal-lg',
    xl: 'modal-xl'
  }
  return sizes[props.size]
})

function close() {
  emit('close')
  emit('update:isOpen', false)
}

function handleOverlayClick() {
  if (props.closeOnOverlay) {
    close()
  }
}

function handleEscape(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.isOpen) {
    close()
  }
}

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-overlay {
  @apply fixed inset-0 z-50 flex items-center justify-center;
  @apply bg-black/50 backdrop-blur-sm;
  @apply p-4;
}

.modal-container {
  @apply bg-white rounded-2xl shadow-2xl;
  @apply w-full max-h-[90vh];
  @apply flex flex-col;
}

.modal-sm {
  @apply max-w-md;
}

.modal-md {
  @apply max-w-2xl;
}

.modal-lg {
  @apply max-w-4xl;
}

.modal-xl {
  @apply max-w-6xl;
}

.modal-header {
  @apply flex items-center justify-between;
  @apply px-6 py-4 border-b border-gray-200;
  @apply flex-shrink-0;
}

.modal-title {
  @apply text-xl font-bold text-gray-900;
}

.modal-close {
  @apply text-gray-400 hover:text-gray-600;
  @apply transition-colors;
  @apply p-1 rounded-lg hover:bg-gray-100;
  @apply flex items-center justify-center;
}

.modal-body {
  @apply px-6 py-6;
  @apply overflow-y-auto;
  @apply flex-1;
}

.modal-scrollable .modal-body {
  @apply overflow-y-auto;
}

.modal-footer {
  @apply px-6 py-4 border-t border-gray-200;
  @apply flex items-center justify-end gap-3;
  @apply flex-shrink-0;
}

.modal-enter-active,
.modal-leave-active {
  @apply transition-all duration-300;
}

.modal-enter-from,
.modal-leave-to {
  @apply opacity-0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  @apply scale-95 translate-y-4;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  @apply transition-all duration-300;
}
</style>
