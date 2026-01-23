<template>
  <div class="relative">
    <button
      @click="openDropdown()"
      class="user-dropdown-trigger group"
    >
      <div class="user-avatar">
        <img
          :src="userAvatar"
          :alt="userName"
          class="avatar-image"
        />
        <div class="status-indicator"></div>
      </div>
      <div class="user-info">
        <div class="font-semibold text-navy-900 text-sm">{{ userName }}</div>
        <div class="font-normal text-gray-400 text-xs">{{ roleDisplay }}</div>
      </div>
      <div class="dropdown-arrow" :class="{ 'rotate-180': isOpen }">
        <ChevronDown class="w-4 h-4" />
      </div>
    </button>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0 translate-y-2"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 translate-y-2"
    >
      <div v-if="isOpen" class="dropdown-menu1" style="z-index: 1 !important;">
        <!-- User Profile Section -->
        <div class="profile-section">
          <div class="profile-header">
            <img :src="userAvatar" :alt="userName" class="profile-avatar" />
            <div class="profile-info">
              <div class="profile-name">{{ userName }}</div>
              <div class="profile-email">{{ userEmail }}</div>
              <div class="profile-role">{{ roleDisplay }}</div>
            </div>
          </div>
        </div>

        <!-- Navigation Menu -->
        <div class="menu-section">
          <router-link
            to="/dashboard"
            @click="closeDropdown"
            class="menu-item"
          >
            <div class="menu-icon dashboard">
              <LayoutDashboard class="w-5 h-5" />
            </div>
            <div class="menu-content">
              <div class="menu-title">Dashboard</div>
              <div class="menu-description">Etats globqux & statistiques</div>
            </div>
            <ArrowRight class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </router-link>

          <router-link
            to="/briefing"
            @click="closeDropdown"
            class="menu-item"
          >
            <div class="menu-icon briefing">
              <Presentation class="w-5 h-5" />
            </div>
            <div class="menu-content">
              <div class="menu-title">Briefing</div>
              <div class="menu-description">Aperçu des projets & propriétés</div>
            </div>
            <ArrowRight class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </router-link>

          <!-- <button class="menu-item" @click="handleProfileClick">
            <div class="menu-icon profile">
              <User class="w-5 h-5" />
            </div>
            <div class="menu-content">
              <div class="menu-title">My Profile</div>
              <div class="menu-description">Account settings</div>
            </div>
            <ArrowRight class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </button>

          <button class="menu-item" @click="handlePreferencesClick">
            <div class="menu-icon preferences">
              <Settings class="w-5 h-5" />
            </div>
            <div class="menu-content">
              <div class="menu-title">Preferences</div>
              <div class="menu-description">Customize experience</div>
            </div>
            <ArrowRight class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </button> -->
        </div>

        <!-- Logout Section -->
        <div class="logout-section">
          <button @click="handleLogout" class="logout-btn">
            <div class="logout-icon">
              <LogOut class="w-5 h-5" />
            </div>
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { 
  ChevronDown, 
  LayoutDashboard, 
  Presentation, 
  User, 
  Settings, 
  LogOut, 
  ArrowRight 
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const isOpen = ref(false)

const userName = computed(() => authStore.user?.fullname || 'User')
const userEmail = computed(() => authStore.user?.email || 'user@example.com')

const roleDisplay = computed(() => {
  const roles = {
    'COMMERCIAL': 'Commercial',
    'ADMIN': 'Administrator',
    'SUPERADMIN': 'Super Administrator'
  }
  return roles[authStore.userRole || 'COMMERCIAL']
})

const userAvatar = computed(() => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName.value)}&background=3b82f6&color=fff&size=128`
})

const openDropdown = () => {
  console.log(isOpen.value)
  isOpen.value = !isOpen.value
}

const handleProfileClick = () => {
  closeDropdown()
  console.log('Navigate to profile')
}

const handlePreferencesClick = () => {
  closeDropdown()
  console.log('Navigate to preferences')
}

const handleLogout = () => {
  authStore.logout()
  router.push('/access-code')
}

const closeDropdown = () => {
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Element
  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.user-dropdown-trigger {
  @apply flex items-center space-x-3 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300;
}

.user-avatar {
  @apply relative;
}

.avatar-image {
  @apply w-10 h-10 rounded-full object-cover border-2 border-gold-400/50;
}

.status-indicator {
  @apply absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full;
}

.user-info {
  @apply text-left hidden md:block;
}

.user-name {
  @apply font-semibold text-white text-sm;
}

.user-role {
  @apply text-xs text-gray-300 flex items-center space-x-1;
}

.dropdown-arrow {
  @apply text-white/70 transition-transform duration-300;
}

.dropdown-menu {
  @apply absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-3 z-50 overflow-hidden;
}

.dropdown-menu1 {
  @apply absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-3 overflow-hidden;
}

/* Profile Section */
.profile-section {
  @apply px-4 py-4 border-b border-gray-200/50;
}

.profile-header {
  @apply flex items-center space-x-4;
}

.profile-avatar {
  @apply w-16 h-16 rounded-full object-cover border-2 border-blue-200;
}

.profile-info {
  @apply flex-1;
}

.profile-name {
  @apply font-bold text-navy-900 text-lg;
}

.profile-email {
  @apply text-sm text-gray-600;
}

.profile-role {
  @apply text-xs text-gold-600 font-medium bg-gold-100 px-2 py-1 rounded-full inline-block mt-1;
}

/* Menu Section */
.menu-section {
  @apply py-2;
}

.menu-item {
  @apply w-full flex items-center space-x-4 px-4 py-3 text-left hover:bg-blue-50 transition-all duration-200;
}

.menu-icon {
  @apply w-10 h-10 rounded-xl flex items-center justify-center;
}

.menu-icon.dashboard {
  @apply bg-blue-100 text-blue-600;
}

.menu-icon.briefing {
  @apply bg-green-100 text-green-600;
}

.menu-icon.profile {
  @apply bg-purple-100 text-purple-600;
}

.menu-icon.preferences {
  @apply bg-gold-100 text-gold-600;
}

.menu-content {
  @apply flex-1;
}

.menu-title {
  @apply font-semibold text-navy-900 text-sm;
}

.menu-description {
  @apply text-xs text-gray-500;
}

/* Logout Section */
.logout-section {
  @apply px-4 py-3 border-t border-gray-200/50;
}

.logout-btn {
  @apply w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200;
}

.logout-icon {
  @apply w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600;
}

/* Responsive Design */
@media (max-width: 768px) {
  .dropdown-menu {
    @apply w-72;
  }
  
  .user-info {
    @apply block;
  }
}
</style>