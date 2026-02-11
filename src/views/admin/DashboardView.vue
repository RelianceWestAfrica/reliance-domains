<template>
  <div class="dashboard-view">
    <div class="welcome-section">
      <div class="welcome-content">
        <div>
          <p class="welcome-date">Vendredi, 10 Octobre 2025</p>
          <h1 class="welcome-title">
            Heureux de vous revoir, <span class="text-primary-200">{{ authStore.user?.fullname }}</span> !
          </h1>
          <p class="welcome-subtitle">Dashboard Administrateur Reliance Domains</p>
        </div>
        <div class="welcome-icon">
          <Building2 class="w-11 h-11 text-gold-300" />
        </div>
      </div>
    </div>

    <div class="properties-stats-grid">
      <div class="property-stat-card stat-available">
        <div class="stat-card-icon">
          <CheckCircle class="w-7 h-7" />
        </div>
        <div class="stat-card-content">
          <div class="stat-card-label">Properties Available</div>
          <div class="stat-card-value">{{ propertyStats.available }}</div>
        </div>
      </div>

      <div class="property-stat-card stat-reserved">
        <div class="stat-card-icon">
          <Clock class="w-7 h-7" />
        </div>
        <div class="stat-card-content">
          <div class="stat-card-label">Properties Reserved</div>
          <div class="stat-card-value">{{ propertyStats.reserved }}</div>
        </div>
      </div>
    </div>

    <div class="properties-stats-grid">
      <div class="property-stat-card stat-sold">
        <div class="stat-card-icon">
          <ShoppingBag class="w-7 h-7" />
        </div>
        <div class="stat-card-content">
          <div class="stat-card-label">Properties Sold</div>
          <div class="stat-card-value">{{ propertyStats.sold }}</div>
        </div>
      </div>

      <div class="property-stat-card stat-discussion">
        <div class="stat-card-icon">
          <MessageCircle class="w-7 h-7" />
        </div>
        <div class="stat-card-content">
          <div class="stat-card-label">Properties in Discussion</div>
          <div class="stat-card-value">{{ propertyStats.discussion }}</div>
        </div>
      </div>
    </div>

    <!-- <div class="stats-grid">
      <div class="stat-card stat-blue">
        <div class="stat-icon">
          <Building class="w-6 h-6" />
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ dashboardStats.totalProjects }}</div>
          <div class="stat-label">Active Projects</div>
          <div class="stat-trend positive">+12% this month</div>
        </div>
      </div>

      <div class="stat-card stat-green">
        <div class="stat-icon">
          <Home class="w-6 h-6" />
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ dashboardStats.totalProperties }}</div>
          <div class="stat-label">Total Properties</div>
          <div class="stat-trend positive">{{ dashboardStats.availableProperties }} available</div>
        </div>
      </div>

      <div class="stat-card stat-purple">
        <div class="stat-icon">
          <Users class="w-6 h-6" />
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ dashboardStats.totalClients }}</div>
          <div class="stat-label">Active Clients</div>
          <div class="stat-trend positive">+8% this month</div>
        </div>
      </div>

      <div class="stat-card stat-yellow">
        <div class="stat-icon">
          <Activity class="w-6 h-6" />
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ dashboardStats.totalAcquisitions }}</div>
          <div class="stat-label">Acquisitions</div>
          <div class="stat-trend positive">+15% this month</div>
        </div>
      </div>
    </div> -->

