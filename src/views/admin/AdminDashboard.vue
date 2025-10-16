<template>
  <div class="admin-dashboard">
    <div class="dashboard-grid">
      <div class="metric-card green">
        <div class="metric-header">
          <div class="metric-icon green-icon">
            <Building class="w-5 h-5" />
          </div>
          <button class="info-btn">
            <Info class="w-4 h-4" />
          </button>
        </div>
        <div class="metric-title">Property Portfolio Control</div>
        <div class="metric-value">{{ propertyStats.total }}</div>
        <div class="metric-change positive">+{{ propertyStats.growth }}% Property Managed</div>
      </div>

      <div class="metric-card yellow">
        <div class="metric-header">
          <div class="metric-icon yellow-icon">
            <TrendingUp class="w-5 h-5" />
          </div>
          <button class="info-btn">
            <Info class="w-4 h-4" />
          </button>
        </div>
        <div class="metric-title">Portfolio Divestiture</div>
        <div class="metric-value">{{ propertyStats.sold }}</div>
        <div class="metric-change positive">+{{ propertyStats.soldGrowth }}% Properties Sold</div>
      </div>

      <div class="metric-card green">
        <div class="metric-header">
          <div class="metric-icon green-icon">
            <DollarSign class="w-5 h-5" />
          </div>
          <button class="info-btn">
            <Info class="w-4 h-4" />
          </button>
        </div>
        <div class="metric-title">Portfolio Value Management</div>
        <div class="metric-value">{{ formatValue(totalValue) }}</div>
        <div class="metric-change positive">+{{ valueGrowth }}% Asset Value Managed</div>
      </div>

      <div class="metric-card red">
        <div class="metric-header">
          <div class="metric-icon red-icon">
            <Home class="w-5 h-5" />
          </div>
          <button class="info-btn">
            <Info class="w-4 h-4" />
          </button>
        </div>
        <div class="metric-title">Rental Properties</div>
        <div class="metric-value">{{ propertyStats.reserved }}</div>
        <div class="metric-change" :class="propertyStats.reservedGrowth >= 0 ? 'positive' : 'negative'">
          {{ propertyStats.reservedGrowth >= 0 ? '+' : '' }}{{ propertyStats.reservedGrowth }}% Properties Rented
        </div>
        <div class="days-left-badge">
          <span class="badge-label">Days Left</span>
          <div class="badge-days">
            <span>{{ daysLeft[0] }}</span>
            <span>{{ daysLeft[1] }}</span>
            <span>{{ daysLeft[2] }}</span>
          </div>
        </div>
      </div>

      <div class="chart-card visitors-chart">
        <div class="chart-header">
          <h3>Average Visitors Managed</h3>
          <button class="see-all-btn" @click="navigateTo('/statistics')">See All</button>
        </div>
        <div class="chart-legend">
          <div class="legend-item">
            <span class="legend-dot blue"></span>
            <span>Office Price</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot light-blue"></span>
            <span>Listed Price</span>
          </div>
        </div>
        <div class="chart-container">
          <canvas ref="visitorsChartRef"></canvas>
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-header">
          <h3>Properties and Location</h3>
          <button class="see-all-btn" @click="navigateTo('/properties')">See All</button>
        </div>
        <div class="chart-container bar-chart">
          <canvas ref="propertiesChartRef"></canvas>
        </div>
        <div class="location-stats">
          <div class="location-item">
            <span class="location-label">City</span>
            <span class="location-value">{{ locationStats.city }}</span>
          </div>
          <div class="location-item">
            <span class="location-label">State</span>
            <span class="location-value">{{ locationStats.state }}</span>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-header">
          <h3>Spaces at the Property</h3>
          <button class="see-all-btn" @click="navigateTo('/properties')">See All</button>
        </div>
        <div class="spaces-list">
          <div v-for="space in propertySpaces" :key="space.name" class="space-item">
            <div class="space-info">
              <div class="space-icon" :class="space.colorClass"></div>
              <span>{{ space.name }}</span>
            </div>
            <div class="space-bar-container">
              <div class="space-bar" :class="space.barColor" :style="{ width: space.percentage + '%' }"></div>
              <span class="space-percentage">{{ space.percentage }}%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-header">
          <h3>Status Analysis</h3>
          <button class="see-all-btn" @click="navigateTo('/acquisitions')">See All</button>
        </div>
        <p class="chart-subtitle">Regular Status Analysis Helps Maintain Control.</p>
        <div class="donut-chart-container">
          <canvas ref="statusChartRef"></canvas>
          <div class="donut-center">
            <div class="donut-value">100%</div>
            <div class="donut-label">Total Analysis</div>
          </div>
        </div>
        <div class="status-legend">
          <div class="status-legend-item">
            <span class="status-dot blue"></span>
            <span>Available {{ statusAnalysis.available }}%</span>
          </div>
          <div class="status-legend-item">
            <span class="status-dot orange"></span>
            <span>Sold {{ statusAnalysis.sold }}%</span>
          </div>
          <div class="status-legend-item">
            <span class="status-dot gray"></span>
            <span>Reserved {{ statusAnalysis.reserved }}%</span>
          </div>
        </div>
      </div>

      <div class="chart-card wide">
        <div class="chart-header">
          <h3>Listed vs Offer Price for Rejections</h3>
          <button class="see-all-btn" @click="navigateTo('/statistics')">See All</button>
        </div>
        <div class="chart-legend">
          <div class="legend-item">
            <span class="legend-dot coral"></span>
            <span>Office Price</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot blue"></span>
            <span>Listed Price</span>
          </div>
        </div>
        <div class="chart-container">
          <canvas ref="priceChartRef"></canvas>
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-header">
          <h3>Property Type Preference</h3>
          <button class="see-all-btn" @click="navigateTo('/properties')">See All</button>
        </div>
        <div class="preference-list">
          <div v-for="pref in propertyPreferences" :key="pref.type" class="preference-item">
            <span class="preference-label">{{ pref.type }}</span>
            <div class="preference-bars">
              <div class="preference-bar filled" :style="{ width: pref.filled + '%' }"></div>
              <div class="preference-bar outline" :style="{ width: pref.outline + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Building, TrendingUp, DollarSign, Hop as Home, Info } from 'lucide-vue-next'
