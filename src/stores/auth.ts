import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'
import { AuthService } from '@/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(JSON.parse(localStorage.getItem('domains_token')))

  const loading = ref(false)
  const error = ref<string | null>(null)
  const accessCodeValidated = ref(false)

  const tokenValue = computed(() => token.value || '')
  const isAuthenticated = computed(() => !!token.value)

  /* =======================
   ROLES & PERMISSIONS
  ======================= */
  const userRole = computed(() => user.value?.role)

  const isCommercial = computed(() => userRole.value === 'COMMERCIAL')
  const isAdmin = computed(() => userRole.value === 'ADMIN')
  const isSuperAdmin = computed(() => userRole.value === 'SUPERADMIN')

  const canAccess = computed(() => ({
    dashboard: true,
    countries: isAdmin.value || isSuperAdmin.value,
    projects: true,
    residences: isAdmin.value || isSuperAdmin.value,
    summary: isAdmin.value || isSuperAdmin.value,
    paliers: isAdmin.value || isSuperAdmin.value,
    properties: true,
    clients: true,
    acquisitions: isAdmin.value || isSuperAdmin.value,
    contracts: isAdmin.value || isSuperAdmin.value,
    statistics: true,
    users: isSuperAdmin.value,
    autorisations: isSuperAdmin.value,
    settings: isSuperAdmin.value,
    publish: isSuperAdmin.value,
    finalSaleContract: isSuperAdmin.value
  }))

  /* =======================
   ACTIONS
  ======================= */

  async function login(email: string, password: string): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      const { data } = await AuthService.login({ email, password })

      token.value = data.token
      user.value = data.user

      localStorage.setItem('domains_token', JSON.stringify(data.token))
      localStorage.setItem('domains_user', JSON.stringify(data.user))

      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Identifiants invalides'
      return false
    } finally {
      loading.value = false
    }
  }

  async function validateAccessCode(code: string): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      await AuthService.loginWithAccessCode(code)
      accessCodeValidated.value = true
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Code invalide'
      return false
    } finally {
      loading.value = false
    }
  }

  async function fetchUser() {
    try {
      const { data } = await AuthService.me()
      user.value = data
    } catch {
      logout()
    }
  }

  function logout() {
    token.value = null
    user.value = null
    accessCodeValidated.value = false

    localStorage.removeItem('domains_token')
    localStorage.removeItem('domains_user')
  }

  function initializeAuth() {
    const savedUser = localStorage.getItem('domains_user')

    if (token.value && savedUser) {
      user.value = JSON.parse(savedUser)
    }
  }

  return {
    user,
    token,
    tokenValue,
    isAuthenticated,
    accessCodeValidated,
    loading,
    error,

    userRole,
    isCommercial,
    isAdmin,
    isSuperAdmin,
    canAccess,

    login,
    validateAccessCode,
    fetchUser,
    logout,
    initializeAuth
  }
})
