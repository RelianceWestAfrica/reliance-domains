<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <div class="relative">
      <div class="loading-spinner" :class="spinnerClass"></div>
      <div v-if="text" class="mt-3 text-sm text-gray-600 text-center animate-pulse">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullHeight?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  fullHeight: false
})

const containerClass = computed(() => {
  return props.fullHeight ? 'min-h-[400px]' : 'p-4'
})

const spinnerClass = computed(() => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }
  return sizes[props.size]
})
</script>