import { useAppStore } from '@/stores/app'

const router = useRouter()
const appStore = useAppStore()

const visitorsChartRef = ref<HTMLCanvasElement>()
const propertiesChartRef = ref<HTMLCanvasElement>()
const statusChartRef = ref<HTMLCanvasElement>()
const priceChartRef = ref<HTMLCanvasElement>()

const propertyStats = computed(() => {
  const total = appStore.properties.length
  const sold = appStore.properties.filter(p => p.status === 'Soldé(e)').length
  const reserved = appStore.properties.filter(p => p.status === 'Réservé(e)').length

  return {
    total,
    sold,
    reserved,
    growth: 28,
    soldGrowth: 18,
    reservedGrowth: -8
  }
})

const totalValue = computed(() => {
  return appStore.properties.reduce((sum, p) => sum + (p.price || 0), 0)
})

const valueGrowth = computed(() => 349)

const daysLeft = computed(() => {
  const today = new Date()
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  const daysRemaining = endOfMonth.getDate() - today.getDate()
  return [
    daysRemaining,
    daysRemaining + 1,
    daysRemaining + 2
  ]
})

const locationStats = computed(() => {
  const cityCount = new Set(appStore.properties.map(p => appStore.projects.find(proj => proj.id === p.projectId)?.city)).size
  const countryCount = new Set(appStore.projects.map(p => p.countryId)).size

  return {
    city: appStore.properties.length,
    state: appStore.projects.length
  }
})

const propertySpaces = computed(() => {
  const properties = appStore.properties
  const total = properties.length

  if (total === 0) return []

  const roomCounts = properties.reduce((acc, p) => {
    acc.rooms += p.rooms || 0
    acc.kitchens += p.kitchens || 0
    acc.balconies += p.balcony ? 1 : 0
    return acc
  }, { rooms: 0, kitchens: 0, balconies: 0 })

  const totalUnits = roomCounts.rooms + roomCounts.kitchens + roomCounts.balconies + total

  return [
    {
      name: 'Bedroom',
      percentage: Math.round((roomCounts.rooms / totalUnits) * 100),
      colorClass: 'bedroom',
      barColor: 'blue'
    },
    {
      name: 'Bathroom',
      percentage: Math.round((total / totalUnits) * 100),
      colorClass: 'bathroom',
      barColor: 'orange'
    },
    {
      name: 'Kitchen',
      percentage: Math.round((roomCounts.kitchens / totalUnits) * 100),
      colorClass: 'kitchen',
      barColor: 'yellow'
    },
    {
      name: 'Livingroom',
      percentage: Math.round(((total * 0.8) / totalUnits) * 100),
      colorClass: 'living',
      barColor: 'cyan'
    },
    {
      name: 'Balcony',
      percentage: Math.round((roomCounts.balconies / totalUnits) * 100),
      colorClass: 'rec',
      barColor: 'gray'
    }
  ]
})