<!--    <el-row :gutter="16">-->
<!--      <el-col :xs="24" :sm="12" :md="8" class="mb-4">-->
<!--        <div class="statistic-card">-->
<!--          <el-statistic :value="98500">-->
<!--            <template #title>-->
<!--              <div style="display: inline-flex; align-items: center">-->
<!--                Daily active users-->
<!--                <el-tooltip-->
<!--                  effect="dark"-->
<!--                  content="Number of users who logged into the product in one day"-->
<!--                  placement="top"-->
<!--                >-->
<!--                  <el-icon style="margin-left: 4px" :size="12">-->
<!--                    <Warning />-->
<!--                  </el-icon>-->
<!--                </el-tooltip>-->
<!--              </div>-->
<!--            </template>-->
<!--          </el-statistic>-->
<!--          <div class="statistic-footer">-->
<!--            <div class="footer-item">-->
<!--              <span>than yesterday</span>-->
<!--              <span class="green">-->
<!--                24%-->
<!--                <el-icon>-->
<!--                  <CaretTop />-->
<!--                </el-icon>-->
<!--              </span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-col>-->
<!--      <el-col :xs="24" :sm="12" :md="8" class="mb-4">-->
<!--        <div class="statistic-card">-->
<!--          <el-statistic :value="693700">-->
<!--            <template #title>-->
<!--              <div style="display: inline-flex; align-items: center">-->
<!--                Monthly Active Users-->
<!--                <el-tooltip-->
<!--                  effect="dark"-->
<!--                  content="Number of users who logged into the product in one month"-->
<!--                  placement="top"-->
<!--                >-->
<!--                  <el-icon style="margin-left: 4px" :size="12">-->
<!--                    <Warning />-->
<!--                  </el-icon>-->
<!--                </el-tooltip>-->
<!--              </div>-->
<!--            </template>-->
<!--          </el-statistic>-->
<!--          <div class="statistic-footer">-->
<!--            <div class="footer-item">-->
<!--              <span>month on month</span>-->
<!--              <span class="red">-->
<!--                12%-->
<!--                <el-icon>-->
<!--                  <CaretBottom />-->
<!--                </el-icon>-->
<!--              </span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-col>-->
<!--      <el-col :xs="24" :sm="12" :md="8" class="mb-4">-->
<!--        <div class="statistic-card">-->
<!--          <el-statistic :value="72000" title="New transactions today">-->
<!--            <template #title>-->
<!--              <div style="display: inline-flex; align-items: center">-->
<!--                New transactions today-->
<!--              </div>-->
<!--            </template>-->
<!--          </el-statistic>-->
<!--          <div class="statistic-footer">-->
<!--            <div class="footer-item">-->
<!--              <span>than yesterday</span>-->
<!--              <span class="green">-->
<!--                16%-->
<!--                <el-icon>-->
<!--                  <CaretTop />-->
<!--                </el-icon>-->
<!--              </span>-->
<!--            </div>-->
<!--            <div class="footer-item">-->
<!--              <el-icon :size="14">-->
<!--                <ArrowRight />-->
<!--              </el-icon>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-col>-->
<!--    </el-row>-->


    <!-- <div class="dashboard-grid">
      <div class="dashboard-card performance-card">
        <div class="card-header">
          <h3 class="card-title">System Performance</h3>
          <div class="status-badge operational">
            <span class="status-dot"></span>
            All Systems Operational
          </div>
        </div>
        <div class="performance-list">
          <div class="performance-item">
            <div class="performance-label">Database Response</div>
            <div class="performance-bar">
              <div class="performance-fill" style="width: 95%"></div>
            </div>
          </div>
          <div class="performance-item">
            <div class="performance-label">API Uptime</div>
            <div class="performance-bar">
              <div class="performance-fill" style="width: 99.9%"></div>
            </div>
          </div>
          <div class="performance-item">
            <div class="performance-label">Storage Usage</div>
            <div class="performance-bar">
              <div class="performance-fill secondary" style="width: 24%"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="dashboard-card activities-card">
        <div class="card-header">
          <h3 class="card-title">Recent Activities</h3>
          <button class="view-all-link">View All</button>
        </div>
        <div class="activities-list">
          <div
            v-for="activity in dashboardStats.recentActivities"
            :key="activity.id"
            class="activity-item"
          >
            <div class="activity-icon" :class="getActivityClass(activity.type)">
              <component :is="getActivityIcon(activity.type)" class="w-4 h-4" />
            </div>
            <div class="activity-details">
              <p class="activity-title">{{ activity.action }}</p>
              <p class="activity-desc">{{ activity.description }}</p>
              <p class="activity-time">{{ formatDate(activity.createdAt) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="dashboard-card status-card">
        <div class="card-header">
          <h3 class="card-title">Property Status Overview</h3>
        </div>
        <div class="status-list">
          <div class="status-row available">
            <div class="status-info">
              <CheckCircle class="w-5 h-5" />
              <span class="status-name">Available</span>
            </div>
            <span class="status-count">{{ propertyStats.available }}</span>
          </div>
          <div class="status-row reserved">
            <div class="status-info">
              <Clock class="w-5 h-5" />
              <span class="status-name">Reserved</span>
            </div>
            <span class="status-count">{{ propertyStats.reserved }}</span>
          </div>
          <div class="status-row sold">
            <div class="status-info">
              <ShoppingBag class="w-5 h-5" />
              <span class="status-name">Sold</span>
            </div>
            <span class="status-count">{{ propertyStats.sold }}</span>
          </div>
          <div class="status-row discussion">
            <div class="status-info">
              <MessageCircle class="w-5 h-5" />
              <span class="status-name">Discussion</span>
            </div>
            <span class="status-count">{{ propertyStats.discussion }}</span>
          </div>
        </div>
      </div>
    </div> -->

    <div class="charts-section">
      <MonthlyAcquisitionsChart
        :data="monthlyAcquisitionsData"
        title="Acquisitions par mois"
        subtitle="Aperçu des acquisitions des 03 derniers mois"
      />
    </div>

    <div class="recent-section">
      <RecentAcquisitions
        :acquisitions="recentAcquisitions"
        @view-details="viewAcquisitionDetails"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Building2, Building, Hop as Home, Users, Activity, CircleCheck as CheckCircle, Clock, ShoppingBag, MessageCircle, ShoppingCart, FileText, UserPlus } from 'lucide-vue-next'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import MonthlyAcquisitionsChart from '@/components/charts/MonthlyAcquisitionsChart.vue'
import RecentAcquisitions from '@/components/dashboard/RecentAcquisitions.vue'

const router = useRouter()
const appStore = useAppStore()
const authStore = useAuthStore()

const dashboardStats = computed(() => appStore.dashboardStats)

const propertyStats = computed(() => {
  const properties = appStore.properties
  return {
    available: properties.filter(p => p.status === 'Disponible').length,
    reserved: properties.filter(p => p.status === 'Réservé(e)').length,
    sold: properties.filter(p => p.status === 'Soldé(e)').length,
    discussion: properties.filter(p => p.status === 'Sous discussion cliente').length
  }
})

const monthlyAcquisitionsData = computed(() => {
  const now = new Date()
  const months = []

  for (let i = 2; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthName = date.toLocaleDateString('en-US', { month: 'short' })
    const year = date.getFullYear()

    const acquisitionsInMonth = appStore.acquisitions.filter(acq => {
      const acqDate = new Date(acq.dateAcquisition)
      return acqDate.getMonth() === date.getMonth() && acqDate.getFullYear() === date.getFullYear()
    })

    const appartements = acquisitionsInMonth.filter(acq => {
      const property = appStore.properties.find(p => p.id === acq.propertyId)
      return property?.propertyType === 'appartement'
    }).length

    const villas = acquisitionsInMonth.filter(acq => {
      const property = appStore.properties.find(p => p.id === acq.propertyId)
      return property?.propertyType === 'villa'
    }).length

    const magasins = acquisitionsInMonth.filter(acq => {
      const property = appStore.properties.find(p => p.id === acq.propertyId)
      return property?.propertyType === 'magasin'
    }).length

    months.push({
      month: monthName,
      year: year,
      appartements,
      villas,
      magasins
    })
  }

  return months
})

const recentAcquisitions = computed(() => {
  return appStore.acquisitions
    .slice()
    .sort((a, b) => new Date(b.dateAcquisition).getTime() - new Date(a.dateAcquisition).getTime())
    .slice(0, 3)
    .map(acq => {
      const property = appStore.properties.find(p => p.id === acq.propertyId)
      const client = appStore.clients.find(c => c.id === acq.clientId)

      return {
        ...acq,
        propertyTitle: property?.title || 'Unknown Property',
        propertyType: property?.propertyType || 'appartement',
        propertyImage: property?.photos?.[0]?.photoUrl || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400',
        clientName: client ? `${client.firstName} ${client.lastName}` : 'Unknown Client',
        commercialName: 'Commercial User'
      }
    })
})

function getActivityIcon(type: string) {
  const icons: Record<string, any> = {
    project: Building,
    property: Home,
    client: Users,
    acquisition: ShoppingCart,
    contract: FileText,
    user: UserPlus
  }
  return icons[type] || Activity
}

function getActivityClass(type: string) {
  const classes: Record<string, string> = {
    project: 'activity-blue',
    property: 'activity-green',
    client: 'activity-purple',
    acquisition: 'activity-yellow',
    contract: 'activity-indigo',
    user: 'activity-pink'
  }
  return classes[type] || 'activity-gray'
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

function viewAcquisitionDetails(acquisition: any) {
  router.push(`/acquisitions?id=${acquisition.id}`)
}
</script>

<style scoped>
.dashboard-view {
  @apply space-y-6;
}

.welcome-section {
  @apply bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl p-8;
}

.welcome-content {
  @apply flex items-center justify-between;
}

.welcome-date {
  @apply text-gray-300 text-sm mb-2;
}

.welcome-title {
  @apply text-2xl font-bold text-white mb-2;
}

.welcome-subtitle {
  @apply text-navy-200 text-base;
}

.welcome-icon {
  @apply hidden md:block;
}

.properties-stats-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5;
}

.property-stat-card {
  @apply bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300;
  @apply flex items-center gap-4;
}

.stat-card-icon {
  @apply w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0;
}

.property-stat-card.stat-available {
  @apply border-gray-100;
}

.property-stat-card.stat-available .stat-card-icon {
  @apply bg-gradient-to-br from-green-50 to-green-100 text-green-600;
}

.property-stat-card.stat-reserved {
  @apply border-gray-100;
}

.property-stat-card.stat-reserved .stat-card-icon {
  @apply bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600;
}

.property-stat-card.stat-sold {
  @apply border-gray-100;
}

.property-stat-card.stat-sold .stat-card-icon {
  @apply bg-gradient-to-br from-red-50 to-red-100 text-red-600;
}

.property-stat-card.stat-discussion {
  @apply border-gray-100;
}

.property-stat-card.stat-discussion .stat-card-icon {
  @apply bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600;
}

.stat-card-content {
  @apply flex-1;
}

.stat-card-label {
  @apply text-sm font-medium text-gray-600 mb-1;
}

.stat-card-value {
  @apply text-3xl font-bold text-gray-900;
}

.property-stat-card.stat-available:hover {
  @apply border-green-200;
}

.property-stat-card.stat-reserved:hover {
  @apply border-blue-200;
}

.property-stat-card.stat-sold:hover {
  @apply border-red-200;
}

.property-stat-card.stat-discussion:hover {
  @apply border-amber-200;
}

.stats-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6;
}

