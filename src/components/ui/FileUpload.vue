<template>
  <div class="file-upload-container">
    <label v-if="label" class="upload-label">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    
    <div class="upload-area" :class="uploadAreaClasses" @click="triggerFileInput">
      <input
        ref="fileInput"
        type="file"
        :accept="acceptedTypes"
        :multiple="multiple"
        @change="handleFileSelect"
        class="hidden"
      />
      
      <!-- Upload State -->
      <div v-if="!selectedFiles.length && !previewUrl" class="upload-prompt">
        <div class="upload-icon">
          <Upload class="w-8 h-8" />
        </div>
        <div class="upload-text">
          <p class="upload-primary">{{ uploadText }}</p>
          <p class="upload-secondary">{{ supportedFormats }}</p>
        </div>
      </div>
      
      <!-- Preview State -->
      <div v-else-if="previewUrl" class="preview-container">
        <img :src="previewUrl" :alt="fileName" class="preview-image" />
        <div class="preview-overlay">
          <button @click.stop="removeFile" class="remove-btn">
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <!-- Multiple Files State -->
      <div v-else class="files-list">
        <div
          v-for="(file, index) in selectedFiles"
          :key="index"
          class="file-item"
        >
          <div class="file-icon">
            <FileImage class="w-5 h-5" />
          </div>
          <div class="file-info">
            <div class="file-name">{{ file.name }}</div>
            <div class="file-size">{{ formatFileSize(file.size) }}</div>
          </div>
          <button @click.stop="removeFileAt(index)" class="file-remove">
            <X class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
    
    <!-- Upload Progress -->
    <div v-if="isUploading" class="upload-progress">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${uploadProgress}%` }"></div>
      </div>
      <div class="progress-text">
        <span>Uploading... {{ uploadProgress }}%</span>
        <button @click="cancelUpload" class="cancel-btn">Cancel</button>
      </div>
    </div>
    
    <!-- Error State -->
    <div v-if="error" class="upload-error">
      <AlertCircle class="w-4 h-4" />
      <span>{{ error }}</span>
    </div>
    
    <!-- Success State -->
    <div v-if="uploadSuccess" class="upload-success">
      <CheckCircle class="w-4 h-4" />
      <span>File uploaded successfully!</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Upload, X, FileImage, CircleAlert as AlertCircle, CircleCheck as CheckCircle } from 'lucide-vue-next'

interface Props {
  modelValue?: string | string[]
  label?: string
  required?: boolean
  multiple?: boolean
  accept?: string
  maxSize?: number // in MB
  uploadText?: string
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  accept: 'image/*',
  maxSize: 5,
  uploadText: 'Click to upload or drag and drop'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
  'upload-start': []
  'upload-complete': [files: File[]]
  'upload-error': [error: string]
}>()

const fileInput = ref<HTMLInputElement>()
const selectedFiles = ref<File[]>([])
const previewUrl = ref<string>('')
const isUploading = ref(false)
const uploadProgress = ref(0)
const uploadSuccess = ref(false)
const error = ref('')
const fileName = ref('')

const acceptedTypes = computed(() => props.accept)
const supportedFormats = computed(() => {
  if (props.accept.includes('image/*')) {
    return 'PNG, JPG, GIF up to 5MB'
  }
  return `Max ${props.maxSize}MB`
})

const uploadAreaClasses = computed(() => [
  'upload-zone',
  {
    'has-files': selectedFiles.value.length > 0 || previewUrl.value,
    'is-uploading': isUploading.value,
    'has-error': error.value
  }
])

watch(() => props.modelValue, (newValue) => {
  if (newValue && typeof newValue === 'string') {
    previewUrl.value = newValue
    fileName.value = 'Current image'
  }
})

const triggerFileInput = () => {
  if (!isUploading.value) {
    fileInput.value?.click()
  }
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])
  
  error.value = ''
  uploadSuccess.value = false
  
  // Validate files
  for (const file of files) {
    if (file.size > props.maxSize * 1024 * 1024) {
      error.value = `File ${file.name} is too large. Maximum size is ${props.maxSize}MB.`
      return
    }
    
    if (!file.type.match(props.accept.replace('*', '.*'))) {
      error.value = `File ${file.name} is not a supported format.`
      return
    }
  }
  
  selectedFiles.value = files
  
  // Create preview for single image
  if (!props.multiple && files.length === 1 && files[0].type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      previewUrl.value = e.target?.result as string
      fileName.value = files[0].name
    }
    reader.readAsDataURL(files[0])
  }
  
  // Start upload simulation
  uploadFiles(files)
}

const uploadFiles = async (files: File[]) => {
  isUploading.value = true
  uploadProgress.value = 0
  emit('upload-start')
  
  try {
    // Simulate upload progress
    const interval = setInterval(() => {
      uploadProgress.value += 10
      if (uploadProgress.value >= 100) {
        clearInterval(interval)
        completeUpload(files)
      }
    }, 200)
    
  } catch (err) {
    error.value = 'Upload failed. Please try again.'
    emit('upload-error', error.value)
    isUploading.value = false
  }
}

const completeUpload = (files: File[]) => {
  isUploading.value = false
  uploadSuccess.value = true
  
  // Emit the uploaded files
  emit('upload-complete', files)
  
  // For demo purposes, create mock URLs
  if (props.multiple) {
    const urls = files.map((_, index) => `https://example.com/uploads/file-${Date.now()}-${index}.jpg`)
    emit('update:modelValue', urls)
  } else {
    const url = `https://example.com/uploads/file-${Date.now()}.jpg`
    emit('update:modelValue', url)
  }
  
  // Clear success message after 3 seconds
  setTimeout(() => {
    uploadSuccess.value = false
  }, 3000)
}