const statusAnalysis = computed(() => {
  const properties = appStore.properties
  const total = properties.length

  if (total === 0) return { available: 0, sold: 0, reserved: 0 }

  const available = properties.filter(p => p.status === 'Disponible').length
  const sold = properties.filter(p => p.status === 'Soldé(e)').length
  const reserved = properties.filter(p => p.status === 'Réservé(e)').length

  return {
    available: Math.round((available / total) * 100),
    sold: Math.round((sold / total) * 100),
    reserved: Math.round((reserved / total) * 100)
  }
})

const propertyPreferences = computed(() => {
  const properties = appStore.properties
  const total = properties.length

  if (total === 0) return []

  const typeCount = properties.reduce((acc, p) => {
    const type = p.propertyType || 'other'
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return [
    {
      type: 'Appartement',
      filled: Math.round(((typeCount['appartement'] || 0) / total) * 100),
      outline: Math.round((1 - (typeCount['appartement'] || 0) / total) * 100)
    },
    {
      type: 'Villa',
      filled: Math.round(((typeCount['villa'] || 0) / total) * 100),
      outline: Math.round((1 - (typeCount['villa'] || 0) / total) * 100)
    },
    {
      type: 'Magasin',
      filled: Math.round(((typeCount['magasin'] || 0) / total) * 100),
      outline: Math.round((1 - (typeCount['magasin'] || 0) / total) * 100)
    },
    {
      type: 'Duplex',
      filled: Math.round(((typeCount['duplex'] || 0) / total) * 100),
      outline: Math.round((1 - (typeCount['duplex'] || 0) / total) * 100)
    },
    {
      type: 'Studio',
      filled: Math.round(((typeCount['studio'] || 0) / total) * 100),
      outline: Math.round((1 - (typeCount['studio'] || 0) / total) * 100)
    },
    {
      type: 'Penthouse',
      filled: Math.round(((typeCount['penthouse'] || 0) / total) * 100),
      outline: Math.round((1 - (typeCount['penthouse'] || 0) / total) * 100)
    },
    {
      type: 'Other',
      filled: Math.round(((typeCount['other'] || 0) / total) * 100),
      outline: Math.round((1 - (typeCount['other'] || 0) / total) * 100)
    }
  ]
})

function formatValue(value: number): string {
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(1)}B`
  } else if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`
  }
  return `$${value.toLocaleString()}`
}

function navigateTo(path: string) {
  router.push(path)
}

onMounted(() => {
  initCharts()
})

function initCharts() {
  if (visitorsChartRef.value) {
    drawVisitorsChart(visitorsChartRef.value)
  }
  if (propertiesChartRef.value) {
    drawPropertiesChart(propertiesChartRef.value)
  }
  if (statusChartRef.value) {
    drawStatusChart(statusChartRef.value)
  }
  if (priceChartRef.value) {
    drawPriceChart(priceChartRef.value)
  }
}

function drawVisitorsChart(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = canvas.offsetWidth * 2
  canvas.height = 280 * 2
  ctx.scale(2, 2)

  const acquisitions = appStore.acquisitions
  const monthlyData = getMonthlyAcquisitions(acquisitions, 9)

  const padding = 40
  const chartWidth = canvas.offsetWidth - padding * 2
  const chartHeight = 280 - padding * 2
  const barWidth = (chartWidth / monthlyData.length) * 0.35
  const groupWidth = chartWidth / monthlyData.length

  const maxValue = Math.max(...monthlyData.map(d => Math.max(d.office, d.listed)), 1)

  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = 1
  for (let i = 0; i <= 5; i++) {
    const y = padding + (chartHeight / 5) * i
    ctx.beginPath()
    ctx.moveTo(padding, y)
    ctx.lineTo(canvas.offsetWidth - padding, y)
    ctx.stroke()
  }

  monthlyData.forEach((item, index) => {
    const x = padding + groupWidth * index + groupWidth / 2
    const officeHeight = (item.office / maxValue) * chartHeight
    const listedHeight = (item.listed / maxValue) * chartHeight

    const gradient1 = ctx.createLinearGradient(0, 0, 0, chartHeight)
    gradient1.addColorStop(0, '#4F46E5')
    gradient1.addColorStop(1, '#818CF8')
    ctx.fillStyle = gradient1
    ctx.fillRect(x - barWidth - 2, padding + chartHeight - officeHeight, barWidth, officeHeight)

    const gradient2 = ctx.createLinearGradient(0, 0, 0, chartHeight)
    gradient2.addColorStop(0, '#93C5FD')
    gradient2.addColorStop(1, '#BFDBFE')
    ctx.fillStyle = gradient2
    ctx.fillRect(x + 2, padding + chartHeight - listedHeight, barWidth, listedHeight)

    ctx.fillStyle = '#6B7280'
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(item.month, x, padding + chartHeight + 20)
  })
}