.stat-card {
  @apply bg-white rounded-2xl p-6 flex items-start gap-4 shadow-sm border;
}

.stat-card.stat-blue {
  @apply bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200;
}

.stat-card.stat-green {
  @apply bg-gradient-to-br from-green-50 to-green-100/50 border-green-200;
}

.stat-card.stat-purple {
  @apply bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200;
}

.stat-card.stat-yellow {
  @apply bg-gradient-to-br from-yellow-50 to-yellow-100/50 border-yellow-200;
}

.stat-icon {
  @apply w-12 h-12 rounded-xl flex items-center justify-center bg-white/50;
}

.stat-blue .stat-icon {
  @apply text-blue-600;
}

.stat-green .stat-icon {
  @apply text-green-600;
}

.stat-purple .stat-icon {
  @apply text-purple-600;
}

.stat-yellow .stat-icon {
  @apply text-yellow-600;
}

.stat-content {
  @apply flex-1;
}

.stat-value {
  @apply text-3xl font-bold text-gray-900 mb-1;
}

.stat-label {
  @apply text-sm text-gray-600 font-medium mb-2;
}

.stat-trend {
  @apply text-xs font-semibold;
}

.stat-trend.positive {
  @apply text-green-600;
}

.dashboard-grid {
  @apply grid grid-cols-1 lg:grid-cols-3 gap-6;
}

