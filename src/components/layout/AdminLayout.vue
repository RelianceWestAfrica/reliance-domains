<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <Transition name="sidebar">
      <aside
        v-if="sidebarOpen"
        class="admin-sidebar"
      >
        <!-- Logo -->
        <div class="sidebar-header">
          <div class="flex items-center">
            <div class="logo-icon">
              <Building2 class="w-5 h-5 text-white" />
            </div>
            <div class="ml-3">
              <h1 class="text-lg font-bold text-gray-900" style="font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">DOMAINS</h1>
              <p class="text-xs text-gray-600">Reliance West Africa</p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="sidebar-nav">
          <div class="space-y-1">
            <router-link
              v-for="item in navigationItems"
              :key="item.name"
              :to="item.to"
              class="nav-item"
              :class="[
                $route.name === item.name ? 'nav-item-active' : 'nav-item-inactive'
              ]"
            >
              <component
                :is="item.icon"
                class="nav-icon"
                :class="[
                  $route.name === item.name ? 'text-primary-600' : 'text-gray-400'
                ]"
              />
              {{ $t(item.label) }}
            </router-link>
          </div>
        </nav>

        <!-- User Info -->
        <div class="sidebar-footer">
          <div class="flex items-center">
            <div class="user-avatar">
              <User class="w-4 h-4 text-primary-600" />
            </div>
            <div class="ml-3 flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {{ authStore.user?.fullname }}
              </p>
              <p class="text-xs text-gray-500 truncate uppercase">
                {{ authStore.user?.role }}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </Transition>

    <!-- Sidebar Overlay (Mobile) -->
    <div
      v-if="sidebarOpen"
      class="sidebar-overlay lg:hidden"
      @click="appStore.toggleSidebar()"
    ></div>

    <!-- Main Content Area -->
    <div class="main-wrapper">
      <!-- Header -->
      <header class="main-header">
        <div class="header-content">
          <!-- Left Side -->
          <div class="flex items-center">
            <button
              @click="appStore.toggleSidebar()"
              class="menu-toggle lg:hidden"
            >
              <Menu class="w-5 h-5" />
            </button>

            <div class="hidden lg:block">
              <h1 class="text-xl font-semibold text-gray-900">
                {{ currentPageTitle }}
              </h1>
            </div>
          </div>

          <!-- Right Side -->
          <div class="flex items-center space-x-1">
            <LanguageSwitcher />

            <!-- <button class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
              <Bell class="w-5 h-5" />
              <span class="notification-dot"></span>
            </button> -->

            <UserDropdown />
          </div>
        </div>
      </header>

      <!-- Scrollable Content -->
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Building2, Menu, Bell, User, LayoutDashboard, Globe, Building, Hop as Home, Users, ShoppingCart, Contact as FileContract, ChartBar as BarChart3, Settings, UserCog, Layers, Files, LampFloor, Grid, Grid2X2, Grid2X2Check, SquareDashed } from 'lucide-vue-next'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'

import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
import UserDropdown from '@/components/common/UserDropdown.vue'

const route = useRoute()
const appStore = useAppStore()
const authStore = useAuthStore()
const { t } = useI18n()

const sidebarOpen = computed(() => appStore.sidebarOpen)

const currentPageTitle = computed(() => {
  const routeName = route.name as string
  const titleMap: Record<string, string> = {
    'Dashboard': t('navigation.dashboard'),
    'Countries': t('navigation.countries'),
    'Projects': t('navigation.projects'),
    'Residences': t('navigation.residences'),
    'Summary': t('navigation.summary'),
    'Paliers': t('navigation.paliers'),
    'Properties': t('navigation.properties'),
    'Clients': t('navigation.clients'),
    'Acquisitions': t('navigation.acquisitions'),
    'Contracts': t('navigation.contracts'),
    'Statistics': t('navigation.statistics'),
    'Users': t('navigation.users'),
    'Settings': t('navigation.settings')
  }
  return titleMap[routeName] || routeName
})

