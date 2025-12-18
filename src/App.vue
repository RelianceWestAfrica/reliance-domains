<template>
  <div id="app">
    <!-- Briefing Layout -->
    <template v-if="$route.meta.layout === 'briefing'">
      <router-view />
    </template>

    <!-- Admin Layout -->
    <template v-else-if="$route.meta.layout === 'admin'">
      <AdminLayout>
        <router-view />
        <Notivue />
      </AdminLayout>
    </template>

    <!-- Default Layout (Auth pages) -->
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<style>
  
</style>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useAppStore } from '@/stores/app';
import AdminLayout from '@/components/layout/AdminLayout.vue';
import { Notivue } from 'notivue'

const authStore = useAuthStore();
const appStore = useAppStore();

onMounted(() => {
  authStore.initializeAuth();
  appStore.initializeApp();
});
</script>