.dashboard-card {
  @apply bg-white rounded-2xl p-6 shadow-sm border border-gray-200;
}

.card-header {
  @apply flex items-center justify-between mb-6;
}

.card-title {
  @apply text-lg font-bold text-gray-900;
}

.status-badge {
  @apply flex items-center gap-2 text-xs font-semibold;
}

.status-badge.operational {
  @apply text-green-600;
}

.status-dot {
  @apply w-2 h-2 bg-green-500 rounded-full animate-pulse;
}

.view-all-link {
  @apply text-sm text-blue-600 hover:text-blue-700 font-medium;
}

.performance-list {
  @apply space-y-4;
}

.performance-item {
  @apply space-y-2;
}

.performance-label {
  @apply text-sm font-medium text-gray-700;
}

.performance-bar {
  @apply w-full h-2 bg-gray-100 rounded-full overflow-hidden;
}

.performance-fill {
  @apply h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all;
}

.performance-fill.secondary {
  @apply bg-gradient-to-r from-blue-500 to-blue-400;
}

.activities-list {
  @apply space-y-4;
}

.activity-item {
  @apply flex items-start gap-3;
}

.activity-icon {
  @apply w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0;
}

.activity-icon.activity-blue {
  @apply bg-blue-100 text-blue-600;
}