const navigationItems = computed(() => {
  const baseItems = [
    {
      name: 'Dashboard',
      to: '/dashboard',
      icon: LayoutDashboard,
      label: 'navigation.dashboard'
    }
  ]

  if (authStore.canAccess.countries) {
    baseItems.push({
      name: 'Countries',
      to: '/countries',
      icon: Globe,
      label: 'navigation.countries'
    })
  }

  baseItems.push({
    name: 'Projects',
    to: '/projects',
    icon: SquareDashed,
    label: 'navigation.projects'
  })

  if (authStore.canAccess.residences) {
    baseItems.push({
      name: 'Residences',
      to: '/residences',
      icon: Building2,
      label: 'navigation.residences'
    })
  }

  if (authStore.canAccess.summary) {
    baseItems.push({
      name: 'Bilan Visuel',
      to: '/admin/summary',
      icon: Grid2X2Check,
      label: 'navigation.summary'
    })
  }

  if (authStore.canAccess.paliers) {
    baseItems.push({
      name: 'Paliers',
      to: '/paliers',
      icon: Layers,
      label: 'navigation.paliers'
    })
  }

  baseItems.push({
    name: 'Properties',
    to: '/properties',
    icon: Grid,
    label: 'navigation.properties'
  })

  baseItems.push({
    name: 'Clients',
    to: '/clients',
    icon: Users,
    label: 'navigation.clients'
  })

  if (authStore.canAccess.acquisitions) {
    baseItems.push({
      name: 'Acquisitions',
      to: '/acquisitions',
      icon: ShoppingCart,
      label: 'navigation.acquisitions'
    })
  }

  if (authStore.canAccess.contracts) {
    baseItems.push({
      name: 'Contracts',
      to: '/contracts',
      icon: FileContract,
      label: 'navigation.contracts'
    })
  }

  baseItems.push({
    name: 'Statistics',
    to: '/statistics',
    icon: BarChart3,
    label: 'navigation.statistics'
  })

  if (authStore.canAccess.users) {
    baseItems.push({
      name: 'Users',
      to: '/users',
      icon: UserCog,
      label: 'navigation.users'
    })
  }

  if (authStore.canAccess.settings) {
    baseItems.push({
      name: 'Settings',
      to: '/settings',
      icon: Settings,
      label: 'navigation.settings'
    })
  }

  return baseItems
})
</script>

<style scoped>
.admin-layout {
  @apply h-screen flex bg-gray-50 overflow-hidden;
}

.admin-sidebar {
  @apply fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col;
  @apply lg:static lg:inset-0;
}

.sidebar-header {
  @apply flex items-center h-16 px-6 border-b border-gray-200 flex-shrink-0;
}

.logo-icon {
  @apply w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center;
}

.sidebar-nav {
  @apply flex-1 overflow-y-auto py-6 px-3;
}

.sidebar-nav::-webkit-scrollbar {
  @apply w-1;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-full;
}

.nav-item {
  @apply flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors;
}

.nav-item-active {
  @apply bg-primary-50 text-primary-700;
}

.nav-item-inactive {
  @apply text-gray-700 hover:bg-gray-100 hover:text-gray-900;
}

.nav-icon {
  @apply mr-3 h-5 w-5 flex-shrink-0;
}

.nav-item-inactive:hover .nav-icon {
  @apply text-gray-600;
}

.nav-item-inactive .nav-icon {
  @apply text-gray-400;
}

.sidebar-footer {
  @apply flex-shrink-0 p-4 border-t border-gray-200 bg-white;
}

.user-avatar {
  @apply w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center;
}

.sidebar-overlay {
  @apply fixed inset-0 z-40 bg-black/50;
}

.main-wrapper {
  @apply flex-1 flex flex-col min-w-0 h-screen overflow-hidden;
}

.main-header {
  @apply bg-white shadow-sm border-b border-gray-200 flex-shrink-0;
}

.header-content {
  @apply flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8;
}

.menu-toggle {
  @apply p-2 rounded-lg text-gray-600 hover:bg-gray-100;
}

.notification-dot {
  @apply absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full;
}

.main-content {
  @apply flex-1 overflow-y-auto;
  @apply p-6;
}

.main-content::-webkit-scrollbar {
  @apply w-2;
}

.main-content::-webkit-scrollbar-track {
  @apply bg-gray-100;
}

.main-content::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-full hover:bg-gray-400;
}

.sidebar-enter-active,
.sidebar-leave-active {
  @apply transition-transform duration-300 ease-in-out;
}

.sidebar-enter-from,
.sidebar-leave-to {
  @apply -translate-x-full;
}
</style>
