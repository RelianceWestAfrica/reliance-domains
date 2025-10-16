<template>
  <div class="space-y-2">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    
    <div class="relative">
      <div v-if="icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <component :is="icon" class="h-5 w-5 text-gray-400" />
      </div>
      
      <input
        :id="inputId"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :class="inputClasses"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
      
      <div v-if="isLoading" class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <div class="loading-spinner"></div>
      </div>
    </div>
    
    <div v-if="error" class="text-sm text-red-600 animate-slide-up">
      {{ error }}
    </div>
    
    <div v-if="hint && !error" class="text-sm text-gray-500">
      {{ hint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  modelValue?: string
  type?: string
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
  icon?: any
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
  isLoading: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)

const inputValue = computed({
  get: () => props.modelValue || '',
  set: (value) => emit('update:modelValue', value)
})

const inputClasses = computed(() => {
  const base = [
    'input-field',
    'transition-colors duration-200'
  ]

  if (props.icon) {
    base.push('pl-10')
  }

  if (props.error) {
    base.push('border-red-300 focus:border-red-500 focus:ring-red-500')
  } else {
    base.push('border-gray-300 focus:border-accent-500 focus:ring-accent-500')
  }

  if (props.disabled) {
    base.push('bg-gray-100 cursor-not-allowed')
  }

  return base.join(' ')
})
</script>