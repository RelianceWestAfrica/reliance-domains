import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@/types';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);
  const accessCodeValidated = ref(false);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Mock access codes
  const validAccessCodes = {
    'COMMERCIAL2024': 'COMMERCIAL',
    'ADMIN2024': 'ADMIN',
    'SUPER2024': 'SUPERADMIN'
  } as const;

  // Mock users
  const mockUsers = [
    {
      id: '1',
      fullname: 'Jean Dupont',
      email: 'commercial@domains.com',
      role: 'COMMERCIAL' as const,
      createdAt: new Date()
    },
    {
      id: '2',
      fullname: 'Marie Martin',
      email: 'admin@domains.com',
      role: 'ADMIN' as const,
      createdAt: new Date()
    },
    {
      id: '3',
      fullname: 'Ephrem KODAH',
      email: 'superadmin@domains.com',
      role: 'SUPERADMIN' as const,
      createdAt: new Date()
    }
  ];

  const userRole = computed(() => user.value?.role);
  const isCommercial = computed(() => userRole.value === 'COMMERCIAL');
  const isAdmin = computed(() => userRole.value === 'ADMIN');
  const isSuperAdmin = computed(() => userRole.value === 'SUPERADMIN');

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
    settings: isSuperAdmin.value,
    publish: isSuperAdmin.value,
    finalSaleContract: isSuperAdmin.value
  }));

  async function validateAccessCode(code: string): Promise<boolean> {
    loading.value = true;
    error.value = null;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (validAccessCodes[code as keyof typeof validAccessCodes]) {
        accessCodeValidated.value = true;
        return true;
      } else {
        error.value = 'Code d\'accès invalide';
        return false;
      }
    } catch (err) {
      error.value = 'Erreur lors de la validation du code';
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function login(email: string, password: string): Promise<boolean> {
    loading.value = true;
    error.value = null;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication
      const mockUser = mockUsers.find(u => u.email === email);
      if (mockUser && password === 'password123') {
        user.value = mockUser;
        isAuthenticated.value = true;
        localStorage.setItem('domains_user', JSON.stringify(mockUser));
        return true;
      } else {
        error.value = 'Identifiants invalides';
        return false;
      }
    } catch (err) {
      error.value = 'Erreur lors de la connexion';
      return false;
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    user.value = null;
    isAuthenticated.value = false;
    accessCodeValidated.value = false;
    localStorage.removeItem('domains_user');
  }

  function initializeAuth() {
    const savedUser = localStorage.getItem('domains_user');
    if (savedUser) {
      try {
        user.value = JSON.parse(savedUser);
        isAuthenticated.value = true;
        accessCodeValidated.value = true;
      } catch (err) {
        localStorage.removeItem('domains_user');
      }
    }
  }

  return {
    user,
    isAuthenticated,
    accessCodeValidated,
    loading,
    error,
    userRole,
    isCommercial,
    isAdmin,
    isSuperAdmin,
    canAccess,
    validateAccessCode,
    login,
    logout,
    initializeAuth
  };
});