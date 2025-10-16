<template>
  <BaseModal
    :is-open="isOpen"
    :title="modalTitle"
    size="lg"
    @close="handleClose"
  >
    <form v-if="mode !== 'view'" @submit.prevent="handleSubmit" class="client-form">
      <div class="form-grid">
        <div class="form-group">
          <label for="firstName" class="form-label required">First Name</label>
          <AppInput
            id="firstName"
            v-model="formData.firstName"
            placeholder="Enter first name"
            :error="errors.firstName"
            required
          />
        </div>

        <div class="form-group">
          <label for="lastName" class="form-label required">Last Name</label>
          <AppInput
            id="lastName"
            v-model="formData.lastName"
            placeholder="Enter last name"
            :error="errors.lastName"
            required
          />
        </div>

        <div class="form-group">
          <label for="gender" class="form-label required">Gender</label>
          <AppSelect
            id="gender"
            v-model="formData.gender"
            :options="genderOptions"
            placeholder="Select gender"
            :error="errors.gender"
            required
          />
        </div>

        <div class="form-group">
          <label for="phone" class="form-label required">Phone</label>
          <AppInput
            id="phone"
            v-model="formData.phone"
            type="tel"
            placeholder="+225 07 12 34 56 78"
            :error="errors.phone"
            required
          />
        </div>

        <div class="form-group">
          <label for="email" class="form-label">Email</label>
          <AppInput
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="client@example.com"
            :error="errors.email"
          />
        </div>

        <div class="form-group">
          <label for="nationality" class="form-label required">Nationality</label>
          <AppInput
            id="nationality"
            v-model="formData.nationality"
            placeholder="Enter nationality"
            :error="errors.nationality"
            required
          />
        </div>

        <div class="form-group col-span-2">
          <label for="address" class="form-label">Address</label>
          <AppInput
            id="address"
            v-model="formData.address"
            placeholder="Enter full address"
            :error="errors.address"
          />
        </div>
      </div>
    </form>

    <div v-else class="client-details">
      <div class="detail-section">
        <h3 class="section-title">Personal Information</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Full Name</span>
            <span class="detail-value">{{ client?.firstName }} {{ client?.lastName }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Gender</span>
            <span class="detail-value">{{ client?.gender === 'M' ? 'Male' : 'Female' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Nationality</span>
            <span class="detail-value">{{ client?.nationality }}</span>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <h3 class="section-title">Contact Information</h3>
        <div class="detail-grid">
          <div class="detail-item">
            <span class="detail-label">Phone</span>
            <span class="detail-value">{{ client?.phone }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Email</span>
            <span class="detail-value">{{ client?.email || 'N/A' }}</span>
          </div>
          <div class="detail-item col-span-2">
            <span class="detail-label">Address</span>
            <span class="detail-value">{{ client?.address || 'N/A' }}</span>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <button
        v-if="mode === 'view'"
        type="button"
        class="btn btn-secondary"
        @click="handleClose"
      >
        Close
      </button>
      <template v-else>
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
          {{ mode === 'create' ? 'Create Client' : 'Update Client' }}
        </button>
      </template>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import BaseModal from './BaseModal.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'
import type { Client } from '@/types'

interface Props {
  isOpen: boolean
  mode: 'create' | 'edit' | 'view'
  client?: Client | null
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'create',
  client: null
})

const emit = defineEmits<{
  close: []
  success: [client: Client]
  'update:isOpen': [value: boolean]
}>()

const appStore = useAppStore()
const authStore = useAuthStore()
const loading = ref(false)
const errors = ref<Record<string, string>>({})

const formData = ref<{
  firstName: string
  lastName: string
  gender: 'M' | 'F' | ''
  phone: string
  email: string
  address: string
  nationality: string
}>({
  firstName: '',
  lastName: '',
  gender: '',
  phone: '',
  email: '',
  address: '',
  nationality: ''
})

const genderOptions = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' }
]

const modalTitle = computed(() => {
  if (props.mode === 'view') return 'Client Details'
  return props.mode === 'create' ? 'New Client' : 'Edit Client'
})

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    resetForm()
    if ((props.mode === 'edit' || props.mode === 'view') && props.client) {
      formData.value = {
        firstName: props.client.firstName,
        lastName: props.client.lastName,
        gender: props.client.gender,
        phone: props.client.phone,
        email: props.client.email || '',
        address: props.client.address || '',
        nationality: props.client.nationality
      }
    }
  }
})

function resetForm() {
  formData.value = {
    firstName: '',
    lastName: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    nationality: ''
  }
  errors.value = {}
}

function validateForm(): boolean {
  errors.value = {}

  if (!formData.value.firstName.trim()) {
    errors.value.firstName = 'First name is required'
  }

  if (!formData.value.lastName.trim()) {
    errors.value.lastName = 'Last name is required'
  }

  if (!formData.value.gender || (formData.value.gender !== 'M' && formData.value.gender !== 'F')) {
    errors.value.gender = 'Gender is required'
  }

  if (!formData.value.phone.trim()) {
    errors.value.phone = 'Phone is required'
  }

  if (!formData.value.nationality.trim()) {
    errors.value.nationality = 'Nationality is required'
  }

  if (formData.value.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = 'Invalid email format'
  }

  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validateForm()) return

  loading.value = true

  try {
    if (props.mode === 'create') {
      const newClient = appStore.addClient({
        ...formData.value,
        gender: formData.value.gender as 'M' | 'F',
        createdBy: authStore.user?.id || '1'
      })
      emit('success', newClient)
    } else if (props.client) {
      const index = appStore.clients.findIndex(c => c.id === props.client!.id)
      if (index !== -1) {
        appStore.clients[index] = { ...props.client, ...formData.value, gender: formData.value.gender as 'M' | 'F' }
        emit('success', appStore.clients[index])
      }
    }

    handleClose()
  } catch (error) {
    console.error('Error saving client:', error)
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
.client-form {
  @apply space-y-6;
}

.form-grid {
  @apply grid grid-cols-2 gap-4;
}

.form-group {
  @apply flex flex-col;
}

.col-span-2 {
  @apply col-span-2;
}

.form-label {
  @apply text-sm font-medium text-gray-700 mb-2;
}

.form-label.required::after {
  content: '*';
  @apply text-red-500 ml-1;
}

.client-details {
  @apply space-y-6;
}

.detail-section {
  @apply bg-gray-50 rounded-lg p-4;
}

.section-title {
  @apply text-base font-semibold text-gray-900 mb-4;
}

.detail-grid {
  @apply grid grid-cols-2 gap-4;
}

.detail-item {
  @apply flex flex-col;
}

.detail-item.col-span-2 {
  @apply col-span-2;
}

.detail-label {
  @apply text-xs font-medium text-gray-500 mb-1;
}

.detail-value {
  @apply text-sm text-gray-900;
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
