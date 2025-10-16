<template>
  <div class="chart-container">
    <div class="chart-header">
      <h3 class="chart-title">{{ title }}</h3>
      <p class="chart-subtitle">{{ subtitle }}</p>
    </div>
    <div class="chart-content">
      <div class="chart-bars">
        <div
          v-for="(month, index) in chartData"
          :key="index"
          class="bar-group"
        >
          <div class="bar-wrapper">
            <div class="bar-tooltip" v-if="hoveredIndex === index">
              <span class="tooltip-value">{{ month.total }}</span>
              <span class="tooltip-label">properties</span>
            </div>
            <div
              class="bar"
              :style="{
                height: getBarHeight(month.total),
                backgroundColor: getBarColor(index)
              }"
              @mouseenter="hoveredIndex = index"
              @mouseleave="hoveredIndex = null"
            >
              <div class="bar-segments">
                <div
                  v-if="month.appartements > 0"
                  class="bar-segment appartement"
                  :style="{ height: getSegmentHeight(month.appartements, month.total) }"
                  :title="`${month.appartements} Apartments`"
                ></div>
                <div
                  v-if="month.villas > 0"
                  class="bar-segment villa"
                  :style="{ height: getSegmentHeight(month.villas, month.total) }"
                  :title="`${month.villas} Villas`"
                ></div>
                <div
                  v-if="month.magasins > 0"
                  class="bar-segment magasin"
                  :style="{ height: getSegmentHeight(month.magasins, month.total) }"
                  :title="`${month.magasins} Stores`"
                ></div>
              </div>
            </div>
            <div class="bar-value">{{ month.total }}</div>
          </div>
          <div class="bar-label">{{ month.label }}</div>
        </div>
      </div>

      <div class="chart-legend">
        <div class="legend-item">
          <div class="legend-color appartement"></div>
          <span>Apartments</span>
        </div>
        <div class="legend-item">
          <div class="legend-color villa"></div>
          <span>Villas</span>
        </div>
        <div class="legend-item">
          <div class="legend-color magasin"></div>
          <span>Stores</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  title?: string
  subtitle?: string
  data: Array<{
    month: string
    year: number
    appartements: number
    villas: number
    magasins: number
  }>
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Monthly Acquisitions',
  subtitle: 'Last 3 months property sales'
})

const hoveredIndex = ref<number | null>(null)

const chartData = computed(() => {
  return props.data.map(item => ({
    label: `${item.month} ${item.year}`,
    appartements: item.appartements,
    villas: item.villas,
    magasins: item.magasins,
    total: item.appartements + item.villas + item.magasins
  }))
})

const maxValue = computed(() => {
  return Math.max(...chartData.value.map(d => d.total), 10)
})

const getBarHeight = (value: number) => {
  const percentage = (value / maxValue.value) * 100
  return `${Math.max(percentage, 5)}%`
}

const getSegmentHeight = (segmentValue: number, total: number) => {
  return `${(segmentValue / total) * 100}%`
}

const getBarColor = (index: number) => {
  const colors = ['#3b82f6', '#10b981', '#f59e0b']
  return colors[index % colors.length]
}
</script>

<style scoped>
.chart-container {
  @apply bg-white rounded-2xl shadow-sm border border-gray-200 p-6;
}

.chart-header {
  @apply mb-6;
}

.chart-title {
  @apply text-xl font-bold text-gray-900 mb-1;
}

.chart-subtitle {
  @apply text-sm text-gray-600;
}

.chart-content {
  @apply space-y-6;
}

.chart-bars {
  @apply flex items-end justify-around gap-4 h-64 pb-2;
}

.bar-group {
  @apply flex-1 flex flex-col items-center;
}

.bar-wrapper {
  @apply relative w-full flex flex-col items-center mb-2;
  height: 100%;
}

.bar-tooltip {
  @apply absolute -top-12 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg z-10 flex flex-col items-center;
  min-width: 80px;
}

.tooltip-value {
  @apply text-lg font-bold;
}

.tooltip-label {
  @apply text-xs text-gray-300;
}

.bar {
  @apply w-full max-w-[80px] rounded-t-lg transition-all duration-300 cursor-pointer relative mt-auto;
  min-height: 20px;
}

.bar:hover {
  @apply opacity-90 transform scale-105;
}

.bar-segments {
  @apply flex flex-col-reverse h-full w-full rounded-t-lg overflow-hidden;
}

.bar-segment {
  @apply w-full transition-all duration-300;
}

.bar-segment.appartement {
  @apply bg-blue-500;
}

.bar-segment.villa {
  @apply bg-green-500;
}

.bar-segment.magasin {
  @apply bg-amber-500;
}

.bar-value {
  @apply text-sm font-semibold text-gray-700 mt-2;
}

.bar-label {
  @apply text-xs text-gray-600 mt-2 font-medium;
}

.chart-legend {
  @apply flex items-center justify-center gap-6 pt-4 border-t border-gray-200;
}

.legend-item {
  @apply flex items-center gap-2;
}

.legend-color {
  @apply w-4 h-4 rounded;
}

.legend-color.appartement {
  @apply bg-blue-500;
}

.legend-color.villa {
  @apply bg-green-500;
}

.legend-color.magasin {
  @apply bg-amber-500;
}

.legend-item span {
  @apply text-sm text-gray-700 font-medium;
}

@media (max-width: 768px) {
  .chart-bars {
    @apply h-48;
  }

  .bar {
    @apply max-w-[60px];
  }

  .chart-legend {
    @apply flex-col gap-3;
  }
}
</style>
