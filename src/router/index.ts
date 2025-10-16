import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/access-code'
    },
    {
      path: '/access-code',
      name: 'AccessCode',
      component: () => import('@/views/auth/AccessCodeView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { requiresAccessCode: true, requiresGuest: true }
    },
    {
      path: '/briefing',
      name: 'Briefing',
      component: () => import('@/views/BriefingView.vue'),
      meta: { requiresAuth: true, layout: 'briefing' }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/admin/DashboardView.vue'),
      meta: { requiresAuth: true, layout: 'admin' }
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: () => import('@/views/admin/AdminDashboard.vue'),
      meta: { requiresAuth: true, layout: 'admin' }
    },
    {
      path: '/countries',
      name: 'Countries',
      component: () => import('@/views/admin/CountriesView.vue'),
      meta: { requiresAuth: true, layout: 'admin', permission: 'countries' }
    },
    {
      path: '/projects',
      name: 'Projects',
      component: () => import('@/views/admin/ProjectsView.vue'),
      meta: { requiresAuth: true, layout: 'admin' }
    },
    {
      path: '/residences',
      name: 'Residences',
      component: () => import('@/views/admin/ResidencesView.vue'),
      meta: { requiresAuth: true, layout: 'admin', permission: 'residences' }
    },
    {
      path: '/paliers',
      name: 'Paliers',
      component: () => import('@/views/admin/PaliersView.vue'),
      meta: { requiresAuth: true, layout: 'admin', permission: 'paliers' }
    },
    {
      path: '/properties',
      name: 'Properties',
      component: () => import('@/views/admin/PropertiesView.vue'),
      meta: { requiresAuth: true, layout: 'admin' }
    },
    {
      path: '/clients',
      name: 'Clients',
      component: () => import('@/views/admin/ClientsView.vue'),
      meta: { requiresAuth: true, layout: 'admin' }
    },
    {
      path: '/acquisitions',
      name: 'Acquisitions',
      component: () => import('@/views/admin/AcquisitionsView.vue'),
      meta: { requiresAuth: true, layout: 'admin', permission: 'acquisitions' }
    },
    {
      path: '/contracts',
      name: 'Contracts',
      component: () => import('@/views/admin/ContractsView.vue'),
      meta: { requiresAuth: true, layout: 'admin', permission: 'contracts' }
    },
    {
      path: '/statistics',
      name: 'Statistics',
      component: () => import('@/views/admin/StatisticsView.vue'),
      meta: { requiresAuth: true, layout: 'admin' }
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import('@/views/admin/UsersView.vue'),
      meta: { requiresAuth: true, layout: 'admin', permission: 'users' }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('@/views/admin/SettingsView.vue'),
      meta: { requiresAuth: true, layout: 'admin', permission: 'settings' }
    },
    {
      path: '/bilan-visuel',
      name: 'BilanVisuel',
      component: () => import('@/views/admin/BilanVisuelView.vue'),
      meta: { requiresAuth: true, layout: 'none', requiresAdminRole: true }
    },
    {
      path: '/etat-visuel',
      name: 'EtatVisuel',
      component: () => import('@/components/bilan/ResidenceList.vue'),
      meta: { requiresAuth: true, layout: 'none', requiresAdminRole: true }
    },
    {
      path: '/admin/summary',
      meta: { layout: 'admin' },
      children: [
        {
          path: '',
          name: 'Liste des residences',
          component: () => import('@/views/admin/ResidencesListView.vue'),
        },
        {
          path: ':id',
          name: 'Bilan visuel',
          component: () => import('@/views/admin/ResidenceDetailsView.vue'),
          props: true,
        },
      ],
    },

  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/access-code');
  } else if (to.meta.requiresAccessCode && !authStore.accessCodeValidated) {
    next('/access-code');
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/briefing');
  } else if (to.meta.requiresAdminRole) {
    const role = authStore.user?.role?.toLowerCase();
    if (role !== 'admin' && role !== 'superadmin') {
      next('/dashboard');
    } else {
      next();
    }
  } else if (to.meta.permission && !authStore.canAccess[to.meta.permission as keyof typeof authStore.canAccess]) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;