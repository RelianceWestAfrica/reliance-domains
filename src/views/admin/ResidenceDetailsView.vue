<template>
  <div class="container">
    <!-- <header class="app-header">
      <button class="back-button" @click="router.push('/admin/summary')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Retour aux résidences
      </button>

      <div class="controls">
        <label class="checkbox-label">
          <input type="checkbox" v-model="canEdit" />
          <span>Autoriser la modification</span>
        </label>
      </div>
    </header> -->

    <VisualSummaryPanel :residence-id="residenceId" :can-edit="canEdit" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VisualSummaryPanel from '@/components/bilan/VisualSummaryPanel.vue'

const route = useRoute()
const router = useRouter()
const residenceId = route.params.id as string
const canEdit = ref(true)
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #F3F4F6;
  color: #111827;
}

.app {
  min-height: 100vh;
}

.app-header {
  background: white;
  border-bottom: 1px solid #E5E7EB;
  padding: 20px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.app-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-button:hover {
  background: #E5E7EB;
  color: #111827;
}

.controls {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  color: #374151;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #3B82F6;
}

.app-main {
  min-height: calc(100vh - 80px);
}

@media (max-width: 768px) {
  .app-header {
    padding: 16px 0;
  }

  .app-header .container {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .back-button {
    font-size: 14px;
    padding: 8px 12px;
  }

  .container {
    padding: 0 16px;
  }
}
</style>
