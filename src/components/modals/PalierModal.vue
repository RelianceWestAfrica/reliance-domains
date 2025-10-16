<template>
  <BaseModal
    :is-open="isOpen"
    :title="mode === 'create' ? 'Add New Floor' : 'Edit Floor'"
    size="md"
    @close="handleClose"
  >
    <form @submit.prevent="handleSubmit" class="palier-form">
      <div class="form-group">
        <label for="residence" class="form-label required">Residence</label>
        <AppSelect
          id="residence"
          v-model="formData.residenceId"
          :options="residenceOptions"
          placeholder="Select residence"
          :error="errors.residenceId"
          :disabled="mode === 'edit'"
          required
        />
      </div>

      <div class="form-group">
        <label for="title" class="form-label required">Floor Title</label>
        <AppInput
          id="title"
          v-model="formData.title"
          placeholder="e.g., Ground Floor, 1st Floor"
          :error="errors.title"
          required
        />
      </div>

      <div class="form-group">
        <label for="unitCount" class="form-label required">Number of Units</label>
        <AppInput
          id="unitCount"
          v-model="formData.unitCount"
          type="number"
          min="1"
          placeholder="Enter number of units"
          :error="errors.unitCount"
          required
        />
      </div>

      <div class="form-group">
        <label for="description" class="form-label">Description</label>
        <textarea
          id="description"
          v-model="formData.description"
          class="form-textarea"
          placeholder="Enter floor description"
          rows="3"
        ></textarea>
      </div>
    </form>

    <template #footer>
      <button
        type="button"
        class="btn btn-secondary"
        @click="handleClose"
        :disabled="loading"
      >
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-primary"
        @click="handleSubmit"
        :disabled="loading"
      >
        <LoadingSpinner v-if="loading" class="w-4 h-4 mr-2" />
        {{ mode === 'create' ? 'Add Floor' : 'Update Floor' }}
      </button>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAppStore } from '@/stores/app'
import BaseModal from './BaseModal.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import type { Palier } from '@/types'

interface Props {
  isOpen: boolean
  mode: 'create' | 'edit'
  palier?: Palier | null
  residenceId?: string
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'create',
  palier: null,
  residenceId: ''
})

const emit = defineEmits<{
  close: []
  success: [palier: Palier]
  'update:isOpen': [value: boolean]
}>()

const appStore = useAppStore()
const loading = ref(false)
const errors = ref<Record<string, string>>({})

const formData = ref({
  residenceId: '',
  title: '',
  unitCount: '1',
  description: ''
})

const residenceOptions = computed(() => {
  return appStore.residences.map(residence => ({
    value: residence.id,
    label: residence.title
  }))
})

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    resetForm()
    if (props.mode === 'edit' && props.palier) {
      formData.value = {
        residenceId: props.palier.residenceId,
        title: props.palier.title,
        unitCount: String(props.palier.unitCount),
        description: props.palier.description || ''
      }
    } else if (props.residenceId) {
      formData.value.residenceId = props.residenceId
    }
  }
})

function resetForm() {
  formData.value = {
    residenceId: props.residenceId || '',
    title: '',
    unitCount: '1',
    description: ''
  }
  errors.value = {}
}

function validateForm(): boolean {
  errors.value = {}

  if (!formData.value.residenceId) {
    errors.value.residenceId = 'Residence is required'
  }

  if (!formData.value.title.trim()) {
    errors.value.title = 'Title is required'
  }

  const unitCount = Number(formData.value.unitCount)
  if (isNaN(unitCount) || unitCount < 1) {
    errors.value.unitCount = 'Unit count must be at least 1'
  }

  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validateForm()) return

  loading.value = true

  try {
    if (props.mode === 'create') {
      const newPalier: Palier = {
        id: Date.now().toString(),
        ...formData.value,
        unitCount: Number(formData.value.unitCount)
      }
      appStore.paliers.push(newPalier)
      emit('success', newPalier)
    } else if (props.palier) {
      const index = appStore.paliers.findIndex(p => p.id === props.palier!.id)
      if (index !== -1) {
        appStore.paliers[index] = { ...props.palier, ...formData.value, unitCount: Number(formData.value.unitCount) }
        emit('success', appStore.paliers[index])
      }
    }

    handleClose()
  } catch (error) {
    console.error('Error saving floor:', error)
  } finally {
    loading.value = false
  }
}

function handleClose() {
  emit('close')
  emit('update:isOpen', false)
}
</script>

<style scoped>
.palier-form {
  @apply space-y-4;
}

.form-group {
  @apply flex flex-col;
}

.form-label {
  @apply text-sm font-medium text-gray-700 mb-2;
}

.form-label.required::after {
  content: '*';
  @apply text-red-500 ml-1;
}

.form-textarea {
  @apply w-full px-3 py-2 border border-gray-300 rounded-lg;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
  @apply text-gray-900 placeholder-gray-400;
  @apply resize-none;
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
</style>