function drawPropertiesChart(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = canvas.offsetWidth * 2
  canvas.height = 200 * 2
  ctx.scale(2, 2)

  const properties = appStore.properties
  const priceRanges = [
    { label: '<10M', max: 10000000 },
    { label: '10-20M', max: 20000000 },
    { label: '20-30M', max: 30000000 },
    { label: '30-50M', max: 50000000 },
    { label: '50-70M', max: 70000000 },
    { label: '70-100M', max: 100000000 },
    { label: '>100M', max: Infinity }
  ]

  const data = priceRanges.map((range, index) => {
    const minPrice = index === 0 ? 0 : priceRanges[index - 1].max
    return properties.filter(p => (p.price || 0) > minPrice && (p.price || 0) <= range.max).length
  })

  const padding = 30
  const chartWidth = canvas.offsetWidth - padding * 2
  const chartHeight = 200 - padding * 2
  const barWidth = (chartWidth / data.length) * 0.6
  const groupWidth = chartWidth / data.length

  const maxValue = Math.max(...data, 1)

  data.forEach((value, index) => {
    const x = padding + groupWidth * index + (groupWidth - barWidth) / 2
    const height = (value / maxValue) * chartHeight

    const gradient = ctx.createLinearGradient(0, 0, 0, chartHeight)
    gradient.addColorStop(0, '#4F46E5')
    gradient.addColorStop(1, '#818CF8')

    ctx.fillStyle = gradient
    ctx.beginPath()
    if (ctx.roundRect) {
      ctx.roundRect(x, padding + chartHeight - height, barWidth, height, 4)
    } else {
      ctx.rect(x, padding + chartHeight - height, barWidth, height)
    }
    ctx.fill()

    ctx.fillStyle = '#6B7280'
    ctx.font = '11px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(priceRanges[index].label, x + barWidth / 2, padding + chartHeight + 15)
  })
}

function drawStatusChart(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = 200 * 2
  canvas.height = 200 * 2
  ctx.scale(2, 2)

  const centerX = 100
  const centerY = 100
  const radius = 70
  const innerRadius = 45

  const analysis = statusAnalysis.value
  const data = [
    { value: analysis.available, color: '#4F46E5' },
    { value: analysis.sold, color: '#F97316' },
    { value: analysis.reserved, color: '#E5E7EB' }
  ]

  let currentAngle = -Math.PI / 2

  data.forEach((item) => {
    const sliceAngle = (item.value / 100) * 2 * Math.PI

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
    ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true)
    ctx.closePath()
    ctx.fillStyle = item.color
    ctx.fill()

    currentAngle += sliceAngle
  })
}

