<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-container modal-lg" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">
          {{ isEdit ? 'Modifier le Domaine' : 'Nouveau Domaine' }}
        </h3>
        <button @click="$emit('close')" class="modal-close">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-form">
        <div class="form-group">
          <label class="form-label">Titre du domaine *</label>
          <input
            v-model="formData.title"
            type="text"
            class="form-input"
            placeholder="Ex: Domaine Résidentiel Premium"
            required
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Type de domaine *</label>
            <select v-model="formData.domainType" class="form-input" required>
              <option value="">Sélectionner un type</option>
              <option value="residential">Résidentiel</option>
              <option value="hospital">Hôpital</option>
              <option value="commercial">Commercial</option>
              <option value="mixed">Mixte</option>
              <option value="villa">Villa</option>
              <option value="industrial">Industriel</option>
              <option value="office">Bureau</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Projet *</label>
            <select
                v-model="formData.project_id"
                class="form-input"
                required
            >
              <option value="">Sélectionner un projet</option>

              <option
                  v-for="project in projects"
                  :key="project.id"
                  :value="project.id"
              >
                {{ project.name }}
              </option>
            </select>


          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Description *</label>
          <textarea
            v-model="formData.description"
            class="form-input"
            rows="4"
            placeholder="Description détaillée du domaine..."
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Nombre de résidences *</label>
          <input
            v-model.number="formData.residencesCount"
            type="number"
            class="form-input"
            placeholder="Ex: 5"
            min="0"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">Image illustrative *</label>
<!--          <input-->
<!--              v-model="formData.image_url"-->
<!--              type="url"-->
<!--              class="form-input"-->
<!--              placeholder="https://example.com/image.jpg"-->
<!--          />-->

          <Upload @uploaded="handleUploaded" />
<!--          <FileUpload-->
<!--            v-model="formData.imageUrl"-->
<!--            label="Image du domaine"-->
<!--            accept="image/*"-->
<!--            :max-size="5"-->
<!--            upload-text="Télécharger une image"-->
<!--          />-->
<!--          <p class="text-sm text-gray-500 mt-1">-->
<!--            Formats acceptés: JPG, PNG. Taille max: 5MB-->
<!--          </p>-->
        </div>

        <div class="form-group">
          <label class="form-checkbox">
            <input
              v-model="formData.published"
              type="checkbox"
              class="checkbox-input"
            />
            <span class="checkbox-label">Publier le domaine</span>
          </label>
        </div>

        <div class="modal-actions">
          <button type="button" @click="$emit('close')" class="btn-secondary">
            Annuler
          </button>
          <button type="submit" class="btn-primary" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="loading-spinner"></span>
            {{ isEdit ? 'Modifier' : 'Créer' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import FileUpload from '@/components/ui/FileUpload.vue'
import Upload from "@/components/Upload.vue";

interface Props {
  domain?: any
  projects: any[]
  isEdit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  domain: null,
  projects: () => [],
  isEdit: false
})


const emit = defineEmits(['close', 'submit'])

const isSubmitting = ref(false)

const formData = ref({
  title: '',
  domainType: '',
  project_id: '',
  description: '',
  residencesCount: 0,
  image_url: '',
  published: false
})

watch(() => props.domain, (newDomain) => {
  if (newDomain && props.isEdit) {
    formData.value = {
      title: newDomain.title,
      domainType: newDomain.domainType,
      project_id: newDomain.project_id,
      description: newDomain.description,
      residencesCount: newDomain.residencesCount,
      image_url: newDomain.image,
      published: newDomain.published
    }
  }
}, { immediate: true })

const handleUploaded = (url: string) => {
  console.log('Fichier uploadé :', url);
  formData.value.image_url = url;
};

const handleSubmit = async () => {
  isSubmitting.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    emit('submit', formData.value)
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    isSubmitting.value = false
  }
}

</script>

<style scoped>
.modal-overlay {
  @apply fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4;
}

.modal-container {
  @apply bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden;
}

.modal-lg {
  @apply max-w-4xl;
}

.modal-header {
  @apply flex items-center justify-between p-6 border-b border-gray-200;
}

.modal-title {
  @apply text-xl font-semibold text-navy-900;
}

.modal-close {
  @apply p-2 text-gray-400 hover:text-gray-600 transition-colors;
}

.modal-form {
  @apply p-6 space-y-6 max-h-[70vh] overflow-y-auto;
}

.form-group {
  @apply space-y-2;
}

.form-row {
  @apply grid grid-cols-1 md:grid-cols-2 gap-4;
}

.form-label {
  @apply block text-sm font-semibold text-gray-700;
}

.form-input {
  @apply w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200;
}

.form-checkbox {
  @apply flex items-center space-x-3;
}

.checkbox-input {
  @apply w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500;
}

.checkbox-label {
  @apply text-sm font-medium text-gray-700;
}

.modal-actions {
  @apply flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50;
}

.btn-primary {
  @apply inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg;
}

.btn-secondary {
  @apply inline-flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300;
}

.loading-spinner {
  @apply inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin;
}

@media (max-width: 768px) {
  .modal-form {
    @apply p-4;
  }

  .form-row {
    @apply grid-cols-1;
  }
}
</style>