.activity-icon.activity-green {
  @apply bg-green-100 text-green-600;
}

.activity-icon.activity-purple {
  @apply bg-purple-100 text-purple-600;
}

.activity-icon.activity-yellow {
  @apply bg-yellow-100 text-yellow-600;
}

.activity-icon.activity-indigo {
  @apply bg-indigo-100 text-indigo-600;
}

.activity-icon.activity-pink {
  @apply bg-pink-100 text-pink-600;
}

.activity-icon.activity-gray {
  @apply bg-gray-100 text-gray-600;
}

.activity-details {
  @apply flex-1 min-w-0;
}

.activity-title {
  @apply text-sm font-semibold text-gray-900;
}

.activity-desc {
  @apply text-xs text-gray-600 mt-1;
}

.activity-time {
  @apply text-xs text-gray-400 mt-1;
}

.status-list {
  @apply space-y-3;
}

.status-row {
  @apply flex items-center justify-between p-3 rounded-lg;
}

.status-row.available {
  @apply bg-green-50;
}

.status-row.reserved {
  @apply bg-blue-50;
}

.status-row.sold {
  @apply bg-red-50;
}

.status-row.discussion {
  @apply bg-yellow-50;
}

.status-info {
  @apply flex items-center gap-2;
}

.status-row.available .status-info {
  @apply text-green-700;
}

.status-row.reserved .status-info {
  @apply text-blue-700;
}

.status-row.sold .status-info {
  @apply text-red-700;
}

.status-row.discussion .status-info {
  @apply text-yellow-700;
}

.status-name {
  @apply text-sm font-medium;
}

.status-count {
  @apply text-lg font-bold;
}

.status-row.available .status-count {
  @apply text-green-700;
}

.status-row.reserved .status-count {
  @apply text-blue-700;
}

.status-row.sold .status-count {
  @apply text-red-700;
}

.status-row.discussion .status-count {
  @apply text-yellow-700;
}

.charts-section {
  @apply mt-6;
}

.recent-section {
  @apply mt-6;
}
</style>
