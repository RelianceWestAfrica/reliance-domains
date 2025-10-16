<template>
  <div class="luxury-statistics">
    <!-- Header Section -->
    <div class="stats-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="header-title">Analytics & Insights</h1>
          <p class="header-subtitle">Comprehensive performance metrics and system analytics</p>
        </div>
        <div class="header-actions">
          <select v-model="selectedPeriod" class="period-selector">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="3m">Last 3 months</option>
            <option value="1y">This year</option>
          </select>
          <button @click="exportData" class="export-btn">
            <Download class="w-5 h-5" />
            Export Data
          </button>
        </div>
      </div>
    </div>

    <!-- Key Performance Indicators -->
    <div class="kpi-section">
      <div class="kpi-grid">
        <div
          v-for="kpi in kpiData"
          :key="kpi.id"
          class="kpi-card"
          :class="kpi.category"
        >
          <div class="kpi-header">
            <div class="kpi-icon" :class="kpi.iconClass">
              <component :is="getIconComponent(kpi.icon)" class="w-6 h-6" />
            </div>
            <div class="kpi-trend" :class="kpi.trend === 'up' ? 'trend-positive' : kpi.trend === 'down' ? 'trend-negative' : 'trend-neutral'">
              <TrendingUp v-if="kpi.trend === 'up'" class="w-4 h-4" />
              <TrendingDown v-else-if="kpi.trend === 'down'" class="w-4 h-4" />
              <Minus v-else class="w-4 h-4" />
              <span>{{ kpi.change }}%</span>
            </div>
          </div>
          <div class="kpi-content">
            <div class="kpi-value">{{ kpi.value }}</div>
            <div class="kpi-label">{{ kpi.label }}</div>
          </div>
          <div class="kpi-footer">
            <span class="kpi-period">vs {{ getPeriodLabel() }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Analytics Grid -->
    <div class="analytics-grid">
      <!-- User Engagement Chart -->
      <div class="chart-card large">
        <div class="chart-header">
          <h3 class="chart-title">User Engagement Trends</h3>
          <div class="chart-controls">
            <button
              v-for="period in chartPeriods"
              :key="period.value"
              @click="selectedChartPeriod = period.value"
              class="chart-period-btn"
              :class="{ active: selectedChartPeriod === period.value }"
            >
              {{ period.label }}
            </button>
          </div>
        </div>
        <div class="chart-container">
          <div class="engagement-metrics">
            <div class="engagement-item">
              <div class="engagement-label">Daily Active Users</div>
              <div class="engagement-value">{{ engagementData.dailyActiveUsers }}</div>
              <div class="engagement-bar">
                <div class="engagement-fill" style="width: 85%"></div>
              </div>
            </div>
            <div class="engagement-item">
              <div class="engagement-label">Session Duration</div>
              <div class="engagement-value">{{ engagementData.avgSessionDuration }}</div>
              <div class="engagement-bar">
                <div class="engagement-fill" style="width: 72%"></div>
              </div>
            </div>
            <div class="engagement-item">
              <div class="engagement-label">Page Views</div>
              <div class="engagement-value">{{ engagementData.totalPageViews }}</div>
              <div class="engagement-bar">
                <div class="engagement-fill" style="width: 93%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- System Performance -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">System Performance</h3>
        </div>
        <div class="chart-container">
          <div class="performance-grid">
            <div
              v-for="metric in performanceMetrics"
              :key="metric.id"
              class="performance-metric"
            >
              <div class="metric-header">
                <span class="metric-name">{{ metric.name }}</span>
                <span class="metric-status" :class="metric.statusClass">
                  <div class="status-dot"></div>
                  {{ metric.status }}
                </span>
              </div>
              <div class="metric-details">
                <div class="metric-stat">
                  <span class="stat-label">Response Time</span>
                  <span class="stat-value">{{ metric.responseTime }}ms</span>
                </div>
                <div class="metric-stat">
                  <span class="stat-label">Uptime</span>
                  <span class="stat-value">{{ metric.uptime }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Geographic Distribution -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Geographic Distribution</h3>
        </div>
        <div class="chart-container">
          <div class="geographic-grid">
            <div
              v-for="country in geographicData"
              :key="country.id"
              class="country-metric"
            >
              <div class="country-header">
                <span class="country-flag">{{ country.flag }}</span>
                <span class="country-name">{{ country.name }}</span>
                <span class="country-percentage">{{ country.percentage }}%</span>
              </div>
              <div class="country-stats">
                <div class="country-stat">
                  <span class="stat-label">Projects</span>
                  <span class="stat-value">{{ country.projects }}</span>
                </div>
                <div class="country-stat">
                  <span class="stat-label">Properties</span>
                  <span class="stat-value">{{ country.properties }}</span>
                </div>
              </div>
              <div class="country-progress">
                <div
                  class="country-progress-fill"
                  :style="{ width: `${country.percentage}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Performing Properties -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Top Performing Properties</h3>
          <button class="view-all-btn">View All</button>
        </div>
        <div class="chart-container">
          <div class="properties-list">
            <div
              v-for="property in topProperties"
              :key="property.id"
              class="property-metric"
            >
              <div class="property-image">
                <img :src="property.image" :alt="property.title" />
              </div>
              <div class="property-info">
                <h4 class="property-title">{{ property.title }}</h4>
                <p class="property-location">{{ property.location }}</p>
                <div class="property-stats">
                  <span class="property-views">{{ property.views }} views</span>
                  <span class="property-inquiries">{{ property.inquiries }} inquiries</span>
                </div>
              </div>
              <div class="property-score">
                <div class="score-circle" :style="{ background: `conic-gradient(#3b82f6 ${property.score * 3.6}deg, #e5e7eb 0deg)` }">
                  <div class="score-inner">{{ property.score }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activities -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">Recent System Activities</h3>
        </div>
        <div class="chart-container">
          <div class="activities-timeline">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="timeline-item"
            >
              <div class="timeline-marker" :class="activity.iconClass">
                <component :is="getIconComponent(activity.icon)" class="w-4 h-4" />
              </div>
              <div class="timeline-content">
                <div class="timeline-title">{{ activity.title }}</div>
                <div class="timeline-description">{{ activity.description }}</div>
                <div class="timeline-time">{{ formatTime(activity.timestamp) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- User Activity Metrics -->
      <div class="chart-card">
        <div class="chart-header">
          <h3 class="chart-title">User Activity Metrics</h3>
        </div>
        <div class="chart-container">
          <div class="user-metrics">
            <div
              v-for="metric in userMetrics"
              :key="metric.id"
              class="user-metric"
            >
              <div class="metric-icon" :class="metric.iconClass">
                <component :is="getIconComponent(metric.icon)" class="w-5 h-5" />
              </div>
              <div class="metric-info">
                <div class="metric-value">{{ metric.value }}</div>
                <div class="metric-label">{{ metric.label }}</div>
                <div class="metric-change" :class="metric.changeClass">
                  {{ metric.change > 0 ? '+' : '' }}{{ metric.change }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { TrendingUp, TrendingDown, Minus, Download, Building, Hop as Home, Users, Activity, ShoppingCart, FileText, UserPlus, Eye, MessageSquare, Clock, Database, Server, HardDrive } from 'lucide-vue-next'

// Icon mapping for dynamic component resolution
const iconMap = {
  Building,
  Home,
  Users,
  Activity,
  ShoppingCart,
  FileText,
  UserPlus,
  Eye,
  MessageSquare,
  Clock,
  Database,
  Server,
  HardDrive,
  TrendingUp
}

// Reactive data
const selectedPeriod = ref('30d')
const selectedChartPeriod = ref('6m')

// Chart periods
const chartPeriods = ref([
  { value: '1m', label: '1M' },
  { value: '3m', label: '3M' },
  { value: '6m', label: '6M' },
  { value: '1y', label: '1Y' }
])

// KPI Data
const kpiData = computed(() => [
  {
    id: 'engagement',
    label: 'User Engagement',
    value: '94.5%',
    change: 12.3,
    trend: 'up',
    icon: 'Users',
    iconClass: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white',
    category: 'engagement'
  },
  {
    id: 'performance',
    label: 'System Performance',
    value: '99.2%',
    change: 2.1,
    trend: 'up',
    icon: 'Activity',
    iconClass: 'bg-gradient-to-br from-green-500 to-green-600 text-white',
    category: 'performance'
  },
  {
    id: 'properties',
    label: 'Property Views',
    value: '12.5K',
    change: 18.7,
    trend: 'up',
    icon: 'Eye',
    iconClass: 'bg-gradient-to-br from-purple-500 to-purple-600 text-white',
    category: 'content'
  },
  {
    id: 'inquiries',
    label: 'Client Inquiries',
    value: '456',
    change: 8.4,
    trend: 'up',
    icon: 'MessageSquare',
    iconClass: 'bg-gradient-to-br from-gold-500 to-gold-600 text-white',
    category: 'business'
  },
  {
    id: 'response',
    label: 'Avg Response Time',
    value: '2.1h',
    change: -15.2,
    trend: 'up',
    icon: 'Clock',
    iconClass: 'bg-gradient-to-br from-teal-500 to-teal-600 text-white',
    category: 'efficiency'
  },
  {
    id: 'satisfaction',
    label: 'Client Satisfaction',
    value: '4.8/5',
    change: 5.7,
    trend: 'up',
    icon: 'TrendingUp',
    iconClass: 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white',
    category: 'quality'
  }
])

// Engagement Data
const engagementData = ref({
  dailyActiveUsers: '1,247',
  avgSessionDuration: '24m 32s',
  totalPageViews: '45.2K'
})

// Performance Metrics
const performanceMetrics = ref([
  {
    id: '1',
    name: 'Database',
    status: 'Operational',
    statusClass: 'status-healthy',
    responseTime: 45,
    uptime: 99.9
  },
  {
    id: '2',
    name: 'API Server',
    status: 'Operational',
    statusClass: 'status-healthy',
    responseTime: 120,
    uptime: 99.8
  },
  {
    id: '3',
    name: 'File Storage',
    status: 'Operational',
    statusClass: 'status-healthy',
    responseTime: 89,
    uptime: 99.7
  },
  {
    id: '4',
    name: 'Email Service',
    status: 'Degraded',
    statusClass: 'status-warning',
    responseTime: 250,
    uptime: 98.5
  }
])

// Geographic Data
const geographicData = ref([
  {
    id: '1',
    name: 'Côte d\'Ivoire',
    flag: '🇨🇮',
    projects: 5,
    properties: 78,
    percentage: 45
  },
  {
    id: '2',
    name: 'Ghana',
    flag: '🇬🇭',
    projects: 3,
    properties: 52,
    percentage: 30
  },
  {
    id: '3',
    name: 'Sénégal',
    flag: '🇸🇳',
    projects: 2,
    properties: 34,
    percentage: 25
  }
])

// Top Properties
const topProperties = ref([
  {
    id: '1',
    title: 'Appartement 3P - A101',
    location: 'Abidjan, Cocody',
    image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: 1250,
    inquiries: 45,
    score: 95
  },
  {
    id: '2',
    title: 'Villa Premium - V001',
    location: 'Accra, East Legon',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: 980,
    inquiries: 38,
    score: 92
  },
  {
    id: '3',
    title: 'Appartement 2P - B205',
    location: 'Dakar, Almadies',
    image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=100',
    views: 756,
    inquiries: 29,
    score: 88
  }
])

// Recent Activities
const recentActivities = ref([
  {
    id: '1',
    title: 'New user registration',
    description: 'Marie Kouassi joined as Commercial',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    icon: 'UserPlus',
    iconClass: 'bg-green-100 text-green-600'
  },
  {
    id: '2',
    title: 'Property inquiry received',
    description: 'Villa Premium V-003 - Client interest',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    icon: 'MessageSquare',
    iconClass: 'bg-blue-100 text-blue-600'
  },
  {
    id: '3',
    title: 'System backup completed',
    description: 'Daily backup process finished successfully',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    icon: 'Database',
    iconClass: 'bg-purple-100 text-purple-600'
  },
  {
    id: '4',
    title: 'Property status updated',
    description: 'Appartement A-205 marked as reserved',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    icon: 'Home',
    iconClass: 'bg-gold-100 text-gold-600'
  }
])

// User Metrics
const userMetrics = ref([
  {
    id: '1',
    label: 'Active Sessions',
    value: '247',
    change: 12.5,
    icon: 'Users',
    iconClass: 'bg-blue-100 text-blue-600',
    changeClass: 'text-green-600'
  },
  {
    id: '2',
    label: 'Property Searches',
    value: '1.2K',
    change: 8.3,
    icon: 'Eye',
    iconClass: 'bg-green-100 text-green-600',
    changeClass: 'text-green-600'
  },
  {
    id: '3',
    label: 'Client Interactions',
    value: '89',
    change: 15.7,
    icon: 'MessageSquare',
    iconClass: 'bg-purple-100 text-purple-600',
    changeClass: 'text-green-600'
  },
  {
    id: '4',
    label: 'Document Downloads',
    value: '156',
    change: -3.2,
    icon: 'FileText',
    iconClass: 'bg-gold-100 text-gold-600',
    changeClass: 'text-red-600'
  }
])

// Methods
const getPeriodLabel = () => {
  const labels = {
    '7d': 'last week',
    '30d': 'last month',
    '3m': 'last quarter',
    '1y': 'last year'
  }
  return labels[selectedPeriod.value] || 'previous period'
}

const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  
  if (hours < 1) return 'Less than an hour ago'
  if (hours === 1) return '1 hour ago'
  if (hours < 24) return `${hours} hours ago`
  
  const days = Math.floor(hours / 24)
  if (days === 1) return '1 day ago'
  return `${days} days ago`
}

const exportData = () => {
  console.log('Exporting analytics data...')
  // Implement data export functionality
}

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
  return iconMap[iconName] || Activity
}
</script>

<style scoped>
.luxury-statistics {
  @apply min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 p-6;
}

/* Header Section */
.stats-header {
  @apply bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 rounded-3xl p-8 mb-8 relative overflow-hidden;
}

.stats-header::before {
  content: '';
  @apply absolute inset-0 bg-gradient-to-r from-gold-500/10 to-transparent;
}

.header-content {
  @apply relative z-10 flex items-center justify-between;
}

.header-title {
  @apply text-4xl font-bold text-white mb-3 leading-tight;
}

.header-subtitle {
  @apply text-xl text-gray-300 leading-relaxed;
}

.header-actions {
  @apply flex items-center space-x-4;
}

.period-selector {
  @apply px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold-400;
}

.export-btn {
  @apply flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold rounded-xl hover:from-gold-600 hover:to-gold-700 transition-all duration-300 transform hover:scale-105;
}

/* KPI Section */
.kpi-section {
  @apply mb-8;
}

.kpi-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6;
}

.kpi-card {
  @apply bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1;
}

.kpi-header {
  @apply flex items-center justify-between mb-4;
}

.kpi-icon {
  @apply w-12 h-12 rounded-xl flex items-center justify-center;
}

.kpi-trend {
  @apply flex items-center space-x-1 text-sm font-semibold;
}

.trend-positive {
  @apply text-green-600;
}

.trend-negative {
  @apply text-red-600;
}

.trend-neutral {
  @apply text-gray-600;
}

.kpi-content {
  @apply mb-4;
}

.kpi-value {
  @apply text-2xl font-bold text-navy-900 mb-1;
}

.kpi-label {
  @apply text-sm text-gray-600 font-medium;
}

.kpi-footer {
  @apply text-xs text-gray-500;
}

/* Analytics Grid */
.analytics-grid {
  @apply grid grid-cols-1 lg:grid-cols-3 gap-8;
}

.chart-card {
  @apply bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg;
}

.chart-card.large {
  @apply lg:col-span-2;
}

.chart-header {
  @apply flex items-center justify-between mb-6;
}

.chart-title {
  @apply text-lg font-bold text-navy-900;
}

.chart-controls {
  @apply flex items-center space-x-2;
}

.chart-period-btn {
  @apply px-3 py-1 text-sm font-medium rounded-lg transition-all duration-200;
}

.chart-period-btn.active {
  @apply bg-blue-100 text-blue-700;
}

.chart-period-btn:not(.active) {
  @apply text-gray-600 hover:bg-gray-100;
}

.view-all-btn {
  @apply text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors;
}

.chart-container {
  @apply space-y-4;
}

/* Engagement Metrics */
.engagement-metrics {
  @apply space-y-4;
}

.engagement-item {
  @apply space-y-2;
}

.engagement-label {
  @apply text-sm font-medium text-gray-600;
}

.engagement-value {
  @apply text-lg font-bold text-navy-900;
}

.engagement-bar {
  @apply w-full bg-gray-200 rounded-full h-2;
}

.engagement-fill {
  @apply h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500;
}

/* Performance Grid */
.performance-grid {
  @apply space-y-4;
}

.performance-metric {
  @apply p-4 bg-white/50 rounded-xl border border-gray-200/50;
}

.metric-header {
  @apply flex items-center justify-between mb-3;
}

.metric-name {
  @apply font-medium text-navy-900;
}

.metric-status {
  @apply flex items-center space-x-1 text-sm;
}

.status-dot {
  @apply w-2 h-2 rounded-full;
}

.metric-status.status-healthy {
  @apply text-green-700;
}

.metric-status.status-healthy .status-dot {
  @apply bg-green-500;
}

.metric-status.status-warning {
  @apply text-yellow-700;
}

.metric-status.status-warning .status-dot {
  @apply bg-yellow-500;
}

.metric-details {
  @apply grid grid-cols-2 gap-2 text-sm;
}

.metric-stat {
  @apply flex flex-col;
}

.stat-label {
  @apply text-gray-500 text-xs;
}

.stat-value {
  @apply font-semibold text-navy-900;
}

/* Geographic Grid */
.geographic-grid {
  @apply space-y-4;
}

.country-metric {
  @apply space-y-3;
}

.country-header {
  @apply flex items-center justify-between;
}

.country-flag {
  @apply text-lg mr-2;
}

.country-name {
  @apply font-medium text-gray-700 flex-1;
}

.country-percentage {
  @apply text-sm font-bold text-navy-900;
}

.country-stats {
  @apply grid grid-cols-2 gap-2 text-xs;
}

.country-stat {
  @apply text-center;
}

.country-progress {
  @apply w-full bg-gray-200 rounded-full h-2;
}

.country-progress-fill {
  @apply h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500;
}

/* Properties List */
.properties-list {
  @apply space-y-4;
}

.property-metric {
  @apply flex items-center space-x-4 p-3 rounded-xl hover:bg-white/50 transition-all duration-200;
}

.property-image {
  @apply w-12 h-12 rounded-lg overflow-hidden flex-shrink-0;
}

.property-image img {
  @apply w-full h-full object-cover;
}

.property-info {
  @apply flex-1 min-w-0;
}

.property-title {
  @apply font-medium text-navy-900 truncate;
}

.property-location {
  @apply text-sm text-gray-600;
}

.property-stats {
  @apply flex items-center space-x-3 text-xs text-gray-500 mt-1;
}

.property-score {
  @apply flex-shrink-0;
}

.score-circle {
  @apply w-12 h-12 rounded-full flex items-center justify-center relative;
}

.score-inner {
  @apply text-sm font-bold text-navy-900 bg-white rounded-full w-8 h-8 flex items-center justify-center;
}

/* Activities Timeline */
.activities-timeline {
  @apply space-y-4;
}

.timeline-item {
  @apply flex items-start space-x-3;
}

.timeline-marker {
  @apply w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0;
}

.timeline-content {
  @apply flex-1 min-w-0;
}

.timeline-title {
  @apply font-medium text-navy-900 text-sm;
}

.timeline-description {
  @apply text-sm text-gray-600 mt-1;
}

.timeline-time {
  @apply text-xs text-gray-500 mt-2;
}

/* User Metrics */
.user-metrics {
  @apply space-y-4;
}

.user-metric {
  @apply flex items-center space-x-4 p-4 bg-white/50 rounded-xl;
}

.user-metric .metric-icon {
  @apply w-10 h-10 rounded-xl flex items-center justify-center;
}

.user-metric .metric-info {
  @apply flex-1;
}

.user-metric .metric-value {
  @apply text-lg font-bold text-navy-900;
}

.user-metric .metric-label {
  @apply text-sm text-gray-600;
}

.metric-change {
  @apply text-sm font-semibold;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .kpi-grid {
    @apply grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
  }
  
  .analytics-grid {
    @apply grid-cols-1;
  }
  
  .header-content {
    @apply flex-col space-y-6;
  }
}

@media (max-width: 768px) {
  .luxury-statistics {
    @apply p-4;
  }
  
  .kpi-grid {
    @apply grid-cols-1;
  }
  
  .header-actions {
    @apply flex-col space-y-3 space-x-0;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    @apply transition-none;
  }
}
</style>