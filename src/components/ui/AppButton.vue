<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <div v-if="loading" class="loading-spinner mr-2"></div>
    <component v-if="icon && !loading" :is="icon" class="w-5 h-5 mr-2" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  icon?: any
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const base = [
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed'
  ]

  // Sizes
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  // Variants
  const variants = {
    primary: 'bg-accent-500 hover:bg-accent-600 text-white shadow-lg hover:shadow-xl focus:ring-accent-200 transform hover:-translate-y-0.5',
    secondary: 'bg-white hover:bg-gray-50 text-accent-600 border-2 border-accent-500 focus:ring-accent-200',
    gold: 'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white shadow-lg hover:shadow-xl focus:ring-gold-200 transform hover:-translate-y-0.5',
    outline: 'border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 bg-white hover:bg-gray-50 focus:ring-gray-200',
    ghost: 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:ring-gray-200',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl focus:ring-red-200 transform hover:-translate-y-0.5'
  }

  base.push(sizes[props.size])
  base.push(variants[props.variant])

  if (props.fullWidth) {
    base.push('w-full')
  }

  return base.join(' ')
})
</script>