const removeFile = () => {
  selectedFiles.value = []
  previewUrl.value = ''
  fileName.value = ''
  emit('update:modelValue', props.multiple ? [] : '')
}

const removeFileAt = (index: number) => {
  selectedFiles.value.splice(index, 1)
  if (selectedFiles.value.length === 0) {
    emit('update:modelValue', props.multiple ? [] : '')
  }
}

const cancelUpload = () => {
  isUploading.value = false
  uploadProgress.value = 0
  error.value = 'Upload cancelled'
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>

<style scoped>
.file-upload-container {
  @apply space-y-3;
}

.upload-label {
  @apply block text-sm font-medium text-gray-700;
}

.upload-zone {
  @apply relative border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/50;
}

.upload-zone.has-files {
  @apply border-solid border-blue-300 bg-blue-50/30;
}

.upload-zone.is-uploading {
  @apply border-blue-500 bg-blue-50 cursor-not-allowed;
}

.upload-zone.has-error {
  @apply border-red-300 bg-red-50/30;
}

.upload-prompt {
  @apply space-y-4;
}

.upload-icon {
  @apply w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto text-blue-600;
}

.upload-text {
  @apply space-y-2;
}

.upload-primary {
  @apply text-lg font-semibold text-gray-900;
}

.upload-secondary {
  @apply text-sm text-gray-500;
}

.preview-container {
  @apply relative inline-block;
}

.preview-image {
  @apply w-32 h-32 object-cover rounded-xl border border-gray-200;
}

.preview-overlay {
  @apply absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center;
}

.remove-btn {
  @apply p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors;
}

.files-list {
  @apply space-y-3;
}

.file-item {
  @apply flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-200;
}

.file-icon {
  @apply w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600;
}

.file-info {
  @apply flex-1;
}

.file-name {
  @apply font-medium text-gray-900 text-sm;
}

.file-size {
  @apply text-xs text-gray-500;
}

.file-remove {
  @apply p-1 text-gray-400 hover:text-red-500 transition-colors;
}

.upload-progress {
  @apply space-y-2;
}

.progress-bar {
  @apply w-full bg-gray-200 rounded-full h-2;
}

.progress-fill {
  @apply h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-300;
}

.progress-text {
  @apply flex items-center justify-between text-sm;
}

.cancel-btn {
  @apply text-red-600 hover:text-red-700 font-medium;
}

.upload-error {
  @apply flex items-center space-x-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3;
}

.upload-success {
  @apply flex items-center space-x-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-3;
}
</style>