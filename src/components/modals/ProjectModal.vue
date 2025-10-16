<template>
  <BaseModal
    :is-open="isOpen"
    :title="mode === 'create' ? 'New Project' : 'Edit Project'"
    size="lg"
    @close="handleClose"
  >
    <form @submit.prevent="handleSubmit" class="project-form">
      <div class="form-grid">
        <div class="form-group">
          <label for="title" class="form-label required">Project Title</label>
          <AppInput
            id="title"
            v-model="formData.title"
            placeholder="Enter project title"
            :error="errors.title"
            required
          />
        </div>

        <div class="form-group">
          <label for="type" class="form-label required">Project Type</label>
          <AppSelect
            id="type"
            v-model="formData.type"
            :options="projectTypes"
            placeholder="Select project type"
            :error="errors.type"
            required
          />
        </div>

        <div class="form-group">
          <label for="country" class="form-label required">Country</label>
          <AppSelect
            id="country"
            v-model="formData.countryId"
            :options="countryOptions"
            placeholder="Select country"
            :error="errors.countryId"
            required
          />
        </div>

        <div class="form-group">
          <label for="city" class="form-label required">City</label>
          <AppInput
            id="city"
            v-model="formData.city"
            placeholder="Enter city"
            :error="errors.city"
            required
          />
        </div>

        <div class="form-group col-span-2">
          <label for="address" class="form-label required">Location Address</label>
          <AppInput
            id="address"
            v-model="formData.locationAddress"
            placeholder="Enter full address"
            :error="errors.locationAddress"
            required
          />
        </div>

        <div class="form-group col-span-2">
          <label for="description" class="form-label">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
            class="form-textarea"
            placeholder="Enter project description"
            rows="4"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="company" class="form-label required">Company</label>
          <AppInput
            id="company"
            v-model="formData.company"
            placeholder="Company name"
            :error="errors.company"
            required
          />
        </div>

        <div class="form-group">
          <label for="photoUrl" class="form-label">Photo URL</label>
          <AppInput
            id="photoUrl"
            v-model="formData.photoUrl"
            placeholder="https://example.com/image.jpg"
            type="url"
          />
        </div>

        <div class="form-group col-span-2">
          <label class="checkbox-label">
            <input
              type="checkbox"
              v-model="formData.published"
              class="form-checkbox"
            />
            <span>Publish this project</span>
          </label>
        </div>
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
        {{ mode === 'create' ? 'Create Project' : 'Update Project' }}
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
import type { Project } from '@/types'

interface Props {
  isOpen: boolean
  mode: 'create' | 'edit'
  project?: Project | null
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'create',
  project: null
})

const emit = defineEmits<{
  close: []
  success: [project: Project]
  'update:isOpen': [value: boolean]
}>()

const appStore = useAppStore()
const loading = ref(false)
const errors = ref<Record<string, string>>({})

const formData = ref({
  title: '',
  type: '',
  countryId: '',
  city: '',
  locationAddress: '',
  description: '',
  company: 'RELIANCE WEST AFRICA',
  photoUrl: '',
  published: true
})

const projectTypes = [
  { value: 'Résidentiel', label: 'Résidentiel' },
  { value: 'Commercial', label: 'Commercial' },
  { value: 'Villa', label: 'Villa' },
  { value: 'Mixte', label: 'Mixte' }
]

const countryOptions = computed(() => {
  return appStore.countries.map(country => ({
    value: country.id,
    label: country.name
  }))
})

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    resetForm()
    if (props.mode === 'edit' && props.project) {
      formData.value = {
        title: props.project.title,
        type: props.project.type,
        countryId: props.project.countryId,
        city: props.project.city,
        locationAddress: props.project.locationAddress,
        description: props.project.description || '',
        company: props.project.company,
        photoUrl: props.project.photoUrl || '',
        published: props.project.published
      }
    }
  }
})

function resetForm() {
  formData.value = {
    title: '',
    type: '',
    countryId: '',
    city: '',
    locationAddress: '',
    description: '',
    company: 'RELIANCE WEST AFRICA',
    photoUrl: '',
    published: true
  }
  errors.value = {}
}

function validateForm(): boolean {
  errors.value = {}

  if (!formData.value.title.trim()) {
    errors.value.title = 'Title is required'
  }

  if (!formData.value.type) {
    errors.value.type = 'Project type is required'
  }

  if (!formData.value.countryId) {
    errors.value.countryId = 'Country is required'
  }

  if (!formData.value.city.trim()) {
    errors.value.city = 'City is required'
  }

  if (!formData.value.locationAddress.trim()) {
    errors.value.locationAddress = 'Address is required'
  }

  if (!formData.value.company.trim()) {
    errors.value.company = 'Company is required'
  }

  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validateForm()) return

  loading.value = true

  try {
    if (props.mode === 'create') {
      const newProject = appStore.addProject({
        ...formData.value,
        createdBy: '1'
      })
      emit('success', newProject)
    } else if (props.project) {
      appStore.updateProject(props.project.id, formData.value)
      emit('success', { ...props.project, ...formData.value })
    }

    handleClose()
  } catch (error) {
    console.error('Error saving project:', error)
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
.project-form {
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

.form-textarea {
  @apply w-full px-3 py-2 border border-gray-300 rounded-lg;
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
  @apply text-gray-900 placeholder-gray-400;
  @apply resize-none;
}

.checkbox-label {
  @apply flex items-center gap-2 cursor-pointer;
}

.form-checkbox {
  @apply w-4 h-4 text-blue-600 border-gray-300 rounded;
  @apply focus:ring-2 focus:ring-blue-500;
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