function drawPriceChart(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = canvas.offsetWidth * 2
  canvas.height = 220 * 2
  ctx.scale(2, 2)

  const acquisitions = appStore.acquisitions
  const monthlyData = getMonthlyAcquisitions(acquisitions, 12)

  const padding = 40
  const chartWidth = canvas.offsetWidth - padding * 2
  const chartHeight = 220 - padding * 2
  const pointSpacing = chartWidth / (monthlyData.length - 1)

  const maxValue = Math.max(...monthlyData.map(d => Math.max(d.office, d.listed)), 1)
  const minValue = Math.min(...monthlyData.map(d => Math.min(d.office, d.listed)), 0)

  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = 1
  for (let i = 0; i <= 4; i++) {
    const y = padding + (chartHeight / 4) * i
    ctx.beginPath()
    ctx.moveTo(padding, y)
    ctx.lineTo(canvas.offsetWidth - padding, y)
    ctx.stroke()
  }

  const officePoints: [number, number][] = []
  const listedPoints: [number, number][] = []

  monthlyData.forEach((item, index) => {
    const x = padding + pointSpacing * index
    const officeY = padding + chartHeight - ((item.office - minValue) / (maxValue - minValue)) * chartHeight
    const listedY = padding + chartHeight - ((item.listed - minValue) / (maxValue - minValue)) * chartHeight

    officePoints.push([x, officeY])
    listedPoints.push([x, listedY])
  })

  ctx.beginPath()
  ctx.moveTo(officePoints[0][0], padding + chartHeight)
  officePoints.forEach(([x, y]) => ctx.lineTo(x, y))
  ctx.lineTo(officePoints[officePoints.length - 1][0], padding + chartHeight)
  ctx.closePath()
  const gradient1 = ctx.createLinearGradient(0, padding, 0, padding + chartHeight)
  gradient1.addColorStop(0, 'rgba(251, 146, 140, 0.3)')
  gradient1.addColorStop(1, 'rgba(251, 146, 140, 0.05)')
  ctx.fillStyle = gradient1
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(listedPoints[0][0], padding + chartHeight)
  listedPoints.forEach(([x, y]) => ctx.lineTo(x, y))
  ctx.lineTo(listedPoints[listedPoints.length - 1][0], padding + chartHeight)
  ctx.closePath()
  const gradient2 = ctx.createLinearGradient(0, padding, 0, padding + chartHeight)
  gradient2.addColorStop(0, 'rgba(147, 197, 253, 0.3)')
  gradient2.addColorStop(1, 'rgba(147, 197, 253, 0.05)')
  ctx.fillStyle = gradient2
  ctx.fill()

  ctx.strokeStyle = '#FB928C'
  ctx.lineWidth = 2
  ctx.beginPath()
  officePoints.forEach(([x, y], index) => {
    if (index === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  })
  ctx.stroke()

  ctx.strokeStyle = '#93C5FD'
  ctx.lineWidth = 2
  ctx.beginPath()
  listedPoints.forEach(([x, y], index) => {
    if (index === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  })
  ctx.stroke()

  monthlyData.forEach((item, index) => {
    const x = padding + pointSpacing * index
    ctx.fillStyle = '#6B7280'
    ctx.font = '11px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(item.month, x, padding + chartHeight + 20)
  })
}

function getMonthlyAcquisitions(acquisitions: any[], months: number) {
  const now = new Date()
  const result = []

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthName = date.toLocaleDateString('en-US', { month: 'short' })

    const monthAcquisitions = acquisitions.filter(acq => {
      const acqDate = new Date(acq.dateAcquisition)
      return acqDate.getMonth() === date.getMonth() && acqDate.getFullYear() === date.getFullYear()
    })

    const avgAmount = monthAcquisitions.length > 0
      ? monthAcquisitions.reduce((sum, acq) => sum + acq.amount, 0) / monthAcquisitions.length
      : 0

    result.push({
      month: monthName,
      office: monthAcquisitions.length * 100,
      listed: avgAmount / 100000
    })
  }

  return result
}
</script>

<style scoped>
.admin-dashboard {
  @apply p-6 bg-gray-50 min-h-screen;
}

.dashboard-grid {
  @apply grid gap-6;
  grid-template-columns: repeat(4, 1fr);
}

.metric-card {
  @apply bg-white rounded-2xl p-6 shadow-sm;
}

.metric-card.green {
  @apply bg-gradient-to-br from-emerald-50 to-white border border-emerald-100;
}

.metric-card.yellow {
  @apply bg-gradient-to-br from-amber-50 to-white border border-amber-100;
}

.metric-card.red {
  @apply bg-gradient-to-br from-red-50 to-white border border-red-100;
}

.metric-header {
  @apply flex items-start justify-between mb-4;
}

.metric-icon {
  @apply w-10 h-10 rounded-lg flex items-center justify-center text-white;
}

.metric-icon.green-icon {
  @apply bg-gradient-to-br from-emerald-500 to-emerald-600;
}

.metric-icon.yellow-icon {
  @apply bg-gradient-to-br from-amber-500 to-amber-600;
}

.metric-icon.red-icon {
  @apply bg-gradient-to-br from-red-500 to-red-600;
}

.info-btn {
  @apply text-blue-500 hover:text-blue-600 transition-colors bg-transparent border-0 cursor-pointer;
}

.metric-title {
  @apply text-sm text-gray-600 mb-2;
}

.metric-value {
  @apply text-3xl font-bold text-gray-900 mb-2;
}

.metric-change {
  @apply text-xs font-medium;
}

.metric-change.positive {
  @apply text-emerald-600;
}

.metric-change.negative {
  @apply text-red-600;
}

.days-left-badge {
  @apply mt-4 bg-blue-600 rounded-lg p-3 text-white;
}

.badge-label {
  @apply text-xs font-medium block mb-2;
}

.badge-days {
  @apply flex gap-2;
}

.badge-days span {
  @apply bg-white/20 rounded px-3 py-1 text-sm font-semibold;
}

.chart-card {
  @apply bg-white rounded-2xl p-6 shadow-sm;
}

.visitors-chart {
  grid-column: span 4;
}

.chart-card.wide {
  grid-column: span 2;
}

.chart-header {
  @apply flex items-center justify-between mb-4;
}

.chart-header h3 {
  @apply text-lg font-bold text-gray-900;
}

.see-all-btn {
  @apply text-sm text-gray-500 hover:text-gray-700 transition-colors bg-transparent border-0 cursor-pointer;
}

.chart-subtitle {
  @apply text-sm text-gray-500 mb-4;
}

.chart-legend {
  @apply flex gap-6 mb-4;
}

.legend-item {
  @apply flex items-center gap-2 text-sm text-gray-600;
}

.legend-dot {
  @apply w-3 h-3 rounded-full;
}

.legend-dot.blue {
  @apply bg-blue-600;
}

.legend-dot.light-blue {
  @apply bg-blue-300;
}

.legend-dot.coral {
  @apply bg-red-400;
}

.chart-container {
  @apply relative;
}

.chart-container canvas {
  @apply w-full;
}

.bar-chart {
  @apply mb-4;
}

.location-stats {
  @apply flex justify-between pt-4 border-t border-gray-100;
}

.location-item {
  @apply flex flex-col;
}

.location-label {
  @apply text-sm text-gray-500 mb-1;
}

.location-value {
  @apply text-lg font-bold text-gray-900;
}

.spaces-list {
  @apply space-y-4;
}

.space-item {
  @apply flex items-center gap-4;
}

.space-info {
  @apply flex items-center gap-2 w-32;
}

.space-icon {
  @apply w-8 h-8 rounded-lg flex items-center justify-center;
}

.space-icon.bedroom {
  @apply bg-blue-100;
}

.space-icon.bathroom {
  @apply bg-orange-100;
}

.space-icon.kitchen {
  @apply bg-amber-100;
}

.space-icon.living {
  @apply bg-cyan-100;
}

.space-icon.rec {
  @apply bg-gray-100;
}

.space-bar-container {
  @apply flex items-center gap-2 flex-1;
}

.space-bar {
  @apply h-6 rounded-full transition-all;
}

.space-bar.blue {
  @apply bg-blue-500;
}

.space-bar.orange {
  @apply bg-orange-500;
}

.space-bar.yellow {
  @apply bg-amber-400;
}

.space-bar.cyan {
  @apply bg-cyan-500;
}

.space-bar.gray {
  @apply bg-gray-400;
}

.space-percentage {
  @apply text-sm font-semibold text-gray-700 min-w-[3rem];
}

.donut-chart-container {
  @apply relative my-6 flex items-center justify-center;
}

.donut-center {
  @apply absolute inset-0 flex flex-col items-center justify-center;
}

.donut-value {
  @apply text-2xl font-bold text-gray-900;
}

.donut-label {
  @apply text-xs text-gray-500;
}

.status-legend {
  @apply space-y-2 mt-4;
}

.status-legend-item {
  @apply flex items-center gap-2 text-sm text-gray-600;
}

.status-dot {
  @apply w-3 h-3 rounded-full;
}

.status-dot.blue {
  @apply bg-blue-600;
}

.status-dot.orange {
  @apply bg-orange-500;
}

.status-dot.gray {
  @apply bg-gray-300;
}

.preference-list {
  @apply space-y-3;
}

.preference-item {
  @apply flex items-center gap-4;
}

.preference-label {
  @apply text-sm text-gray-700 w-24;
}

.preference-bars {
  @apply flex gap-1 flex-1;
}

.preference-bar {
  @apply h-6 rounded transition-all;
}

.preference-bar.filled {
  @apply bg-blue-600;
}

.preference-bar.outline {
  @apply bg-blue-100;
}

@media (max-width: 1536px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .visitors-chart {
    grid-column: span 2;
  }
}

@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .visitors-chart,
  .chart-card.wide {
    grid-column: span 1;
  }
}
</style>
