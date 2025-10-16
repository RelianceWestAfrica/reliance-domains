<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
        <div class="flex items-center gap-3">
          <slot name="actions" />
        </div>
      </div>
    </div>
    
    <!-- Filters -->
    <div v-if="$slots.filters" class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <slot name="filters" />
    </div>
    
    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th 
              v-for="column in columns" 
              :key="column.key"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              :class="column.class"
            >
              {{ column.label }}
            </th>
            <th v-if="$slots.actions" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr 
            v-for="(item, index) in data" 
            :key="index"
            class="hover:bg-gray-50 transition-colors"
          >
            <td 
              v-for="column in columns" 
              :key="column.key"
              class="px-6 py-4 whitespace-nowrap"
              :class="column.cellClass"
            >
              <slot 
                :name="`cell-${column.key}`" 
                :item="item" 
                :value="getNestedValue(item, column.key)"
              >
                {{ getNestedValue(item, column.key) }}
              </slot>
            </td>
            <td v-if="$slots.actions" class="px-6 py-4 whitespace-nowrap text-right">
              <slot name="actions" :item="item" :index="index" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Empty State -->
    <div v-if="!data.length" class="px-6 py-12 text-center">
      <div class="text-gray-400 mb-2">
        <Database class="w-12 h-12 mx-auto" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-1">Aucune donnée</h3>
      <p class="text-gray-500">{{ emptyMessage || 'Aucun élément à afficher pour le moment.' }}</p>
    </div>
    
    <!-- Pagination -->
    <div v-if="pagination && data.length" class="px-6 py-4 border-t border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-700">
          Affichage de {{ pagination.from }} à {{ pagination.to }} sur {{ pagination.total }} résultats
        </div>
        <div class="flex items-center gap-2">
          <button
            :disabled="pagination.currentPage === 1"
            class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="$emit('page-change', pagination.currentPage - 1)"
          >
            Précédent
          </button>
          <button
            :disabled="pagination.currentPage === pagination.totalPages"
            class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="$emit('page-change', pagination.currentPage + 1)"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Database } from 'lucide-vue-next';

interface Column {
  key: string;
  label: string;
  class?: string;
  cellClass?: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  from: number;
  to: number;
  total: number;
}

defineProps<{
  title: string;
  columns: Column[];
  data: any[];
  emptyMessage?: string;
  pagination?: Pagination;
}>();

defineEmits<{
  'page-change': [page: number];
}>();

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}
</script>