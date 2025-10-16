<template>
  <div 
    class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200"
    :class="[
      hoverable && 'hover:shadow-md hover:border-gray-300 cursor-pointer',
      clickable && 'hover:scale-[1.02]'
    ]"
    @click="clickable && $emit('click')"
  >
    <!-- Image -->
    <div v-if="imageUrl" class="relative h-48 overflow-hidden">
      <img 
        :src="imageUrl" 
        :alt="title"
        class="w-full h-full object-cover"
      />
      <div v-if="badge" class="absolute top-3 right-3">
        <span 
          class="px-2 py-1 text-xs font-medium rounded-full"
          :class="badgeClass"
        >
          {{ badge }}
        </span>
      </div>
    </div>
    
    <!-- Content -->
    <div class="p-6">
      <!-- Header -->
      <div class="flex items-start justify-between mb-3">
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ title }}</h3>
          <p v-if="subtitle" class="text-sm text-gray-600">{{ subtitle }}</p>
        </div>
        <div v-if="$slots.actions" class="ml-4">
          <slot name="actions" />
        </div>
      </div>
      
      <!-- Description -->
      <p v-if="description" class="text-gray-700 mb-4 line-clamp-3">
        {{ description }}
      </p>
      
      <!-- Metadata -->
      <div v-if="metadata && metadata.length" class="space-y-2 mb-4">
        <div 
          v-for="item in metadata" 
          :key="item.label"
          class="flex items-center justify-between text-sm"
        >
          <span class="text-gray-600">{{ item.label }}</span>
          <span class="font-medium text-gray-900">{{ item.value }}</span>
        </div>
      </div>
      
      <!-- Price -->
      <div v-if="price" class="flex items-center justify-between mb-4">
        <span class="text-sm text-gray-600">Prix</span>
        <span class="text-xl font-bold text-primary-600">
          {{ formatPrice(price) }}
        </span>
      </div>
      
      <!-- Footer -->
      <div v-if="$slots.footer" class="pt-4 border-t border-gray-200">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface MetadataItem {
  label: string;
  value: string;
}

defineProps<{
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  badge?: string;
  badgeClass?: string;
  price?: number;
  metadata?: MetadataItem[];
  hoverable?: boolean;
  clickable?: boolean;
}>();

defineEmits<{
  click: [];
}>();

function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0
  }).format(price);
}
</script>