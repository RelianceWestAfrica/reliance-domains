<template>
  <div class="space-y-2">
    <label v-if="label" :for="selectId" class="block text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    
    <div class="relative">
      <select
        :id="selectId"
        v-model="selectValue"
        :required="required"
        :disabled="disabled || loading"
        :class="selectClasses"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="getOptionValue(option)"
          :value="getOptionValue(option)"
        >
          {{ getOptionLabel(option) }}
        </option>
      </select>
      
      <div v-if="loading" class="absolute inset-y-0 right-8 flex items-center">
        <div class="loading-spinner"></div>
      </div>
    </div>
    
    <div v-if="error" class="text-sm text-red-600 animate-slide-up">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  modelValue?: string | number
  options: Array<any>
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  loading?: boolean
  valueKey?: string
  labelKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
  loading: false,
  valueKey: 'value',
  labelKey: 'label'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const selectId = ref(`select-${Math.random().toString(36).substr(2, 9)}`)

const selectValue = computed({
  get: () => props.modelValue || '',
  set: (value) => emit('update:modelValue', value)
})

const selectClasses = computed(() => {
  const base = [
    'input-field',
    'pr-10 appearance-none bg-white',
    'transition-colors duration-200'
  ]

  if (props.error) {
    base.push('border-red-300 focus:border-red-500 focus:ring-red-500')
  } else {
    base.push('border-gray-300 focus:border-accent-500 focus:ring-accent-500')
  }

  if (props.disabled || props.loading) {
    base.push('bg-gray-100 cursor-not-allowed')
  }

  return base.join(' ')
})

const getOptionValue = (option: any) => {
  return typeof option === 'object' ? option[props.valueKey] : option
}

const getOptionLabel = (option: any) => {
  return typeof option === 'object' ? option[props.labelKey] : option
}
</script>